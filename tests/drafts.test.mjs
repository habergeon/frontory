import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  createDraftStore,
  restoreCode,
  draftKey,
} from '../src/shared/drafts.ts'

function fixture() {
  const data = new Map()
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  }
}
test('unit drafts stay separate and survive a fresh store', () => {
  const storage = fixture()
  const store = createDraftStore(() => storage)
  const a = store.load('a', 'original').draft
  store.save('a', { ...a, code: 'edited', notes: '# A' })
  store.save('b', { ...a, code: 'B', notes: '# B' })
  const fresh = createDraftStore(() => storage)
  assert.equal(fresh.load('a', 'original').draft.code, 'edited')
  assert.equal(fresh.load('a', 'original').draft.notes, '# A')
  assert.equal(fresh.load('b', '').draft.notes, '# B')
})
test('empty code and notes are intentional values', () => {
  const storage = fixture()
  const store = createDraftStore(() => storage)
  store.save('a', { ...store.load('a', 'original').draft, code: '', notes: '' })
  assert.equal(
    createDraftStore(() => storage).load('a', 'original').draft.code,
    '',
  )
  assert.equal(
    createDraftStore(() => storage).load('a', 'original').draft.notes,
    '',
  )
})
test('write failure preserves drafts and warning across unit navigation; retry succeeds', () => {
  const storage = fixture()
  let fail = true
  const store = createDraftStore(() => ({
    ...storage,
    setItem: (k, v) => {
      if (fail) throw new Error('quota')
      storage.setItem(k, v)
    },
  }))
  const result = store.save('a', {
    ...store.load('a', 'original').draft,
    notes: 'unsaved',
  })
  assert.ok(result.warning)
  store.load('b', '')
  assert.equal(store.load('a', '').draft.notes, 'unsaved')
  assert.ok(store.load('a', '').warning)
  fail = false
  assert.equal(store.save('a', result.draft).warning, null)
  assert.equal(
    createDraftStore(() => storage).load('a', '').draft.notes,
    'unsaved',
  )
})
test('blocked storage access falls back to memory', () => {
  const store = createDraftStore(() => {
    throw new Error('SecurityError')
  })
  const result = store.load('a', 'original')
  assert.ok(result.warning)
  store.save('a', { ...result.draft, notes: 'session' })
  assert.equal(store.load('a', '').draft.notes, 'session')
})
test('corrupt or wrong-version data is not deleted on read', () => {
  for (const value of ['{broken', '{"version":99}', 'null']) {
    const storage = fixture()
    storage.setItem(draftKey('a'), value)
    const result = createDraftStore(() => storage).load('a', 'original')
    assert.ok(result.warning)
    assert.equal(result.draft.code, 'original')
    assert.equal(storage.getItem(draftKey('a')), value)
  }
})
test('restoring source preserves notes without mutating the previous draft', () => {
  const draft = { version: 1, code: 'edited', notes: 'keep me', updatedAt: '' }
  const restored = restoreCode(draft, 'original')
  assert.equal(restored.notes, 'keep me')
  assert.equal(restored.code, 'original')
  assert.equal(draft.code, 'edited')
})

test('language selection persists while legacy drafts remain readable', () => {
  const storage = fixture()
  const store = createDraftStore(() => storage)
  const legacy = store.load('a', 'original').draft
  storage.setItem(draftKey('old'), JSON.stringify(legacy))
  assert.equal(
    createDraftStore(() => storage).load('old', '').draft.language,
    undefined,
  )
  store.save('a', {
    ...legacy,
    language: 'typescript',
    code: 'const n: number = 1',
    notes: 'keep',
  })
  const loaded = createDraftStore(() => storage).load('a', '').draft
  assert.equal(loaded.language, 'typescript')
  const reset = restoreCode(loaded, 'original')
  assert.equal(reset.language, 'javascript')
  assert.equal(reset.notes, 'keep')
})

const englishNotes =
  '# Experiment notes\n\n## Goal\n\n## Key concepts\n\n## Changed variables and predictions\n\n## Actual results\n\n## What I learned\n\n## Remaining questions\n'

test('begin selects a first-use template once without saving or changing timestamps', () => {
  const storage = fixture()
  const store = createDraftStore(() => storage)
  const english = store.begin('a', 'original', 'en')
  assert.equal(english.draft.notes, englishNotes)
  assert.equal(english.draft.code, 'original')
  assert.equal(english.draft.updatedAt, '')
  assert.deepEqual([...storage.data], [])
  assert.strictEqual(store.begin('a', 'original', 'ko'), english)
  assert.equal(
    store.begin('b', '', 'ko').draft.notes,
    '# 실험 기록\n\n## 목표\n\n## 핵심 개념\n\n## 바꾼 변수와 예상\n\n## 실제 결과\n\n## 배운 점\n\n## 남은 질문\n',
  )
})

test('begin preserves saved blank and Korean notes and storage bytes across locales', () => {
  for (const notes of ['', '한국어로 쓴 기록']) {
    const storage = fixture()
    const saved = {
      version: 1,
      code: '',
      notes,
      updatedAt: '2026-10-21T12:34:56.000Z',
      language: 'typescript',
      progress: 'completed',
    }
    const raw = JSON.stringify(saved, null, 2)
    storage.setItem(draftKey('a'), raw)
    const store = createDraftStore(() => storage)
    store.load('a', 'original')
    assert.deepEqual(store.begin('a', 'original', 'en').draft, saved)
    assert.deepEqual(store.begin('a', 'original', 'ko').draft, saved)
    assert.deepEqual([...storage.data], [[draftKey('a'), raw]])
  }
})

test('begin preserves edits saved before first start even when storage rejects the save', () => {
  for (const blockedRead of [false, true]) {
    const storage = fixture()
    const store = createDraftStore(() => {
      if (blockedRead) throw new Error('SecurityError')
      return {
        ...storage,
        setItem() {
          throw new Error('quota')
        },
      }
    })
    const loaded = store.load('a', 'original')
    const saved = store.save('a', {
      ...loaded.draft,
      code: '',
      notes: '',
      progress: 'in-progress',
    })
    assert.ok(saved.warning)
    assert.strictEqual(store.begin('a', 'original', 'en'), saved)
    assert.strictEqual(store.begin('a', 'original', 'ko'), saved)
    assert.equal(saved.draft.notes, '')
    assert.equal(saved.draft.code, '')
    assert.ok(saved.draft.updatedAt)
    assert.deepEqual([...storage.data], [])
  }
})

test('begin preserves corrupt storage bytes and its read warning', () => {
  for (const key of [draftKey('a'), 'web-gl-study:all:v1']) {
    const storage = fixture()
    storage.setItem(key, '{broken')
    const store = createDraftStore(() => storage)
    const loaded = store.load('a', 'original')
    assert.ok(loaded.warning)
    const started = store.begin('a', 'original', 'en')
    assert.equal(started.draft.notes, englishNotes)
    assert.equal(started.warning, loaded.warning)
    assert.strictEqual(store.begin('a', 'original', 'ko'), started)
    assert.deepEqual([...storage.data], [[key, '{broken']])
    assert.equal(loaded.draft.updatedAt, '')
  }
})

test('save persists only existing draft fields and replaceAll resets cached first-use choices', () => {
  const storage = fixture()
  const store = createDraftStore(() => storage)
  const saved = store.save('a', store.begin('a', 'original', 'en').draft)
  assert.deepEqual(
    Object.keys(JSON.parse(storage.getItem(draftKey('a')))).sort(),
    ['code', 'notes', 'updatedAt', 'version'],
  )
  assert.equal(saved.draft.notes, englishNotes)
  store.begin('b', 'original', 'ko')
  store.replaceAll({ a: { version: 1, code: '', notes: '', updatedAt: '' } })
  assert.equal(store.begin('a', 'original', 'en').draft.notes, '')
  assert.equal(store.begin('b', 'original', 'en').draft.notes, englishNotes)
  assert.deepEqual(
    Object.keys(JSON.parse(storage.getItem('web-gl-study:all:v1')).a).sort(),
    ['code', 'notes', 'updatedAt', 'version'],
  )
})

test('blocked storage still allows an English first-use template without losing its warning', () => {
  const store = createDraftStore(() => {
    throw new Error('SecurityError')
  })
  const loaded = store.load('a', 'original')
  const started = store.begin('a', 'original', 'en')
  assert.equal(started.draft.notes, englishNotes)
  assert.equal(started.draft.updatedAt, '')
  assert.ok(started.warning)
  assert.equal(started.warning, loaded.warning)
  assert.strictEqual(store.begin('a', 'original', 'ko'), started)
})

test('storage warning codes preserve failed-save memory', () => {
  const store = createDraftStore(() => ({
    getItem() {
      throw Error('denied')
    },
    setItem() {
      throw Error('denied')
    },
  }))
  assert.equal(store.load('code-contract', 'source').warning, 'read-failed')
  const result = store.save('code-contract', {
    version: 1,
    code: 'edited',
    notes: 'notes',
    updatedAt: '',
  })
  assert.equal(result.warning, 'write-failed')
  assert.equal(store.begin('code-contract', 'source', 'en'), result)
  assert.equal(result.draft.code, 'edited')
})

test('HTML defaults and restores preserve saved blanks, legacy language, notes and progress', () => {
  const storage = fixture()
  const store = createDraftStore(() => storage)
  assert.equal(
    store.begin('html', '<p>한글😀</p>', 'en', 'html').draft.language,
    'html',
  )
  const old = {
    version: 1,
    code: '',
    notes: '기록😀',
    updatedAt: '',
    progress: 'completed',
  }
  storage.setItem(draftKey('old-html'), JSON.stringify(old))
  assert.deepEqual(
    store.begin('old-html', '<h1>Hi</h1>', 'en', 'html').draft,
    old,
  )
  const restored = restoreCode(old, '<h1>Hi</h1>', 'html')
  assert.deepEqual(restored, { ...old, code: '<h1>Hi</h1>', language: 'html' })
  store.save('html', { ...restored, code: '' })
  assert.deepEqual(
    createDraftStore(() => storage).load('html', 'default', 'html').draft.code,
    '',
  )
  assert.equal(
    createDraftStore(() => storage).load('html', 'default').draft.language,
    'html',
  )
})

test('first begin applies localized HTML defaults after a navigator preload exactly once', () => {
  const storage = fixture()
  const store = createDraftStore(() => storage)
  store.load('preloaded', 'Korean catalog default')
  const first = store.begin('preloaded', '<p>English starter</p>', 'en', 'html')
  assert.equal(first.draft.code, '<p>English starter</p>')
  assert.equal(first.draft.language, 'html')
  assert.strictEqual(
    store.begin('preloaded', '<p>한국어</p>', 'ko', 'html'),
    first,
  )
  assert.deepEqual([...storage.data], [])
})

test('HTML snapshot read/write failures preserve memory and original snapshot bytes', () => {
  const storage = fixture()
  const draft = {
    version: 1,
    code: '',
    language: 'html',
    notes: '필기😀',
    progress: 'completed',
    updatedAt: '',
  }
  const raw = JSON.stringify({ html: draft })
  storage.setItem('web-gl-study:all:v1', raw)
  const store = createDraftStore(() => ({
    ...storage,
    setItem() {
      throw Error('quota')
    },
  }))
  assert.deepEqual(store.load('html', '<p>new</p>', 'html').draft, draft)
  assert.throws(() =>
    store.replaceAll({ html: { ...draft, code: 'replacement' } }),
  )
  assert.equal(storage.getItem('web-gl-study:all:v1'), raw)
  const failed = store.save('html', { ...draft, code: '<p>세션</p>' })
  assert.equal(failed.warning, 'write-failed')
  assert.equal(
    store.begin('html', '<p>default</p>', 'en', 'html').draft.code,
    '<p>세션</p>',
  )
  assert.equal(storage.getItem('web-gl-study:all:v1'), raw)
  const blocked = createDraftStore(() => ({
    getItem() {
      throw Error('denied')
    },
    setItem() {
      throw Error('denied')
    },
  }))
  const result = blocked.begin('html', '<p>원문</p>', 'ko', 'html')
  assert.equal(result.warning, 'read-failed')
  assert.equal(result.draft.language, 'html')
  assert.equal(result.draft.code, '<p>원문</p>')
})

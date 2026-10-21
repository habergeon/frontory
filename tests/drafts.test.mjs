import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createDraftStore, restoreCode, draftKey } from '../src/shared/drafts.ts'

function fixture() {
  const data = new Map()
  return { data, getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }
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
  assert.equal(createDraftStore(() => storage).load('a', 'original').draft.code, '')
  assert.equal(createDraftStore(() => storage).load('a', 'original').draft.notes, '')
})
test('write failure preserves drafts and warning across unit navigation; retry succeeds', () => {
  const storage = fixture()
  let fail = true
  const store = createDraftStore(() => ({ ...storage, setItem: (k,v) => { if (fail) throw new Error('quota'); storage.setItem(k,v) } }))
  const result = store.save('a', { ...store.load('a', 'original').draft, notes: 'unsaved' })
  assert.ok(result.warning)
  store.load('b', '')
  assert.equal(store.load('a', '').draft.notes, 'unsaved')
  assert.ok(store.load('a', '').warning)
  fail = false
  assert.equal(store.save('a', result.draft).warning, null)
  assert.equal(createDraftStore(() => storage).load('a', '').draft.notes, 'unsaved')
})
test('blocked storage access falls back to memory', () => {
  const store = createDraftStore(() => { throw new Error('SecurityError') })
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
  assert.equal(createDraftStore(() => storage).load('old', '').draft.language, undefined)
  store.save('a', { ...legacy, language: 'typescript', code: 'const n: number = 1', notes: 'keep' })
  const loaded = createDraftStore(() => storage).load('a', '').draft
  assert.equal(loaded.language, 'typescript')
  const reset = restoreCode(loaded, 'original')
  assert.equal(reset.language, 'javascript')
  assert.equal(reset.notes, 'keep')
})

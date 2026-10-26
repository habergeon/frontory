import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createDraftStore } from '../src/shared/drafts.ts'

const draft = (notes) => ({ version: 1, code: '', notes, updatedAt: '' })
test('a 644-unit catalog reads and validates a saved snapshot once during initial navigation', () => {
  const snapshot = Object.fromEntries(
    Array.from({ length: 644 }, (_, i) => ['unit-' + i, draft('note ' + i)]),
  )
  let snapshotReads = 0
  const store = createDraftStore(() => ({
    getItem: (key) => {
      if (key === 'web-gl-study:all:v1') {
        snapshotReads++
        return JSON.stringify(snapshot)
      }
      return null
    },
    setItem() {},
  }))
  for (let i = 0; i < 644; i++)
    assert.equal(store.load('unit-' + i, '').draft.notes, 'note ' + i)
  assert.equal(snapshotReads, 1)
})
test('saving rereads persisted snapshot so another saved unit is not overwritten by cached data', () => {
  const key = 'web-gl-study:all:v1'
  const data = new Map([
    [key, JSON.stringify({ a: draft('first'), b: draft('before') })],
  ])
  const store = createDraftStore(() => ({
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  }))
  store.load('a', '')
  data.set(
    key,
    JSON.stringify({ a: draft('first'), b: draft('external update') }),
  )
  store.save('a', draft('local update'))
  const fresh = createDraftStore(() => ({
    getItem: (key) => data.get(key) ?? null,
    setItem() {},
  }))
  assert.equal(fresh.load('b', '').draft.notes, 'external update')
  assert.equal(fresh.load('a', '').draft.notes, 'local update')
})

test('a 644-unit home scan leaves first-use note language undecided', () => {
  const data = new Map()
  let snapshotReads = 0
  const store = createDraftStore(() => ({
    getItem: (key) => {
      if (key === 'web-gl-study:all:v1') snapshotReads++
      return data.get(key) ?? null
    },
    setItem: (key, value) => data.set(key, value),
  }))
  for (let i = 0; i < 644; i++) store.load('unit-' + i, 'original ' + i)
  const started = store.begin('unit-643', 'original 643', 'en')
  assert.equal(started.draft.notes.split('\n')[0], '# Experiment notes')
  assert.equal(started.draft.code, 'original 643')
  assert.equal(started.draft.updatedAt, '')
  assert.strictEqual(store.begin('unit-643', 'original 643', 'ko'), started)
  assert.equal(snapshotReads, 1)
  assert.deepEqual([...data], [])
})

test('begin preserves imported snapshot blanks, timestamps and storage bytes across locales', () => {
  const snapshot = {
    a: {
      version: 1,
      code: '',
      notes: '',
      updatedAt: '2026-10-21T12:34:56.000Z',
    },
    b: draft('한국어 필기'),
  }
  const raw = JSON.stringify(snapshot, null, 2)
  const data = new Map([['web-gl-study:all:v1', raw]])
  const store = createDraftStore(() => ({
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  }))
  for (const locale of ['en', 'ko', 'en']) {
    assert.deepEqual(store.begin('a', 'original', locale).draft, snapshot.a)
    assert.deepEqual(store.begin('b', 'original', locale).draft, snapshot.b)
  }
  assert.deepEqual([...data], [['web-gl-study:all:v1', raw]])
})

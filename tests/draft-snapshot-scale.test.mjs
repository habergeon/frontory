import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createDraftStore } from '../src/shared/drafts.ts'

const draft = notes => ({ version: 1, code: '', notes, updatedAt: '' })
test('a 644-unit catalog reads and validates a saved snapshot once during initial navigation', () => {
  const snapshot = Object.fromEntries(Array.from({ length: 644 }, (_, i) => ['unit-' + i, draft('note ' + i)]))
  let snapshotReads = 0
  const store = createDraftStore(() => ({ getItem: key => { if (key === 'web-gl-study:all:v1') { snapshotReads++; return JSON.stringify(snapshot) } return null }, setItem() {} }))
  for (let i = 0; i < 644; i++) assert.equal(store.load('unit-' + i, '').draft.notes, 'note ' + i)
  assert.equal(snapshotReads, 1)
})
test('saving rereads persisted snapshot so another saved unit is not overwritten by cached data', () => {
  const key = 'web-gl-study:all:v1'
  const data = new Map([[key, JSON.stringify({ a: draft('first'), b: draft('before') })]])
  const store = createDraftStore(() => ({ getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }))
  store.load('a', '')
  data.set(key, JSON.stringify({ a: draft('first'), b: draft('external update') }))
  store.save('a', draft('local update'))
  const fresh = createDraftStore(() => ({ getItem: key => data.get(key) ?? null, setItem() {} }))
  assert.equal(fresh.load('b', '').draft.notes, 'external update')
  assert.equal(fresh.load('a', '').draft.notes, 'local update')
})

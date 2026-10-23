import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createDraftStore } from '../src/shared/drafts.ts'
import { parseBackup, MAX_BACKUP_BYTES } from '../src/shared/backup.ts'

const backup = () => ({ format: 'web-gl-study', version: 1, exportedAt: '2026-10-21T00:00:00.000Z', selectedUnitId: 'b', units: ['a', 'b'].map(id => ({ id, draft: { version: 1, code: '', notes: '# 한글\n😀', updatedAt: '', language: 'typescript' } })) })

test('WebGL v1 backups retain all 28 legacy IDs with an English catalog', () => {
  const read = file => JSON.parse(readFileSync(file, 'utf8'))
  const legacyIds = read('content/catalog-v2.json').units.filter(unit => unit.seriesId === 'webgl').map(unit => unit.id)
  const englishIds = read('src/app/catalog.en.json').units.map(unit => unit.id)
  assert.equal(legacyIds.length, 28)
  for (const selectedUnitId of legacyIds) {
    const value = { ...backup(), selectedUnitId, units: legacyIds.map(id => ({ ...backup().units[0], id })) }
    const parsed = parseBackup(JSON.stringify(value), englishIds, legacyIds)
    assert.equal(parsed.selectedUnitId, selectedUnitId)
    assert.deepEqual(parsed.units.map(unit => unit.id), legacyIds)
  }
})
test('JSON round trip preserves Unicode, empty code, language and current unit', () => {
  const value = backup()
  assert.deepEqual(parseBackup('\uFEFF' + JSON.stringify(value), ['a','b']), value)
})
test('rejects wrong version, missing/duplicate/unknown units and invalid drafts before import', () => {
  for (const mutate of [v => v.version = 9, v => v.units.pop(), v => v.units[1].id = 'a', v => v.units[1].id = 'x', v => v.selectedUnitId = 'x', v => v.units[0].draft.language = 'python', v => v.units[0].draft.notes = 4, v => v.units[0].draft.updatedAt = 'invalid']) {
    const value = backup(); mutate(value)
    assert.throws(() => parseBackup(JSON.stringify(value), ['a','b']))
  }
  assert.throws(() => parseBackup('{broken', ['a','b']))
  assert.throws(() => parseBackup(' '.repeat(MAX_BACKUP_BYTES + 1), ['a','b']))
})

test('whole import replaces cached and persisted units and survives later edits', () => {
  const data = new Map()
  const storage = { getItem: k => data.get(k) ?? null, setItem: (k,v) => data.set(k,v) }
  const store = createDraftStore(() => storage)
  const old = store.load('a', 'old').draft
  store.save('a', old)
  assert.equal(typeof store.replaceAll, 'function')
  store.replaceAll({ a: { ...old, code: 'TS', language: 'typescript', notes: '한글' }, b: { ...old, code: '', notes: '' } })
  assert.equal(store.load('a', '').draft.notes, '한글')
  store.save('b', { ...store.load('b', '').draft, notes: 'later' })
  const fresh = createDraftStore(() => storage)
  assert.equal(fresh.load('a', '').draft.language, 'typescript')
  assert.equal(fresh.load('b', '').draft.notes, 'later')
})

test('failed whole import preserves original storage and memory', () => {
  const data = new Map()
  let fail = false
  const storage = { getItem: k => data.get(k) ?? null, setItem: (k,v) => { if (fail) throw Error('quota'); data.set(k,v) } }
  const store = createDraftStore(() => storage)
  const old = store.load('a', 'old').draft
  store.save('a', old)
  const before = [...data]
  assert.equal(typeof store.replaceAll, 'function')
  fail = true
  assert.throws(() => store.replaceAll({ a: { ...old, code: 'new' } }))
  assert.deepEqual([...data], before)
  assert.equal(store.load('a', '').draft.code, 'old')
})

test('validation failures expose stable codes and preserve raw JSON diagnostics', () => {
  const cases = [
    [' '.repeat(MAX_BACKUP_BYTES + 1), 'too-large'],
    [JSON.stringify({ ...backup(), version: 9 }), 'invalid-format'],
    [JSON.stringify({ ...backup(), exportedAt: 'invalid' }), 'invalid-time'],
    [JSON.stringify({ ...backup(), units: [] }), 'invalid-units'],
    [JSON.stringify({ ...backup(), units: [backup().units[0], backup().units[0]] }), 'invalid-units'],
    [JSON.stringify({ ...backup(), units: backup().units.map(entry => ({ ...entry, draft: { ...entry.draft, updatedAt: 'invalid' } })) }), 'invalid-time'],
  ]
  for (const [text, code] of cases) assert.throws(() => parseBackup(text, ['a', 'b']), error => error.code === code)
  assert.throws(() => parseBackup('{broken', ['a', 'b']), error => error instanceof SyntaxError && error.message.includes('JSON'))
})

import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as backups from '../src/shared/backup.ts'
import { createDraftStore } from '../src/shared/drafts.ts'

const ids = ['webgl', 'react', 'new-unit']
const oldIds = ['webgl', 'react']
const draft = (notes) => ({
  version: 1,
  code: '',
  notes,
  updatedAt: '',
  language: 'typescript',
  progress: 'in-progress',
})
const archive = (version, selected = 'react') => ({
  format: 'frontory',
  version,
  exportedAt: '2026-10-21T00:00:00Z',
  selectedUnitId: selected,
  units: (version === 2 ? oldIds : ids).map((id) => ({
    id,
    draft: draft('import ' + id),
  })),
})

test('v2 archives validate against their historical catalog after curriculum expansion', () => {
  const value = backups.parseBackup(
    JSON.stringify(archive(2)),
    ids,
    ['webgl'],
    oldIds,
  )
  assert.equal(value.units.length, 2)
  assert.equal(value.version, 2)
})
test('v3 requires the entire current catalog and rejects missing duplicate and foreign entries', () => {
  assert.equal(
    backups.parseBackup(JSON.stringify(archive(3)), ids, ['webgl'], oldIds)
      .units.length,
    3,
  )
  for (const alter of [
    (v) => v.units.pop(),
    (v) => (v.units[1].id = 'webgl'),
    (v) => (v.units[0].id = 'foreign'),
    (v) => (v.selectedUnitId = 'foreign'),
  ]) {
    const value = archive(3)
    alter(value)
    assert.throws(() =>
      backups.parseBackup(JSON.stringify(value), ids, ['webgl'], oldIds),
    )
  }
  const old = archive(2)
  old.units.pop()
  assert.throws(() =>
    backups.parseBackup(JSON.stringify(old), ids, ['webgl'], oldIds),
  )
})
test('scoped archive restoration preserves newer notes and restores old code and progress atomically', () => {
  assert.equal(typeof backups.mergeBackupDrafts, 'function')
  const data = new Map()
  const storage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  }
  const store = createDraftStore(() => storage)
  store.save('new-unit', draft('keep newer notes'))
  const parsed = backups.parseBackup(
    JSON.stringify(archive(2)),
    ids,
    ['webgl'],
    oldIds,
  )
  store.replaceAll(
    backups.mergeBackupDrafts(parsed, ids, (id) => store.load(id, '').draft),
  )
  const fresh = createDraftStore(() => storage)
  assert.equal(fresh.load('new-unit', '').draft.notes, 'keep newer notes')
  assert.equal(fresh.load('react', '').draft.notes, 'import react')
  assert.equal(fresh.load('react', '').draft.progress, 'in-progress')
  assert.equal(fresh.load('react', '').draft.code, '')
})
test('v1 WebGL import preserves both original non-WebGL and expanded unit records', () => {
  const value = {
    ...archive(2, 'webgl'),
    format: 'web-gl-study',
    version: 1,
    units: [{ id: 'webgl', draft: draft('legacy WebGL') }],
  }
  const parsed = backups.parseBackup(
    JSON.stringify(value),
    ids,
    ['webgl'],
    oldIds,
  )
  const result = backups.mergeBackupDrafts(parsed, ids, (id) =>
    draft('keep ' + id),
  )
  assert.equal(result.webgl.notes, 'legacy WebGL')
  assert.equal(result.react.notes, 'keep react')
  assert.equal(result['new-unit'].notes, 'keep new-unit')
})

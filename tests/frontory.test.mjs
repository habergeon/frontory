import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { isDraft } from '../src/shared/drafts.ts'
import { parseBackup } from '../src/shared/backup.ts'
const catalog = JSON.parse(
  fs.readFileSync(new URL('../src/app/catalog.json', import.meta.url)),
)
const ids = catalog.units.map((u) => u.id)
const legacy = catalog.units
  .filter((u) => u.seriesId === 'webgl')
  .map((u) => u.id)
const previous = JSON.parse(
  fs.readFileSync(new URL('../content/catalog-v2.json', import.meta.url)),
).units.map((u) => u.id)
const draft = {
  version: 1,
  code: '',
  notes: '유지',
  updatedAt: '',
  progress: 'completed',
}
test('manual progress validates without inferring completion from edited notes', () => {
  assert.ok(isDraft(draft))
  assert.equal(isDraft({ ...draft, progress: 'automatic' }), false)
})
test('Frontory backup preserves progress and supports old WebGL-only archive', () => {
  const make = (format, version, unitIds) => ({
    format,
    version,
    exportedAt: new Date().toISOString(),
    selectedUnitId: unitIds[0],
    units: unitIds.map((id) => ({ id, draft })),
  })
  const modern = parseBackup(
    JSON.stringify(make('frontory', 3, ids)),
    ids,
    legacy,
    previous,
  )
  assert.equal(modern.units[0].draft.progress, 'completed')
  assert.equal(modern.units.length, 644)
  assert.equal(
    parseBackup(
      JSON.stringify(make('frontory', 2, previous)),
      ids,
      legacy,
      previous,
    ).units.length,
    94,
  )
  const old = parseBackup(
    JSON.stringify(make('web-gl-study', 1, legacy)),
    ids,
    legacy,
  )
  assert.equal(old.units.length, 28)
  assert.throws(() =>
    parseBackup(JSON.stringify(make('frontory', 2, legacy)), ids, legacy),
  )
})
test('23 series and 644 unique units each link to substantive learning documents', () => {
  assert.equal(catalog.series.length, 23)
  assert.equal(ids.length, 644)
  assert.equal(new Set(ids).size, 644)
  for (const unit of catalog.units) {
    assert.ok(catalog.series.some((s) => s.id === unit.seriesId))
    const text = fs.readFileSync(path.resolve('.' + unit.docPath), 'utf8')
    for (const term of [
      '선수 지식',
      '핵심 개념',
      '실습 과제',
      '완료 조건',
      '공식 참고',
      '실제 결과',
    ])
      assert.ok(text.includes(term), unit.id + ': ' + term)
  }
})
test('all local Markdown links resolve after folder migration', () => {
  const walk = (dir) =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .flatMap((e) =>
        e.isDirectory()
          ? walk(path.join(dir, e.name))
          : [path.join(dir, e.name)],
      )
  for (const file of [
    ...walk('docs').filter((p) => p.endsWith('.md')),
    'README.md',
  ]) {
    for (const match of fs
      .readFileSync(file, 'utf8')
      .matchAll(/\]\((<[^>]+>|[^)]+)\)/g)) {
      const link = match[1].replace(/^<|>$/g, '').split('#')[0]
      if (!link || /^(https?:|mailto:)/.test(link)) continue
      assert.ok(
        fs.existsSync(path.resolve(path.dirname(file), link)),
        file + ' -> ' + link,
      )
    }
  }
})

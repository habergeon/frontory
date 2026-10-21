import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { transformSync } from 'esbuild'

const catalog = JSON.parse(readFileSync(new URL('../src/app/catalog.json', import.meta.url), 'utf8'))
test('all 644 learning units have editable example sources', () => {
  const available = catalog.units.filter(unit => existsSync(new URL('../src/labs/' + unit.id + '/example.js', import.meta.url)))
  assert.equal(available.length, 644)
  assert.equal(new Set(available.map(unit => unit.seriesId)).size, 23)
  for (const unit of available) {
    const source = readFileSync(new URL('../src/labs/' + unit.id + '/example.js', import.meta.url), 'utf8')
    assert.match(source, /export (?:async )?function mount\(/)
    assert.doesNotThrow(() => transformSync(source, { loader: 'js' }), unit.id)
    assert.ok(source.length > 300, unit.id)
  }
})

test('expanded examples declare execution mode and publishable companion files', () => {
  const old = new Set(JSON.parse(readFileSync('content/catalog-v2.json', 'utf8')).units.map(unit => unit.id))
  for (const series of catalog.series.filter(item => item.id !== 'webgl')) {
    const metadataPath = 'content/examples/' + series.id + '.json'
    assert.ok(existsSync(metadataPath), metadataPath)
    const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'))
    for (const unit of catalog.units.filter(item => item.seriesId === series.id && !old.has(item.id))) {
      const item = metadata[unit.id]
      assert.ok(item && ['browser', 'external'].includes(item.mode), unit.id)
      assert.ok(typeof item.note === 'string' && item.note.length > 10, unit.id)
      for (const file of item.files ?? []) {
        assert.ok(file.startsWith('src/labs/' + unit.id + '/') && !file.includes('..'), unit.id + ' ' + file)
        assert.ok(existsSync(file), file)
      }
      if (item.mode === 'external') assert.ok(item.files?.length > 0, unit.id + ' external companion required')
    }
  }
})

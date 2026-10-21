import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { transformSync } from 'esbuild'

const catalog = JSON.parse(readFileSync(new URL('../src/app/catalog.json', import.meta.url), 'utf8'))
test('all 94 learning units have editable example sources', () => {
  const available = catalog.units.filter(unit => existsSync(new URL('../src/labs/' + unit.id + '/example.js', import.meta.url)))
  assert.equal(available.length, 94)
  assert.equal(new Set(available.map(unit => unit.seriesId)).size, 23)
  for (const unit of available) {
    const source = readFileSync(new URL('../src/labs/' + unit.id + '/example.js', import.meta.url), 'utf8')
    assert.match(source, /export (?:async )?function mount\(/)
    assert.doesNotThrow(() => transformSync(source, { loader: 'js' }), unit.id)
    assert.ok(source.length > 300, unit.id)
  }
})

import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'))
const catalog = read('src/app/catalog.json')
const previous = read('content/catalog-v2.json')

test('each of 23 series has 28 ordered units in four complete stages', () => {
  assert.equal(catalog.series.length, 23)
  assert.equal(catalog.units.length, 644)
  assert.equal(new Set(catalog.units.map(unit => unit.id)).size, 644)
  for (const series of catalog.series) {
    const units = catalog.units.filter(unit => unit.seriesId === series.id)
    assert.equal(series.stages.length, 4, series.id)
    assert.deepEqual(units.map(unit => unit.day), Array.from({ length: 28 }, (_, i) => i + 1), series.id)
    for (let week = 1; week <= 4; week++) assert.equal(units.filter(unit => unit.week === week).length, 7, series.id)
  }
})

test('existing bookmarks, document paths and example identities remain intact', () => {
  for (const unit of previous.units) {
    const current = catalog.units.find(item => item.id === unit.id)
    assert.ok(current, unit.id)
    assert.equal(current.docPath, unit.docPath, unit.id)
    assert.equal(current.title, unit.title, unit.id)
    assert.ok(fs.existsSync('src/labs/' + unit.id + '/example.js'), unit.id)
  }
})

test('expanded curricula contain explained concepts and concrete experiment contracts', () => {
  for (const series of previous.series.filter(item => item.id !== 'webgl')) {
    const content = read('content/curricula/' + series.id + '.json')
    assert.equal(content.seriesId, series.id)
    assert.equal(content.units.length, 28)
    assert.equal(new Set(content.units.map(unit => unit.title)).size, 28)
    for (const unit of content.units) {
      assert.ok(unit.prerequisites.length > 5, unit.id)
      assert.ok(unit.environment.length > 10, unit.id)
      for (const key of ['concepts', 'outcomes', 'criteria', 'questions']) assert.ok(unit[key].length >= 2, unit.id + ' ' + key)
      assert.ok(unit.steps.length >= 3, unit.id)
      assert.ok(unit.concepts.every(concept => concept.explanation.length >= 35), unit.id)
      assert.ok(unit.variables.length >= 1 && unit.variables.every(variable => ['name', 'baseline', 'change', 'expected'].every(key => typeof variable[key] === 'string' && variable[key].length > 0)), unit.id)
      assert.ok(unit.references.length > 0 && unit.references.every(reference => /^https:\/\//.test(reference.url)), unit.id)
      const entry = catalog.units.find(item => item.id === unit.id)
      assert.ok(entry, unit.id)
      const markdown = fs.readFileSync('.' + entry.docPath, 'utf8')
      for (const step of unit.steps) assert.ok(markdown.includes(step), unit.id)
    }
  }
})

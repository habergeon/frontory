import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { practiceGuide } from '../src/app/guideContent.ts'

test('every lesson exposes tasks, observation variables and completion criteria from its document', () => {
  const catalog = JSON.parse(readFileSync(new URL('../src/app/catalog.json', import.meta.url), 'utf8'))
  for (const unit of catalog.units) {
    const text = readFileSync(new URL('..' + unit.docPath, import.meta.url), 'utf8')
    const guide = practiceGuide(text)
    assert.ok(guide.steps.length > 30, unit.id + ': tasks')
    assert.ok(guide.variables.length > 5, unit.id + ': observation')
    assert.ok(guide.criteria.length > 10, unit.id + ': criteria')
    assert.ok(!guide.criteria.includes('## '), unit.id + ': section boundary')
  }
})


test('all published English lessons use the shared English section headings', () => {
  const catalog = JSON.parse(readFileSync(new URL('../src/app/catalog.en.json', import.meta.url), 'utf8'))
  const manifest = JSON.parse(readFileSync(new URL('../content/locales/en/manifest.json', import.meta.url), 'utf8'))
  assert.deepEqual(catalog.units.map(unit => unit.id).sort(), [...manifest.publishedUnitIds].sort())
  for (const unit of catalog.units) {
    const text = readFileSync(new URL('..' + unit.docPath, import.meta.url), 'utf8')
    const guide = practiceGuide(text, 'en')
    for (const key of ['steps', 'variables', 'criteria']) {
      assert.ok(guide[key].length > 5, unit.id + ': ' + key)
      assert.ok(!guide[key].includes('## '), unit.id + ': ' + key + ' section boundary')
    }
    assert.equal(practiceGuide(text).steps, '', 'English never parsed as Korean')
  }
})

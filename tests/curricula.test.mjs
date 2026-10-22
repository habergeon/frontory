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
  assert.equal(previous.units.length, 94)
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

// English publication must stay limited to explicitly validated translations.
test('English generated catalog and lessons match approved content without unpublished navigation', async () => {
  const { readEnglishContent } = await import('../scripts/locale-content.mjs')
  const { headings } = await import('../src/i18n/messages.ts')
  const approved = readEnglishContent()
  const english = read('src/app/catalog.en.json')
  assert.deepEqual(english.units.map(unit => unit.id).sort(), [...approved.publishedUnitIds].sort())
  assert.deepEqual(english.series.map(series => series.id), approved.catalog.series.map(series => series.id))
  for (const unit of english.units) {
    const original = catalog.units.find(item => item.id === unit.id)
    const translated = approved.curricula[unit.seriesId].units.find(item => item.id === unit.id)
    assert.equal(unit.docPath, original.docPath.replace('/docs/', '/docs/en/'))
    assert.equal(unit.goal, translated.outcomes.join(' '))
    assert.equal(unit.exampleNote, read('content/locales/en/examples/' + unit.seriesId + '.json')[unit.id].values.note)
    const markdown = fs.readFileSync('.' + unit.docPath, 'utf8')
    assert.doesNotMatch(markdown.replace(/```[\s\S]*?```/g, ''), /[가-힣]/)
    for (const name of ['tasks', 'variables', 'criteria', 'notes']) assert.ok(markdown.includes('## ' + headings.en[name]), name)
    for (const step of translated.steps) assert.ok(markdown.includes(step), unit.id)
    assert.ok(markdown.includes(unit.exampleNote))
    const next = catalog.units.find(item => item.seriesId === unit.seriesId && item.day === unit.day + 1)
    if (next && !approved.publishedUnitIds.includes(next.id)) assert.ok(!markdown.includes(next.docPath.replace('/docs/', '/docs/en/')))
  }
  for (const series of english.series) {
    assert.ok(series.docPath.startsWith('/docs/en/'))
    const markdown = fs.readFileSync('.' + series.docPath, 'utf8')
    for (const unit of catalog.units.filter(item => item.seriesId === series.id && !approved.publishedUnitIds.includes(item.id))) {
      assert.ok(!markdown.includes(unit.docPath.replace('/docs/', '/docs/en/')), unit.id)
    }
  }
  const index = fs.readFileSync('docs/en/examples-expanded.md', 'utf8')
  for (const unit of english.units) assert.ok(index.includes(unit.exampleNote))
})

test('localized catalog lookup preserves shared executable identity and has no Korean fallback', async () => {
  const { transformSync } = await import('esbuild')
  const { createRequire } = await import('node:module')
  const source = fs.readFileSync('src/app/curriculum.ts', 'utf8')
  const details = Object.assign({}, ...fs.readdirSync('content/examples').map(file => read('content/examples/' + file)))
  details['javascript-step-02'].files = ['src/labs/javascript-step-02/fixture.js']
  const examples = Object.fromEntries(read('src/app/catalog.en.json').units.map(unit => [
    '../labs/' + unit.id + '/example.js', fs.readFileSync('src/labs/' + unit.id + '/example.js', 'utf8'),
  ]))
  const globValues = [{ '../../content/examples/fixture.json': details }, examples]
  let index = 0
  const runnable = source.replace(/import\.meta\.glob[\s\S]*?\)\r?\n/g, () => JSON.stringify(globValues[index++]) + '\n')
  assert.equal(index, 2)
  const compiled = transformSync(runnable, { loader: 'ts', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'exports', 'module', compiled)(createRequire(new URL('../src/app/curriculum.ts', import.meta.url)), module.exports, module)
  const api = module.exports
  assert.equal(api.getCatalog('ko').units, api.units)
  assert.equal(api.getCatalog('ko').series, api.series)
  assert.equal(api.units.length, 644)
  assert.equal(api.getCatalog('en').units.length, 4)
  for (const unit of api.getCatalog('en').units) {
    const common = api.units.find(item => item.id === unit.id)
    assert.equal(unit.source, common.source)
    assert.ok(unit.source)
    assert.equal(unit.exampleMode, common.exampleMode)
    assert.equal(unit.exampleMode, details[unit.id].mode)
    assert.equal(unit.exampleFiles, common.exampleFiles)
    assert.notEqual(unit.exampleNote, common.exampleNote)
    assert.equal(api.getLocalizedUnit('en', unit.id), unit)
  }
  assert.deepEqual(api.getLocalizedUnit('en', 'javascript-step-02').exampleFiles, ['src/labs/javascript-step-02/fixture.js'])
  assert.equal(api.getLocalizedUnit('en', 'javascript-01'), null)
  assert.equal(api.getLocalizedUnit('ko', 'javascript-01').id, 'javascript-01')
  assert.equal(api.getLocalizedUnit('ko', 'missing-id'), null)
})

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
  for (const unit of english.units.filter(unit => unit.seriesId !== 'webgl')) {
    const original = catalog.units.find(item => item.id === unit.id)
    const translated = approved.curricula[unit.seriesId].units.find(item => item.id === unit.id)
    assert.equal(unit.docPath, original.docPath.replace('/docs/', '/docs/en/'))
    assert.equal(unit.goal, translated.outcomes.join(' '))
    const note = read('content/locales/en/examples/' + unit.seriesId + '.json')[unit.id]
    assert.equal(unit.exampleNote, note?.values.note)
    const markdown = fs.readFileSync('.' + unit.docPath, 'utf8')
    let proseWithoutCode = markdown.replace(/```[\s\S]*?```/g, '')
    if (unit.id === 'javascript-step-11') {
      const fixture = '<strong>실험</strong>'
      assert.equal(proseWithoutCode.split(fixture).length - 1, 2)
      proseWithoutCode = proseWithoutCode.replaceAll(fixture, '')
    }
    if (unit.id === 'react-step-07') {
      const fixture = '새 카드'
      assert.equal(translated.variables[0].change, fixture)
      assert.equal(proseWithoutCode.split(fixture).length - 1, 1)
      proseWithoutCode = proseWithoutCode.replace(fixture, '')
    }
    if (unit.id === 'svelte-step-02') {
      const fixture = '<b>메모</b>'
      assert.equal(translated.steps[1], "Set the title to the string '<b>메모</b>' and display it as text.")
      assert.equal(proseWithoutCode.split(fixture).length - 1, 1)
      proseWithoutCode = proseWithoutCode.replace(fixture, '')
    }
    if (unit.id === 'svelte-step-07') {
      const fixture = '새 카드'
      assert.equal(translated.variables[0].change, fixture)
      assert.equal(translated.variables[0].expected, 'Reject whitespace and add 새 카드 once.')
      assert.equal(proseWithoutCode.split(fixture).length - 1, 2)
      proseWithoutCode = proseWithoutCode.replaceAll(fixture, '')
    }
    if (unit.id === 'canvas-2d-step-07') {
      const fixture = '가나'
      assert.equal(translated.variables[0].baseline, fixture)
      assert.equal(translated.variables[0].change, 'WWW iii')
      assert.equal(translated.steps[2], 'Save the output with the input condition 가나, then run again with WWW iii. Expected: Even with similar character counts, badge width varies with actual glyph widths. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-07-notes.md.')
      assert.equal(proseWithoutCode.split(fixture).length - 1, 2)
      proseWithoutCode = proseWithoutCode.replaceAll(fixture, '')
    }
    if (unit.id === 'pixijs-step-05') {
      const fixture = "new Text({text:'점수 0',style:{fontSize:24,fill:...}})"
      assert.equal(read('content/curricula/pixijs.json').units.find(item => item.id === unit.id).steps[0], "외부 실습 프로젝트의 day-05.js와 index.html을 준비하세요. new Text({text:'점수 0',style:{fontSize:24,fill:...}})로 점수판을 만드세요.")
      assert.equal(translated.steps[0], "Prepare day-05.js and index.html in the external practice project. Create a scoreboard with new Text({text:'점수 0',style:{fontSize:24,fill:...}}).")
      assert.equal(proseWithoutCode.split(fixture).length - 1, 1)
      proseWithoutCode = proseWithoutCode.replace(fixture, '')
    }
    if (['playwright-step-11', 'playwright-02'].includes(unit.id)) {
      const source = read('content/curricula/playwright.json').units.find(item => item.id === unit.id)
      const fixtures = unit.id === 'playwright-step-11'
        ? [['학습 백업 JSON', 1], ['전체 교체하여 복원', 2]] : [['전체 교체하여 복원', 1]]
      for (const [fixture, count] of fixtures) {
        assert.equal(JSON.stringify(source).split(fixture).length - 1, count)
        assert.equal(JSON.stringify(translated).split(fixture).length - 1, count)
        assert.equal(proseWithoutCode.split(fixture).length - 1, count)
        proseWithoutCode = proseWithoutCode.replaceAll(fixture, '')
      }
    }
    assert.doesNotMatch(proseWithoutCode, /[가-힣]/)
    for (const name of ['tasks', 'variables', 'criteria', 'notes']) assert.ok(markdown.includes('## ' + headings.en[name]), name)
    for (const step of translated.steps) assert.ok(markdown.includes(step), unit.id)
    if (note) assert.ok(markdown.includes(unit.exampleNote))
    else {
      assert.ok(previous.units.some(legacy => legacy.id === unit.id), unit.id + ': legacy guidance required')
      assert.ok(markdown.includes('Runtime environments and limits'))
      assert.ok(markdown.includes('/' + unit.id + '/example.js'))
    }
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
  for (const unit of english.units.filter(unit => !previous.units.some(legacy => legacy.id === unit.id))) {
    assert.ok(index.includes(unit.exampleNote), unit.id)
  }
})

test('published English WebGL units retain the 28 legacy identities and manual documents', async () => {
  const { readEnglishContent, sourceHash } = await import('../scripts/locale-content.mjs')
  const approved = readEnglishContent()
  const records = read('content/locales/en/webgl.json').units
  const originals = previous.units.filter(unit => unit.seriesId === 'webgl')
  const english = read('src/app/catalog.en.json').units.filter(unit => unit.seriesId === 'webgl')
  assert.equal(originals.length, 28)
  assert.deepEqual(catalog.units.filter(unit => unit.seriesId === 'webgl'), originals)
  assert.deepEqual(english.map(unit => unit.id).sort(), Object.keys(records).sort())
  assert.equal(approved.curricula.webgl, undefined)
  assert.ok(!fs.existsSync('content/locales/en/curricula/webgl.json'))
  const intro = approved.documents.get('/docs/labs/graphics/webgl/README.md')
  assert.ok(intro)
  assert.equal(fs.readFileSync('.' + intro.translatedPath, 'utf8'), intro.text)
  for (const unit of english) {
    const source = originals.find(item => item.id === unit.id)
    assert.ok(source, unit.id)
    assert.equal(records[unit.id].sourceHash, sourceHash(source))
    assert.deepEqual(Object.keys(records[unit.id].values).sort(), ['goal', 'title'])
    assert.deepEqual(unit, { ...source, ...records[unit.id].values,
      docPath: source.docPath.replace('/docs/', '/docs/en/') })
    const document = approved.documents.get(source.docPath)
    assert.equal(document.translatedPath, unit.docPath)
    const text = fs.readFileSync('.' + unit.docPath, 'utf8')
    assert.equal(text, document.text)
    assert.ok(text.includes(unit.title), unit.id)
    assert.ok(text.includes(unit.goal), unit.id)
    assert.ok(text.includes('## Exercises'))
    assert.ok(text.includes('## Variables to observe'))
    assert.ok(text.includes('## Completion criteria'))
    assert.ok(text.includes('/' + unit.id + '/example.js'))
    let prose = text.replace(/`[^`\n]+`/g, '')
    const formula = 'C=alpha*C앞+(1-alpha)*C뒤'
    if (unit.id === '18-gs-projection') {
      assert.equal(prose.split(formula).length - 1, 1)
      prose = prose.replace(formula, '')
    }
    assert.doesNotMatch(prose, /[가-힣]/)
  }
})

test('complete English archive includes all 29 manual WebGL documents and their link targets', async () => {
  const { readEnglishContent } = await import('../scripts/locale-content.mjs')
  const content = readEnglishContent({ complete: true })
  const english = read('src/app/catalog.en.json')
  const originals = previous.units.filter(unit => unit.seriesId === 'webgl')
  assert.equal(english.units.length, 644)
  assert.equal(english.series.length, 23)
  assert.equal(english.units.filter(unit => unit.seriesId === 'webgl').length, 28)
  assert.deepEqual(Object.keys(read('content/locales/en/webgl.json').units), originals.map(unit => unit.id))
  const paths = ['/docs/labs/graphics/webgl/README.md', ...originals.map(unit => unit.docPath)]
  assert.equal(paths.length, 29)
  let links = 0
  for (const sourcePath of paths) {
    const document = content.documents.get(sourcePath)
    assert.ok(document, sourcePath)
    const base = new URL('..' + document.translatedPath, import.meta.url)
    for (const match of document.text.matchAll(/\]\(([^)]+)\)/g)) {
      links++
      if (/^https?:/.test(match[1])) continue
      assert.ok(fs.existsSync(new URL(match[1], base)), sourcePath + ': ' + match[1])
    }
  }
  assert.equal(links, 258)
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
  assert.deepEqual(api.getCatalog('en').units.map(unit => unit.id).sort(), [...read('content/locales/en/manifest.json').publishedUnitIds].sort())
  for (const unit of api.getCatalog('en').units) {
    const common = api.units.find(item => item.id === unit.id)
    assert.equal(unit.source, common.source)
    assert.ok(unit.source)
    assert.equal(unit.exampleMode, common.exampleMode)
    assert.equal(unit.exampleMode, details[unit.id]?.mode)
    assert.equal(unit.exampleReadingSource, common.exampleReadingSource)
    assert.equal(unit.exampleReadingSource, details[unit.id]?.readingSource)
    assert.equal(unit.exampleFiles, common.exampleFiles)
    if (details[unit.id]) {
      if (/[가-힣]/.test(common.exampleNote)) assert.notEqual(unit.exampleNote, common.exampleNote)
      else assert.equal(unit.exampleNote, common.exampleNote)
    }
    else assert.equal(unit.exampleNote, undefined)
    assert.equal(api.getLocalizedUnit('en', unit.id), unit)
  }
  assert.deepEqual(api.getLocalizedUnit('en', 'javascript-step-02').exampleFiles, ['src/labs/javascript-step-02/fixture.js'])
  for (const id of ['javascript-step-02', 'css-step-04', 'react-step-03', 'gsap-step-02']) {
    assert.equal(api.getLocalizedUnit('en', id).exampleReadingSource, `/examples-en/${id}/example.js`)
  }
  assert.equal(api.getLocalizedUnit('en', 'missing-id'), null)
  assert.equal(api.getLocalizedUnit('ko', 'javascript-01').id, 'javascript-01')
  assert.equal(api.getLocalizedUnit('ko', 'missing-id'), null)
})

import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { mergeTranslation, readEnglishContent, sourceHash } from '../scripts/locale-content.mjs'

const unit = {
  id: 'javascript-step-02', day: 2, title: '입력', prerequisites: '값',
  concepts: [{ title: '변환', explanation: '문자열을 숫자로 바꾼다.' }],
  outcomes: ['타입 확인'], steps: ['실행한다.'], criteria: ['판정한다.'], questions: ['왜?'],
  environment: '브라우저', variables: [{ name: '입력', baseline: '15', change: '0', expected: '0을 허용' }],
  references: [{ title: '공식 문서', url: 'https://example.com/number' }],
}
const values = {
  title: 'Input', prerequisites: 'Values', 'concepts.0.title': 'Conversion',
  'concepts.0.explanation': 'Convert a string to a number.', 'outcomes.0': 'Check types',
  'steps.0': 'Run it.', 'criteria.0': 'Check the result.', 'questions.0': 'Why?',
  environment: 'Browser', 'variables.0.name': 'Input', 'variables.0.baseline': '15',
  'variables.0.change': '0', 'variables.0.expected': 'Accept zero', 'references.0.title': 'Official docs',
}
const record = (source, translated) => ({ sourceHash: sourceHash(source), values: translated })

test('sourceHash sorts object keys, preserves array order and normalizes nested CRLF', () => {
  const expected = createHash('sha256').update('{"a":["one\\ntwo",{"z":"three\\nfour"}],"b":2}').digest('hex')
  assert.equal(sourceHash({ b: 2, a: ['one\r\ntwo', { z: 'three\r\nfour' }] }), expected)
  assert.equal(sourceHash({ a: ['one\ntwo', { z: 'three\nfour' }], b: 2 }), expected)
  assert.notEqual(sourceHash(['a', 'b']), sourceHash(['b', 'a']))
})

test('mergeTranslation translates all prose while retaining identity, URLs, literals and the original', () => {
  const original = structuredClone(unit)
  const result = mergeTranslation(unit, record(unit, values))
  assert.equal(result.title, 'Input')
  assert.equal(result.concepts[0].explanation, 'Convert a string to a number.')
  assert.equal(result.references[0].title, 'Official docs')
  assert.equal(result.references[0].url, 'https://example.com/number')
  assert.equal(result.id, 'javascript-step-02')
  assert.equal(result.day, 2)
  assert.equal(result.variables[0].baseline, '15')
  result.steps.push('Another step')
  assert.deepEqual(unit, original)
})

test('mergeTranslation rejects stale source hashes', () => {
  assert.throws(() => mergeTranslation(unit, { sourceHash: '0'.repeat(64), values }), /hash/i)
})

for (const key of ['id', 'day', 'references.0.url', 'file', 'mode', 'concepts.1.title', '__proto__.title']) {
  test(`mergeTranslation rejects forbidden or out-of-range key ${key}`, () => {
    assert.throws(() => mergeTranslation(unit, record(unit, { ...values, [key]: 'changed' })), /field|key/i)
  })
}

test('mergeTranslation rejects missing prose, empty strings, nested values and extra record fields', () => {
  const missing = { ...values }
  delete missing['concepts.0.explanation']
  assert.throws(() => mergeTranslation(unit, record(unit, missing)), /missing/i)
  for (const value of ['', '  ', ['translated']]) {
    assert.throws(() => mergeTranslation(unit, record(unit, { ...values, title: value })), /string/i)
  }
  assert.throws(() => mergeTranslation(unit, { ...record(unit, values), id: unit.id }), /key|field/i)
})

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'frontory-locale-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const write = (name, data) => {
    fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true })
    fs.writeFileSync(path.join(root, name), JSON.stringify(data))
  }
  const series = { id: 'javascript', title: '자바스크립트', category: 'fundamentals', priority: 5,
    prerequisites: 'HTML', docPath: '/docs/javascript/README.md', stages: ['계산', 'DOM', '모듈', '통합'] }
  const curriculumSeries = { seriesId: 'javascript', goal: '변환을 이해한다.', capstone: '기록장', stages: series.stages }
  const catalog = { series: [series], units: [{ id: unit.id, day: 2, week: 1, title: unit.title,
    goal: '타입 확인', docPath: '/docs/javascript/02/README.md', seriesId: 'javascript' },
  { id: 'javascript-03', day: 3, week: 1, title: '다음', goal: '다음 목표', docPath: '/docs/javascript/03/README.md', seriesId: 'javascript' }] }
  const manifest = { publishedUnitIds: [unit.id] }
  const seriesRecords = { javascript: record({ title: series.title, prerequisites: series.prerequisites },
    { title: 'JavaScript', prerequisites: 'HTML' }) }
  const curriculum = { series: record(curriculumSeries, { goal: 'Understand conversion.', capstone: 'Notebook',
    'stages.0': 'Calculation', 'stages.1': 'DOM', 'stages.2': 'Modules', 'stages.3': 'Integration' }),
  units: { [unit.id]: record(unit, values) } }
  write('src/app/catalog.json', catalog)
  write('content/catalog-v2.json', { series: [{ ...series, stages: ['기초', '실험', '검증'] }], units: [] })
  write('content/curricula/javascript.json', { ...curriculumSeries, units: [unit] })
  write('content/locales/en/manifest.json', manifest)
  write('content/locales/en/series.json', seriesRecords)
  write('content/locales/en/curricula/javascript.json', curriculum)
  return { root, write, manifest, seriesRecords, curriculum, catalog, series }
}

test('reader publishes approved units using curriculum stages independently of legacy metadata', t => {
  const { root } = fixture(t)
  const result = readEnglishContent({ complete: false, root })
  assert.deepEqual(result.publishedUnitIds, [unit.id])
  assert.equal(result.catalog.series[0].title, 'JavaScript')
  assert.deepEqual(result.catalog.units, [{ id: unit.id, day: 2, week: 1, title: 'Input', goal: 'Check types',
    docPath: '/docs/javascript/02/README.md', seriesId: 'javascript' }])
  assert.equal(result.curricula.javascript.units[0].concepts[0].explanation, 'Convert a string to a number.')
  assert.deepEqual(result.documents, new Map())
  assert.deepEqual(result.catalog.series[0].stages, ['Calculation', 'DOM', 'Modules', 'Integration'])
})

test('reader rejects unknown, duplicate and missing approved IDs', t => {
  const { root, write, manifest, curriculum } = fixture(t)
  for (const ids of [['missing-id'], [unit.id, unit.id]]) {
    write('content/locales/en/manifest.json', { publishedUnitIds: ids })
    assert.throws(() => readEnglishContent({ complete: false, root }), /ID|id/)
  }
  write('content/locales/en/manifest.json', manifest)
  delete curriculum.units[unit.id]
  write('content/locales/en/curricula/javascript.json', curriculum)
  assert.throws(() => readEnglishContent({ complete: false, root }), /missing|Missing/)
})

test('reader rejects extra unit IDs, unknown series, unexpected filenames and malformed manifest', t => {
  const { root, write, curriculum } = fixture(t)
  write('content/locales/en/curricula/javascript.json', { ...curriculum, units: { ...curriculum.units, other: record(unit, values) } })
  assert.throws(() => readEnglishContent({ complete: false, root }), /ID|id|key/i)
  write('content/locales/en/curricula/javascript.json', curriculum)
  write('content/locales/en/curricula/other.json', curriculum)
  assert.throws(() => readEnglishContent({ complete: false, root }), /file|series/i)
  fs.unlinkSync(path.join(root, 'content/locales/en/curricula/other.json'))
  write('content/locales/en/series.json', { other: curriculum.series })
  assert.throws(() => readEnglishContent({ complete: false, root }), /series|key/i)
  write('content/locales/en/manifest.json', { publishedUnitIds: [unit.id], surprise: true })
  assert.throws(() => readEnglishContent({ complete: false, root }), /key|field/i)
})

test('reader rejects stale series hashes and changed translation array lengths', t => {
  const { root, write, seriesRecords, curriculum } = fixture(t)
  write('content/locales/en/series.json', { javascript: { ...seriesRecords.javascript, sourceHash: 'stale' } })
  assert.throws(() => readEnglishContent({ complete: false, root }), /hash/i)
  write('content/locales/en/series.json', seriesRecords)
  delete curriculum.series.values['stages.3']
  write('content/locales/en/curricula/javascript.json', curriculum)
  assert.throws(() => readEnglishContent({ complete: false, root }), /missing/i)
})

test('manual document records validate original hashes and return existing English text', t => {
  const { root, write } = fixture(t)
  const source = '# 원문\n내용\n'
  fs.mkdirSync(path.join(root, 'docs/en'), { recursive: true })
  fs.writeFileSync(path.join(root, 'docs/guide.md'), source.replaceAll('\n', '\r\n'))
  fs.writeFileSync(path.join(root, 'docs/en/guide.md'), '# Guide\nContent\n')
  write('content/locales/en/documents.json', {
    '/docs/guide.md': { sourceHash: sourceHash(source), translatedPath: '/docs/en/guide.md' },
  })
  assert.deepEqual(readEnglishContent({ complete: false, root }).documents,
    new Map([['/docs/guide.md', { translatedPath: '/docs/en/guide.md', text: '# Guide\nContent\n' }]]))
})

test('manual documents reject stale hashes, missing files, unknown fields and unsafe paths', t => {
  const { root, write } = fixture(t)
  fs.mkdirSync(path.join(root, 'docs/en'), { recursive: true })
  fs.writeFileSync(path.join(root, 'docs/guide.md'), '# 원문')
  fs.writeFileSync(path.join(root, 'docs/en/guide.md'), '# Guide')
  const valid = { sourceHash: sourceHash('# 원문'), translatedPath: '/docs/en/guide.md' }
  for (const [sourcePath, entry] of [
    ['/docs/guide.md', { ...valid, sourceHash: 'stale' }],
    ['/docs/guide.md', { ...valid, translatedPath: '/docs/en/missing.md' }],
    ['/docs/guide.md', { ...valid, extra: 'bad' }],
    ['/docs/../../outside.md', valid],
    ['/docs/guide.md', { ...valid, translatedPath: '/docs/en/../../outside.md' }],
    ['/docs/missing.md', valid],
  ]) {
    write('content/locales/en/documents.json', { [sourcePath]: entry })
    assert.throws(() => readEnglishContent({ complete: false, root }))
  }
})

test('WebGL translations use baseline metadata and manual unit records without a curriculum', t => {
  const { root, write, catalog, series, manifest, seriesRecords } = fixture(t)
  const webgl = { ...series, id: 'webgl', title: 'WebGL Journey', docPath: '/docs/webgl/README.md' }
  const webglUnit = { id: 'webgl-01', day: 1, week: 1, title: '장면', goal: '그린다.',
    docPath: '/docs/webgl/01.md', seriesId: 'webgl' }
  catalog.series.push(webgl)
  catalog.units.push(webglUnit)
  write('src/app/catalog.json', catalog)
  write('content/catalog-v2.json', { series: [series, webgl], units: [webglUnit] })
  write('content/locales/en/manifest.json', { publishedUnitIds: [...manifest.publishedUnitIds, webglUnit.id] })
  write('content/locales/en/series.json', { ...seriesRecords, webgl: record({ title: webgl.title,
    prerequisites: webgl.prerequisites, stages: webgl.stages }, { title: 'WebGL Journey', prerequisites: 'HTML',
    'stages.0': 'Scene', 'stages.1': 'Shaders', 'stages.2': 'Splats', 'stages.3': 'Integration' }) })
  const records = { units: { [webglUnit.id]: record(webglUnit, { title: 'Scene', goal: 'Draw.' }) } }
  write('content/locales/en/webgl.json', records)
  const result = readEnglishContent({ complete: false, root })
  assert.deepEqual(result.catalog.units.find(item => item.id === webglUnit.id), { ...webglUnit, title: 'Scene', goal: 'Draw.' })
  assert.equal(result.curricula.webgl, undefined)
  records.units['webgl-unknown'] = records.units[webglUnit.id]
  write('content/locales/en/webgl.json', records)
  assert.throws(() => readEnglishContent({ complete: false, root }), /key|ID|id/)
})

test('complete mode refuses a partial archive instead of claiming 23 series and 644 units', t => {
  const { root } = fixture(t)
  assert.throws(() => readEnglishContent({ complete: true, root }), /23|644|complete/i)
})

test('complete mode accepts 23 translated series and 644 units only with all required manual documents', t => {
  const { root, write, series, curriculum } = fixture(t)
  fs.unlinkSync(path.join(root, 'content/locales/en/curricula/javascript.json'))
  const catalog = { series: [], units: [] }
  const baseline = { series: [], units: [] }
  const metadata = {}
  const documents = {}
  for (let index = 0; index < 23; index++) {
    const id = index === 0 ? 'webgl' : `series-${index}`
    const entry = { ...series, id, docPath: `/docs/${id}/README.md` }
    catalog.series.push(entry)
    baseline.series.push(entry)
    const fields = { title: 'English Series', prerequisites: 'HTML' }
    const source = { title: entry.title, prerequisites: entry.prerequisites }
    if (id === 'webgl') {
      source.stages = entry.stages
      Object.assign(fields, { 'stages.0': 'Calculation', 'stages.1': 'DOM', 'stages.2': 'Modules', 'stages.3': 'Integration' })
    }
    metadata[id] = record(source, fields)
    const sourceUnits = []
    const records = {}
    for (let day = 1; day <= 28; day++) {
      const unitId = `${id}-${day}`
      const catalogUnit = { id: unitId, day, week: Math.ceil(day / 7), title: '입력', goal: '타입 확인',
        docPath: `/docs/${id}/${day}.md`, seriesId: id }
      catalog.units.push(catalogUnit)
      if (id === 'webgl') {
        baseline.units.push(catalogUnit)
        records[unitId] = record(catalogUnit, { title: 'Input', goal: 'Check types' })
      } else {
        const sourceUnit = { ...unit, id: unitId, day }
        sourceUnits.push(sourceUnit)
        records[unitId] = record(sourceUnit, values)
      }
    }
    if (id === 'webgl') write('content/locales/en/webgl.json', { units: records })
    else {
      const sourceSeries = { seriesId: id, stages: series.stages, goal: '변환을 이해한다.', capstone: '기록장' }
      write(`content/curricula/${id}.json`, { ...sourceSeries, units: sourceUnits })
      write(`content/locales/en/curricula/${id}.json`, { series: record(sourceSeries, curriculum.series.values), units: records })
    }
  }
  write('src/app/catalog.json', catalog)
  write('content/catalog-v2.json', baseline)
  write('content/locales/en/series.json', metadata)
  write('content/locales/en/manifest.json', { publishedUnitIds: catalog.units.map(item => item.id) })
  const required = ['/docs/about.md', '/docs/privacy.md', '/docs/learning-workspace.md', '/docs/roadmap.md',
    '/docs/examples.md', '/docs/labs/README.md', '/docs/webgl/README.md', ...baseline.units.map(item => item.docPath)]
  for (const docPath of required) {
    const translatedPath = '/docs/en/' + docPath.slice(6)
    for (const [file, text] of [[docPath, '# 원문'], [translatedPath, '# English']]) {
      fs.mkdirSync(path.dirname(path.join(root, file.slice(1))), { recursive: true })
      fs.writeFileSync(path.join(root, file.slice(1)), text)
    }
    documents[docPath] = { sourceHash: sourceHash('# 원문'), translatedPath }
  }
  write('content/locales/en/documents.json', documents)
  const result = readEnglishContent({ complete: true, root })
  assert.equal(result.catalog.series.length, 23)
  assert.equal(result.catalog.units.length, 644)
  assert.equal(result.documents.size, 35)
  for (const docPath of ['/docs/about.md', '/docs/webgl/README.md', '/docs/webgl/28.md']) {
    const missing = { ...documents }
    delete missing[docPath]
    write('content/locales/en/documents.json', missing)
    assert.throws(() => readEnglishContent({ complete: true, root }), /Missing complete document/)
  }
})

test('actual English content publishes exactly four representative lessons with complete prose and unchanged fixtures', () => {
  const ids = ['javascript-step-02', 'css-step-04', 'react-step-03', 'gsap-step-02']
  const result = readEnglishContent()
  assert.deepEqual(result.publishedUnitIds, ids)
  assert.equal(result.catalog.units.length, 4)
  for (const [index, seriesId] of ['javascript', 'css', 'react', 'gsap'].entries()) {
    const source = JSON.parse(fs.readFileSync(new URL(`../content/curricula/${seriesId}.json`, import.meta.url)))
    const original = source.units.find(unit => unit.id === ids[index])
    const translated = result.curricula[seriesId].units[0]
    assert.equal(translated.id, original.id)
    assert.equal(translated.day, original.day)
    assert.deepEqual(translated.references.map(ref => ref.url), original.references.map(ref => ref.url))
    const codeBlocks = lesson => lesson.concepts.flatMap(concept =>
      [...concept.explanation.matchAll(/\x60\x60\x60[\s\S]*?\x60\x60\x60/g)].map(match => match[0]))
    assert.deepEqual(codeBlocks(translated), codeBlocks(original))
    const noteSource = JSON.parse(fs.readFileSync(new URL(`../content/examples/${seriesId}.json`, import.meta.url)))[original.id]
    const note = JSON.parse(fs.readFileSync(new URL(`../content/locales/en/examples/${seriesId}.json`, import.meta.url)))[original.id]
    assert.equal(note.sourceHash, sourceHash(noteSource))
    assert.deepEqual(Object.keys(note.values), ['note'])
    assert.ok(note.values.note.trim())
    assert.doesNotMatch(note.values.note, /[가-힣]/)
    const proseWithoutCode = JSON.stringify(translated).replace(/\x60\x60\x60[\s\S]*?\x60\x60\x60/g, '')
    assert.doesNotMatch(proseWithoutCode, /[가-힣]/)
    assert.equal(result.curricula[seriesId].stages.length, source.stages.length)
  }
  assert.match(result.curricula.javascript.units[0].concepts[1].explanation, /Number\.isFinite\(value\)/)
  assert.match(result.curricula.css.units[0].concepts[0].explanation, /244px/)
  assert.match(result.curricula.css.units[0].concepts[1].explanation, /156px/)
  assert.match(result.curricula.react.units[0].concepts[2].explanation, /setCount\(1\)/)
  assert.match(result.curricula.react.units[0].concepts[3].explanation, /0.*1.*2.*3/)
  assert.match(result.curricula.gsap.units[0].concepts[4].explanation, /to=140, from=-20, fromTo=80/)
})

test('reader rejects malformed curriculum stages without depending on legacy stage count', t => {
  const { root, write } = fixture(t)
  const original = JSON.parse(fs.readFileSync(path.join(root, 'content/curricula/javascript.json')))
  for (const stages of [null, {}, [], [3], [' ']]) {
    write('content/curricula/javascript.json', { ...original, stages })
    assert.throws(() => readEnglishContent({ root }), /Invalid source series/)
  }
})

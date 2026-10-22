import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
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

for (const [name, change] of [
  ['concept insertion', source => source.concepts.unshift({ title: '추가', explanation: '새 개념' })],
  ['concept reorder', source => source.concepts.reverse()],
  ['concept wording', source => { source.concepts[0].explanation += ' 변경' }],
  ['reference URL', source => { source.references[0].url += '?revision=2' }],
]) {
  test(`source change requires translation review: ${name}`, () => {
    const source = structuredClone(unit)
    source.concepts.push({ title: '둘째', explanation: '다른 개념' })
    const approved = record(source, { ...values, 'concepts.1.title': 'Second', 'concepts.1.explanation': 'Another concept' })
    change(source)
    assert.throws(() => mergeTranslation(source, approved), /Stale source hash/)
  })
}

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
  assert.throws(() => readEnglishContent({ complete: true, root }), error => {
    assert.match(error.message, /23.*644/)
    assert.match(error.message, /Missing approved unit IDs: javascript-03/)
    return true
  })
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
    const examples = {}
    const englishExamples = {}
    const records = {}
    for (let day = 1; day <= 28; day++) {
      const unitId = `${id}-${day}`
      const catalogUnit = { id: unitId, day, week: Math.ceil(day / 7), title: '입력', goal: '타입 확인',
        docPath: `/docs/${id}/${day}.md`, seriesId: id }
      catalog.units.push(catalogUnit)
      const examplePath = `src/labs/${unitId}/example.js`
      fs.mkdirSync(path.dirname(path.join(root, examplePath)), { recursive: true })
      fs.writeFileSync(path.join(root, examplePath), 'export function mount() {}')
      if (unitId !== 'webgl-1') {
        examples[unitId] = { mode: 'browser', note: '기준 15' }
        englishExamples[unitId] = record(examples[unitId], { note: 'Baseline 15' })
      }
      if (id === 'webgl') {
        baseline.units.push(catalogUnit)
        records[unitId] = record(catalogUnit, { title: 'Input', goal: 'Check types' })
      } else {
        const sourceUnit = { ...unit, id: unitId, day }
        sourceUnits.push(sourceUnit)
        records[unitId] = record(sourceUnit, values)
      }
    }
    write(`content/examples/${id}.json`, examples)
    write(`content/locales/en/examples/${id}.json`, englishExamples)
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
  const legacyRow = '| webgl | [1. Scene](webgl/1.md) | [webgl-1](../src/labs/webgl-1/example.js) — Run the scene. |'
  for (const docPath of required) {
    const original = docPath === '/docs/examples.md' ? legacyRow : '# 원문'
    const english = docPath === '/docs/examples.md' ? legacyRow.replace('(webgl/1.md)', '(../webgl/1.md)').replace('(../src/', '(../../src/') : '# English'
    const translatedPath = '/docs/en/' + docPath.slice(6)
    for (const [file, text] of [[docPath, original], [translatedPath, english]]) {
      fs.mkdirSync(path.dirname(path.join(root, file.slice(1))), { recursive: true })
      fs.writeFileSync(path.join(root, file.slice(1)), text)
    }
    documents[docPath] = { sourceHash: sourceHash(original), translatedPath }
  }
  write('content/locales/en/documents.json', documents)
  const result = readEnglishContent({ complete: true, root })
  assert.equal(result.catalog.series.length, 23)
  assert.equal(result.catalog.units.length, 644)
  assert.equal(result.documents.size, 35)
  const guidePath = path.join(root, 'docs/en/examples.md')
  const guide = fs.readFileSync(guidePath, 'utf8')
  for (const broken of [guide.replace('webgl-1/example.js', 'wrong/example.js'),
    guide.replace('../webgl/1.md', '../webgl/2.md'), guide.replace('Run the scene.', '')]) {
    fs.writeFileSync(guidePath, broken)
    assert.throws(() => readEnglishContent({ complete: true, root }), /Missing complete example guidance: webgl-1/)
  }
  fs.writeFileSync(guidePath, guide)
  const exampleFile = 'content/locales/en/examples/series-1.json'
  const examples = JSON.parse(fs.readFileSync(path.join(root, exampleFile)))
  const missingExamples = { ...examples }
  delete missingExamples['series-1-1']
  write(exampleFile, missingExamples)
  assert.throws(() => readEnglishContent({ complete: true, root }), /Missing key examples.series-1.series-1-1/)
  write(exampleFile, examples)
  fs.unlinkSync(path.join(root, 'src/labs/webgl-1/example.js'))
  assert.throws(() => readEnglishContent({ complete: true, root }), /Missing complete example source: webgl-1/)
  fs.writeFileSync(path.join(root, 'src/labs/webgl-1/example.js'), 'export function mount() {}')
  for (const docPath of ['/docs/about.md', '/docs/webgl/README.md', '/docs/webgl/28.md']) {
    const missing = { ...documents }
    delete missing[docPath]
    write('content/locales/en/documents.json', missing)
    assert.throws(() => readEnglishContent({ complete: true, root }), /Missing complete document/)
  }
})

test('actual English content publishes exactly the approved lessons with complete prose and unchanged fixtures', () => {
  const { publishedUnitIds: ids } = JSON.parse(fs.readFileSync(new URL('../content/locales/en/manifest.json', import.meta.url)))
  const result = readEnglishContent()
  assert.deepEqual(result.publishedUnitIds, ids)
  assert.deepEqual(result.catalog.units.map(unit => unit.id).sort(), [...ids].sort())
  for (const id of ids) {
    const { seriesId } = result.catalog.units.find(unit => unit.id === id)
    const source = JSON.parse(fs.readFileSync(new URL(`../content/curricula/${seriesId}.json`, import.meta.url)))
    const original = source.units.find(unit => unit.id === id)
    const translated = result.curricula[seriesId].units.find(unit => unit.id === id)
    assert.equal(translated.id, original.id)
    assert.equal(translated.day, original.day)
    assert.deepEqual(translated.references.map(ref => ref.url), original.references.map(ref => ref.url))
    const codeBlocks = lesson => lesson.concepts.flatMap(concept =>
      [...concept.explanation.matchAll(/\x60\x60\x60[\s\S]*?\x60\x60\x60/g)].map(match => match[0]))
    assert.deepEqual(codeBlocks(translated), codeBlocks(original))
    const noteSource = JSON.parse(fs.readFileSync(new URL(`../content/examples/${seriesId}.json`, import.meta.url)))[original.id]
    const note = JSON.parse(fs.readFileSync(new URL(`../content/locales/en/examples/${seriesId}.json`, import.meta.url)))[original.id]
    if (noteSource) {
      assert.equal(note.sourceHash, sourceHash(noteSource))
      assert.deepEqual(Object.keys(note.values), ['note'])
      assert.ok(note.values.note.trim())
      assert.doesNotMatch(note.values.note, /[가-힣]/)
    } else {
      assert.equal(note, undefined)
      const legacy = JSON.parse(fs.readFileSync(new URL('../content/catalog-v2.json', import.meta.url))).units.find(unit => unit.id === id)
      assert.ok(legacy, id + ': legacy guidance required')
      const guide = result.documents.get('/docs/examples.md').text
      const row = guide.split('\n').find(line => line.includes('/' + id + '/example.js)'))
      assert.ok(row, id + ': legacy source link')
      const documentLinks = [...row.matchAll(/\]\(([^)]+)\)/g)].map(match => path.posix.resolve('/docs/en', match[1]))
      assert.ok(documentLinks.includes(legacy.docPath) || documentLinks.includes('/docs/en/' + legacy.docPath.slice(6)), id + ': legacy lesson link')
      assert.match(row, / — \S/)
    }
    let proseWithoutCode = JSON.stringify(translated).replace(/\x60\x60\x60[\s\S]*?\x60\x60\x60/g, '')
    if (id === 'javascript-step-11') {
      const fixture = '<strong>실험</strong>'
      const originalCount = JSON.stringify(original).split(fixture).length - 1
      assert.equal(originalCount, 2)
      assert.equal(proseWithoutCode.split(fixture).length - 1, originalCount)
      proseWithoutCode = proseWithoutCode.replaceAll(fixture, '')
    }
    if (id === 'react-step-07') {
      const fixture = '새 카드'
      assert.equal(original.variables[0].change, fixture)
      assert.equal(translated.variables[0].change, fixture)
      assert.equal(proseWithoutCode.split(fixture).length - 1, 1)
      proseWithoutCode = proseWithoutCode.replace(fixture, '')
    }
    if (id === 'svelte-step-02') {
      const fixture = '<b>메모</b>'
      assert.equal(original.steps[1], "제목에 '<b>메모</b>' 문자열을 넣고 텍스트로 표시하세요.")
      assert.equal(translated.steps[1], "Set the title to the string '<b>메모</b>' and display it as text.")
      assert.equal(proseWithoutCode.split(fixture).length - 1, 1)
      proseWithoutCode = proseWithoutCode.replace(fixture, '')
    }
    if (id === 'svelte-step-07') {
      const fixture = '새 카드'
      assert.equal(original.variables[0].change, fixture)
      assert.equal(original.variables[0].expected, '공백은 거절하고 새 카드는 한 번 추가한다.')
      assert.equal(translated.variables[0].change, fixture)
      assert.equal(translated.variables[0].expected, 'Reject whitespace and add 새 카드 once.')
      assert.equal(proseWithoutCode.split(fixture).length - 1, 2)
      proseWithoutCode = proseWithoutCode.replaceAll(fixture, '')
    }
    if (id === 'canvas-2d-step-07') {
      const fixture = '가나'
      assert.equal(original.variables[0].baseline, fixture)
      assert.equal(original.variables[0].change, 'WWW iii')
      assert.equal(original.steps[2], '입력 조건 가나에서 출력을 저장한 뒤 WWW iii 조건으로 다시 실행하세요. 예상: 문자 수가 비슷해도 배지 폭은 실제 글리프 폭에 따라 달라집니다. 실제 화면·로그와 대조하고 day-07-notes.md에 실제 결과와 차이의 원인을 남기세요.')
      assert.equal(translated.variables[0].baseline, fixture)
      assert.equal(translated.variables[0].change, 'WWW iii')
      assert.equal(translated.steps[2], 'Save the output with the input condition 가나, then run again with WWW iii. Expected: Even with similar character counts, badge width varies with actual glyph widths. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-07-notes.md.')
      assert.equal(proseWithoutCode.split(fixture).length - 1, 2)
      proseWithoutCode = proseWithoutCode.replaceAll(fixture, '')
    }
    assert.doesNotMatch(proseWithoutCode, /[가-힣]/)
    assert.equal(result.curricula[seriesId].stages.length, source.stages.length)
  }
  assert.match(result.curricula.javascript.units.find(unit => unit.id === 'javascript-step-02').concepts[1].explanation, /Number\.isFinite\(value\)/)
  assert.match(result.curricula.css.units.find(unit => unit.id === 'css-step-04').concepts[0].explanation, /244px/)
  assert.match(result.curricula.css.units.find(unit => unit.id === 'css-step-04').concepts[1].explanation, /156px/)
  assert.match(result.curricula.react.units.find(unit => unit.id === 'react-step-03').concepts[2].explanation, /setCount\(1\)/)
  assert.match(result.curricula.react.units.find(unit => unit.id === 'react-step-03').concepts[3].explanation, /0.*1.*2.*3/)
  assert.match(result.curricula.gsap.units.find(unit => unit.id === 'gsap-step-02').concepts[4].explanation, /to=140, from=-20, fromTo=80/)
})

test('reader rejects malformed curriculum stages without depending on legacy stage count', t => {
  const { root, write } = fixture(t)
  const original = JSON.parse(fs.readFileSync(path.join(root, 'content/curricula/javascript.json')))
  for (const stages of [null, {}, [], [3], [' ']]) {
    write('content/curricula/javascript.json', { ...original, stages })
    assert.throws(() => readEnglishContent({ root }), /Invalid source series/)
  }
})

for (const file of ['about.md', 'privacy.md', 'learning-workspace.md', 'roadmap.md', 'examples.md', 'labs/README.md']) {
  test(`actual English guide ${file} exists, is fresh and preserves link destinations`, () => {
    const originalPath = `/docs/${file}`
    const result = readEnglishContent()
    const entry = result.documents.get(originalPath)
    assert.ok(entry, `Missing English guide: ${originalPath}`)
    assert.equal(entry.translatedPath, `/docs/en/${file}`)
    const original = fs.readFileSync(new URL(`../docs/${file}`, import.meta.url), 'utf8')
    const records = JSON.parse(fs.readFileSync(new URL('../content/locales/en/documents.json', import.meta.url)))
    assert.equal(records[originalPath].sourceHash, sourceHash(original))
    assert.doesNotMatch(entry.text, /[가-힣]/)
    const links = text => [...text.matchAll(/\]\(([^)]+)\)/g)].map(match => match[1])
    const sourceLinks = links(original).map(link => {
      if (/^(https?:|mailto:)/.test(link)) return link
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(originalPath), link))
      const englishPath = `/docs/en/${resolved.slice(6)}`
      return resolved.startsWith('/docs/') && fs.existsSync(new URL(`..${englishPath}`, import.meta.url))
        ? englishPath : resolved
    })
    const translatedLinks = links(entry.text).map(link => /^(https?:|mailto:)/.test(link) ? link
      : path.posix.normalize(path.posix.join(path.posix.dirname(entry.translatedPath), link)))
    assert.deepEqual(translatedLinks, sourceLinks)
    for (const match of entry.text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
      if (/^(https?:|mailto:)/.test(match[2])) continue
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(entry.translatedPath), match[2]))
      assert.ok(fs.existsSync(new URL(`..${target}`, import.meta.url)), `Missing link: ${target}`)
      if (target.startsWith('/docs/') && !target.startsWith('/docs/en/')) assert.match(match[1], /\(Korean\)$/)
    }
    if (['about.md', 'privacy.md'].includes(file)) {
      assert.match(entry.text, /hefa91@gmail\.com/)
      assert.match(entry.text, /after (?:the )?site approval/)
    }
    if (file === 'examples.md') assert.equal(entry.text.split('\n').filter(line => /^\| [a-z]/.test(line)).length, 94)
  })
}

test('English service and workspace guides retain contact, approval status and backup limits', () => {
  const documents = readEnglishContent().documents
  const privacy = documents.get('/docs/privacy.md').text
  assert.match(privacy, /Last updated: 2026-10-22/)
  assert.match(privacy, /preparing to request a Google AdSense review/)
  assert.match(privacy, /AdSense execution scripts are not included/)
  assert.match(privacy, /no feature that sends edited code, Markdown notes, or JSON backup contents in analytics events/)
  const workspace = documents.get('/docs/learning-workspace.md').text
  for (const value of ['600ms', '1100px', '644', '550', '94', '28', '10 MiB',
    'format: "frontory"', 'version: 3', 'version: 2', 'format: "web-gl-study"', 'version: 1',
    'web-gl-study:all:v1', 'web-gl-study:unit:v1:', ': StudyContext', 'sandbox=allow-scripts']) {
    assert.ok(workspace.includes(value), `Missing workspace contract: ${value}`)
  }
  const examples = documents.get('/docs/examples.md').text
  for (const command of ['node src/labs/webassembly-03/benchmark.mjs', 'npm init -y',
    'npm install -D @playwright/test', 'npx playwright install chromium', 'FRONTORY_TEST_ORIGIN',
    'npx playwright test lesson.spec.mjs', '--update-snapshots']) assert.ok(examples.includes(command), command)
  assert.match(examples, /1 MiB and 512 splats/)
  assert.match(examples, /does not mean E2E tests have passed/)
})

test('reader validates required example notes against whole metadata and only translates note', t => {
  const { root, write } = fixture(t)
  const metadata = { mode: 'external', note: '별도 실행', files: ['src/labs/example/test.mjs'] }
  const translated = record(metadata, { note: 'Run separately.' })
  write('content/examples/javascript.json', { [unit.id]: metadata })
  assert.throws(() => readEnglishContent({ root }), /example|note|ENOENT/i)
  write('content/locales/en/examples/javascript.json', { [unit.id]: translated })
  assert.deepEqual(readEnglishContent({ root }).exampleNotes, { [unit.id]: 'Run separately.' })
  write('content/examples/javascript.json', { [unit.id]: { ...metadata, mode: 'browser' } })
  assert.throws(() => readEnglishContent({ root }), /hash/i)
  write('content/examples/javascript.json', { [unit.id]: metadata })
  for (const invalid of [
    { ...translated, sourceHash: sourceHash(metadata.note) },
    { ...translated, values: { note: 'Run.', mode: 'browser' } },
    { ...translated, values: {} },
    { ...translated, values: { note: ' ' } },
    { ...translated, extra: true },
  ]) {
    write('content/locales/en/examples/javascript.json', { [unit.id]: invalid })
    assert.throws(() => readEnglishContent({ root }), /hash|key|string/i)
  }
  write('content/locales/en/examples/javascript.json', { [unit.id]: translated, unknown: translated })
  assert.throws(() => readEnglishContent({ root }), /key/i)
  write('content/locales/en/examples/javascript.json', { [unit.id]: translated })
  write('content/locales/en/examples/other.json', {})
  assert.throws(() => readEnglishContent({ root }), /file/i)
})

test('reader validates independent presentation hashes, exact flat keys and reading-source availability', t => {
  const { root, write } = fixture(t)
  const source = { messages: { run: '실행' }, comments: { title: '입력' } }
  const metadata = { mode: 'browser', note: '실험', readingSource: '/examples-en/javascript-step-02/example.js' }
  const translated = { ...record(metadata, { note: 'Experiment' }), presentation: record(source, { 'messages.run': 'Run', 'comments.title': 'Input' }) }
  write('content/example-presentations.json', { [unit.id]: source })
  write('content/examples/javascript.json', { [unit.id]: metadata })
  write('content/locales/en/examples/javascript.json', { [unit.id]: translated })
  assert.throws(() => readEnglishContent({ root }), /reading|ENOENT/i)
  fs.mkdirSync(path.join(root, 'public/examples-en/javascript-step-02'), { recursive: true })
  fs.writeFileSync(path.join(root, 'public/examples-en/javascript-step-02/example.js'), '// Input\n')
  assert.deepEqual(readEnglishContent({ root }).examplePresentations[unit.id], { messages: { run: 'Run' }, comments: { title: 'Input' } })
  for (const presentation of [
    { ...translated.presentation, sourceHash: 'stale' },
    record(source, { 'messages.run': 'Run' }),
    record(source, { ...translated.presentation.values, 'messages.other': 'Other' }),
    record(source, { messages: { run: 'Run' }, comments: { title: 'Input' } }),
    record(source, { ...translated.presentation.values, 'comments.title': '' }),
    { ...translated.presentation, other: 'extra' },
  ]) {
    write('content/locales/en/examples/javascript.json', { [unit.id]: { ...translated, presentation } })
    assert.throws(() => readEnglishContent({ root }), /presentation|hash|string|key/i)
  }
  write('content/locales/en/examples/javascript.json', { [unit.id]: record(metadata, { note: 'Experiment' }) })
  assert.throws(() => readEnglishContent({ root }), /presentation|key/i)
  const wrong = { ...metadata, readingSource: '/examples-en/another/example.js' }
  write('content/examples/javascript.json', { [unit.id]: wrong })
  write('content/locales/en/examples/javascript.json', { [unit.id]: { ...translated, sourceHash: sourceHash(wrong) } })
  assert.throws(() => readEnglishContent({ root }), /reading/i)
})

test('reader reports numeric and code evidence independently of fresh hashes without changing source', t => {
  const { root, write, curriculum } = fixture(t)
  const source = JSON.parse(fs.readFileSync(path.join(root, 'content/curricula/javascript.json')))
  source.units[0].concepts[0].explanation = '값 15: `Number("15")`\n```js\nconst value = 15\n```'
  curriculum.units[unit.id] = record(source.units[0], { ...values,
    'concepts.0.explanation': 'Value 16: `Number("16")`\n```js\nconst value = 16\n```' })
  write('content/curricula/javascript.json', source)
  write('content/locales/en/curricula/javascript.json', curriculum)
  const before = structuredClone(curriculum)
  const review = []
  readEnglishContent({ root, review })
  assert.deepEqual(review.find(item => item.location === `unit:${unit.id}.concepts.0.explanation` && item.kind === 'numbers'), {
    location: `unit:${unit.id}.concepts.0.explanation`, kind: 'numbers', source: ['15', '15', '15'],
    translated: ['16', '16', '16'], matches: false,
  })
  const code = review.find(item => item.location === `unit:${unit.id}.concepts.0.explanation` && item.kind === 'code')
  assert.deepEqual(code.source, ['`Number("15")`', '```js\nconst value = 15\n```'])
  assert.deepEqual(code.translated, ['`Number("16")`', '```js\nconst value = 16\n```'])
  assert.equal(code.matches, false)
  assert.ok(review.some(item => item.kind === 'numbers' && item.matches))
  assert.deepEqual(curriculum, before)
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'content/curricula/javascript.json'))), source)
})

test('reader identifies missing English manuscripts by filename', t => {
  const { root } = fixture(t)
  fs.unlinkSync(path.join(root, 'content/locales/en/curricula/javascript.json'))
  assert.throws(() => readEnglishContent({ root }), error => error.path === path.join(root, 'content/locales/en/curricula/javascript.json'))
})

test('translation CLI emits review evidence and fails complete with missing IDs', () => {
  const script = fileURLToPath(new URL('../scripts/check-translations.mjs', import.meta.url))
  const partial = spawnSync(process.execPath, [script], { encoding: 'utf8' })
  assert.equal(partial.status, 0, partial.stderr)
  const report = JSON.parse(partial.stdout)
  const manifest = JSON.parse(fs.readFileSync(new URL('../content/locales/en/manifest.json', import.meta.url)))
  assert.equal(report.publishedUnits, manifest.publishedUnitIds.length)
  assert.ok(report.review.some(item => item.kind === 'numbers' && item.source.includes('244')))
  assert.match(report.reviewNotice, /human review/i)
  const complete = spawnSync(process.execPath, [script, '--complete'], { encoding: 'utf8' })
  assert.equal(complete.status, 1)
  assert.match(complete.stderr, /Missing approved unit IDs:/)
  assert.match(complete.stderr, /01-scene/)
  assert.doesNotMatch(complete.stderr, /at readEnglishContent/)
  const unknown = spawnSync(process.execPath, [script, '--typo'], { encoding: 'utf8' })
  assert.equal(unknown.status, 1)
  assert.match(unknown.stderr, /Unknown argument/)
})

test('review evidence includes example notes, runtime presentation and manual documents', t => {
  const { root, write } = fixture(t)
  const metadata = { mode: 'browser', note: '입력 10' }
  const presentation = { messages: { run: '실행 20' }, comments: {} }
  write('content/examples/javascript.json', { [unit.id]: metadata })
  write('content/example-presentations.json', { [unit.id]: presentation })
  write('content/locales/en/examples/javascript.json', { [unit.id]: {
    ...record(metadata, { note: 'Input 11' }),
    presentation: record(presentation, { 'messages.run': 'Run 21' }),
  } })
  fs.mkdirSync(path.join(root, 'docs/en'), { recursive: true })
  fs.writeFileSync(path.join(root, 'docs/guide.md'), '값 30: `run(30)`')
  fs.writeFileSync(path.join(root, 'docs/en/guide.md'), 'Value 31: `run(31)`')
  write('content/locales/en/documents.json', { '/docs/guide.md': {
    sourceHash: sourceHash('값 30: `run(30)`'), translatedPath: '/docs/en/guide.md',
  } })
  const review = []
  const normal = readEnglishContent({ root })
  assert.deepEqual(readEnglishContent({ root, review }), normal)
  for (const [location, original, translated] of [
    [`example:${unit.id}.note`, '10', '11'],
    [`presentation:${unit.id}.messages.run`, '20', '21'],
    ['document:/docs/guide.md', '30', '31'],
  ]) {
    const entry = review.find(item => item.location === location && item.kind === 'numbers')
    assert.equal(entry.source[0], original)
    assert.equal(entry.translated[0], translated)
    assert.equal(entry.matches, false)
  }
  assert.deepEqual(review.find(item => item.location === 'document:/docs/guide.md' && item.kind === 'code'), {
    location: 'document:/docs/guide.md', kind: 'code', source: ['`run(30)`'], translated: ['`run(31)`'], matches: false,
  })
})

test('reader rejects missing source execution prose even when its new hash is approved', t => {
  const { root, write } = fixture(t)
  for (const note of [undefined, '', ' ']) {
    const metadata = { mode: 'browser', ...(note === undefined ? {} : { note }) }
    write('content/examples/javascript.json', { [unit.id]: metadata })
    write('content/locales/en/examples/javascript.json', { [unit.id]: record(metadata, { note: 'Run it.' }) })
    assert.throws(() => readEnglishContent({ root }), /Expected nonempty source note/)
  }
})

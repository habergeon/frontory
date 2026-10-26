import { assertGeneratedSemantics } from '../scripts/generated-source-semantics.mjs'
import { parsers } from 'prettier/plugins/babel'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { transformSync } from 'esbuild'
import * as helper from '../scripts/example-presentation.mjs'
import { formatGeneratedText } from '../scripts/format-generated.mjs'
import { sourceHash } from '../scripts/locale-content.mjs'

const original = { messages: { title: '실험' }, comments: { intro: '설명' } }
const english = { messages: { title: 'Experiment' }, comments: { intro: 'Explanation' } }
function fixture(t, id, seriesId) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'example-helper-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const json = (file, value) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    fs.writeFileSync(path.join(root, file), JSON.stringify(value))
  }
  json('src/app/catalog.json', { units: [{ id, seriesId }] })
  json('content/example-presentations.json', { [id]: original })
  json(`content/locales/en/examples/${seriesId}.json`, { [id]: { presentation: {
    sourceHash: sourceHash(original), values: { 'messages.title': 'Experiment', 'comments.intro': 'Explanation' },
  } } })
  return { root, json }
}

for (const [id, seriesId] of [['javascript-01', 'javascript'], ['01-scene', 'webgl']]) {
  test(`${id}: catalog lookup and explicit dictionary marker preserve async context and duplicate fixture strings`, async t => {
    const { root } = fixture(t, id, seriesId)
    const input = `// 설명\nconst fixture='실험';\nconst nested="self.postMessage('실험 // fixture')";\nexport async function mount(context) {\nconst {locale='ko', THREE, host}=context;\n/* EXAMPLE_MESSAGES */\nreturn {title:messages.title, fixture, nested, THREE, host};\n}\n`
    const result = await helper.localizeExampleSource(id, input, {}, { root, messagesMarker: '/* EXAMPLE_MESSAGES */' })
    assert.equal(result.readingSource, `/examples-en/${id}/example.js`)
    assert.ok(result.source.includes("export async function mount(context)"))
    const run = async (source, locale) => (await import('data:text/javascript,' + encodeURIComponent(source))).mount({ locale, THREE: 17, host: 'host' })
    assert.deepEqual(await run(result.source, 'en'), { title: 'Experiment', fixture: '실험', nested: "self.postMessage('실험 // fixture')", THREE: 17, host: 'host' })
    assert.equal((await run(result.source, 'ko')).title, '실험')
    const reading = fs.readFileSync(path.join(root, 'public', result.readingSource), 'utf8')
    assert.equal(reading.replace('// Explanation', '// 설명'), await formatGeneratedText('example.js', result.source))
    assert.equal(transformSync(reading).code, transformSync(await formatGeneratedText("example.js", result.source)).code)
    for (const bad of [input.replace('/* EXAMPLE_MESSAGES */', ''), input + '\n/* EXAMPLE_MESSAGES */']) {
      await assert.rejects(() => helper.localizeExampleSource(id, bad, {}, { root, messagesMarker: '/* EXAMPLE_MESSAGES */' }), /message.*marker/i)
    }
  })
}

test('partial sources stay unchanged and presented unknown IDs or implicit non-pilot bindings fail', async t => {
  const { root, json } = fixture(t, 'javascript-01', 'javascript')
  assert.deepEqual(await helper.localizeExampleSource('javascript-02', 'unchanged', {}, { root }), { source: 'unchanged' })
  await assert.rejects(() => helper.localizeExampleSource('javascript-01', 'export async function mount(context) {}', {}, { root }), /explicit.*marker/i)
  json('src/app/catalog.json', { units: [] })
  await assert.rejects(() => helper.localizeExampleSource('javascript-01', 'source', {}, { root }), /unknown.*id/i)
})

test('manual reading conversion changes only approved line and inline spans, never comment-like literals', async t => {
  const { root } = fixture(t, 'javascript-01', 'javascript')
  const source = '// 설명\r\n  // 들여쓰기\r\nconst fixture="// 설명 /* 설명 */"; const value=3 // 같은 줄\r\nconst nested="self.postMessage(\'한글 café 日本語\')";\r\n'
  const from = { messages: {}, comments: { intro: '설명', indent: '들여쓰기', inline: '같은 줄' } }
  const to = { messages: {}, comments: { intro: 'Explanation', indent: 'Indented', inline: 'Inline' } }
  const line = 'const fixture="// 설명 /* 설명 */"; const value=3 // 같은 줄'
  const locations = { inline: { line, column: line.lastIndexOf('//'), kind: 'line' } }
  const reading = helper.translateExampleComments('javascript-01', source, from, to, locations)
  const expected = '// Explanation\r\n  // Indented\r\nconst fixture="// 설명 /* 설명 */"; const value=3 // Inline\r\nconst nested="self.postMessage(\'한글 café 日本語\')";\r\n'
  assert.equal(reading, expected)
  assert.equal(transformSync(reading).code, transformSync(source).code)
  assert.equal(reading.replace('// Explanation', '// 설명').replace('// Indented', '// 들여쓰기').replace('// Inline', '// 같은 줄'), source)
  assert.equal(await helper.writeEnglishReadingSource('javascript-01', source, from, to, { root, commentLocations: locations }), '/examples-en/javascript-01/example.js')
  assert.equal(fs.readFileSync(path.join(root, 'public/examples-en/javascript-01/example.js'), 'utf8'), await formatGeneratedText('example.js', expected))
  assert.throws(() => helper.translateExampleComments('x', source, from, to), /Missing source comment/)
  assert.throws(() => helper.translateExampleComments('x', source + '// 설명\n', from, to, locations), /Ambiguous source comment/)
  assert.throws(() => helper.translateExampleComments('x', source, from, to, { inline: { line, kind: 'line' } }), /comment location/i)
})

test('embedded CSS block comments use explicit JSON string spans while preserving CSS declarations and neighboring literals', () => {
  const line = 'export const CSS="a{width:60px;/* 비교 */}"; const fixture="/* 비교 */";'
  const from = { messages: {}, comments: { css: '비교' } }
  const to = { messages: {}, comments: { css: 'Compare "width"' } }
  const locations = { css: { line, column: line.indexOf('/*'), kind: 'css-block-json' } }
  const reading = helper.translateExampleComments('css-step-26', line, from, to, locations)
  assert.equal(reading, 'export const CSS="a{width:60px;/* Compare \\"width\\" */}"; const fixture="/* 비교 */";')
  assert.equal(reading.replace('/* Compare \\"width\\" */', '/* 비교 */'), line)
  const evaluate = source => new Function(source.replace('export const CSS=', 'return ' ).replace('; const fixture="/* 비교 */";', ''))()
  assert.equal(evaluate(reading).replace('/* Compare "width" */', ''), 'a{width:60px;}')
  assert.equal(evaluate(line).replace('/* 비교 */', ''), 'a{width:60px;}')
})

test('generated file writes final LF text and preserves unsupported CRLF inputs', async t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'generated-file-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const file = path.join(root, 'example.js')
  fs.writeFileSync(file, 'one\r\ntwo\r\n')
  await helper.writeGeneratedFile(file, 'one\ntwo\n')
  assert.deepEqual(fs.readFileSync(file), Buffer.from('one\ntwo\n'))
  const wat = path.join(root, 'kernel.wat')
  await helper.writeGeneratedFile(wat, '(module)\r\n')
  assert.deepEqual(fs.readFileSync(wat), Buffer.from('(module)\r\n'))
  await helper.writeGeneratedFile(file, 'changed\n')
  assert.equal(fs.readFileSync(file, 'utf8'), 'changed\n')
})

for (const id of ['javascript-step-02', 'css-step-04', 'react-step-03', 'gsap-step-02']) {
  test(`${id}: compatibility helper regenerates the reviewed common and reading bytes`, async t => {
    const catalog = JSON.parse(fs.readFileSync('src/app/catalog.json', 'utf8'))
    const seriesId = catalog.units.find(unit => unit.id === id).seriesId
    const { root, json } = fixture(t, id, seriesId)
    const originals = JSON.parse(fs.readFileSync('content/example-presentations.json', 'utf8'))
    json('content/example-presentations.json', originals)
    json(`content/locales/en/examples/${seriesId}.json`, JSON.parse(fs.readFileSync(`content/locales/en/examples/${seriesId}.json`, 'utf8')))
    const common = fs.readFileSync(`src/labs/${id}/example.js`, 'utf8').replaceAll('\r\n', '\n')
    const ast = await parsers.babel.parse(common)
    const mount = ast.program.body.find(node => node.declaration?.id?.name === 'mount').declaration
    const messages = mount.body.body.find(node => node.type === 'VariableDeclaration' && node.declarations[0].id.name === 'messages')
    const locale = mount.params[0].properties.find(node => node.key.name === 'locale')
    const edits = [{start: messages.start, end: messages.end}, {start: locale.start, end: common.indexOf(',', locale.end) + 1}].sort((a,b) => b.start-a.start)
    let template = common
    for (const {start,end} of edits) template = template.slice(0,start)+template.slice(end)
    template = template.replace(/messages\.([a-zA-Z0-9_]+)/g, (_, key) => JSON.stringify(originals[id].messages[key]))
    const result = await helper.localizeExampleSource(id, template, {}, { root })
    await assertGeneratedSemantics('example.js', common, result.source)
    await assertGeneratedSemantics('example.js', fs.readFileSync(`public${result.readingSource}`, 'utf8'), fs.readFileSync(path.join(root, 'public', result.readingSource), 'utf8'))
    await assert.rejects(() => helper.localizeExampleSource(id, '// missing mount', {}, { root }), /Unsupported pilot mount/)
  })
}

test('approved foundations and framework inline/indented source forms translate with executable parity', async () => {
  const cases = [
    [
      'typescript-02',
      '      const lesson = first(value) // Lesson | undefined: 제네릭이 입력 요소의 타입을 보존합니다.',
      'Lesson | undefined: 제네릭이 입력 요소의 타입을 보존합니다.',
      'Lesson | undefined: Generics preserve the input element type.',
    ],
    [
      'typescript-03',
      '      if (closed) return // 멱등성: 중복 호출은 아무 효과가 없습니다.',
      '멱등성: 중복 호출은 아무 효과가 없습니다.',
      'Idempotence: Duplicate calls have no effect.',
    ],
    [
      'html-03',
      '    // 잘못된 로컬 data URI로 네트워크 없이 이미지 실패를 만듭니다.',
      '잘못된 로컬 data URI로 네트워크 없이 이미지 실패를 만듭니다.',
      'An invalid local data URI causes image failure without network access.',
    ],
    [
      'react-03',
      '    const renders = React.useRef(0); renders.current++ // 학습용 렌더 시도 계수, 시간 측정값이 아닙니다.',
      '학습용 렌더 시도 계수, 시간 측정값이 아닙니다.',
      'Learning render attempt counter, not a time measurement.',
    ],
    [
      'react-03',
      '      // 개발/profiling 빌드에서만 콜백을 보장합니다. 결과를 state에 넣으면 추가 렌더가 생깁니다.',
      '개발/profiling 빌드에서만 콜백을 보장합니다. 결과를 state에 넣으면 추가 렌더가 생깁니다.',
      'Callbacks are guaranteed only in development/profiling builds. Storing results in state triggers extra renders.',
    ],
    [
      'vue-02',
      '    // 단위와 문자열을 스냅샷으로 잡아, 늦은 타이머가 새 단위에 쓰지 못하게 합니다.',
      '단위와 문자열을 스냅샷으로 잡아, 늦은 타이머가 새 단위에 쓰지 못하게 합니다.',
      'Snapshot the unit and string so late timers cannot write to a new unit.',
    ],
    [
      'vue-02',
      '      onCleanup(() => clearTimeout(timer)) // 재실행과 컴포넌트 해제에서 모두 정리',
      '재실행과 컴포넌트 해제에서 모두 정리',
      'Clean up on rerun and component disposal.',
    ],
    [
      'vue-03',
      '        frame = requestAnimationFrame(draw) // angle은 지역 변수: 매 프레임 Vue 렌더를 요청하지 않습니다.',
      'angle은 지역 변수: 매 프레임 Vue 렌더를 요청하지 않습니다.',
      'angle is local: It does not request a Vue render every frame.',
    ],
  ]
  for (const [id, line, from, to] of cases) {
    const source = fs.readFileSync(`src/labs/${id}/example.js`, 'utf8')
    const fixture = helper.translateExampleComments(
      id,
      line,
      { comments: { approved: from } },
      { comments: { approved: to } },
      { approved: { line, column: line.indexOf('//'), kind: 'line' } },
    )
    assert.equal(fixture.replace('// ' + to, '// ' + from), line, id)
    const ast = await parsers.babel.parse(source)
    const comments = ast.comments.filter(
      (comment) =>
        comment.type === 'CommentLine' && comment.value.trim() === from,
    )
    assert.equal(comments.length, 1, id)
    const actualLine = source.split(/\r?\n/)[comments[0].loc.start.line - 1]
    const column = comments[0].loc.start.column
    const prefix = line.slice(0, line.indexOf('//')).trim()
    if (prefix) {
      const wrap = (code) => `function context() {\n${code}\n}`
      const expected = await parsers.babel.parse(wrap(prefix))
      const count = expected.program.body[0].body.body.length
      const contexts = []
      function visit(node) {
        if (!node || typeof node !== 'object') return
        if (Array.isArray(node.body)) {
          const index = node.body.findIndex(
            (statement) =>
              statement.end <= comments[0].start &&
              !source.slice(statement.end, comments[0].start).trim(),
          )
          if (index >= count - 1)
            contexts.push(
              source.slice(
                node.body[index - count + 1].start,
                node.body[index].end,
              ),
            )
        }
        for (const value of Object.values(node)) {
          if (Array.isArray(value)) value.forEach(visit)
          else if (value && typeof value === 'object') visit(value)
        }
      }
      visit(ast.program)
      assert.equal(contexts.length, 1, id)
      await assertGeneratedSemantics(
        'context.js',
        wrap(prefix),
        wrap(contexts[0]),
      )
    } else assert.equal(actualLine.slice(0, column).trim(), '', id)
    const reading = helper.translateExampleComments(
      id,
      source,
      { comments: { approved: from } },
      { comments: { approved: to } },
      { approved: { line: actualLine, column, kind: 'line' } },
    )
    assert.equal(reading.replace('// ' + to, '// ' + from), source, id)
    assert.equal(transformSync(reading).code, transformSync(source).code, id)
  }
})

test('actual CSS26 JSON-encoded block changes only the approved embedded comment', async () => {
  const source = fs.readFileSync('src/labs/css-step-26/example.js', 'utf8')
  const line = source.split(/\r?\n/).find(line => line.includes('/* 비교:'))
  const from = '비교: width 대신 transform:translateX(20px)'
  const to = 'Compare: use transform:translateX(20px) instead of width'
  const reading = helper.translateExampleComments('css-step-26', source, { comments: { css: from } }, { comments: { css: to } }, { css: { line, column: line.indexOf('/*'), kind: 'css-block-json' } })
  assert.equal(reading.replace('/* ' + to + ' */', '/* ' + from + ' */'), source)
  const extractCSS = async text => {
    const ast = await parsers.babel.parse(text)
    const mount = ast.program.body.find(node => node.declaration?.id?.name === 'mount').declaration
    return mount.body.body.flatMap(node => node.declarations ?? []).find(node => node.id.name === 'CSS').init.value
  }
  assert.equal((await extractCSS(reading)).replace('/* ' + to + ' */', ''), (await extractCSS(source)).replace('/* ' + from + ' */', ''))
})

test('async writer rejection exposes supported parse failures and preserves binary bytes', async t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'writer-rejection-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  await assert.rejects(helper.writeGeneratedFile(path.join(root, 'broken.js'), 'const ='), /broken\.js/)
  const bytes = Buffer.from([0, 255, 13, 10])
  const file = path.join(root, 'binary.js')
  await helper.writeGeneratedFile(file, bytes)
  assert.deepEqual(fs.readFileSync(file), bytes)
})

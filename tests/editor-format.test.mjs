import assert from 'node:assert/strict'
import test from 'node:test'
import { execFileSync } from 'node:child_process'
import { runInNewContext } from 'node:vm'
import postcss from 'prettier/plugins/postcss'
import { formatCode, CodeFormatError } from '../src/editor/formatCode.ts'
import { parseHtmlSource } from '../src/shared/htmlSource.ts'
import { javascriptStructure } from '../scripts/generated-source-semantics.mjs'

const bodies = (source) =>
  parseHtmlSource(source).blocks.map((b) => source.slice(b.start, b.end))
const protectedBodies = (source) =>
  parseHtmlSource(source).protectedSpans.map((b) =>
    source.slice(b.start, b.end),
  )
const declarations = (source) => {
  const result = []
  const visit = (n) => {
    if (n.type === 'css-decl' && n.prop.startsWith('--'))
      result.push(source.slice(n.source.startOffset, n.source.endOffset))
    for (const child of n.nodes ?? []) visit(child)
  }
  visit(postcss.parsers.css.parse(source))
  return result
}
const representative =
  '<!doctype html><html><head><script type="module">const raw=`a\nb`;const markup=html`<b  id="x">Keep  spaces</b>`;const style=css`.x{color:red;}`;const shader=glsl`void main(){\n x =  1.;\n}`;const explicit=String.raw`a\n  b`;</script><style>.a{content:"  keep  ";--tokens:  a  b  ;--multi: first\n  second  ;color:red}.b{--payload: { a: 1; b: " q " };--tokens: x/*keep*/ y !important;}</style><script type="importmap">{"imports":{"three":"./three.js"}}</script></head><body><pre>  first\n    second  \n<textarea>  nested\n</textarea></pre><textarea>  first\n    second  \n</textarea><script type="x-raw">  invalid const =\n    keep  \n</script><script src="">ignored const =\n  keep</script><template><pre>keep\n  raw</pre><script>bad const =</script></template></body></html>'

test('HTML formats eligible bodies while preserving semantic values and complete sensitive spans', async () => {
  const output = await formatCode(representative, 'html')
  const before = bodies(representative),
    after = bodies(output)
  assert.notEqual(output, representative)
  assert.deepEqual(
    await javascriptStructure(after[0]),
    await javascriptStructure(before[0]),
  )
  assert.ok(after[0].includes('`a\nb`'))
  assert.ok(after[0].includes('html`<b  id="x">Keep  spaces</b>`'))
  assert.ok(after[1].includes('color: red'))
  assert.ok(after[1].includes("content: '  keep  '"))
  assert.deepEqual(declarations(after[1]), declarations(before[1]))
  const cssString = (source) =>
    postcss.parsers.css
      .parse(source)
      .nodes[0].nodes.find((n) => n.prop === 'content').value.group.group.value
  assert.equal(cssString(after[1]), cssString(before[1]))
  assert.deepEqual(JSON.parse(after[2]), JSON.parse(before[2]))
  assert.equal(after[3], before[3])
  assert.equal(after[4], before[4])
  const spans = parseHtmlSource(representative).protectedSpans
  const originals = protectedBodies(representative),
    formatted = protectedBodies(output)
  for (let i = 0; i < spans.length; i++)
    if (['pre', 'textarea', 'template'].includes(spans[i].tag))
      assert.equal(formatted[i], originals[i])
  assert.equal(await formatCode(output, 'html'), output)
})

test('MIME matching is conservative, normalizes case/space, and preserves unknown and src bodies', async () => {
  for (const type of [
    '',
    'module',
    ' TEXT/JAVASCRIPT ',
    'application/javascript',
    'application/ecmascript',
  ]) {
    const output = await formatCode(
      `<script type="${type}">const n={a:1};</script>`,
      'html',
    )
    assert.ok(bodies(output)[0].includes('const n = { a: 1 }'))
  }
  for (const source of [
    '<script type="text/typescript">const = 2</script>',
    '<script type="text/javascript; charset=utf-8">const =</script>',
    '<script src="x.js">const =</script>',
    '<style type="text/less">.x { @bad</style>',
  ]) {
    assert.deepEqual(bodies(await formatCode(source, 'html')), bodies(source))
  }
  assert.ok(
    bodies(
      await formatCode(
        '<style type=" TEXT/CSS ">.a{color:red}</style>',
        'html',
      ),
    )[0].includes('color: red'),
  )
})

test('parser protection is nonoverlapping and does not add inert template blocks to runtime', () => {
  const source =
    '<pre>x<textarea> y </textarea><script>const =</script></pre><template><script>bad</script></template>'
  const info = parseHtmlSource(source)
  assert.deepEqual(
    info.protectedSpans.map((s) => s.tag),
    ['pre', 'template'],
  )
  assert.equal(info.blocks.length, 1)
})

test('marker-looking user content is preserved by choosing a noncolliding marker', async () => {
  const source =
    '<pre>STUDY_FORMAT_BODY_0_0</pre><style>.a{--x: STUDY_FORMAT_CSS_0_0; color:red}</style>'
  const output = await formatCode(source, 'html')
  assert.equal(protectedBodies(output)[0], protectedBodies(source)[0])
  assert.deepEqual(
    declarations(bodies(output)[0]),
    declarations(bodies(source)[0]),
  )
})

for (const [name, source, position] of [
  [
    'later JS',
    '<html>\n<head>\n<script>const earlier={x:1};</script>\n<style>.a{color:red}</style>\n</head>\n<body>\n<script>\nconst valid = 1\nconst = 2\n</script>\n</body>\n</html>',
    { line: 9, column: 7 },
  ],
  [
    'later CSS',
    '<html>\n<head>\n<script>const earlier={x:1};</script>\n<style>\n.a{color:red}\n.b{content:"unterminated }\n</style>\n</head></html>',
    { line: 6, column: 12 },
  ],
  [
    'BOM CRLF emoji',
    '\ufeff<!--😀-->\r\n<script data-x="v">const = 2</script>',
    { line: 2, column: 26 },
  ],
])
  test(`${name} parse error preserves cause and reports original source position`, async () => {
    await assert.rejects(
      () => formatCode(source, 'html'),
      (error) => {
        assert.ok(error instanceof CodeFormatError)
        assert.ok(error.cause instanceof Error)
        assert.deepEqual(error.position, position)
        assert.ok(!error.message.includes('\n>'))
        return true
      },
    )
  })

test('unsafe recovered/unclosed/namespace protected spans reject rather than guess', async () => {
  for (const source of [
    '<script>const n=1;',
    '<pre>not closed',
    '<svg><script>const x=1</script></svg>',
  ])
    await assert.rejects(() => formatCode(source, 'html'), CodeFormatError)
})

test('standalone JS/TS use common options, preserve raw templates and reach a bounded fixed point', async () => {
  for (const [language, source] of [
    ['javascript', 'const raw=html`<p  id="x">a\nb</p>`;'],
    ['typescript', 'const raw:string=`a\nb`;'],
  ]) {
    const output = await formatCode(source, language)
    assert.ok(
      output.includes('`a\nb`') || output.includes('`<p  id="x">a\nb</p>`'),
    )
    assert.equal(await formatCode(output, language), output)
  }
  const p02 =
    "await page.getByLabel('Import backup').setInputFiles({name:'valid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,text:'restored'}))});"
  const output = await formatCode(p02, 'javascript')
  assert.equal(await formatCode(output, 'javascript'), output)
  assert.equal(await formatCode('', 'html'), '')
  await assert.rejects(
    () => formatCode('const =', 'javascript'),
    CodeFormatError,
  )
})

test('CRLF template raw and string values survive standalone LF formatting', async () => {
  const source =
    'const value=String.raw`a' + String.fromCharCode(13, 10) + '  b`;value'
  assert.equal(
    runInNewContext(await formatCode(source, 'javascript')),
    runInNewContext(source),
  )
})

test('nonconverging formatting stops at three passes and intermediate errors omit original position', () => {
  for (const mode of ['unstable', 'later-error']) {
    const script = `
      import {registerHooks} from 'node:module'
      import assert from 'node:assert/strict'
      const dependency='data:text/javascript,'+encodeURIComponent('export default {async format(source){globalThis.calls=(globalThis.calls??0)+1;if(globalThis.mode==="later-error"&&globalThis.calls===2){const error=new Error("Intermediate failure (9:4)");error.loc={start:{line:9,column:4}};throw error}return source+" "}}')
      globalThis.mode=${JSON.stringify(mode)}
      registerHooks({resolve(specifier,context,next){if(specifier==='prettier/standalone'&&context.parentURL.endsWith('/src/editor/formatCode.ts'))return {url:dependency,shortCircuit:true};return next(specifier,context)}})
      const {formatCode,CodeFormatError}=await import('./src/editor/formatCode.ts')
      await assert.rejects(()=>formatCode('const n=1','javascript'),error=>{assert.ok(error instanceof CodeFormatError);assert.equal(error.position,undefined);assert.ok(error.cause instanceof Error);return true})
      assert.equal(globalThis.calls,globalThis.mode==='unstable'?3:2)
      console.log('bounded and unmapped failure verified')
    `
    assert.equal(
      execFileSync(process.execPath, ['--input-type=module', '-e', script], {
        encoding: 'utf8',
      }).trim(),
      'bounded and unmapped failure verified',
    )
  }
})

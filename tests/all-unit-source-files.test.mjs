import assert from 'node:assert/strict'
import { test, after } from 'node:test'
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import babel from 'prettier/plugins/babel'
import { parse } from 'parse5'
import { splitExample } from '../src/editor/splitExample.ts'
import { splitSource, composeSource } from '../src/shared/sourceFiles.ts'
import { formatCode } from '../src/editor/formatCode.ts'
import { parseHtmlSource } from '../src/shared/htmlSource.ts'
import { assertGeneratedSemantics } from '../scripts/generated-source-semantics.mjs'

const read = (path) => readFileSync(path, 'utf8')
const catalog = JSON.parse(read('src/app/catalog.json'))
const metadata = Object.assign(
  {},
  ...readdirSync('content/examples')
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(read('content/examples/' + name))),
)
const audit = {
  staticOnly: true,
  counts: {},
  units: [],
  html: [],
  failures: [],
}
const increment = (key) => {
  audit.counts[key] = (audit.counts[key] ?? 0) + 1
}
async function check(id, operation, fn) {
  try {
    await fn()
  } catch (error) {
    audit.failures.push({ id, operation, message: error.message.slice(0, 700) })
  }
}
const parseJs = (source) => babel.parsers.babel.parse(source)
const blocks = (source) =>
  parseHtmlSource(source)
    .blocks.map((block) => ({
      tag: block.tag,
      body: source.slice(block.start, block.end),
    }))
    .filter((block) => block.body !== '')
async function htmlSemantics(path, before, after) {
  const left = parseHtmlSource(before).blocks
  const right = parseHtmlSource(after).blocks
  assert.equal(right.length, left.length, path)
  for (let i = 0; i < left.length; i++) {
    const a = before.slice(left[i].start, left[i].end)
    const b = after.slice(right[i].start, right[i].end)
    const type = (left[i].type ?? '').trim().toLowerCase()
    if (left[i].tag === 'style' && ['', 'text/css'].includes(type))
      await assertGeneratedSemantics(path + '.css', a, b)
    else if (
      left[i].tag === 'script' &&
      left[i].src === null &&
      ['', 'module', 'text/javascript', 'application/javascript'].includes(type)
    )
      await assertGeneratedSemantics(path + '.js', a, b)
    else if (type === 'importmap')
      assert.deepEqual(JSON.parse(a), JSON.parse(b))
    else assert.equal(b, a, path)
  }
  const mask = (source, spans) =>
    spans
      .toReversed()
      .reduce(
        (text, span) => text.slice(0, span.start) + text.slice(span.end),
        source,
      )
  await assertGeneratedSemantics(path, mask(before, left), mask(after, right))
}
after(() => {
  if (process.env.SOURCE_AUDIT_JSON)
    writeFileSync(
      process.env.SOURCE_AUDIT_JSON,
      JSON.stringify(audit, null, 2) + '\n',
    )
})

test('every catalog unit has parseable original, locale-safe fallback and present companion sources', async () => {
  assert.equal(
    new Set(catalog.units.map((unit) => unit.id)).size,
    catalog.units.length,
  )
  for (const unit of catalog.units) {
    increment('units')
    increment(metadata[unit.id]?.mode ?? 'implicitBrowser')
    const path = `src/labs/${unit.id}/example.js`
    const record = {
      id: unit.id,
      mode: metadata[unit.id]?.mode ?? 'browser',
      language: unit.sourceLanguage ?? 'javascript',
      split: {},
    }
    audit.units.push(record)
    await check(unit.id, 'original-and-split', async () => {
      const source = read(path)
      parseJs(source)
      assert.match(source, /export (?:async )?function mount\(/)
      for (const locale of ['ko', 'en']) {
        const files = splitExample(source, locale)
        record.split[locale] = files.javascript !== source
        increment(
          files.javascript !== source
            ? 'split-' + locale
            : 'fallback-' + locale,
        )
        parseJs(files.javascript)
        parseJs(composeSource(files))
        if (files.javascript === source) {
          assert.equal(files.html, '', `${unit.id}/${locale}: fallback HTML`)
          assert.equal(files.css, '', `${unit.id}/${locale}: fallback CSS`)
        }
      }
      const formatted = await formatCode(source, 'javascript')
      await assertGeneratedSemantics(path, source, formatted)
      increment('javascriptSemanticsChecked')
    })
    for (const file of metadata[unit.id]?.files ?? []) {
      increment('companionReferences')
      await check(unit.id, file, () => {
        assert.ok(
          file.startsWith(`src/labs/${unit.id}/`) && !file.includes('..'),
        )
        assert.ok(existsSync(file), file)
        assert.ok(readFileSync(file).length > 0, file)
      })
    }
    if (record.language === 'html') {
      for (const suffix of ['html', 'en.html'])
        await check(unit.id, 'original-' + suffix, () =>
          assert.ok(existsSync(`src/labs/${unit.id}/example.${suffix}`)),
        )
    }
  }
  assert.equal(
    audit.failures.length,
    0,
    JSON.stringify(audit.failures.slice(0, 3)),
  )
})

test('all associated original HTML files preserve script/style bodies through composition and format safely', async () => {
  const failuresBefore = audit.failures.length
  for (const unit of catalog.units) {
    for (const name of readdirSync(`src/labs/${unit.id}`, {
      recursive: true,
    }).filter((name) => name.endsWith('.html'))) {
      const path = `src/labs/${unit.id}/${name}`
      audit.html.push({ id: unit.id, path })
      increment('htmlInputs')
      if (name === 'example.html' || name === 'example.en.html')
        increment('originalHtmlInputs')
      await check(unit.id, path, async () => {
        const source = read(path)
        const files = splitSource(source, 'html')
        const output = composeSource(files)
        assert.deepEqual(
          blocks(output),
          blocks(source),
          path + ': ordered block bodies',
        )
        const formatted = await formatCode(source, 'html')
        await htmlSemantics(path, source, formatted)
        increment('htmlSemanticsChecked')
      })
    }
  }
  assert.equal(
    audit.failures.length - failuresBefore,
    0,
    JSON.stringify(audit.failures.slice(failuresBefore, failuresBefore + 3)),
  )
})

test('dynamic or ordered mount content stays byte-for-byte in the JavaScript fallback', () => {
  for (const body of [
    'container.innerHTML = render()',
    'container.innerHTML = "a"; container.innerHTML = "b"',
    'observe(container); container.innerHTML = "a"',
    'const messages = sideEffect(); container.innerHTML = messages.title',
  ]) {
    const source = `export function mount({container}) { ${body} }`
    assert.equal(splitExample(source, 'ko').javascript, source)
  }
})

test('static locale extraction yields the same HTML as the original mount', () => {
  const source =
    'export function mount({container,locale}) { const messages = locale === "en" ? {title:"Hello"} : {title:"안녕"}; container.innerHTML = `<h1>${messages.title}</h1>` }'
  for (const locale of ['ko', 'en']) {
    const container = { innerHTML: '' }
    runInNewContext(
      source.replace('export ', '') + '; mount({container,locale})',
      { container, locale },
      { timeout: 1000 },
    )
    assert.equal(splitExample(source, locale).html, container.innerHTML)
  }
})

test('splitExample does not move side effects before the original assignment', () => {
  const source =
    'export function mount({container}) { const messages = observe(container); container.innerHTML = "<p>ready</p>" }'
  assert.equal(splitExample(source, 'ko').javascript, source)
})

test('composition escapes closing tags so edited source cannot inject extra elements', () => {
  const result = composeSource({
    mode: 'document',
    html: '<body></body>',
    css: '/* </style><script>injected()</script> */',
    javascript: 'console.log("</script><h1>injected</h1>")',
  })
  const tags = []
  const visit = (node) => {
    if (node.tagName) tags.push(node.tagName)
    node.childNodes?.forEach(visit)
  }
  visit(parse(result))
  assert.equal(tags.filter((tag) => tag === 'script').length, 1)
  assert.ok(!tags.includes('h1'))
})

test('supported formatter languages preserve semantics and stabilize', async () => {
  for (const [language, extension, source] of [
    ['javascript', 'js', 'const value=String.raw` a\n  b`;'],
    ['typescript', 'ts', 'const value: {n:number}={n:1};'],
    ['css', 'css', '.a{--tokens: a  b ;content:" a  b ";color:red}'],
    [
      'html',
      'html',
      '<!doctype html><html><head><title>A</title></head><body><pre> a\n b </pre><script type="module">const x=1;</script></body></html>',
    ],
  ]) {
    const output = await formatCode(source, language)
    await assertGeneratedSemantics('fixture.' + extension, source, output)
    assert.equal(await formatCode(output, language), output)
  }
})

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHtmlPreviewDocument } from '../src/preview/html-document.ts'
import { parseHtmlSource } from '../src/shared/htmlSource.ts'
const modules = {
  core: 'export const REVISION="186"',
  controls: 'export class OrbitControls {}',
}
test('insertion preserves source bytes and precedes user scripts without added wrappers', () => {
  for (const source of [
    '<!doctype html><html lang="ko"><head data-head="keep"><title>T</title></head><body class="yes"><script>console.log(1)</script></body></html>',
    '<!--keep--><style>p{color:red}</style><p>fragment',
    '\ufeff<!doctype html><html data-x="x"><body>text',
    '<html><head><title>missing closures',
  ]) {
    const html = createHtmlPreviewDocument(source, 'token', 'ko', modules)
    const offset = parseHtmlSource(source).bootstrapInsertOffset
    assert.ok(html.startsWith(source.slice(0, offset)))
    assert.ok(html.endsWith(source.slice(offset)))
    assert.equal(
      html.slice(offset).indexOf('<meta http-equiv="Content-Security-Policy"'),
      0,
    )
    assert.ok(html.includes("connect-src 'none'"))
    assert.ok(!html.includes('unsafe-eval'))
  }
})
test('module text and token cannot escape bootstrap; importmap collisions have localized diagnostics', () => {
  const source =
    '<script type="importmap">{"imports":{"three":"https://example.com/x"}}</script>'
  for (const locale of ['ko', 'en']) {
    const html = createHtmlPreviewDocument(source, '</script>token', locale, {
      ...modules,
      core: '/* </script><script>bad */',
    })
    assert.equal((html.match(/<script>/g) || []).length, 1)
    assert.ok(
      html.includes(
        locale === 'ko' ? '사용자 import map' : 'User import map conflicts',
      ),
    )
    assert.ok(!html.includes('/* </script>'))
  }
})
test('inert template import maps do not produce a collision diagnostic', () => {
  const html = createHtmlPreviewDocument(
    '<template><script type="importmap">{}</script></template>',
    'token',
    'en',
    modules,
  )
  assert.ok(!html.includes('User import maps'))
})

test('only supplied import mappings and scoped overrides are diagnosed', () => {
  for (const map of [
    { imports: { three: 'blob:other' } },
    { imports: { 'three/addons/controls/OrbitControls.js': 'blob:other' } },
    { scopes: { 'about:srcdoc': { three: 'blob:other' } } },
    { scopes: { 'blob:': { 'three/addons/': 'blob:other/' } } },
  ]) {
    const html = createHtmlPreviewDocument(
      `<script type="importmap">${JSON.stringify(map)}</script>`,
      'token',
      'en',
      modules,
    )
    assert.ok(html.includes('User import map conflicts'))
  }
  for (const map of [
    { imports: { local: 'data:text/javascript,export default 1' } },
    { imports: { 'three/addons/': 'blob:other/' } },
    { scopes: { 'blob:': { local: 'blob:other' } } },
  ]) {
    const source = `<script type="importmap">${JSON.stringify(map)}</script>`
    const html = createHtmlPreviewDocument(source, 'token', 'en', modules)
    assert.ok(!html.includes('User import map conflicts'))
    assert.ok(html.endsWith(source))
  }
})

test('empty and absent supplied modules preserve nonconflicting user maps', () => {
  for (const mapping of [
    {},
    { imports: {} },
    { imports: { three: 'blob:user' } },
    { scopes: { 'about:srcdoc': { three: 'blob:user' } } },
  ]) {
    const source = `<script type="importmap">${JSON.stringify(mapping)}</script>`
    const html = createHtmlPreviewDocument(source, 'token', 'en', {})
    assert.ok(!html.includes('User import map conflicts'))
    assert.ok(html.endsWith(source))
  }
  const empty = createHtmlPreviewDocument(
    '<script type="importmap">{}</script>',
    'token',
    'en',
    modules,
  )
  assert.ok(!empty.includes('User import map conflicts'))
})
test('invalid import maps have Korean and English diagnostics', () => {
  for (const json of [
    '{bad',
    'null',
    '[]',
    '{"imports":[]}',
    '{"scopes":{"blob:":[]}}',
  ]) {
    const source = `<script type="importmap">${json}</script>`
    assert.ok(
      createHtmlPreviewDocument(source, 'token', 'en', {}).includes(
        'User import map is invalid',
      ),
    )
    assert.ok(
      createHtmlPreviewDocument(source, 'token', 'ko', {}).includes(
        '사용자 import map이 올바르지 않습니다',
      ),
    )
  }
})

test('HTML runtime bounds console, validates disposal and keeps error state', async () => {
  const { readFileSync } = await import('node:fs')
  const { transformSync } = await import('esbuild')
  const { default: vm } = await import('node:vm')
  const compiled = transformSync(
    readFileSync(
      new URL('../src/preview/html-runtime.ts', import.meta.url),
      'utf8',
    ),
    { loader: 'ts', format: 'cjs' },
  ).code
  const messages = [],
    revoked = [],
    listeners = new Map(),
    maps = []
  const parent = { postMessage: (message) => messages.push(message) },
    module = { exports: {} }
  const context = {
    module,
    exports: module.exports,
    parent,
    Error,
    Blob,
    URL: {
      createObjectURL: () => `blob:${maps.length}`,
      revokeObjectURL: (url) => revoked.push(url),
    },
    document: {
      createElement: () => ({}),
      head: { append: (map) => maps.push(map) },
    },
    console: Object.fromEntries(
      ['log', 'info', 'warn', 'error', 'debug'].map((level) => [
        level,
        () => {},
      ]),
    ),
    addEventListener: (type, fn) => listeners.set(type, fn),
  }
  vm.runInNewContext(compiled, context)
  const source = '<script>\nmissing();\n</script>'
  module.exports.startHtmlRuntime({
    token: 'token',
    modules,
    diagnostic: null,
    source,
    insertionOffset: 0,
    injectedLines: 3,
    injectedLastLineLength: 20,
    scripts: parseHtmlSource(source).blocks,
  })
  assert.equal(maps.length, 1)
  listeners.get('error')({
    filename: 'about:srcdoc',
    lineno: 5,
    colno: 1,
    error: new Error('known'),
    preventDefault() {},
  })
  assert.equal(messages[0].line, 2)
  assert.equal(messages[0].column, 1)
  listeners.get('DOMContentLoaded')()
  assert.equal(
    messages.some((m) => m.status === 'ready'),
    false,
  )
  listeners.get('error')({
    filename: 'about:srcdoc',
    lineno: 0,
    colno: 0,
    message: 'unknown',
    preventDefault() {},
  })
  assert.equal(messages.at(-1).line, undefined)
  const cyclic = {}
  cyclic.self = cyclic
  context.console.log(cyclic)
  for (let i = 0; i < 250; i++) context.console.log('x'.repeat(5000))
  const logs = messages.filter((m) => m.status === 'console')
  assert.equal(logs.length, 200)
  assert.match(logs[0].message, /Circular/)
  assert.ok(logs.every((m) => m.message.length <= 4000))
  for (const event of [
    { source: {}, data: { type: 'study-dispose', token: 'token' } },
    { source: parent, data: { type: 'study-dispose', token: 'wrong' } },
  ])
    listeners.get('message')(event)
  assert.equal(revoked.length, 0)
  listeners.get('message')({
    source: parent,
    data: { type: 'study-dispose', token: 'token' },
  })
  listeners.get('pagehide')()
  assert.equal(revoked.length, 2)
  assert.equal(messages.filter((m) => m.status === 'disposed').length, 1)
  const count = messages.length
  context.console.log('after disposal')
  listeners.get('DOMContentLoaded')()
  assert.equal(messages.length, count)
})

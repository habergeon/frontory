import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

// Evaluate the real generated mount's input declarations before DOM construction.
function documentInput(id, locale) {
  const source = fs.readFileSync(`src/labs/${id}/example.js`, 'utf8')
  const start = source.indexOf('export function mount(')
  const end = source.indexOf('const originalRootSize', start)
  return new Function(source.slice(start, end).replace('export function mount', 'function mount') + '\nreturn {HTML,CSS};}\nreturn mount({container:{},locale:arguments[0]});')(locale)
}

test('HTML encoding translates display while retaining multilingual data and lang fixture', () => {
  const en = documentInput('html-step-02', 'en')
  const ko = documentInput('html-step-02', 'ko')
  assert.ok(en.HTML.includes('한글 · café · 日本語'))
  assert.ok(en.HTML.includes('lang="ko"'))
  assert.ok(en.HTML.includes('Character encoding experiment'))
  assert.ok(ko.HTML.includes('문자 인코딩 실험'))
})

test('document input localization preserves attributes, FormData names, media conditions and CSS declarations', () => {
  const en = documentInput('html-step-11', 'en')
  assert.ok(en.HTML.includes('name="q" value="grid"'))
  assert.ok(en.HTML.includes('Submit search'))
  assert.ok(en.HTML.includes('type="submit"'))
  const picture = documentInput('html-step-20', 'en')
  assert.ok(picture.HTML.includes('(max-width:600px)'))
  const narrowSource = picture.HTML.match(/srcset="data:image\/svg\+xml,([^"]+)"/)[1]
  assert.doesNotMatch(narrowSource, /\s/)
  assert.equal(decodeURIComponent(narrowSource), "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='coral'/></svg>")
  assert.equal(picture.CSS, 'img{max-width:100%;height:auto}')
})

test('manual JavaScript button uses selected locale and preserves count behavior and cleanup', async () => {
  const { mount } = await import('../src/labs/javascript-01/example.js')
  const previous = globalThis.document
  const nodes = []
  globalThis.document = { createElement(tag) { return { tag, handlers: {}, addEventListener(name, fn) { this.handlers[name] = fn }, removeEventListener(name) { delete this.handlers[name] } } } }
  try {
    const container = { append(...items) { nodes.push(...items) }, replaceChildren() { nodes.length = 0 } }
    const dispose = mount({ container, locale: 'en' })
    assert.equal(nodes[0].textContent, 'Increment state')
    nodes[0].handlers.click()
    assert.deepEqual(JSON.parse(nodes[1].textContent), { count: 1 })
    dispose()
    assert.equal(nodes.length, 0)
  } finally { globalThis.document = previous }
})

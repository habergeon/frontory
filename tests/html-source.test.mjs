import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseHtmlSource } from '../src/shared/htmlSource.ts'

for (const source of [
  '<html lang="ko"><head data-head="keep"><script type="module">const n=1;</script><style>a{color:red}</style></head><body></body></html>',
  '<!--before--><style>a{color:red}</style><script type="module">const n=1;</script><p>fragment',
  '<html><head data-head="keep"><script type="module">const n=1;</script><style>a{color:red}</style><body>malformed',
])
  test('parser returns original script/style content offsets', () => {
    const info = parseHtmlSource(source)
    assert.deepEqual(
      info.blocks.map((b) => source.slice(b.start, b.end)),
      source.includes('<style>') &&
        source.indexOf('<style>') < source.indexOf('<script')
        ? ['a{color:red}', 'const n=1;']
        : ['const n=1;', 'a{color:red}'],
    )
    if (source.includes('<head'))
      assert.equal(info.headInsertOffset, source.indexOf('><script') + 1)
    else assert.equal(info.headInsertOffset, null)
  })
test('raw text, templates, attributes and unclosed scripts use HTML parsing', () => {
  const source =
    '\ufeff<html><head data-head="keep"><script src="local.js">const x="<head><script>";</script><template><script type="importmap">{}</script></template><style>p::before{content:"<head>"}</style></head></html>'
  const info = parseHtmlSource(source)
  assert.equal(info.headInsertOffset, source.indexOf('><script') + 1)
  assert.equal(info.blocks.length, 2)
  assert.equal(info.blocks[0].src, 'local.js')
  assert.equal(
    source.slice(info.blocks[0].start, info.blocks[0].end),
    'const x="<head><script>";',
  )
  const unclosed = '<script>const x=1;'
  const block = parseHtmlSource(unclosed).blocks[0]
  assert.equal(unclosed.slice(block.start, block.end), 'const x=1;')
})
test('fallback insertion preserves prologs and explicit html attributes', () => {
  for (const [source, offset] of [
    ['', 0],
    ['\ufeff', 1],
    ['<!doctype html><!--keep--><body>x', 26],
    ['<html lang="ko"><body>x', 16],
  ]) {
    const info = parseHtmlSource(source)
    assert.equal(info.headInsertOffset, null)
    assert.equal(info.bootstrapInsertOffset, offset)
  }
})

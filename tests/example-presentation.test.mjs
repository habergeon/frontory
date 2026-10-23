import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { transformSync } from 'esbuild'
import { readEnglishContent } from '../scripts/locale-content.mjs'

const sources = JSON.parse(fs.readFileSync('content/example-presentations.json', 'utf8'))
for (const [id, original] of Object.entries(sources)) {
  test(`${id}: English reading source changes only anchored comments and preserves parsed executable tokens`, () => {
    const common = fs.readFileSync(`src/labs/${id}/example.js`, 'utf8').replaceAll('\r\n', '\n')
    const reading = fs.readFileSync(`public/examples-en/${id}/example.js`, 'utf8').replaceAll('\r\n', '\n')
    const translated = readEnglishContent().examplePresentations[id]
    let restored = reading
    for (const [key, value] of Object.entries(translated.comments)) {
      if (id === 'canvas-2d-step-07' && key === 'comment002') {
        assert.equal(value, 'Experiment: Input String: 가나 → WWW iii')
      } else assert.doesNotMatch(value, /[가-힣]/)
      const css = id === 'css-step-26' && key === 'cssComparison'
      const from = css ? JSON.stringify('/* ' + value + ' */').slice(1, -1) : '// ' + value
      const to = css ? JSON.stringify('/* ' + original.comments[key] + ' */').slice(1, -1) : '// ' + original.comments[key]
      assert.equal(restored.split(from).length, 2, `${id}.${key}: unique approved comment`)
      restored = restored.replace(from, () => to)
    }
    assert.equal(restored, common)
    const parsed = source => transformSync(source, { loader: 'js', legalComments: 'none' }).code
    // CSS26 changes an embedded CSS comment inside a JS string value. Reverse
    // that exact approved span before comparing executable JavaScript output.
    assert.equal(parsed(id === 'css-step-26' ? restored : reading), parsed(common))
    assert.match(common, /locale='ko'/)
    for (const [key, value] of Object.entries(translated.messages)) {
      if (id === 'canvas-2d-step-07' && key === 'display002') {
        assert.equal(value, 'Input String: 가나 ↔ WWW iii')
      } else if (id === '28-review' && key === 'display001') {
        assert.ok(value.includes('value="나의 WebGL 실험"'))
        assert.doesNotMatch(value.replace('value="나의 WebGL 실험"', ''), /[가-힣]/)
      } else assert.doesNotMatch(value, /[가-힣]/)
    }
  })
}

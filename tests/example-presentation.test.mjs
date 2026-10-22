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
    const lines = reading.split('\n')
    for (const [key, value] of Object.entries(translated.comments)) {
      assert.doesNotMatch(value, /[가-힣]/)
      const index = lines.indexOf('// ' + value)
      assert.notEqual(index, -1)
      lines[index] = '// ' + original.comments[key]
    }
    assert.equal(lines.join('\n'), common)
    const parsed = source => transformSync(source, { loader: 'js', legalComments: 'none' }).code
    assert.equal(parsed(reading), parsed(common))
    assert.match(common, /locale='ko'/)
    assert.ok(Object.values(translated.messages).every(value => !/[가-힣]/.test(value)))
  })
}

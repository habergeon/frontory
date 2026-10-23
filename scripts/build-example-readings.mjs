import fs from 'node:fs'
import { validateExamplePresentation } from './locale-content.mjs'
import { writeEnglishReadingSource } from './example-presentation.mjs'

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'))
const presentations = read('content/example-presentations.json')
// Manual sources retain their original author. This builder only writes readings.
for (const unit of read('content/catalog-v2.json').units) {
  const original = presentations[unit.id]
  if (!original || (process.argv[2] && unit.seriesId !== process.argv[2])) continue
  const record = read(`content/locales/en/examples/${unit.seriesId}.json`)[unit.id]
  const english = validateExamplePresentation(original, record.presentation)
  const source = fs.readFileSync(`src/labs/${unit.id}/example.js`, 'utf8')
  const commentLocations = {}
  const anchoredKeys = {
    'typescript-02': ['inlineExplanation'], 'typescript-03': ['inlineExplanation'], 'html-03': ['inlineExplanation'],
    'react-03': ['comment01', 'comment02'], 'vue-02': ['comment01', 'comment02'], 'vue-03': ['comment01'],
  }
  for (const key of anchoredKeys[unit.id] ?? []) {
    const text = '// ' + original.comments[key]
    const matches = source.replaceAll('\r\n', '\n').split('\n').filter(line => line.includes(text))
    if (matches.length !== 1) throw Error(`Expected one manual comment anchor: ${unit.id}.${key}`)
    commentLocations[key] = { line: matches[0], column: matches[0].indexOf(text), kind: 'line' }
  }
  writeEnglishReadingSource(unit.id, source, original, english, { commentLocations })
}

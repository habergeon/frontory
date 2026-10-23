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
  if (['typescript-02', 'typescript-03', 'html-03'].includes(unit.id)) {
    const text = '// ' + original.comments.inlineExplanation
    const line = source.replaceAll('\r\n', '\n').split('\n').find(line => line.includes(text))
    commentLocations.inlineExplanation = { line, column: line?.indexOf(text), kind: 'line' }
  }
  writeEnglishReadingSource(unit.id, source, original, english, { commentLocations })
}

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
    '01-scene': ['comment003'], '22-react-viewer': ['comment002'],
    'typescript-02': ['inlineExplanation'], 'typescript-03': ['inlineExplanation'], 'html-03': ['inlineExplanation'],
    'webgpu-02': ['comment002'], 'wgsl-02': ['comment002'],
    'react-03': ['comment01', 'comment02'], 'vue-02': ['comment01', 'comment02'], 'vue-03': ['comment01'],
  }
  for (const key of anchoredKeys[unit.id] ?? []) {
    const text = '// ' + original.comments[key]
    const matches = source.replaceAll('\r\n', '\n').split('\n').filter(line => line.includes(text))
    if (matches.length !== 1) throw Error(`Expected one manual comment anchor: ${unit.id}.${key}`)
    commentLocations[key] = { line: matches[0], column: matches[0].indexOf(text), kind: 'line' }
  }
  // Engineering identity comments include inline and serialized Worker/spec text.
  // Preserve those exact bytes; translate only the reviewed non-identity comments.
  if (['gsap', 'motion', 'web-workers', 'offscreen-canvas', 'webassembly', 'playwright'].includes(unit.seriesId)) {
    const comments = Object.fromEntries(Object.entries(original.comments).filter(([key, value]) => value !== english.comments[key]))
    const translated = Object.fromEntries(Object.keys(comments).map(key => [key, english.comments[key]]))
    writeEnglishReadingSource(unit.id, source, { ...original, comments }, { ...english, comments: translated })
    continue
  }
  // These approved identity entries describe an existing nested shader comment.
  // Its source has no trailing period; preserve the actual shader bytes exactly.
  if (['webgpu-03', 'wgsl-03'].includes(unit.id)) {
    const key = 'comment001', value = 'Extra invocations MUST exit.'
    if (original.comments[key] !== value || english.comments[key] !== value || !source.includes(' // Extra invocations MUST exit')) throw Error('Changed shader comment identity: ' + unit.id)
    const { [key]: _original, ...sourceComments } = original.comments
    const { [key]: _english, ...englishComments } = english.comments
    writeEnglishReadingSource(unit.id, source, { ...original, comments: sourceComments }, { ...english, comments: englishComments }, { commentLocations })
  } else writeEnglishReadingSource(unit.id, source, original, english, { commentLocations })
}

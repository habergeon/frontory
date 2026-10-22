import fs from 'node:fs'
import path from 'node:path'
import { validateExamplePresentation } from './locale-content.mjs'

const root = path.resolve(import.meta.dirname, '..')
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))

export function writeGeneratedFile(file, contents) {
  if (fs.existsSync(file)) {
    const previous = fs.readFileSync(file)
    if (typeof contents === 'string'
      ? previous.toString('utf8').replaceAll('\r\n', '\n') === contents.replaceAll('\r\n', '\n')
      : previous.equals(contents)) return
  }
  fs.writeFileSync(file, contents)
}

export function localizeExampleSource(id, source, aliases = {}) {
  const originals = read('content/example-presentations.json')
  const original = originals[id]
  if (!original) return { source }
  const records = read(`content/locales/en/examples/${id.split('-step-')[0]}.json`)
  const english = validateExamplePresentation(original, records[id].presentation)
  for (const [key, value] of Object.entries(original.messages)) {
    const originals = [value, ...Object.keys(aliases).filter(text => aliases[text] === key)]
    for (const text of originals) {
      for (const literal of [JSON.stringify(text), "'" + text.replaceAll("'", "\'") + "'"]) {
        source = source.replaceAll(literal, `messages.${key}`)
      }
    }
  }
  source = source.replace(/export function mount\(\{/, "export function mount({locale='ko',")
    .replace(/(export function mount\([^\n]+\{)\n/, `$1\nconst messages=locale==='en'?${JSON.stringify(english.messages)}:${JSON.stringify(original.messages)};\n`)
  let reading = source
  for (const key of Object.keys(original.comments)) {
    const from = '// ' + original.comments[key]
    const lines = reading.split('\n')
    const index = lines.indexOf(from)
    if (index < 0) throw Error(`Missing source comment: ${id}.${key}`)
    lines[index] = '// ' + english.comments[key]
    reading = lines.join('\n')
  }
  const readingSource = `/examples-en/${id}/example.js`
  const file = path.join(root, 'public', readingSource)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  writeGeneratedFile(file, reading)
  return { source, readingSource }
}

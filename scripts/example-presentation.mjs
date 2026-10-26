import { parsers } from 'prettier/plugins/babel'
import { formatGeneratedText } from './format-generated.mjs'
import fs from 'node:fs'
import path from 'node:path'
import { validateExamplePresentation } from './locale-content.mjs'

const defaultRoot = path.resolve(import.meta.dirname, '..')
const read = (root, file) =>
  JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const pilots = new Set([
  'javascript-step-02',
  'css-step-04',
  'react-step-03',
  'gsap-step-02',
])

export async function writeGeneratedFile(file, contents) {
  if (typeof contents === 'string')
    contents = await formatGeneratedText(file, contents)
  if (fs.existsSync(file)) {
    const previous = fs.readFileSync(file)
    if (
      typeof contents === 'string'
        ? previous.toString('utf8') === contents
        : previous.equals(contents)
    )
      return
  }
  fs.writeFileSync(file, contents)
}

// Locations refer to the final common source: exact line, zero-based UTF-16 column.
// css-block-json is only for an explicitly approved CSS comment in a JSON-quoted string.
export function translateExampleComments(
  id,
  source,
  original,
  english,
  locations = {},
) {
  const edits = []
  for (const key of Object.keys(locations)) {
    if (!Object.hasOwn(original.comments, key))
      throw Error(`Unknown comment location: ${id}.${key}`)
  }
  for (const [key, value] of Object.entries(original.comments)) {
    const translated = english.comments[key]
    const location = locations[key]
    let from = '// ' + value
    let to = '// ' + translated
    if (typeof translated !== 'string' || /[\r\n]/.test(translated))
      throw Error(`Invalid source comment: ${id}.${key}`)
    if (location?.kind === 'css-block-json') {
      if (translated.includes('*/'))
        throw Error(`Invalid source comment: ${id}.${key}`)
      from = JSON.stringify('/* ' + value + ' */').slice(1, -1)
      to = JSON.stringify('/* ' + translated + ' */').slice(1, -1)
    } else if (location && location.kind !== 'line') {
      throw Error(`Invalid comment location: ${id}.${key}`)
    }
    if (
      location &&
      (typeof location.line !== 'string' ||
        !Number.isInteger(location.column) ||
        location.column < 0 ||
        location.line.slice(location.column, location.column + from.length) !==
          from ||
        (location.kind === 'line' &&
          location.line.slice(location.column) !== from))
    ) {
      throw Error(`Invalid comment location: ${id}.${key}`)
    }
    const matches = []
    let offset = 0
    for (const raw of source.split('\n')) {
      const line = raw.endsWith('\r') ? raw.slice(0, -1) : raw
      if (location ? line === location.line : line.trimStart() === from) {
        matches.push(
          offset +
            (location
              ? location.column
              : line.length - line.trimStart().length),
        )
      }
      offset += raw.length + 1
    }
    if (matches.length !== 1)
      throw Error(
        `${matches.length ? 'Ambiguous' : 'Missing'} source comment: ${id}.${key}`,
      )
    edits.push({ start: matches[0], end: matches[0] + from.length, to })
  }
  edits.sort((a, b) => b.start - a.start)
  for (let index = 0; index < edits.length; index++) {
    const edit = edits[index]
    if (index && edit.end > edits[index - 1].start)
      throw Error(`Overlapping source comments: ${id}`)
    source = source.slice(0, edit.start) + edit.to + source.slice(edit.end)
  }
  return source
}

export async function writeEnglishReadingSource(
  id,
  commonSource,
  original,
  english,
  { root = defaultRoot, commentLocations = {} } = {},
) {
  const reading = translateExampleComments(
    id,
    commonSource,
    original,
    english,
    commentLocations,
  )
  const readingSource = `/examples-en/${id}/example.js`
  const file = path.join(root, 'public', readingSource)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  await writeGeneratedFile(file, reading)
  return readingSource
}

export async function localizeExampleSource(
  id,
  source,
  aliases = {},
  options = {},
) {
  const { root = defaultRoot, messagesMarker } = options
  const original = read(root, 'content/example-presentations.json')[id]
  if (!original) return { source }
  const unit = read(root, 'src/app/catalog.json').units.find(
    (unit) => unit.id === id,
  )
  if (!unit) throw Error(`Unknown example ID: ${id}`)
  const records = read(
    root,
    `content/locales/en/examples/${unit.seriesId}.json`,
  )
  const english = validateExamplePresentation(
    original,
    records[id]?.presentation,
  )
  const declaration = `const messages=locale==='en'?${JSON.stringify(english.messages)}:${JSON.stringify(original.messages)};`
  if (messagesMarker !== undefined) {
    if (!messagesMarker || source.split(messagesMarker).length !== 2)
      throw Error(`Expected one messages marker: ${id}`)
    source = source.replace(messagesMarker, () => declaration)
  } else {
    // Compatibility is restricted to the four reviewed pilots. New templates bind
    // locale/context and reference messages at explicit display sites themselves.
    if (!pilots.has(id)) throw Error(`Explicit messages marker required: ${id}`)
    for (const [key, value] of Object.entries(original.messages)) {
      const texts = [
        value,
        ...Object.keys(aliases).filter((text) => aliases[text] === key),
      ]
      for (const text of texts) {
        for (const literal of [
          JSON.stringify(text),
          "'" + text.replaceAll("'", "\'") + "'",
        ]) {
          source = source.replaceAll(literal, `messages.${key}`)
        }
      }
    }
    const ast = await parsers.babel.parse(source)
    const mounts = ast.program.body.filter(
      (node) =>
        node.type === 'ExportNamedDeclaration' &&
        node.declaration?.type === 'FunctionDeclaration' &&
        node.declaration.id.name === 'mount',
    )
    const mount = mounts[0]?.declaration
    const parameter = mount?.params[0]
    if (
      mounts.length !== 1 ||
      parameter?.type !== 'ObjectPattern' ||
      parameter.properties.some((property) => property.key?.name === 'locale')
    )
      throw Error(`Unsupported pilot mount: ${id}`)
    source =
      source.slice(0, mount.body.start + 1) +
      '\n' +
      declaration +
      '\n' +
      source.slice(mount.body.start + 1)
    source =
      source.slice(0, parameter.start + 1) +
      "locale='ko'," +
      source.slice(parameter.start + 1)
  }
  const readingSource = await writeEnglishReadingSource(
    id,
    source,
    original,
    english,
    options,
  )
  return { source, readingSource }
}

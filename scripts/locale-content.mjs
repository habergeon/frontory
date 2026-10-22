import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

const defaultRoot = path.resolve(import.meta.dirname, '..')
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const fail = message => { throw Error(message) }
const own = (value, key) => Object.hasOwn(value, key)

function keys(value, allowed, label) {
  if (!object(value)) fail(`Expected object: ${label}`)
  for (const key of Object.keys(value)) if (!allowed.includes(key)) fail(`Unknown key ${label}.${key}`)
  for (const key of allowed) if (!own(value, key)) fail(`Missing key ${label}.${key}`)
}

function canonical(value) {
  if (typeof value === 'string') return value.replaceAll('\r\n', '\n')
  if (Array.isArray(value)) return value.map(canonical)
  if (object(value)) return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]))
  return value
}

export function sourceHash(source) {
  return createHash('sha256').update(JSON.stringify(canonical(source))).digest('hex')
}

export function validateExamplePresentation(source, record) {
  const exact = (value, expected) => {
    if (!value || typeof value !== 'object' || Array.isArray(value) ||
      JSON.stringify(Object.keys(value).sort()) !== JSON.stringify([...expected].sort())) throw Error('Invalid presentation keys')
  }
  exact(source, ['messages', 'comments'])
  exact(record, ['sourceHash', 'values'])
  if (record.sourceHash !== sourceHash(source)) throw Error('Stale presentation source hash')
  const fields = Object.entries(source).flatMap(([group, values]) => {
    if (!values || typeof values !== 'object' || Array.isArray(values)) throw Error('Invalid presentation source')
    return Object.keys(values).map(key => `${group}.${key}`)
  })
  exact(record.values, fields)
  const result = { messages: {}, comments: {} }
  for (const field of fields) {
    const [group, key] = field.split('.')
    for (const value of [source[group][key], record.values[field]]) {
      if (typeof value !== 'string' || !value.trim()) throw Error('Expected nonempty presentation string')
    }
    result[group][key] = record.values[field]
  }
  return result
}

function prosePaths(source) {
  const paths = []
  const add = (value, field) => { if (typeof value === 'string') paths.push(field) }
  for (const field of ['title', 'prerequisites', 'goal', 'capstone', 'environment']) add(source[field], field)
  for (const field of ['stages', 'outcomes', 'steps', 'criteria', 'questions']) {
    if (Array.isArray(source[field])) source[field].forEach((value, index) => add(value, `${field}.${index}`))
  }
  for (const [field, fields] of [
    ['concepts', ['title', 'explanation']],
    ['variables', ['name', 'baseline', 'change', 'expected']],
    ['references', ['title']],
  ]) {
    if (Array.isArray(source[field])) source[field].forEach((value, index) => {
      for (const name of fields) add(value[name], `${field}.${index}.${name}`)
    })
  }
  return paths
}

export function mergeTranslation(source, record) {
  keys(record, ['sourceHash', 'values'], 'record')
  if (record.sourceHash !== sourceHash(source)) fail('Stale source hash')
  const allowed = prosePaths(source)
  keys(record.values, allowed, 'values')
  const result = structuredClone(source)
  for (const field of allowed) {
    const text = record.values[field]
    if (typeof text !== 'string' || !text.trim()) fail(`Expected nonempty string: ${field}`)
    const parts = field.split('.')
    const last = parts.pop()
    const parent = parts.reduce((value, key) => value[key], result)
    parent[last] = text
  }
  return result
}

// Extraction is review evidence, not a semantic correctness verdict.
function collectReview(source, translated, location, review) {
  for (const [kind, pattern] of [
    ['numbers', /(?<![\p{L}\p{N}_])[-+]?\d+(?:\.\d+)?/gu],
    ['code', /```[\s\S]*?```|`[^`\n]+`/g],
  ]) {
    const original = source.replaceAll('\r\n', '\n').match(pattern) ?? []
    const english = translated.replaceAll('\r\n', '\n').match(pattern) ?? []
    if (original.length || english.length) review.push({
      location, kind, source: original, translated: english,
      matches: JSON.stringify(original) === JSON.stringify(english),
    })
  }
}

function hasLegacyGuidance(text, documentPath, unit) {
  return text.split('\n').some(line => {
    if (!line.startsWith('|') || !/ — \S.*\|\s*$/.test(line)) return false
    const links = [...line.matchAll(/\]\(([^)]+)\)/g)].map(match =>
      path.posix.resolve(path.posix.dirname(documentPath), match[1]))
    return links.includes(`/src/labs/${unit.id}/example.js`) &&
      links.some(link => link === unit.docPath || link === '/docs/en/' + unit.docPath.slice(6))
  })
}

export function readEnglishContent({ complete = false, root = defaultRoot, review } = {}) {
  const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
  const merge = (source, record, location) => {
    const translated = mergeTranslation(source, record)
    if (review) for (const field of prosePaths(source)) {
      const get = value => field.split('.').reduce((entry, key) => entry[key], value)
      collectReview(get(source), get(translated), location + '.' + field, review)
    }
    return translated
  }
  const catalog = read('src/app/catalog.json')
  const baseline = read('content/catalog-v2.json')
  const manifest = read('content/locales/en/manifest.json')
  keys(manifest, ['publishedUnitIds'], 'manifest')
  if (!Array.isArray(manifest.publishedUnitIds)) fail('Expected publishedUnitIds array')
  const ids = manifest.publishedUnitIds
  const unitMap = new Map(catalog.units.map(unit => [unit.id, unit]))
  if (unitMap.size !== catalog.units.length) fail('Duplicate source unit ID')
  if (new Set(ids).size !== ids.length) fail('Duplicate published unit ID')
  for (const id of ids) if (typeof id !== 'string' || !unitMap.has(id)) fail(`Unknown unit ID: ${id}`)
  if (complete && (catalog.series.length !== 23 || unitMap.size !== 644 || ids.length !== 644)) {
    const missing = catalog.units.filter(unit => !ids.includes(unit.id)).map(unit => unit.id)
    fail('Complete content requires 23 series and 644 approved units' +
      ` (found ${catalog.series.length} series, ${unitMap.size} units, ${ids.length} approved).` +
      (missing.length ? ` Missing approved unit IDs: ${missing.join(', ')}` : ''))
  }
  const selected = new Set(ids)
  const seriesIds = [...new Set(ids.map(id => unitMap.get(id).seriesId))]
  const seriesMap = new Map(baseline.series.map(series => [series.id, series]))
  for (const id of seriesIds) if (!seriesMap.has(id)) fail(`Unknown series ID: ${id}`)
  const seriesRecords = read('content/locales/en/series.json')
  keys(seriesRecords, seriesIds, 'series')
  const directory = path.join(root, 'content/locales/en/curricula')
  const files = fs.existsSync(directory) ? fs.readdirSync(directory) : []
  const expectedFiles = seriesIds.filter(id => id !== 'webgl').map(id => `${id}.json`)
  for (const file of files) if (!expectedFiles.includes(file)) fail(`Unknown curriculum file: ${file}`)
  const result = { catalog: { series: [], units: [] }, documents: new Map(), publishedUnitIds: [...ids], curricula: {}, exampleNotes: {}, examplePresentations: {} }
  for (const sourceSeries of baseline.series.filter(series => seriesIds.includes(series.id))) {
    const metadata = { title: sourceSeries.title, prerequisites: sourceSeries.prerequisites }
    if (sourceSeries.id === 'webgl') metadata.stages = sourceSeries.stages
    const series = { ...structuredClone(sourceSeries), ...merge(metadata, seriesRecords[sourceSeries.id], `series:${sourceSeries.id}`) }
    const requiredIds = catalog.units.filter(unit => unit.seriesId === series.id && selected.has(unit.id)).map(unit => unit.id)
    if (series.id === 'webgl') {
      const records = read('content/locales/en/webgl.json')
      keys(records, ['units'], 'webgl')
      keys(records.units, requiredIds, 'webgl.units')
      for (const id of requiredIds) {
        const source = baseline.units.find(unit => unit.id === id && unit.seriesId === 'webgl')
        if (!source) fail(`Unknown WebGL unit ID: ${id}`)
        result.catalog.units.push(merge(source, records.units[id], `unit:${id}`))
      }
      result.catalog.series.push(series)
      continue
    }
    const source = read(`content/curricula/${series.id}.json`)
    if (source.seriesId !== series.id || !Array.isArray(source.stages) || !source.stages.length ||
      source.stages.some(stage => typeof stage !== 'string' || !stage.trim())) fail(`Invalid source series: ${series.id}`)
    const { units, ...seriesSource } = source
    const sourceUnits = new Map(units.map(unit => [unit.id, unit]))
    if (sourceUnits.size !== units.length) fail(`Duplicate source unit ID: ${series.id}`)
    const records = read(`content/locales/en/curricula/${series.id}.json`)
    keys(records, ['series', 'units'], `curricula.${series.id}`)
    keys(records.units, requiredIds, `units.${series.id}`)
    const translated = merge(seriesSource, records.series, `curriculum:${series.id}`)
    series.stages = translated.stages
    result.catalog.series.push(series)
    translated.units = []
    for (const id of requiredIds) {
      const original = sourceUnits.get(id)
      const entry = unitMap.get(id)
      if (!original || original.day !== entry.day) fail(`Invalid source unit ID or day: ${id}`)
      const unit = merge(original, records.units[id], `unit:${id}`)
      translated.units.push(unit)
      result.catalog.units.push({ ...entry, title: unit.title, goal: unit.outcomes.join(' ') })
    }
    result.curricula[series.id] = translated
  }
  const presentationFile = path.join(root, 'content/example-presentations.json')
  const presentations = fs.existsSync(presentationFile) ? read('content/example-presentations.json') : {}
  const exampleDirectory = path.join(root, 'content/locales/en/examples')
  const exampleSources = new Map(seriesIds.map(id => {
    const file = `content/examples/${id}.json`
    return [id, fs.existsSync(path.join(root, file)) ? read(file) : {}]
  }))
  const exampleSeriesIds = seriesIds.filter(id => ids.some(unitId =>
    unitMap.get(unitId).seriesId === id && own(exampleSources.get(id), unitId)))
  if (fs.existsSync(exampleDirectory)) {
    for (const file of fs.readdirSync(exampleDirectory)) {
      if (!exampleSeriesIds.some(id => file === `${id}.json`)) fail(`Unknown example file: ${file}`)
    }
  }
  for (const seriesId of exampleSeriesIds) {
    const sources = exampleSources.get(seriesId)
    const requiredIds = ids.filter(id => unitMap.get(id).seriesId === seriesId && own(sources, id))
    const records = read(`content/locales/en/examples/${seriesId}.json`)
    keys(records, requiredIds, `examples.${seriesId}`)
    for (const id of requiredIds) {
      const record = records[id]
      keys(record, ['sourceHash', 'values', ...(own(presentations, id) ? ['presentation'] : [])], `examples.${id}`)
      if (record.sourceHash !== sourceHash(sources[id])) fail(`Stale example source hash: ${id}`)
      keys(record.values, ['note'], `examples.${id}.values`)
      if (typeof record.values.note !== 'string' || !record.values.note.trim()) fail(`Expected nonempty note string: ${id}`)
      if (typeof sources[id].note !== 'string' || !sources[id].note.trim()) fail(`Expected nonempty source note: ${id}`)
      if (review) collectReview(sources[id].note, record.values.note, `example:${id}.note`, review)
      if (own(presentations, id)) {
        result.examplePresentations[id] = validateExamplePresentation(presentations[id], record.presentation)
        if (review) for (const group of ['messages', 'comments']) {
          for (const key of Object.keys(presentations[id][group])) collectReview(
            presentations[id][group][key], result.examplePresentations[id][group][key],
            `presentation:${id}.${group}.${key}`, review)
        }
      }
      if (own(sources[id], 'readingSource')) {
        const expected = `/examples-en/${id}/example.js`
        if (sources[id].readingSource !== expected || !fs.existsSync(path.join(root, 'public', expected))) fail(`Invalid or missing reading source: ${id}`)
      }
      result.exampleNotes[id] = record.values.note
    }
  }
  const documentFile = path.join(root, 'content/locales/en/documents.json')
  const documents = fs.existsSync(documentFile) ? read('content/locales/en/documents.json') : {}
  if (!object(documents)) fail('Expected documents object')
  for (const [docPath, record] of Object.entries(documents)) {
    keys(record, ['sourceHash', 'translatedPath'], `documents.${docPath}`)
    if (!docPath.startsWith('/docs/') || docPath.startsWith('/docs/en/') || !docPath.endsWith('.md') ||
      docPath.includes('\\') || docPath.split('/').some(part => part === '..' || part === '.')) fail(`Invalid document path: ${docPath}`)
    if (record.translatedPath !== '/docs/en/' + docPath.slice('/docs/'.length)) fail(`Invalid translated document path: ${docPath}`)
    const source = fs.readFileSync(path.join(root, docPath.slice(1)), 'utf8')
    if (record.sourceHash !== sourceHash(source)) fail(`Stale document source hash: ${docPath}`)
    const text = fs.readFileSync(path.join(root, record.translatedPath.slice(1)), 'utf8')
    if (!text.trim()) fail(`Empty translated document: ${docPath}`)
    if (review) collectReview(source, text, `document:${docPath}`, review)
    result.documents.set(docPath, { translatedPath: record.translatedPath, text })
  }
  if (complete) {
    const requiredDocs = ['/docs/about.md', '/docs/privacy.md', '/docs/learning-workspace.md',
      '/docs/roadmap.md', '/docs/examples.md', '/docs/labs/README.md',
      ...catalog.series.filter(series => series.id === 'webgl').map(series => series.docPath),
      ...catalog.units.filter(unit => unit.seriesId === 'webgl').map(unit => unit.docPath)]
    for (const docPath of requiredDocs) if (!result.documents.has(docPath)) fail(`Missing complete document: ${docPath}`)
    const guidePath = '/docs/examples.md'
    const sourceGuide = fs.readFileSync(path.join(root, guidePath.slice(1)), 'utf8')
    const englishGuide = result.documents.get(guidePath)
    const legacyIds = new Set(baseline.units.map(unit => unit.id))
    for (const unit of catalog.units) {
      if (!fs.existsSync(path.join(root, 'src/labs', unit.id, 'example.js'))) fail(`Missing complete example source: ${unit.id}`)
      if (own(exampleSources.get(unit.seriesId), unit.id)) continue
      if (!legacyIds.has(unit.id) || !hasLegacyGuidance(sourceGuide, guidePath, unit) ||
        !hasLegacyGuidance(englishGuide.text, englishGuide.translatedPath, unit)) {
        fail(`Missing complete example guidance: ${unit.id}`)
      }
    }
  }
  return result
}

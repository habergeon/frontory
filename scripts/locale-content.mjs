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

export function readEnglishContent({ complete = false, root = defaultRoot } = {}) {
  const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
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
    fail('Complete content requires 23 series and 644 approved units')
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
  const result = { catalog: { series: [], units: [] }, documents: new Map(), publishedUnitIds: [...ids], curricula: {} }
  for (const sourceSeries of baseline.series.filter(series => seriesIds.includes(series.id))) {
    const metadata = { title: sourceSeries.title, prerequisites: sourceSeries.prerequisites }
    if (sourceSeries.id === 'webgl') metadata.stages = sourceSeries.stages
    const series = { ...structuredClone(sourceSeries), ...mergeTranslation(metadata, seriesRecords[sourceSeries.id]) }
    const requiredIds = catalog.units.filter(unit => unit.seriesId === series.id && selected.has(unit.id)).map(unit => unit.id)
    if (series.id === 'webgl') {
      const records = read('content/locales/en/webgl.json')
      keys(records, ['units'], 'webgl')
      keys(records.units, requiredIds, 'webgl.units')
      for (const id of requiredIds) {
        const source = baseline.units.find(unit => unit.id === id && unit.seriesId === 'webgl')
        if (!source) fail(`Unknown WebGL unit ID: ${id}`)
        result.catalog.units.push(mergeTranslation(source, records.units[id]))
      }
      result.catalog.series.push(series)
      continue
    }
    const source = read(`content/curricula/${series.id}.json`)
    if (source.seriesId !== series.id || source.stages.length !== sourceSeries.stages.length) fail(`Invalid source series: ${series.id}`)
    const { units, ...seriesSource } = source
    const sourceUnits = new Map(units.map(unit => [unit.id, unit]))
    if (sourceUnits.size !== units.length) fail(`Duplicate source unit ID: ${series.id}`)
    const records = read(`content/locales/en/curricula/${series.id}.json`)
    keys(records, ['series', 'units'], `curricula.${series.id}`)
    keys(records.units, requiredIds, `units.${series.id}`)
    const translated = mergeTranslation(seriesSource, records.series)
    series.stages = translated.stages
    result.catalog.series.push(series)
    translated.units = []
    for (const id of requiredIds) {
      const original = sourceUnits.get(id)
      const entry = unitMap.get(id)
      if (!original || original.day !== entry.day) fail(`Invalid source unit ID or day: ${id}`)
      const unit = mergeTranslation(original, records.units[id])
      translated.units.push(unit)
      result.catalog.units.push({ ...entry, title: unit.title, goal: unit.outcomes.join(' ') })
    }
    result.curricula[series.id] = translated
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
    result.documents.set(docPath, { translatedPath: record.translatedPath, text })
  }
  if (complete) {
    const requiredDocs = ['/docs/about.md', '/docs/privacy.md', '/docs/learning-workspace.md',
      '/docs/roadmap.md', '/docs/examples.md', '/docs/labs/README.md',
      ...catalog.series.filter(series => series.id === 'webgl').map(series => series.docPath),
      ...catalog.units.filter(unit => unit.seriesId === 'webgl').map(unit => unit.docPath)]
    for (const docPath of requiredDocs) if (!result.documents.has(docPath)) fail(`Missing complete document: ${docPath}`)
  }
  return result
}

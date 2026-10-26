import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { pathToFileURL } from 'node:url'

const defaultRoot = path.resolve(import.meta.dirname, '..')
const fail = (message) => {
  throw Error(message)
}
const requireValue = (condition, message) => {
  if (!condition) fail(message)
}
const text = (value) => typeof value === 'string' && value.trim().length > 0
const reason = (value) =>
  requireValue(
    value && text(value.ko) && text(value.en),
    'Bilingual reason required',
  )
const sha = (algorithm, bytes) =>
  createHash(algorithm).update(bytes).digest('hex')
const https = (value) => {
  const url = new URL(value)
  requireValue(
    url.protocol === 'https:' && !url.username && !url.password,
    'HTTPS source URL required',
  )
}

export function checkReferences({ root = defaultRoot, manifest } = {}) {
  const read = (file) =>
    JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
  manifest ??= read('content/references/manifest.json')
  const catalog = read('src/app/catalog.json')
  const packages = read('package.json')
  const declared = { ...packages.dependencies, ...packages.devDependencies }
  const lock = fs
    .readFileSync(path.join(root, 'pnpm-lock.yaml'), 'utf8')
    .replaceAll('\r\n', '\n')
  const importer =
    lock.split('\nimporters:\n')[1]?.split('\npackages:\n')[0] ?? ''
  const evidence = read(
    'content/references/provenance/three-source-evidence.json',
  )
  const pins = read('content/references/provenance/pinning-checks.json')
  requireValue(manifest.version === 1, 'Unsupported reference manifest version')
  requireValue(
    Array.isArray(manifest.series) && Array.isArray(manifest.sources),
    'Reference arrays required',
  )
  const actual = manifest.series.map((series) => series.id).sort()
  const expected = catalog.series.map((series) => series.id).sort()
  requireValue(
    JSON.stringify(actual) === JSON.stringify(expected),
    'Reference series coverage mismatch',
  )
  const sources = new Map()
  for (const source of manifest.sources) {
    requireValue(
      text(source.id) && !sources.has(source.id),
      'Duplicate source or missing source ID',
    )
    sources.set(source.id, source)
  }
  const usedSources = new Set()
  const runtimeVersions = new Map()
  for (const series of manifest.series) {
    requireValue(
      Array.isArray(series.sourceIds) && series.sourceIds.length > 0,
      'Series sources required: ' + series.id,
    )
    requireValue(
      new Set(series.sourceIds).size === series.sourceIds.length,
      'Duplicate series source: ' + series.id,
    )
    for (const id of series.sourceIds) {
      requireValue(sources.has(id), 'Unknown source: ' + id)
      usedSources.add(id)
    }
    requireValue(
      Array.isArray(series.runtime) && series.runtime.length > 0,
      'Runtime records required: ' + series.id,
    )
    for (const runtime of series.runtime) {
      if (runtime.kind === 'package') {
        requireValue(
          text(runtime.name) && !runtime.name.startsWith('@types/'),
          'A type declaration is not a runtime package',
        )
        requireValue(
          declared[runtime.name] === runtime.version,
          'Declared package version mismatch: ' + runtime.name,
        )
        const escaped = runtime.name.replaceAll('.', '[.]')
        const locked = importer.match(
          new RegExp(
            "^      '?" +
              escaped +
              "'?:\n        specifier: ([^\n]+)\n        version: ([^\n]+)",
            'm',
          ),
        )
        requireValue(
          locked &&
            locked[1] === runtime.version &&
            locked[2].split('(')[0] === runtime.version,
          'Locked package version mismatch: ' + runtime.name,
        )
        const installed = read('node_modules/' + runtime.name + '/package.json')
        requireValue(
          installed.name === runtime.name &&
            installed.version === runtime.version,
          'Installed package version mismatch: ' + runtime.name,
        )
        runtimeVersions.set(runtime.name, runtime.version)
        requireValue(
          [
            'preview',
            'preview-store',
            'repository-typecheck',
            'editor-language-service',
          ].includes(runtime.scope),
          'Unknown package scope',
        )
      } else if (runtime.kind === 'bundled') {
        requireValue(
          runtime.name === 'typescript' &&
            runtime.package === 'monaco-editor' &&
            runtime.packageVersion === runtimeVersions.get('monaco-editor') &&
            runtime.evidencePath ===
              'esm/vs/language/typescript/lib/typescriptServices.js' &&
            runtime.scope === 'editor-diagnostics-and-emit',
          'Bundled service evidence mismatch',
        )
        const services = fs.readFileSync(
          path.join(root, 'node_modules/monaco-editor', runtime.evidencePath),
          'utf8',
        )
        requireValue(
          services.match(/var version = "([^"]+)";/)?.[1] === runtime.version,
          'Bundled service version mismatch',
        )
        reason(runtime.reason)
      } else {
        requireValue(
          ['browser', 'external', 'self'].includes(runtime.kind) &&
            runtime.version === null,
          'Unverified runtime must retain a null version',
        )
        reason(runtime.reason)
      }
    }
  }
  requireValue(
    usedSources.size === sources.size,
    'Unreferenced source outside series scope',
  )
  let rawFiles = 0
  for (const source of manifest.sources) {
    requireValue(
      text(source.title) && source.locale === 'en',
      'Source title and verified locale required',
    )
    https(source.url)
    for (const link of source.relatedUrls ?? []) {
      requireValue(text(link.title), 'Related source title required')
      https(link.url)
    }
    const revision = source.revision
    requireValue(
      revision && ['live', 'commit'].includes(revision.kind),
      'Unknown document revision',
    )
    requireValue(
      /^\d{4}-\d{2}-\d{2}$/.test(revision.reviewedOn) &&
        !Number.isNaN(Date.parse(revision.reviewedOn)),
      'Review date required',
    )
    requireValue(
      ['prior-official-research', 'preserved-official-evidence'].includes(
        revision.basis,
      ),
      'Review provenance basis required',
    )
    requireValue(
      ['exact', 'unverified'].includes(source.compatibility?.status),
      'Unknown compatibility status',
    )
    reason(source.compatibility.reason)
    requireValue(
      ['confirmed', 'needs-review', 'restricted'].includes(
        source.rights?.status,
      ),
      'Unknown rights status',
    )
    reason(source.rights.reason)
    if (source.rights.status === 'confirmed')
      requireValue(
        text(source.rights.license) && text(source.rights.licenseUrl),
        'Confirmed license evidence required',
      )
    if (source.rights.licenseUrl) https(source.rights.licenseUrl)
    requireValue(
      ['raw-only', 'link-only'].includes(source.body?.status),
      'Body status must not claim internal readability',
    )
    reason(source.body.reason)
    requireValue(Array.isArray(source.files), 'Source files required')
    if (source.body.status === 'link-only')
      requireValue(
        source.files.length === 0 && source.body.files === undefined,
        'Link-only source cannot contain acquired files',
      )
    else
      requireValue(
        source.rights.status === 'confirmed' &&
          text(source.rights.evidenceFile) &&
          source.files.some((file) => file.path === source.rights.evidenceFile),
        'Raw license evidence required',
      )
    if (source.compatibility.status === 'exact') {
      requireValue(
        revision.kind === 'commit' &&
          /^[a-f0-9]{40}$/.test(revision.commit) &&
          text(revision.repository) &&
          text(source.compatibility.evidenceFile),
        'Exact correspondence requires pinned package evidence',
      )
      requireValue(
        runtimeVersions.get(source.compatibility.package) ===
          source.compatibility.version,
        'Exact correspondence runtime mismatch',
      )
      const packageFile = source.files.find(
        (file) => file.path === source.compatibility.evidenceFile,
      )
      requireValue(packageFile, 'Exact correspondence package evidence missing')
    }
    const paths = new Set()
    for (const file of source.files) {
      requireValue(
        text(file.path) && !paths.has(file.path),
        'Duplicate raw source path',
      )
      paths.add(file.path)
      requireValue(
        typeof file.localPath === 'string' &&
          /^raw\/[a-zA-Z0-9._/-]+\.txt$/.test(file.localPath) &&
          !file.localPath.split('/').includes('..'),
        'Raw local path must remain an inert .txt asset',
      )
      const local = path.resolve(root, 'content/references', file.localPath)
      const rawRoot = fs.realpathSync(path.join(root, 'content/references/raw'))
      const relative = path.relative(rawRoot, fs.realpathSync(local))
      requireValue(
        relative !== '..' &&
          !relative.startsWith('..' + path.sep) &&
          !path.isAbsolute(relative),
        'Raw local path escapes raw storage',
      )
      const bytes = fs.readFileSync(local)
      requireValue(
        file.bytes === bytes.length &&
          file.sha256 === sha('sha256', bytes) &&
          file.gitBlobSha ===
            sha(
              'sha1',
              Buffer.concat([
                Buffer.from('blob ' + bytes.length + '\0'),
                bytes,
              ]),
            ),
        'Raw integrity mismatch: ' + file.path,
      )
      requireValue(
        revision.kind === 'commit' &&
          file.url ===
            `https://raw.githubusercontent.com/${revision.repository}/${revision.commit}/${file.path}`,
        'Pinned raw URL mismatch: ' + file.path,
      )
      const preserved = evidence.files.find((entry) => entry.path === file.path)
      requireValue(
        source.id === 'three-r186' &&
          revision.commit === evidence.commit &&
          revision.commit === pins.three.commit &&
          revision.tag === evidence.tag &&
          revision.tagObject === evidence.tagObject &&
          revision.tagSigned === false &&
          preserved &&
          ['url', 'bytes', 'sha256', 'gitBlobSha', 'retrievedAt'].every(
            (key) => file[key] === preserved[key],
          ),
        'Preserved provenance mismatch: ' + file.path,
      )
      rawFiles++
    }
    if (source.body.status === 'raw-only') {
      requireValue(
        source.files.length === evidence.files.length &&
          Array.isArray(source.body.files) &&
          source.body.files.length > 0 &&
          source.body.files.every(
            (file) =>
              paths.has(file) &&
              file !== source.rights.evidenceFile &&
              file !== source.compatibility.evidenceFile,
          ),
        'Raw body selection mismatch',
      )
      const license = source.files.find(
        (file) => file.path === source.rights.evidenceFile,
      )
      const notice = fs.readFileSync(
        path.join(root, 'content/references', license.localPath),
        'utf8',
      )
      requireValue(
        source.rights.license === 'MIT' &&
          notice.includes('MIT License') &&
          notice.includes('Copyright') &&
          notice.includes('Permission is hereby granted'),
        'Raw license notice mismatch',
      )
    }
    if (source.compatibility.status === 'exact') {
      const file = source.files.find(
        (file) => file.path === source.compatibility.evidenceFile,
      )
      const metadata = read('content/references/' + file.localPath)
      requireValue(
        metadata.name === source.compatibility.package &&
          metadata.version === source.compatibility.version,
        'Exact correspondence package evidence mismatch',
      )
    }
  }
  return {
    series: manifest.series.length,
    sources: sources.size,
    rawFiles,
    readableDocuments: 0,
  }
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  try {
    console.log(JSON.stringify(checkReferences()))
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}

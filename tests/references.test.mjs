import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { checkReferences } from '../scripts/check-references.mjs'

const repository = path.resolve(import.meta.dirname, '..')
const read = file => JSON.parse(fs.readFileSync(path.join(repository, file), 'utf8'))
const baseline = read('content/references/manifest.json')
const change = mutate => { const manifest = structuredClone(baseline); mutate(manifest); return manifest }
const three = manifest => manifest.sources.find(source => source.id === 'three-r186')

test('reference inventory covers 23 series and keeps acquired raw documents separate from readable content', () => {
  assert.deepEqual(checkReferences(), { series: 23, sources: 20, rawFiles: 7, readableDocuments: 0 })
  assert.equal(baseline.series.find(series => series.id === 'playwright').runtime[0].version, null)
  assert.equal(baseline.series.find(series => series.id === 'svelte').runtime.find(runtime => runtime.kind === 'external').version, null)
  assert.equal(baseline.sources.filter(source => source.compatibility.status === 'exact').length, 1)
})

for (const [name, mutate, pattern] of [
  ['missing series', m => m.series.pop(), /series coverage/],
  ['duplicate series', m => m.series.push(m.series[0]), /series coverage/],
  ['unknown source', m => m.series[0].sourceIds.push('unknown'), /Unknown source/],
  ['duplicate source', m => m.sources.push(m.sources[0]), /Duplicate source/],
  ['runtime package drift', m => m.series.find(s => s.id === 'threejs').runtime[0].version = '0.186.0', /package version/],
  ['type declarations mistaken for runtime', m => m.series[0].runtime[0].name = '@types/three', /type declaration/],
  ['bundled compiler drift', m => m.series.find(s => s.id === 'typescript').runtime.find(r => r.kind === 'bundled').version = '7.0.2', /Bundled service version/],
  ['invented external version', m => m.series.find(s => s.id === 'playwright').runtime[0].version = '1.0.0', /Unverified runtime/],
  ['missing English reason', m => delete m.sources[0].body.reason.en, /Bilingual reason/],
  ['readable claim for raw HTML', m => three(m).body.status = 'readable', /Body status/],
  ['link-only source with raw files', m => m.sources[0].files.push(three(m).files[0]), /Link-only/],
  ['raw text without license', m => delete three(m).rights.evidenceFile, /Raw license/],
  ['raw text with unconfirmed rights', m => three(m).rights.status = 'needs-review', /Raw license/],
  ['moving raw URL', m => three(m).files[0].url = three(m).files[0].url.replace(three(m).revision.commit, 'master'), /Pinned raw URL/],
  ['path traversal', m => three(m).files[0].localPath = '../outside.txt', /Raw local path/],
  ['public HTML output', m => three(m).files[0].localPath = '../../public/reference.html', /Raw local path/],
  ['raw hash drift', m => three(m).files[0].sha256 = '0'.repeat(64), /Raw integrity/],
  ['invented acquisition timestamp', m => three(m).files[0].retrievedAt = '2026-10-23T00:00:00Z', /Preserved provenance/],
  ['unproven exact correspondence', m => Object.assign(m.sources[0].compatibility, { status: 'exact', package: 'three', version: '0.186.1' }), /Exact correspondence/],
]) {
  test('rejects ' + name, () => assert.throws(() => checkReferences({ manifest: change(mutate) }), pattern))
}

test('raw bytes and installed/locked package versions are checked independently of manifest claims', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'frontory-references-'))
  t.after(() => {
    assert.ok(root.startsWith(path.join(os.tmpdir(), 'frontory-references-')))
    fs.rmSync(root, { recursive: true, force: true })
  })
  fs.cpSync(path.join(repository, 'content/references'), path.join(root, 'content/references'), { recursive: true })
  for (const file of ['package.json', 'pnpm-lock.yaml', 'src/app/catalog.json']) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    fs.copyFileSync(path.join(repository, file), path.join(root, file))
  }
  for (const entry of baseline.series.flatMap(series => series.runtime).filter(entry => entry.kind === 'package')) {
    const file = path.join(root, 'node_modules', entry.name, 'package.json')
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, JSON.stringify({ name: entry.name, version: entry.version }))
  }
  const service = 'node_modules/monaco-editor/esm/vs/language/typescript/lib/typescriptServices.js'
  fs.mkdirSync(path.dirname(path.join(root, service)), { recursive: true })
  fs.copyFileSync(path.join(repository, service), path.join(root, service))
  assert.equal(checkReferences({ root }).rawFiles, 7)
  const installed = path.join(root, 'node_modules/three/package.json')
  fs.writeFileSync(installed, JSON.stringify({ name: 'three', version: '0.186.0' }))
  assert.throws(() => checkReferences({ root }), /Installed package version/)
  fs.writeFileSync(installed, JSON.stringify({ name: 'three', version: '0.186.1' }))
  const lockFile = path.join(root, 'pnpm-lock.yaml')
  const lock = fs.readFileSync(lockFile, 'utf8')
  fs.writeFileSync(lockFile, lock.replace(/(      three:\r?\n        specifier: )0\.186\.1/, '$10.186.0'))
  assert.throws(() => checkReferences({ root }), /Locked package version/)
  fs.writeFileSync(lockFile, lock)
  const raw = path.join(root, 'content/references', three(baseline).files[0].localPath)
  fs.appendFileSync(raw, '\nchanged')
  assert.throws(() => checkReferences({ root }), /Raw integrity/)
})

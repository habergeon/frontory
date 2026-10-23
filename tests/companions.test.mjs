import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

const sha = data => createHash('sha256').update(data).digest('hex')
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'))

test('companion inventory covers original paths and every actual English artifact separately', async () => {
  const manifest = read('content/locales/en/companions.json')
  const { companionOutputs } = await import('../scripts/companion-guidance.mjs')
  const outputs = companionOutputs()
  assert.equal(manifest.entries.length, 233)
  const originals = manifest.entries.map(entry => entry.path).sort()
  const actual = fs.readdirSync('src/labs', { recursive: true }).map(file => 'src/labs/' + file.split(path.sep).join('/'))
    .filter(file => fs.statSync(file).isFile() && !file.endsWith('/example.js') && !Object.hasOwn(outputs, file)).sort()
  assert.deepEqual(actual, originals)
  assert.equal(new Set(originals).size, 233)
  assert.deepEqual(Object.fromEntries(['code', 'display', 'fixture', 'binary'].map(kind => [kind, manifest.entries.filter(entry => entry.kind === kind).length])), { code: 198, display: 7, fixture: 25, binary: 3 })
  for (const entry of manifest.entries) {
    const bytes = fs.readFileSync(entry.path)
    assert.equal(sha(entry.kind === 'binary' ? bytes : bytes.toString('utf8').replaceAll('\r\n', '\n')), entry.sourceSha256, entry.path)
    assert.ok(entry.originalSha256.match(/^[a-f0-9]{64}$/))
    assert.ok(entry.verification.status)
    assert.ok(fs.existsSync(entry.guidancePath), entry.path)
    if (entry.englishPath) assert.ok(fs.existsSync(entry.englishPath), entry.englishPath)
  }
  for (const [file, expected] of Object.entries(outputs)) assert.equal(fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n'), expected.replaceAll('\r\n', '\n'), file)
  for (const [file, contents] of Object.entries(outputs)) {
    for (const match of contents.matchAll(/\]\(\.\/([^)]*)\)/g)) assert.ok(fs.existsSync(path.join(path.dirname(file), match[1])), `${file}: ${match[1]}`)
  }
  for (const unit of ['webassembly-02', 'webassembly-03']) {
    assert.match(fs.readFileSync(`src/labs/${unit}/COMPANIONS.en.md`, 'utf8'), /node benchmark\.mjs/)
    assert.ok(fs.existsSync(`src/labs/${unit}/benchmark.mjs`))
  }
})

test('source contracts, binary assets, Korean locales and UTF-8 fixtures survive localization', () => {
  const manifest = read('content/locales/en/companions.json')
  for (const entry of manifest.entries) {
    if (!entry.sourceChange) assert.equal(entry.sourceSha256, entry.originalSha256, entry.path)
    else {
      assert.ok(['notes-textbox-role', 'manual-scene-assignment-document-path'].includes(entry.sourceChange.id))
      let current = fs.readFileSync(entry.path, 'utf8').replaceAll('\r\n', '\n')
      for (const change of entry.additionalSourceChanges ?? []) {
        assert.equal(change.id, 'paused-clock-before-input')
        assert.equal(current.split(change.to).length - 1, change.occurrences)
        current = current.replaceAll(change.to, change.from)
      }
      const { from, to, occurrences = 1 } = entry.sourceChange
      assert.equal(current.split(to).length - 1, occurrences, entry.path)
      assert.equal(sha(current.replaceAll(to, from)), entry.originalSha256, entry.path)
    }
    for (const span of entry.contracts) assert.ok(fs.readFileSync(entry.path, 'utf8').replaceAll('\r\n', '\n').includes(span.exact.replaceAll('\r\n', '\n')), `${entry.path}: ${span.kind}`)
  }
  const original = fs.readFileSync('src/labs/html-step-18/captions.vtt', 'utf8')
  const english = fs.readFileSync('src/labs/html-step-18/captions.en.vtt', 'utf8')
  assert.equal(original.split('\n')[0], english.split('\n')[0])
  assert.deepEqual(english.match(/^.*-->.*$/gm), original.match(/^.*-->.*$/gm))
  assert.doesNotMatch(english, /[가-힣]/)
  assert.match(fs.readFileSync('src/labs/webassembly-step-18/experiment.mjs', 'utf8'), /한글 🎨/)
})

test('English reading annotations contain all 124 approved prose pairs without executable forks', () => {
  const input = read('content/locales/en/companion-prose.json')
  const manifest = read('content/locales/en/companions.json')
  assert.equal(input.translations.length, 124)
  for (const pair of input.translations) {
    const entry = manifest.entries.find(entry => entry.path === pair.path)
    assert.ok(entry)
    assert.ok(fs.readFileSync(entry.englishPath, 'utf8').includes(pair.english), pair.id)
  }
  assert.equal(manifest.entries.filter(entry => entry.path.endsWith('/README.md')).length, 5)
  const scene = fs.readFileSync('src/labs/01-scene/SceneLab.tsx', 'utf8')
  assert.match(scene, /docs\/labs\/graphics\/webgl\/01-scene\/README.md/)
})

test('Notes input locator names and fixture/assertion contracts stay coherent', () => {
  const manifest = read('content/locales/en/companions.json')
  const changed = manifest.entries.filter(entry => entry.sourceChange?.id === 'notes-textbox-role')
  assert.equal(changed.length, 15)
  for (const entry of changed) {
    const source = fs.readFileSync(entry.path, 'utf8')
    assert.doesNotMatch(source, /getByLabel\('Notes',\{exact:true\}\)/)
    assert.match(source, /getByRole\('textbox',\{name:'Notes',exact:true\}\)/)
    const runtime = fs.readFileSync(`src/labs/${entry.unitId}/example.js`, 'utf8')
    assert.ok(runtime.includes(JSON.stringify(source.replaceAll('\r\n', '\n')).slice(1, -1)), entry.unitId)
    assert.equal(fs.readFileSync(entry.path.replace('lesson.spec.mjs', 'fixture.html'), 'utf8').includes('<section aria-label="Notes"><label>Notes<textarea>'), true)
  }
})

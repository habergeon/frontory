import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { formatGeneratedText } from '../scripts/format-generated.mjs'
import {
  assertGeneratedSemantics,
  javascriptStructure,
} from '../scripts/generated-source-semantics.mjs'

const sha = (data) => createHash('sha256').update(data).digest('hex')
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'))
const migration = read('content/locales/en/companion-format-migration.json')
function nodes(root, predicate) {
  const result = []
  function walk(node) {
    if (!node || typeof node !== 'object') return
    if (predicate(node)) result.push(node)
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(walk)
      else if (value && typeof value === 'object') walk(value)
    }
  }
  walk(root)
  return result
}
const method = (node) =>
  node.type === 'CallExpression' ? node.callee?.property?.name : undefined

test('companion inventory covers original paths and every actual English artifact separately', async () => {
  const manifest = read('content/locales/en/companions.json')
  const { companionOutputs } = await import('../scripts/companion-guidance.mjs')
  const outputs = companionOutputs()
  assert.equal(manifest.entries.length, 233)
  const originals = manifest.entries.map((entry) => entry.path).sort()
  const actual = fs
    .readdirSync('src/labs', { recursive: true })
    .map((file) => 'src/labs/' + file.split(path.sep).join('/'))
    .filter(
      (file) =>
        fs.statSync(file).isFile() &&
        !file.endsWith('/example.js') &&
        !Object.hasOwn(outputs, file),
    )
    .sort()
  assert.deepEqual(actual, originals)
  assert.equal(new Set(originals).size, 233)
  assert.deepEqual(
    Object.fromEntries(
      ['code', 'display', 'fixture', 'binary'].map((kind) => [
        kind,
        manifest.entries.filter((entry) => entry.kind === kind).length,
      ]),
    ),
    { code: 198, display: 7, fixture: 25, binary: 3 },
  )
  for (const entry of manifest.entries) {
    const bytes = fs.readFileSync(entry.path)
    assert.equal(
      sha(
        entry.kind === 'binary'
          ? bytes
          : bytes.toString('utf8').replaceAll('\r\n', '\n'),
      ),
      entry.sourceSha256,
      entry.path,
    )
    assert.ok(entry.originalSha256.match(/^[a-f0-9]{64}$/))
    assert.ok(entry.verification.status)
    assert.ok(fs.existsSync(entry.guidancePath), entry.path)
    if (entry.englishPath)
      assert.ok(fs.existsSync(entry.englishPath), entry.englishPath)
  }
  for (const [file, expected] of Object.entries(outputs))
    assert.equal(
      fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n'),
      (await formatGeneratedText(file, expected)).replaceAll('\r\n', '\n'),
      file,
    )
  for (const [file, contents] of Object.entries(outputs)) {
    for (const match of contents.matchAll(/\]\(\.\/([^)]*)\)/g))
      assert.ok(
        fs.existsSync(path.join(path.dirname(file), match[1])),
        `${file}: ${match[1]}`,
      )
  }
  for (const unit of ['webassembly-02', 'webassembly-03']) {
    assert.match(
      fs.readFileSync(`src/labs/${unit}/COMPANIONS.en.md`, 'utf8'),
      /node benchmark\.mjs/,
    )
    assert.ok(fs.existsSync(`src/labs/${unit}/benchmark.mjs`))
  }
})

test('source contracts, binary assets, Korean locales and UTF-8 fixtures survive localization', async () => {
  const manifest = read('content/locales/en/companions.json')
  for (const entry of manifest.entries) {
    const record = migration.entries[entry.path]
    if (record) {
      assert.equal(sha(record.before), record.beforeByteSha256, entry.path)
      assert.equal(
        sha(record.before.replaceAll('\r\n', '\n')),
        record.beforeSha256,
        entry.path,
      )
      assert.equal(entry.sourceSha256, record.afterSha256, entry.path)
      assert.equal(entry.sourceByteSha256, record.afterByteSha256, entry.path)
      // Byte provenance describes the generated LF payload; checkout conversion
      // must not invalidate the normalized current-source integrity check.
      assert.equal(
        sha(fs.readFileSync(entry.path, 'utf8').replaceAll('\r\n', '\n')),
        record.afterByteSha256,
        entry.path,
      )
      assert.equal(
        await assertGeneratedSemantics(
          entry.path,
          record.before,
          fs.readFileSync(entry.path, 'utf8'),
        ),
        record.verification.kind,
      )
    }
    if (!entry.sourceChange) {
      assert.equal(
        record?.beforeSha256 ?? entry.sourceSha256,
        entry.originalSha256,
        entry.path,
      )
      assert.equal(
        record?.beforeByteSha256 ?? entry.sourceByteSha256,
        entry.originalByteSha256,
        entry.path,
      )
    } else {
      assert.ok(
        [
          'notes-textbox-role',
          'manual-scene-assignment-document-path',
        ].includes(entry.sourceChange.id),
      )
      let current = (
        record?.before ?? fs.readFileSync(entry.path, 'utf8')
      ).replaceAll('\r\n', '\n')
      for (const change of entry.additionalSourceChanges ?? []) {
        assert.equal(change.id, 'paused-clock-before-input')
        assert.equal(current.split(change.to).length - 1, change.occurrences)
        current = current.replaceAll(change.to, change.from)
      }
      const { from, to, occurrences = 1 } = entry.sourceChange
      assert.equal(current.split(to).length - 1, occurrences, entry.path)
      const original = current.replaceAll(to, from)
      assert.equal(sha(original), entry.originalSha256, entry.path)
      assert.ok(
        [sha(original), sha(original.replaceAll('\n', '\r\n'))].includes(
          entry.originalByteSha256,
        ),
        entry.path,
      )
    }
    for (const span of entry.contracts)
      assert.ok(
        fs
          .readFileSync(entry.path, 'utf8')
          .replaceAll('\r\n', '\n')
          .includes(span.exact.replaceAll('\r\n', '\n')),
        `${entry.path}: ${span.kind}`,
      )
  }
  const original = fs
    .readFileSync('src/labs/html-step-18/captions.vtt', 'utf8')
    .replaceAll('\r\n', '\n')
  const english = fs
    .readFileSync('src/labs/html-step-18/captions.en.vtt', 'utf8')
    .replaceAll('\r\n', '\n')
  assert.equal(original.split('\n')[0], english.split('\n')[0])
  assert.deepEqual(english.match(/^.*-->.*$/gm), original.match(/^.*-->.*$/gm))
  assert.doesNotMatch(english, /[가-힣]/)
  assert.match(
    fs.readFileSync('src/labs/webassembly-step-18/experiment.mjs', 'utf8'),
    /한글 🎨/,
  )
})

test('English reading annotations contain all 124 approved prose pairs without executable forks', () => {
  const input = read('content/locales/en/companion-prose.json')
  const manifest = read('content/locales/en/companions.json')
  assert.equal(input.translations.length, 124)
  for (const pair of input.translations) {
    const entry = manifest.entries.find((entry) => entry.path === pair.path)
    assert.ok(entry)
    assert.ok(
      fs.readFileSync(entry.englishPath, 'utf8').includes(pair.english),
      pair.id,
    )
  }
  assert.equal(
    manifest.entries.filter((entry) => entry.path.endsWith('/README.md'))
      .length,
    5,
  )
  const scene = fs.readFileSync('src/labs/01-scene/SceneLab.tsx', 'utf8')
  assert.match(scene, /docs\/labs\/graphics\/webgl\/01-scene\/README.md/)
})

test('Notes input locator names and fixture/assertion contracts stay coherent', async () => {
  const manifest = read('content/locales/en/companions.json')
  const changed = manifest.entries.filter(
    (entry) => entry.sourceChange?.id === 'notes-textbox-role',
  )
  assert.equal(changed.length, 15)
  for (const entry of changed) {
    const source = fs.readFileSync(entry.path, 'utf8')
    const ast = await javascriptStructure(source)
    const locators = nodes(
      ast,
      (node) =>
        method(node) === 'getByRole' &&
        node.arguments[0]?.value === 'textbox' &&
        node.arguments[1]?.properties.some(
          (property) =>
            property.key.name === 'name' && property.value.value === 'Notes',
        ),
    )
    assert.equal(locators.length, entry.sourceChange.occurrences, entry.path)
    for (const locator of locators)
      assert.ok(
        locator.arguments[1].properties.some(
          (property) =>
            property.key.name === 'exact' && property.value.value === true,
        ),
        entry.path,
      )
    assert.equal(
      nodes(
        ast,
        (node) =>
          method(node) === 'getByLabel' && node.arguments[0]?.value === 'Notes',
      ).length,
      0,
    )
    assert.match(
      fs.readFileSync(
        entry.path.replace('lesson.spec.mjs', 'fixture.html'),
        'utf8',
      ),
      /<section\s+aria-label="Notes">\s*<label>\s*Notes\s*<textarea>/,
    )
  }
})

test('clock test navigates before installing and pausing time, then fills the Notes input', async () => {
  const ast = await javascriptStructure(
    fs.readFileSync('src/labs/playwright-step-19/lesson.spec.mjs', 'utf8'),
  )
  const beforeEach = nodes(ast, (node) => method(node) === 'beforeEach')[0]
  assert.equal(
    nodes(beforeEach.arguments[0].body, (node) => method(node) === 'goto')
      .length,
    1,
  )
  const testCall = nodes(
    ast,
    (node) => node.type === 'CallExpression' && node.callee.name === 'test',
  )[0]
  const calls = nodes(
    testCall.arguments[1].body,
    (node) => node.type === 'CallExpression',
  )
  const install = calls.findIndex(
    (node) =>
      method(node) === 'install' &&
      node.callee.object.property?.name === 'clock',
  )
  const pause = calls.findIndex(
    (node) =>
      method(node) === 'pauseAt' &&
      node.callee.object.property?.name === 'clock',
  )
  const fill = calls.findIndex((node) => method(node) === 'fill')
  assert.ok(install >= 0 && pause > install && fill > pause)
  assert.equal(
    calls[install].arguments[0].properties[0].value.arguments[0].value,
    '2026-01-01T00:00:00Z',
  )
  assert.equal(
    calls[pause].arguments[0].arguments[0].value,
    '2026-01-01T01:00:00Z',
  )
})

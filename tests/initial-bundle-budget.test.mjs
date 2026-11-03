import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  measureInitialBundle,
  assertInitialBudget,
} from '../scripts/check-initial-bundle.mjs'
test('initial budget follows static imports, excludes dynamic imports and fails on excess', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'frontory-budget-'))
  try {
    await mkdir(path.join(root, 'en'))
    const html = '<script type="module" src="/entry.js"></script>'
    for (const file of ['index.html', 'en/index.html'])
      await writeFile(path.join(root, file), html)
    const sources = {
      'entry.js': 'import "./shared.js"; import("./lazy.js");',
      'shared.js': 'export const shared=42;',
      'lazy.js': 'export const lazy="large";',
    }
    for (const [file, source] of Object.entries(sources))
      await writeFile(path.join(root, file), source)
    const pages = await measureInitialBundle(root)
    assert.equal(pages.length, 2)
    assert.deepEqual(
      pages[0].files.map((f) => f.file),
      ['entry.js', 'shared.js'],
    )
    assert.equal(
      pages[0].raw,
      Buffer.byteLength(sources['entry.js'] + sources['shared.js']),
    )
    assert.throws(
      () => assertInitialBudget(pages, { raw: 1, gzip: 1 }),
      /initial JavaScript raw/,
    )
    assert.throws(
      () => assertInitialBudget(pages, { raw: 1e6, gzip: 1 }),
      /initial JavaScript gzip/,
    )
    assertInitialBudget(pages)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

test('initial bundle CLI exits nonzero when the emitted static payload exceeds its budget', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'frontory-bundle-cli-'))
  try {
    await mkdir(path.join(root, 'en'))
    for (const file of ['index.html', 'en/index.html'])
      await writeFile(
        path.join(root, file),
        '<script type="module" src="/entry.js"></script>',
      )
    await writeFile(
      path.join(root, 'entry.js'),
      ' '.repeat(2_200_001) + 'export {}',
    )
    const result = spawnSync(
      process.execPath,
      ['scripts/check-initial-bundle.mjs', root],
      {
        encoding: 'utf8',
        windowsHide: true,
        timeout: 10_000,
      },
    )
    assert.ifError(result.error)
    assert.equal(result.status, 1)
    assert.match(result.stderr, /initial JavaScript raw: .* > 2200000 bytes/)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

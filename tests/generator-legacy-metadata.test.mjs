import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

for (const kind of ['framework', 'graphics', 'gpu', 'engineering']) {
  test(
    kind +
      ' generator preserves baseline metadata while replacing owned entries',
    () => {
      const result = spawnSync(
        process.execPath,
        [
          '--input-type=module',
          '-e',
          `
      import fs from 'node:fs'
      import path from 'node:path'
      import assert from 'node:assert/strict'
      const read = fs.readFileSync.bind(fs)
      const baseline = JSON.parse(read('content/catalog-v2.json', 'utf8')).units
      const originals = new Map(), outputs = new Map()
      fs.readFileSync = (file, options) => {
        const text = read(file, options)
        if (typeof file === 'string' && path.dirname(path.resolve(file)) === path.resolve('content/examples')) {
          const metadata = JSON.parse(text)
          originals.set(path.resolve(file), metadata)
          return JSON.stringify(Object.fromEntries([...Object.entries(metadata).map(([id, item]) => [id, id.includes('-step-') ? { ...item, note: 'stale generated note' } : item]), ['obsolete-unit', { mode: 'browser', note: 'obsolete' }]]))
        }
        return text
      }
      fs.writeFileSync = (file, text) => outputs.set(path.resolve(file), String(text))
      fs.mkdirSync = () => undefined
      await import('./scripts/generate-${kind}-examples.mjs')
      let preserved = 0
      for (const [file, original] of originals) {
        const generated = JSON.parse(outputs.get(file))
        assert.equal(generated['obsolete-unit'], undefined)
        for (const [id, metadata] of Object.entries(original)) {
          assert.deepEqual(generated[id], metadata, id)
          if (baseline.some(unit => unit.id === id)) preserved++
        }
      }
      assert.ok(preserved > 0, 'must exercise legacy metadata')
    `,
        ],
        { encoding: 'utf8', timeout: 60000 },
      )
      assert.equal(result.status, 0, result.stderr || String(result.error))
    },
  )
}

import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = file => fs.readFileSync(file, 'utf8')
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)])
const companions = JSON.parse(read('content/locales/en/companions.json')).entries
const englishFiles = [...walk('docs/en').filter(file => file.endsWith('.md')),
  ...new Set(companions.flatMap(entry => [entry.guidancePath, entry.englishPath]).filter(file => file?.endsWith('.md'))),
  'README.en.md', 'CONTRIBUTING.en.md']

test('English navigation resolves every local link and identifies intentional Korean originals', () => {
  const englishPaths = new Set(englishFiles.map(file => path.resolve(file)))
  for (const file of englishFiles) {
    for (const line of read(file).split('\n')) {
      for (const match of line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
        const destination = match[2].split('#')[0]
        if (!destination || /^(https?:|mailto:)/.test(destination)) continue
        const target = path.resolve(path.dirname(file), destination)
        assert.ok(fs.existsSync(target), `${file}: ${match[0]}`)
        if (!target.endsWith('.md') || englishPaths.has(target)) continue
        if (/Korean|한국어/i.test(match[1])) continue
        const original = companions.find(entry => path.resolve(entry.path) === target)
        assert.ok(original?.englishPath && line.includes(`](./${path.basename(original.englishPath)})`) && line.includes('[English reading]'),
          `${file}: unlabelled Korean Markdown ${match[0]}`)
      }
    }
  }
})

test('all 644 readings and 111 companion execution guides are reachable from the example indexes', () => {
  const catalog = JSON.parse(read('src/app/catalog.en.json'))
  const manual = read('docs/en/examples.md')
  const generated = read('docs/en/examples-expanded.md')
  assert.equal((manual.match(/\[English reading-source download\]/g) ?? []).length, 94)
  assert.equal((generated.match(/\[English reading-source download\]/g) ?? []).length, 550)
  const combined = manual + generated
  for (const unit of catalog.units) {
    assert.ok(combined.includes(`](../../public${unit.exampleReadingSource})`), unit.id)
    assert.ok(combined.includes(`](../../src/labs/${unit.id}/example.js)`), unit.id)
  }
  const guides = new Set(companions.map(entry => entry.guidancePath))
  assert.equal(guides.size, 111)
  for (const guide of guides) assert.ok(combined.includes(`](../../${guide})`), guide)
})

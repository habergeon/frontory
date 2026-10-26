import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { javascriptStructure } from '../scripts/generated-source-semantics.mjs'

function walk(node, visit) {
  if (!node || typeof node !== 'object') return
  visit(node)
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach((child) => walk(child, visit))
    else if (value && typeof value === 'object') walk(value, visit)
  }
}

test('engineering preview displays the exact final companion text written to disk', async () => {
  const manifest = JSON.parse(
    fs.readFileSync('content/locales/en/companions.json', 'utf8'),
  )
  const entries = manifest.entries.filter(
    (entry) => entry.producer === 'scripts/generate-engineering-examples.mjs',
  )
  for (const unitId of new Set(entries.map((entry) => entry.unitId))) {
    const ast = await javascriptStructure(
      fs.readFileSync(`src/labs/${unitId}/example.js`, 'utf8'),
    )
    const previews = []
    walk(ast, (node) => {
      if (
        node.type === 'AssignmentExpression' &&
        node.left.type === 'MemberExpression' &&
        node.left.object.name === 'text' &&
        node.left.property.name === 'textContent'
      )
        previews.push(node.right.value)
    })
    assert.equal(previews.length, 1, unitId)
    for (const entry of entries.filter((entry) => entry.unitId === unitId)) {
      assert.ok(
        previews[0].includes(
          '--- ' +
            path.basename(entry.path) +
            ' ---\n' +
            fs.readFileSync(entry.path, 'utf8').replaceAll('\r\n', '\n'),
        ),
        entry.path,
      )
    }
  }
})

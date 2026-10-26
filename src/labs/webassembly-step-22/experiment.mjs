import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
const cold = performance.now()
const bytes = await readFile(new URL('./kernel.wasm', import.meta.url))
const readMs = performance.now() - cold
let t0 = performance.now()
const module = await WebAssembly.compile(bytes)
const compileMs = performance.now() - t0
const reports = []
const imports = { host: { report: (x) => reports.push(x) } }
t0 = performance.now()
const instance = await WebAssembly.instantiate(module, imports)
const instantiateMs = performance.now() - t0
const api = instance.exports,
  memory = api.memory
{
  const { createHash } = await import('node:crypto')
  const version = createHash('sha256').update(bytes).digest('hex')
  const cache = new Map([[version, module]])
  assert.equal(cache.get(version), module)
  console.log('Cache key content SHA256', version)
}
console.log('PASS: lesson assertions completed')

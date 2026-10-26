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
  const other = await WebAssembly.instantiate(module, imports)
  assert.notEqual(other.exports.memory, memory)
  console.log('One compiled Module, two independent Instance memories')
}
console.log('PASS: lesson assertions completed')

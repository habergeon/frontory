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
  const bytes = new TextEncoder().encode('한글 🎨')
  new Uint8Array(memory.buffer, 64, bytes.length).set(bytes)
  assert.equal(
    new TextDecoder().decode(new Uint8Array(memory.buffer, 64, bytes.length)),
    '한글 🎨',
  )
  console.log(
    'UTF-8 byte length',
    bytes.length,
    'must cross boundary separately from character count',
  )
}
console.log('PASS: lesson assertions completed')

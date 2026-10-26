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
  let initializations = 0
  let promise
  const get = () =>
    (promise ??= (async () => {
      initializations++
      return WebAssembly.instantiate(module, imports)
    })())
  const [a, b] = await Promise.all([get(), get()])
  assert.equal(a, b)
  assert.equal(initializations, 1)
}
console.log('PASS: lesson assertions completed')

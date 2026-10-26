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
  const source = Int32Array.from({ length: 10000 }, (_, i) => i % 100)
  let t = performance.now()
  const view = new Int32Array(memory.buffer, 0, source.length)
  view.set(source)
  const kernelStart = performance.now()
  api.transform(0, source.length)
  const kernelMs = performance.now() - kernelStart,
    result = view.slice(),
    totalMs = performance.now() - t
  assert.deepEqual(
    result,
    source.map((x) => x * 2 + 1),
  )
  console.table({ kernelMs, totalWithCopiesMs: totalMs })
}
console.log('PASS: lesson assertions completed')

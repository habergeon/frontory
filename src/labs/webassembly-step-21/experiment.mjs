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
  const { Worker } = await import('node:worker_threads')
  const worker = new Worker(new URL('./worker.mjs', import.meta.url))
  const result = await new Promise((resolve, reject) => {
    worker.once('message', resolve)
    worker.once('error', reject)
    const values = new Int32Array([2, 4, 6])
    worker.postMessage({ module, buffer: values.buffer }, [values.buffer])
    assert.equal(values.byteLength, 0)
  })
  await worker.terminate()
  assert.equal(result, 12)
}
console.log('PASS: lesson assertions completed')

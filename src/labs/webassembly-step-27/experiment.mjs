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
  const source = Int32Array.from({ length: 10000 }, (_, i) => i % 100),
    view = new Int32Array(memory.buffer, 0, source.length),
    js = [],
    wasm = []
  for (let r = 0; r < 30; r++) {
    let t = performance.now()
    const ref = source.map((x) => x * 2 + 1)
    if (r >= 10) js.push(performance.now() - t)
    t = performance.now()
    view.set(source)
    api.transform(0, source.length)
    const got = view.slice()
    if (r >= 10) wasm.push(performance.now() - t)
    assert.deepEqual(got, ref)
  }
  const median = (a) => a.sort((a, b) => a - b)[Math.floor(a.length / 2)]
  console.log({
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    n: source.length,
    jsMedian: median(js),
    wasmCopyIncludedMedian: median(wasm),
    decision: 'Repeat realistic workloads before adopting',
  })
}
console.log('PASS: lesson assertions completed')

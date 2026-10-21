import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { transformSync } from 'esbuild'

const source = readFileSync(new URL('../src/preview/runtime-entry.ts', import.meta.url), 'utf8')
assert.ok(source.includes('await import(/* @vite-ignore */ url)'))
const compiled = transformSync(source.replace('await import(/* @vite-ignore */ url)', 'await loadExample(url)'), { loader: 'ts', format: 'cjs' }).code

function harness(mount) {
  const messages = [], frames = [], listeners = new Map()
  const parent = { postMessage: message => messages.push(message) }
  const module = { exports: {} }
  const context = {
    module, exports: module.exports, require: () => ({}),
    parent, Error, Blob, URL: { createObjectURL: () => 'blob:test', revokeObjectURL() {} },
    document: { getElementById: () => ({}) },
    requestAnimationFrame: fn => frames.push(fn),
    addEventListener: (type, fn) => listeners.set(type, fn),
    loadExample: async () => ({ mount: () => mount(listeners) }),
  }
  vm.runInNewContext(compiled, context)
  return { ...context, messages, frames, listeners, start: module.exports.start }
}
test('successful mount reports ready after a frame', async () => {
  const h = harness(() => () => {})
  await h.start('', 'token')
  h.frames.forEach(fn => fn())
  assert.deepEqual(h.messages.map(m => m.status), ['ready'])
})
test('early async errors stay visible instead of being overwritten by ready', async () => {
  const h = harness(listeners => {
    queueMicrotask(() => listeners.get('error')({ error: new Error('ASYNC_SENTINEL'), preventDefault() {} }))
    return () => {}
  })
  await h.start('', 'token')
  await Promise.resolve()
  h.frames.forEach(fn => fn())
  assert.deepEqual(h.messages.map(m => m.status), ['error'])
  assert.equal(h.messages[0].message, 'ASYNC_SENTINEL')
})
test('rejected promises stay errors before first frame', async () => {
  const h = harness(listeners => {
    queueMicrotask(() => listeners.get('unhandledrejection')({ reason: new Error('REJECTED'), preventDefault() {} }))
    return () => {}
  })
  await h.start('', 'token')
  await Promise.resolve()
  h.frames.forEach(fn => fn())
  assert.deepEqual(h.messages.map(m => m.status), ['error'])
})
test('only correct parent and token dispose the example, once', async () => {
  let count = 0
  let registered
  const other = harness(listeners => { registered = listeners; return () => count++ })
  await other.start('', 'token')
  registered.get('message')({ source: {}, data: { type: 'study-dispose', token: 'token' } })
  registered.get('message')({ source: other.parent, data: { type: 'study-dispose', token: 'wrong' } })
  assert.equal(count, 0)
  registered.get('message')({ source: other.parent, data: { type: 'study-dispose', token: 'token' } })
  registered.get('pagehide')()
  assert.equal(count, 1)
  other.frames.forEach(fn => fn())
  assert.deepEqual(other.messages.map(m => m.status), ['disposed'])
})

test('async mount resolves to cleanup and late completion after dispose is released', async () => {
  let resolveMount, cleaned = 0
  let entered
  const mounted = new Promise(resolve => { entered = resolve })
  const h = harness(() => new Promise(resolve => { resolveMount = resolve; entered() }))
  const starting = h.start('', 'token')
  await mounted
  h.listeners.get('pagehide')()
  resolveMount(() => cleaned++)
  await starting
  assert.equal(cleaned, 1)
  h.frames.forEach(fn => fn())
  assert.deepEqual(h.messages, [])
})

import { test } from 'node:test'
import assert from 'node:assert/strict'

// These are CPU DOM boundary checks, not evidence of actual GPU/browser execution.
async function withDOM(run) {
  const keys = ['document', 'navigator', 'isSecureContext', 'requestAnimationFrame', 'cancelAnimationFrame', 'ResizeObserver', 'devicePixelRatio']
  const saved = keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)])
  const nodes = [], drawn = []
  const ctx = new Proxy({ createRadialGradient: () => ({ addColorStop() {} }), fillText: text => drawn.push(text) }, { get: (target, key) => target[key] ?? (() => {}) })
  function element(tag) {
    const node = { tag, style: {}, children: [], attributes: {}, selectedIndex: 0, clientWidth: 640, clientHeight: 360,
      append(...children) { this.children.push(...children) },
      setAttribute(key, value) { this.attributes[key] = value },
      replaceChildren() { this.children = [] },
      getContext() { return ctx }, remove() { this.removed = true },
    }
    nodes.push(node); return node
  }
  for (const [key, value] of Object.entries({ document: { createElement: element }, navigator: {}, isSecureContext: true, requestAnimationFrame: () => 1, cancelAnimationFrame() {}, ResizeObserver: class { observe() {} disconnect() {} }, devicePixelRatio: 1 })) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
  try { await run({ container: element('container'), nodes, drawn }) }
  finally { for (const [key, descriptor] of saved) if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key] }
}

test('generated WebGPU English controls and unsupported reason remain in mount scope', async () => {
  const { mount } = await import('../src/labs/webgpu-step-16/example.js')
  await withDOM(({ container, nodes }) => {
    const dispose = mount({ container, locale: 'en' })
    assert.equal(nodes.find(n => n.tag === 'h3').textContent, 'Storage and Ping-Pong')
    assert.match(nodes.find(n => n.tag === 'p').textContent, /Both selections run 4 ping-pong steps with fixed boundaries/)
    assert.equal(nodes.find(n => n.tag === 'button').textContent, 'Run / reinitialize')
    assert.match(nodes.find(n => n.tag === 'pre').textContent, /WebGPU unavailable: HTTPS\/localhost/)
    nodes.find(n => n.tag === 'select').onchange()
    assert.equal(nodes.find(n => n.tag === 'button').disabled, false)
    dispose(); assert.deepEqual(container.children, [])
  })
})

test('manual async WebGPU unavailable path uses its requested locale', async () => {
  const { mount } = await import('../src/labs/webgpu-01/example.js')
  await withDOM(async ({ container }) => {
    const dispose = await mount({ container, locale: 'en' })
    assert.equal(container.textContent, 'WebGPU unavailable: check in a supported browser on HTTPS/localhost.')
    dispose(); assert.deepEqual(container.children, [])
  })
})

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

test('WGSL async adapter errors keep the original message in English UI', async () => {
  const { mount } = await import('../src/labs/wgsl-step-21/example.js')
  await withDOM(async ({ container, nodes }) => {
    const raw = 'adapter: 한글 café 日本語 — original diagnostic'
    navigator.gpu = { requestAdapter: async () => { throw new Error(raw) } }
    const dispose = mount({ container, locale: 'en' })
    await new Promise(resolve => setImmediate(resolve))
    assert.equal(nodes.find(n => n.tag === 'pre').textContent, raw)
    assert.equal(nodes.find(n => n.tag === 'button').disabled, false)
    assert.equal(nodes.find(n => n.tag === 'select').attributes['aria-label'], 'Endpoint handling')
    dispose(); assert.deepEqual(container.children, [])
  })
})

test('manual GLSL markup, live record values and raw failure logs preserve the working program', async () => {
  const { mount } = await import('../src/labs/glsl-03/example.js')
  await withDOM(({ container, nodes }) => {
    const create = document.createElement, shaders = [], deletedPrograms = [], raw = 'ERROR: 0:1: 한글 café 日本語 compiler output'
    const iterations = { value: '8' }, resolution = { value: '1' }, buttons = [{}, {}, {}], log = {}
    const gl = new Proxy({
      VERTEX_SHADER: 1, FRAGMENT_SHADER: 2,
      createShader: type => ({ type }), shaderSource(shader, source) { shader.source = source; shaders.push(source) },
      getShaderParameter: shader => shader.source !== 'invalid GLSL', getShaderInfoLog: () => raw,
      createProgram: () => ({}), getProgramParameter: () => true, deleteProgram: program => deletedPrograms.push(program),
      getExtension: () => ({ loseContext() {} }),
    }, { get: (target, key) => target[key] ?? (() => {}) })
    document.createElement = tag => {
      const node = create(tag)
      if (tag === 'div') { node.querySelector = selector => ({ input: iterations, select: resolution, pre: log })[selector]; node.querySelectorAll = () => buttons }
      if (tag === 'canvas') node.getContext = () => gl
      return node
    }
    const dispose = mount({ container, locale: 'en' })
    const ui = nodes.find(n => n.tag === 'div')
    assert.match(ui.innerHTML, /<button>Try broken shader<\/button>/)
    assert.doesNotMatch(ui.innerHTML, /messages\.display/)
    assert.equal(log.textContent, 'Shader compiled and linked. Move pointer.')
    buttons[0].onclick()
    assert.equal(shaders.at(-1), 'invalid GLSL')
    assert.equal(log.textContent, 'Compile/link failed; previous program retained:\n' + raw)
    assert.equal(deletedPrograms.length, 0)
    buttons[1].onclick(); assert.equal(deletedPrograms.length, 1)
    iterations.value = '13'; buttons[2].onclick()
    assert.match(log.textContent, /\n13 iterations · 640×360 · 0 rAF samples: 0\.00 ms \(not GPU time\)$/)
    dispose(); assert.equal(deletedPrograms.length, 2)
  })
})

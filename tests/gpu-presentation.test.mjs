import { test } from 'node:test'
import assert from 'node:assert/strict'

// These are CPU DOM boundary checks, not evidence of actual GPU/browser execution.
async function withDOM(run) {
  const keys = [
    'document',
    'navigator',
    'isSecureContext',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'ResizeObserver',
    'devicePixelRatio',
  ]
  const saved = keys.map((key) => [
    key,
    Object.getOwnPropertyDescriptor(globalThis, key),
  ])
  const nodes = [],
    drawn = []
  let nextFrame
  const ctx = new Proxy(
    {
      createRadialGradient: () => ({ addColorStop() {} }),
      fillText: (text) => drawn.push(text),
    },
    { get: (target, key) => target[key] ?? (() => {}) },
  )
  function element(tag) {
    const node = {
      tag,
      style: {},
      children: [],
      attributes: {},
      listeners: {},
      selectedIndex: 0,
      clientWidth: 640,
      clientHeight: 360,
      append(...children) {
        this.children.push(...children)
      },
      addEventListener(type, listener) {
        this.listeners[type] = listener
      },
      removeEventListener(type) {
        delete this.listeners[type]
      },
      setAttribute(key, value) {
        this.attributes[key] = value
      },
      replaceChildren() {
        this.children = []
      },
      getContext() {
        return ctx
      },
      remove() {
        this.removed = true
      },
    }
    nodes.push(node)
    return node
  }
  for (const [key, value] of Object.entries({
    document: { createElement: element },
    navigator: {},
    isSecureContext: true,
    requestAnimationFrame: (fn) => {
      nextFrame = fn
      return 1
    },
    cancelAnimationFrame() {},
    ResizeObserver: class {
      observe() {}
      disconnect() {}
    },
    devicePixelRatio: 1,
  }))
    Object.defineProperty(globalThis, key, {
      configurable: true,
      writable: true,
      value,
    })
  try {
    await run({
      container: element('container'),
      nodes,
      drawn,
      frame: (now) => nextFrame(now),
      ctx,
    })
  } finally {
    for (const [key, descriptor] of saved)
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
  }
}

test('generated WebGPU English controls and unsupported reason remain in mount scope', async () => {
  const { mount } = await import('../src/labs/webgpu-step-16/example.js')
  await withDOM(({ container, nodes }) => {
    const dispose = mount({ container, locale: 'en' })
    assert.equal(
      nodes.find((n) => n.tag === 'h3').textContent,
      'Storage and Ping-Pong',
    )
    assert.match(
      nodes.find((n) => n.tag === 'p').textContent,
      /Both selections run 4 ping-pong steps with fixed boundaries/,
    )
    assert.equal(
      nodes.find((n) => n.tag === 'button').textContent,
      'Run / reinitialize',
    )
    assert.match(
      nodes.find((n) => n.tag === 'pre').textContent,
      /WebGPU unavailable: HTTPS\/localhost/,
    )
    nodes.find((n) => n.tag === 'select').onchange()
    assert.equal(nodes.find((n) => n.tag === 'button').disabled, false)
    dispose()
    assert.deepEqual(container.children, [])
  })
})

test('manual async WebGPU unavailable path uses its requested locale', async () => {
  const { mount } = await import('../src/labs/webgpu-01/example.js')
  await withDOM(async ({ container }) => {
    const dispose = await mount({ container, locale: 'en' })
    assert.equal(
      container.textContent,
      'WebGPU unavailable: check in a supported browser on HTTPS/localhost.',
    )
    dispose()
    assert.deepEqual(container.children, [])
  })
})

test('WGSL async adapter errors keep the original message in English UI', async () => {
  const { mount } = await import('../src/labs/wgsl-step-21/example.js')
  await withDOM(async ({ container, nodes }) => {
    const raw = 'adapter: 한글 café 日本語 — original diagnostic'
    navigator.gpu = {
      requestAdapter: async () => {
        throw new Error(raw)
      },
    }
    const dispose = mount({ container, locale: 'en' })
    await new Promise((resolve) => setImmediate(resolve))
    assert.equal(nodes.find((n) => n.tag === 'pre').textContent, raw)
    assert.equal(nodes.find((n) => n.tag === 'button').disabled, false)
    assert.equal(
      nodes.find((n) => n.tag === 'select').attributes['aria-label'],
      'Endpoint handling',
    )
    dispose()
    assert.deepEqual(container.children, [])
  })
})

test('manual GLSL markup, live record values and raw failure logs preserve the working program', async () => {
  const { mount } = await import('../src/labs/glsl-03/example.js')
  await withDOM(({ container, nodes }) => {
    const create = document.createElement,
      shaders = [],
      deletedPrograms = [],
      raw = 'ERROR: 0:1: 한글 café 日本語 compiler output'
    const iterations = { value: '8' },
      resolution = { value: '1' },
      buttons = [{}, {}, {}],
      log = {}
    const gl = new Proxy(
      {
        VERTEX_SHADER: 1,
        FRAGMENT_SHADER: 2,
        createShader: (type) => ({ type }),
        shaderSource(shader, source) {
          shader.source = source
          shaders.push(source)
        },
        getShaderParameter: (shader) => shader.source !== 'invalid GLSL',
        getShaderInfoLog: () => raw,
        createProgram: () => ({}),
        getProgramParameter: () => true,
        deleteProgram: (program) => deletedPrograms.push(program),
        getExtension: () => ({ loseContext() {} }),
      },
      { get: (target, key) => target[key] ?? (() => {}) },
    )
    document.createElement = (tag) => {
      const node = create(tag)
      if (tag === 'div') {
        node.querySelector = (selector) =>
          ({ input: iterations, select: resolution, pre: log })[selector]
        node.querySelectorAll = () => buttons
      }
      if (tag === 'canvas') node.getContext = () => gl
      return node
    }
    const dispose = mount({ container, locale: 'en' })
    const ui = nodes.find((n) => n.tag === 'div')
    assert.match(ui.innerHTML, /<button>Try broken shader<\/button>/)
    assert.doesNotMatch(ui.innerHTML, /messages\.display/)
    assert.equal(log.textContent, 'Shader compiled and linked. Move pointer.')
    buttons[0].onclick()
    assert.equal(shaders.at(-1), 'invalid GLSL')
    assert.equal(
      log.textContent,
      'Compile/link failed; previous program retained:\n' + raw,
    )
    assert.equal(deletedPrograms.length, 0)
    buttons[1].onclick()
    assert.equal(deletedPrograms.length, 1)
    iterations.value = '13'
    buttons[2].onclick()
    assert.match(
      log.textContent,
      /\n13 iterations · 640×360 · 0 rAF samples: 0\.00 ms \(not GPU time\)$/,
    )
    dispose()
    assert.equal(deletedPrograms.length, 2)
  })
})

test('Gaussian first-N selection and 61 camera ticks keep original numeric output fields', async () => {
  const firstN =
    await import('../src/labs/gaussian-splatting-step-19/example.js')
  await withDOM(({ container, nodes }) => {
    const dispose = firstN.mount({ container, locale: 'en' })
    const output = nodes.find((n) => n.tag === 'pre'),
      choice = nodes.find((n) => n.tag === 'select')
    assert.equal(JSON.parse(output.textContent).kept, 256)
    choice.selectedIndex = 1
    choice.onchange()
    const reduced = JSON.parse(output.textContent)
    assert.equal(reduced.kept, 128)
    assert.equal(reduced.sourceCount, 256)
    assert.equal(reduced.policy, 'deterministic first-N')
    dispose()
  })
  const collection =
    await import('../src/labs/gaussian-splatting-step-26/example.js')
  await withDOM(({ container, nodes, frame }) => {
    const dispose = collection.mount({ container, locale: 'en' })
    for (let index = 0; index < 61; index++) frame(100 + index * 16)
    const report = JSON.parse(nodes.find((n) => n.tag === 'pre').textContent)
    assert.deepEqual(
      [report.frames, report.renderScale, report.medianRafMs, report.p95RafMs],
      [60, 1, 16, 16],
    )
    assert.equal(report.fixture, 'synthetic-seed-17-v1')
    dispose()
  })
})

test('Gaussian byte RGB MSE uses RGB squared differences and preserves the ROI', async () => {
  const { mount } =
    await import('../src/labs/gaussian-splatting-step-21/example.js')
  await withDOM(({ container, nodes, ctx }) => {
    let reads = 0
    ctx.getImageData = () => ({
      data: new Uint8ClampedArray(640 * 360 * 4).fill(reads++ % 2 ? 2 : 0),
    })
    const dispose = mount({ container, locale: 'en' }),
      output = nodes.find((n) => n.tag === 'pre'),
      choice = nodes.find((n) => n.tag === 'select')
    assert.equal(JSON.parse(output.textContent).byteRGB_MSE, 4)
    choice.selectedIndex = 1
    choice.onchange()
    assert.deepEqual(JSON.parse(output.textContent).roi, {
      x: 300,
      y: 60,
      w: 40,
      h: 240,
    })
    assert.equal(JSON.parse(output.textContent).byteRGB_MSE, 4)
    dispose()
  })
})

test('manual Gaussian loader passes English messages through parsing and preserves raw file errors', async () => {
  const THREE = await import('three'),
    { mount } = await import('../src/labs/gaussian-splatting-02/example.js')
  class Controls {
    constructor() {
      this.target = new THREE.Vector3()
    }
    update() {}
    saveState() {}
    dispose() {}
  }
  await withDOM(async ({ container, nodes }) => {
    const dispose = mount({
      container,
      locale: 'en',
      THREE,
      OrbitControls: Controls,
    })
    const input = nodes.find((n) => n.tag === 'input'),
      status = nodes.find(
        (n) =>
          n.tag === 'p' &&
          n.textContent === 'Locally generated example data · no server upload',
      )
    assert.equal(input.attributes['aria-label'], 'Choose a small GS file')
    const buffer = new ArrayBuffer(32),
      floats = new Float32Array(buffer, 0, 6)
    floats.set([0, 0, 0, -1, 1, 1])
    input.files = [
      { name: 'test.splat', size: 32, arrayBuffer: async () => buffer },
    ]
    await input.listeners.change()
    assert.equal(status.textContent, 'error: Invalid Gaussian value')
    floats[3] = 1
    new Uint8Array(buffer)[28] = 255
    await input.listeners.change()
    assert.equal(
      status.textContent,
      'ready test.splat · 32 bytes · 1 splats · SH DC only',
    )
    input.files[0].arrayBuffer = async () => {
      throw Error('한글 café 日本語 file error')
    }
    await input.listeners.change()
    assert.equal(status.textContent, 'error: 한글 café 日本語 file error')
    dispose()
    assert.deepEqual(input.listeners, {})
    assert.deepEqual(container.children, [])
  })
})

test('WebGPU vertex-layout and winding notes evaluate their English dictionary slots', async () => {
  for (const [id, note] of [
    [
      'webgpu-step-06',
      'Keep offsets 0/8 and change stride and padding together.',
    ],
    [
      'webgpu-step-07',
      'Opposite winding in two viewports. With back culling, only one remains.',
    ],
  ]) {
    const { mount } = await import(`../src/labs/${id}/example.js`)
    await withDOM(async ({ container, nodes, ctx }) => {
      const pass = new Proxy({}, { get: () => () => {} })
      const device = {
        lost: new Promise(() => {}),
        addEventListener() {},
        destroy() {},
        queue: { writeBuffer() {}, submit() {} },
        createBuffer: () => ({ destroy() {} }),
        createShaderModule: () => ({
          getCompilationInfo: async () => ({ messages: [] }),
        }),
        createRenderPipelineAsync: async () => ({}),
        createCommandEncoder: () => ({
          beginRenderPass: () => pass,
          finish: () => ({}),
        }),
      }
      ctx.getCurrentTexture = () => ({ createView: () => ({}) })
      navigator.gpu = {
        requestAdapter: async () => ({ requestDevice: async () => device }),
        getPreferredCanvasFormat: () => 'bgra8unorm',
      }
      const dispose = mount({ container, locale: 'en' })
      await new Promise((resolve) => setImmediate(resolve))
      assert.deepEqual(
        JSON.parse(nodes.find((n) => n.tag === 'pre').textContent),
        { stride: 20, vertices: 3, note },
      )
      dispose()
    })
  }
})

test('Gaussian coordinate output and option share the approved Y-up slot', async () => {
  const { mount } =
    await import('../src/labs/gaussian-splatting-step-03/example.js')
  await withDOM(({ container, nodes }) => {
    const dispose = mount({ container, locale: 'en' })
    const report = JSON.parse(nodes.find((n) => n.tag === 'pre').textContent)
    assert.equal(nodes.find((n) => n.tag === 'option').textContent, 'Y-up')
    assert.ok(Object.values(report).includes('Y-up'))
    dispose()
  })
})

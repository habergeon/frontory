import { test } from 'node:test'
import assert from 'node:assert/strict'

// CPU display/serialization boundary tests. Workers, GPUs and external runners are not executed.
async function withDOM(run) {
  const values = {},
    nodes = [],
    workers = [],
    blobs = [],
    listeners = {}
  const ctx = new Proxy({}, { get: () => () => {} })
  function element(tag) {
    const node = {
      tag,
      style: {},
      children: [],
      attributes: {},
      textContent: '',
      innerHTML: '',
      click() {
        this.onclick?.()
      },
      append(...children) {
        this.children.push(...children)
      },
      remove() {
        this.removed = true
      },
      replaceChildren(...children) {
        this.children = children
      },
      addEventListener(type, fn) {
        this['on' + type] = fn
      },
      removeEventListener(type) {
        delete this['on' + type]
      },
      setAttribute(name, value) {
        this.attributes[name] = value
      },
      getContext() {
        return ctx
      },
      querySelector(selector) {
        this.selected ??= {}
        return (this.selected[selector] ??= element(
          selector === '.stage' ? 'stage' : selector,
        ))
      },
    }
    nodes.push(node)
    return node
  }
  for (const [key, value] of Object.entries({
    document: {
      createElement: element,
      addEventListener(type, fn) {
        listeners[type] = fn
      },
      removeEventListener(type) {
        delete listeners[type]
      },
    },
    Worker: class {
      constructor(url) {
        this.url = url
        this.sent = []
        workers.push(this)
      }
      postMessage(data, transfer) {
        this.sent.push({ data, transfer })
      }
      terminate() {
        this.terminated = true
      }
    },
    Blob: class {
      constructor(parts) {
        blobs.push(parts)
      }
    },
    URL: {
      createObjectURL: () => 'blob:display-boundary',
      revokeObjectURL() {},
    },
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {},
    devicePixelRatio: 1,
  })) {
    values[key] = Object.getOwnPropertyDescriptor(globalThis, key)
    Object.defineProperty(globalThis, key, {
      value,
      writable: true,
      configurable: true,
    })
  }
  try {
    await run({
      container: element('container'),
      nodes,
      workers,
      blobs,
      listeners,
    })
  } finally {
    for (const [key, descriptor] of Object.entries(values))
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
  }
}

test('GSAP translated shell and original easing inputs both reach their actual display/API sites', async () => {
  const { mount } = await import('../src/labs/gsap-step-03/example.js')
  for (const [locale, title] of [
    ['ko', 'Ease의 시간 곡선'],
    ['en', 'The Time Curve of Ease'],
  ])
    await withDOM(({ container, nodes }) => {
      const calls = [],
        dispose = mount({
          container,
          locale,
          gsap: {
            killTweensOf() {},
            fromTo(...args) {
              calls.push(args)
            },
          },
        })
      assert.match(
        nodes.find((n) => n.tag === 'section').innerHTML,
        new RegExp('<h3>' + title + '</h3>'),
      )
      const labels = nodes.filter((n) =>
        ['none', 'power2.in', 'power2.out', 'bounce.out'].includes(
          n.textContent,
        ),
      )
      assert.deepEqual(
        labels.map((n) => n.textContent),
        ['none', 'power2.in', 'power2.out', 'bounce.out'],
      )
      nodes.find((n) => n.tag === 'button').onclick()
      assert.equal(calls[0][2].ease, 'bounce.out')
      dispose()
    })
})

test('manual Worker labels change with locale and raw error/result fields stay intact', async () => {
  const { mount } = await import('../src/labs/web-workers-01/example.js')
  await withDOM(({ container, nodes, workers, blobs }) => {
    const dispose = mount({ container, locale: 'en' }),
      output = nodes.find((n) => n.tag === 'pre'),
      worker = workers[0]
    assert.equal(
      nodes.find((n) => n.tag === 'button').textContent,
      'Worker sum calculation',
    )
    assert.equal(output.textContent, 'Computation requested')
    assert.equal(worker.sent[0].data, 1000000)
    assert.doesNotMatch(blobs[0][0], /messages|locale/)
    worker.onmessage({ data: { sum: 500000500000, milliseconds: 1.25 } })
    assert.match(output.textContent, /500000500000/)
    assert.match(
      output.textContent,
      /Only computation time is shown; message round-trip cost is excluded/,
    )
    worker.onerror({ message: '한글 café 日本語 raw diagnostic' })
    assert.equal(
      output.textContent,
      'Worker execution failed: 한글 café 日本語 raw diagnostic',
    )
    dispose()
    assert.equal(worker.terminated, true)
  })
})

test('Workers26 reports three buffers and one transfer without inventing a fourth request', async () => {
  const { mount } = await import('../src/labs/web-workers-step-26/example.js')
  await withDOM(({ container, nodes, workers, blobs }) => {
    const dispose = mount({ container, locale: 'en' })
    nodes.find((n) => n.tag === 'button').onclick()
    assert.equal(
      nodes.find((n) => n.tag === 'output').textContent,
      'Pool budget 3145728 bytes; allocate 3 buffers, transfer 1; no fourth request',
    )
    assert.equal(workers[0].sent.length, 1)
    assert.equal(workers[0].sent[0].data.buffer.byteLength, 1024 * 1024)
    assert.equal(workers[0].sent[0].transfer.length, 1)
    assert.doesNotMatch(blobs[0][0], /messages|locale/)
    dispose()
  })
})

test('Offscreen04 directly calls fallback and Offscreen24 identifies acknowledgment timing', async () => {
  const direct = await import('../src/labs/offscreen-canvas-step-04/example.js')
  const timing = await import('../src/labs/offscreen-canvas-step-24/example.js')
  await withDOM(({ container, nodes }) => {
    const dispose = direct.mount({ container, locale: 'en' })
    assert.match(
      nodes.find((n) => n.tag === 'section').innerHTML,
      /<h3>Calling fallback directly<\/h3>/,
    )
    nodes.find((n) => n.tag === 'button').onclick()
    assert.equal(
      nodes.find((n) => n.tag === 'output').textContent,
      'Main-thread fallback: Direct fallback call: Canvas replaced',
    )
    dispose()
  })
  await withDOM(({ container, nodes }) => {
    const dispose = timing.mount({ container, locale: 'en' })
    assert.match(
      nodes.find((n) => n.tag === 'section').innerHTML,
      /Request-to-ack \/ Display latency excluded/,
    )
    nodes.find((n) => n.tag === 'button').onclick()
    assert.match(
      nodes.find((n) => n.tag === 'output').textContent,
      /Request→ack ms .*; samples 1; excludes display compositor latency/,
    )
    dispose()
  })
})

test('Wasm and Playwright previews show English guidance while embedded encoding/locator fixtures stay exact', async () => {
  const wasm = await import('../src/labs/webassembly-step-18/example.js')
  const pw = await import('../src/labs/playwright-01/example.js')
  await withDOM(({ container, nodes }) => {
    const dispose = wasm.mount({ container, locale: 'en' })
    const text = nodes.find((n) => n.tag === 'pre').textContent
    assert.match(text, /new TextEncoder\(\)\.encode\('한글 🎨'\)/)
    assert.match(text, /\(memory \(export "memory"\) 2 8\)/)
    assert.match(
      nodes.find((n) => n.tag === 'output').textContent,
      /CSP does not allow Wasm compilation/,
    )
    dispose()
  })
  await withDOM(({ container, nodes }) => {
    const dispose = pw.mount({ container, locale: 'en' })
    assert.match(
      nodes.find((n) => n.tag === 'p').textContent,
      /Run this in a separate Node environment/,
    )
    assert.match(
      nodes.find((n) => n.tag === 'pre').textContent,
      /name: '학습 문서 열기', exact: true/,
    )
    dispose()
  })
})

test('Motion title and presence callback retain the actual focus timing', async () => {
  const { mount } = await import('../src/labs/motion-step-13/example.js')
  let rendered,
    focuses = 0
  const React = {
    createElement: (type, props, ...children) => ({ type, props, children }),
    useState: (value) => [value, () => {}],
    useRef: (value) => ({ current: value }),
    useEffect() {},
  }
  const Motion = {
    motion: { button: 'motion-button' },
    AnimatePresence: 'presence',
    useMotionValue: () => 0,
    useSpring: () => 0,
    useTransform: () => 0,
    useScroll: () => ({}),
    useReducedMotion: () => false,
    useAnimate: () => [null, () => {}],
  }
  const dispose = mount({
    container: {},
    locale: 'en',
    React,
    Motion,
    createRoot: () => ({
      render(node) {
        rendered = node.type()
      },
      unmount() {},
    }),
  })
  assert.equal(rendered.children[0].children[0], 'Focus During Deletion')
  const button = rendered.children[2],
    presence = rendered.children[3].children[0]
  button.props.ref.current = {
    focus() {
      focuses++
    },
  }
  assert.equal(focuses, 0)
  presence.props.onExitComplete()
  assert.equal(focuses, 1)
  dispose()
})

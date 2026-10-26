import { test } from 'node:test'
import assert from 'node:assert/strict'

// CPU DOM/canvas boundary test; this does not establish browser/GPU rendering.
async function withDOM(run) {
  const previous = Object.fromEntries(
    [
      'document',
      'cancelAnimationFrame',
      'requestAnimationFrame',
      'ResizeObserver',
      'devicePixelRatio',
    ].map((key) => [key, globalThis[key]]),
  )
  const nodes = [],
    drawn = []
  let nextFrame
  const context = new Proxy(
    {
      measureText: (text) => ({ width: text.length * 20 }),
      fillText: (text) => drawn.push(text),
    },
    { get: (target, key) => target[key] ?? (() => {}) },
  )
  function element(tag) {
    const node = {
      tag,
      attributes: {},
      children: [],
      style: {},
      listeners: {},
      append(...children) {
        this.children.push(...children)
      },
      replaceChildren() {
        this.children = []
      },
      setAttribute(key, value) {
        this.attributes[key] = value
      },
      addEventListener(type, fn) {
        this.listeners[type] = fn
      },
      removeEventListener(type) {
        delete this.listeners[type]
      },
      remove() {
        this.removed = true
      },
      getContext() {
        return context
      },
      getBoundingClientRect() {
        return { left: 0, top: 0, width: 400, height: 260 }
      },
    }
    nodes.push(node)
    return node
  }
  globalThis.document = {
    createElement: element,
    createElementNS: (_, tag) => element(tag),
  }
  globalThis.cancelAnimationFrame = () => {}
  globalThis.requestAnimationFrame = (fn) => {
    nextFrame = fn
    return 1
  }
  globalThis.ResizeObserver = class {
    observe() {}
    disconnect() {}
  }
  globalThis.devicePixelRatio = 1
  try {
    await run({
      container: element('container'),
      nodes,
      drawn,
      frame: (time) => nextFrame(time),
    })
  } finally {
    Object.assign(globalThis, previous)
  }
}

test('Canvas English mount keeps Korean width fixtures while localizing heading, aria and control', async () => {
  const { mount } = await import('../src/labs/canvas-2d-step-07/example.js')
  await withDOM(({ container, nodes, drawn }) => {
    const dispose = mount({ container, locale: 'en' })
    assert.equal(
      nodes.find((node) => node.tag === 'strong').textContent,
      'Text and Badge Composition',
    )
    assert.equal(
      nodes.find((node) => node.tag === 'canvas').attributes['aria-label'],
      'Text and Badge Composition',
    )
    const button = nodes.find((node) => node.tag === 'button')
    assert.equal(button.textContent, 'Input String: 가나 ↔ WWW iii')
    assert.deepEqual(drawn, ['가나'])
    button.listeners.click()
    assert.deepEqual(drawn, ['가나', 'WWW iii'])
    assert.equal(button.attributes['aria-pressed'], 'true')
    dispose()
    assert.equal(nodes.find((node) => node.tag === 'section').removed, true)
    assert.deepEqual(button.listeners, {})
  })
})

test('manual SVG whole-template display evaluates its dictionary value', async () => {
  const { mount } = await import('../src/labs/svg-01/example.js')
  await withDOM(({ container }) => {
    const dispose = mount({ container, locale: 'en' })
    assert.match(container.innerHTML, /aria-label="SVG vector shapes"/)
    assert.doesNotMatch(container.innerHTML, /messages\.display/)
    dispose()
  })
})

test('manual Canvas template fragments evaluate around live timing and pointer values', async () => {
  const { mount } = await import('../src/labs/canvas-2d-02/example.js')
  await withDOM(({ container, nodes, frame }) => {
    const dispose = mount({ container, locale: 'en' })
    frame(100)
    const output = nodes.find((node) => node.tag === 'output')
    assert.equal(
      output.textContent,
      ' Δt 0.0 ms · speed 147 px/s · click canvas',
    )
    nodes
      .find((node) => node.tag === 'canvas')
      .onpointerdown({ clientX: 25, clientY: 30 })
    frame(116)
    assert.equal(
      output.textContent,
      ' Δt 16.0 ms · speed 147 px/s · click 25,30',
    )
    dispose()
  })
})

test('SVG English mount keeps Korean city and long-label fixtures after toggling', async () => {
  const { mount } = await import('../src/labs/svg-step-12/example.js')
  await withDOM(({ container, nodes }) => {
    const dispose = mount({ container, locale: 'en' })
    assert.equal(
      nodes.find((node) => node.tag === 'strong').textContent,
      'Text and Data Labels',
    )
    assert.deepEqual(
      nodes
        .filter(
          (node) => node.tag === 'tspan' && /[가-힣]/.test(node.textContent),
        )
        .map((node) => node.textContent),
      ['서울', '부산', '제주'],
    )
    nodes.find((node) => node.tag === 'button').listeners.click()
    for (const city of ['서울', '부산', '제주'])
      assert.ok(
        nodes.some(
          (node) => node.textContent === city + ' 지역의 아주 긴 이름',
        ),
      )
    dispose()
    assert.equal(nodes.find((node) => node.tag === 'section').removed, true)
  })
})

test('Pixi English async mount preserves Score/Count updates and releases its ticker', async () => {
  for (const [id, initial, updated] of [
    ['pixijs-step-05', 'Score: 0', 'Score: 1'],
    ['pixijs-step-21', 'Count 0', 'Count 1'],
  ]) {
    const { mount } = await import(`../src/labs/${id}/example.js`)
    await withDOM(async ({ container, nodes }) => {
      let app,
        label,
        textureReleased = false
      class Container {
        children = []
        position = { set() {} }
        addChild(node) {
          this.children.push(node)
        }
        cacheAsTexture() {}
        updateCacheTexture() {}
      }
      class Graphics extends Container {
        roundRect() {
          return this
        }
        fill() {
          return this
        }
      }
      class Application {
        constructor() {
          app = this
          this.canvas = { style: {} }
          this.stage = new Container()
          this.ticker = {
            add(fn) {
              this.fn = fn
            },
            remove(fn) {
              assert.equal(this.fn, fn)
              this.fn = null
            },
          }
        }
        async init(options) {
          assert.equal(options.preference, 'webgl')
          this.initialized = true
        }
        destroy() {
          this.destroyed = true
        }
      }
      class Text extends Container {
        constructor({ text }) {
          super()
          label = this
          this.text = text
        }
      }
      const PIXI = {
        Application,
        Container,
        Graphics,
        Text,
        Texture: {
          from: () => ({
            destroy() {
              textureReleased = true
            },
          }),
        },
      }
      const dispose = await mount({ container, locale: 'en', PIXI })
      assert.equal(app.initialized, true)
      assert.equal(label.text, initial)
      if (id === 'pixijs-step-05')
        for (let index = 0; index < 12; index++) app.ticker.fn({ deltaMS: 100 })
      else
        nodes
          .find((node) => node.textContent === 'Change cached label')
          .listeners.click()
      assert.equal(label.text, updated)
      dispose()
      assert.equal(app.ticker.fn, null)
      assert.equal(app.destroyed, true)
      assert.equal(textureReleased, true)
    })
  }
})

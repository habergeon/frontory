import { test } from 'node:test'
import assert from 'node:assert/strict'

// CPU DOM/canvas boundary test; this does not establish browser/GPU rendering.
async function withDOM(run) {
  const previous = { document: globalThis.document, cancelAnimationFrame: globalThis.cancelAnimationFrame }
  const nodes = [], drawn = []
  const context = new Proxy({ measureText: text => ({ width: text.length * 20 }), fillText: text => drawn.push(text) }, { get: (target, key) => target[key] ?? (() => {}) })
  function element(tag) {
    const node = { tag, attributes: {}, children: [], style: {}, listeners: {},
      append(...children) { this.children.push(...children) },
      replaceChildren() { this.children = [] },
      setAttribute(key, value) { this.attributes[key] = value },
      addEventListener(type, fn) { this.listeners[type] = fn },
      removeEventListener(type) { delete this.listeners[type] },
      remove() { this.removed = true },
      getContext() { return context },
    }
    nodes.push(node)
    return node
  }
  globalThis.document = { createElement: element, createElementNS: (_, tag) => element(tag) }
  globalThis.cancelAnimationFrame = () => {}
  try { await run({ container: element('container'), nodes, drawn }) }
  finally { Object.assign(globalThis, previous) }
}

test('Canvas English mount keeps Korean width fixtures while localizing heading, aria and control', async () => {
  const { mount } = await import('../src/labs/canvas-2d-step-07/example.js')
  await withDOM(({ container, nodes, drawn }) => {
    const dispose = mount({ container, locale: 'en' })
    assert.equal(nodes.find(node => node.tag === 'strong').textContent, 'Text and Badge Composition')
    assert.equal(nodes.find(node => node.tag === 'canvas').attributes['aria-label'], 'Text and Badge Composition')
    const button = nodes.find(node => node.tag === 'button')
    assert.equal(button.textContent, 'Input String: 가나 ↔ WWW iii')
    assert.deepEqual(drawn, ['가나'])
    button.listeners.click()
    assert.deepEqual(drawn, ['가나', 'WWW iii'])
    assert.equal(button.attributes['aria-pressed'], 'true')
    dispose()
    assert.equal(nodes.find(node => node.tag === 'section').removed, true)
    assert.deepEqual(button.listeners, {})
  })
})

test('SVG English mount keeps Korean city and long-label fixtures after toggling', async () => {
  const { mount } = await import('../src/labs/svg-step-12/example.js')
  await withDOM(({ container, nodes }) => {
    const dispose = mount({ container, locale: 'en' })
    assert.equal(nodes.find(node => node.tag === 'strong').textContent, 'Text and Data Labels')
    assert.deepEqual(nodes.filter(node => node.tag === 'tspan' && /[가-힣]/.test(node.textContent)).map(node => node.textContent), ['서울', '부산', '제주'])
    nodes.find(node => node.tag === 'button').listeners.click()
    for (const city of ['서울', '부산', '제주']) assert.ok(nodes.some(node => node.textContent === city + ' 지역의 아주 긴 이름'))
    dispose()
    assert.equal(nodes.find(node => node.tag === 'section').removed, true)
  })
})

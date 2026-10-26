import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { validateExamplePresentation } from '../scripts/locale-content.mjs'

// CPU display boundaries only; no browser, WebGL or GPU execution is claimed.
async function withDOM(run) {
  const saved = {},
    nodes = [],
    ctx = new Proxy({}, { get: () => () => {} })
  function element(tag) {
    const selected = {}
    const node = {
      tag,
      style: {},
      children: [],
      attributes: {},
      clientWidth: 640,
      clientHeight: 360,
      append(...children) {
        this.children.push(...children)
      },
      replaceChildren(...children) {
        this.children = children
      },
      setAttribute(key, value) {
        this.attributes[key] = value
      },
      getContext() {
        return ctx
      },
      addEventListener(type, fn) {
        this['on' + type] = fn
      },
      removeEventListener(type) {
        delete this['on' + type]
      },
      querySelector(selector) {
        return (selected[selector] ??= {
          value: selector === '#title' ? '나의 WebGL 실험' : '',
          checked: false,
        })
      },
    }
    nodes.push(node)
    return node
  }
  for (const [key, value] of Object.entries({
    document: { createElement: element },
    ResizeObserver: class {
      observe() {}
      disconnect() {}
    },
  })) {
    saved[key] = Object.getOwnPropertyDescriptor(globalThis, key)
    Object.defineProperty(globalThis, key, { configurable: true, value })
  }
  try {
    await run({ container: element('container'), nodes })
  } finally {
    for (const [key, descriptor] of Object.entries(saved))
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
  }
}

test('WebGL15 actual sample control keeps computed brightness in both locales', async () => {
  const { mount } = await import('../src/labs/15-nerf-gs/example.js')
  const outputs = []
  for (const locale of ['ko', 'en'])
    await withDOM(({ container, nodes }) => {
      const dispose = mount({ container, locale }),
        input = nodes.find((n) => n.tag === 'input'),
        output = nodes.find((n) => n.tag === 'pre')
      assert.equal(
        input.attributes['aria-label'],
        locale === 'en' ? 'Ray sample count' : '광선 샘플 수',
      )
      assert.match(output.textContent, /24/)
      outputs.push(output.textContent.match(/0\.[0-9]{4}/)[0])
      input.value = '64'
      input.oninput()
      assert.match(output.textContent, /64/)
      assert.match(
        output.textContent,
        locale === 'en'
          ? /analytical Gaussian density/
          : /분석 가능한 Gaussian 밀도/,
      )
      dispose()
      assert.deepEqual(container.children, [])
    })
  assert.equal(outputs[0], outputs[1])
})

test('WebGL18 actual compositing control retains order, RGB and radius values', async () => {
  const { mount } = await import('../src/labs/18-gs-projection/example.js')
  for (const locale of ['ko', 'en'])
    await withDOM(({ container, nodes }) => {
      const dispose = mount({ container, locale }),
        button = nodes.find((n) => n.tag === 'button'),
        output = nodes.find((n) => n.tag === 'pre')
      assert.equal(
        button.textContent,
        locale === 'en' ? 'Reverse compositing order' : '합성 순서 뒤집기',
      )
      assert.match(output.textContent, /red → blue/)
      assert.match(output.textContent, /\(0.25,0,0.5\)/)
      assert.match(output.textContent, /33.33 px/)
      button.onclick()
      assert.match(output.textContent, /blue → red/)
      assert.match(output.textContent, /\(0.5,0,0.25\)/)
      assert.match(output.textContent, /33.33 px/)
      dispose()
      assert.deepEqual(container.children, [])
    })
})

test('WebGL28 translates its real form and keeps initial fixture and user values', async () => {
  const { mount } = await import('../src/labs/28-review/example.js')
  await withDOM(({ container }) => {
    const dispose = mount({ container, locale: 'en' })
    assert.match(container.innerHTML, /Experiment reproduction card/)
    assert.match(container.innerHTML, /value="나의 WebGL 실험"/)
    assert.match(
      container.innerHTML,
      /placeholder="Values and conditions you measured"/,
    )
    const raw = '한글 café 日本語 <raw> 123'
    container.querySelector('#variable').value = raw
    container.querySelector('#result').value = 'measured 33.33'
    container.querySelector('#verified').checked = true
    container.oninput()
    const output = container.querySelector('pre').textContent
    assert.ok(output.includes(raw))
    assert.match(output, /## Changed variable/)
    assert.match(output, /## Actual results/)
    assert.match(output, /\[x\] Reproduction verified/)
    dispose()
    assert.equal(container.oninput, undefined)
    assert.deepEqual(container.children, [])
  })
})

test('actual GS loader body translates labels and preserves parser errors, names and disposal guard', async () => {
  const originals = JSON.parse(
    fs.readFileSync('content/example-presentations.json', 'utf8'),
  )
  const records = JSON.parse(
    fs.readFileSync('content/locales/en/examples/webgl.json', 'utf8'),
  )
  for (const id of [
    '16-gaussian',
    '17-sh',
    '19-gs-loading',
    '20-gs-interaction',
    '21-gs-review',
  ]) {
    const source = fs.readFileSync(`src/labs/${id}/example.js`, 'utf8')
    const messages = validateExamplePresentation(
      originals[id],
      records[id].presentation,
    ).messages
    // Execute the existing module-level loader body with a parser boundary stub.
    const addLoader = Function(
      'parseSplats',
      'return (' +
        source.slice(source.indexOf('function addLoader(')).trim() +
        ')',
    )(() => {
      throw Error('raw parser: 한글 café 日本語')
    })
    await withDOM(async ({ container, nodes }) => {
      const dispose = addLoader({}, { panel: container }, messages)
      const input = nodes.find((n) => n.tag === 'input'),
        status = nodes.find((n) => n.tag === 'p')
      assert.equal(input.attributes['aria-label'], 'Choose a small GS file')
      assert.match(status.textContent, /no server upload/)
      input.files = [
        {
          name: 'fixture 한글 café 日本語.splat',
          size: 12,
          arrayBuffer: async () => new ArrayBuffer(12),
        },
      ]
      await input.onchange()
      assert.equal(status.textContent, 'error: raw parser: 한글 café 日本語')
      input.files[0].size = 1024 * 1024 + 1
      await input.onchange()
      assert.equal(status.textContent, 'error: 학습용 파일은 1 MiB 이하')
      let finish
      input.files[0].size = 12
      input.files[0].arrayBuffer = () =>
        new Promise((resolve) => {
          finish = resolve
        })
      const pending = input.onchange()
      assert.equal(status.textContent, 'loading fixture 한글 café 日本語.splat')
      dispose()
      finish(new ArrayBuffer(12))
      await pending
      assert.equal(status.textContent, 'loading fixture 한글 café 日本語.splat')
      assert.equal(input.onchange, undefined)
    })
  }
})

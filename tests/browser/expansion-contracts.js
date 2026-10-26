import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import * as Vue from 'vue'
import * as Fiber from '@react-three/fiber'
import * as PIXI from 'pixi.js'
import 'pixi.js/unsafe-eval'
import { gsap } from 'gsap'
import { animate } from 'motion'
import * as Motion from 'motion/react'
import { writable } from 'svelte/store'
import presentations from '/content/example-presentations.json'
const englishPresentations = import.meta.glob(
  '/content/locales/en/examples/*.json',
  { eager: true, import: 'default' },
)
const focus = new URLSearchParams(location.search).get('focus')
const locale =
  new URLSearchParams(location.search).get('locale') === 'en' ? 'en' : 'ko'
const stage = document.querySelector('#stage'),
  results = [],
  cases = []
const paint = () =>
  new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  )
const wait = async (predicate) => {
  for (let i = 0; i < 500; i++) {
    if (predicate()) return
    await new Promise((resolve) => setTimeout(resolve, 20))
  }
  throw Error('Timed out: ' + stage.textContent.slice(-1200))
}
let current = ''
const check = (name, actual, expected = true) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  results.push({ id: current, locale, name, actual, expected, ok })
  if (!ok) throw Error(name + ': ' + JSON.stringify(actual))
}
const near = (name, actual, expected, tolerance = 1e-6) =>
  check(name, Math.abs(actual - expected) <= tolerance)
const $ = (selector) => stage.querySelector(selector)
const json = () => JSON.parse($('pre').textContent)
const click = async (index = 0) => {
  stage.querySelectorAll('button')[index].click()
  await paint()
}
const choose = async (index) => {
  $('select').selectedIndex = index
  $('select').dispatchEvent(new Event('change'))
  await paint()
  await wait(() => !$('button').disabled)
}
const input = async (selector, value) => {
  const element = $(selector)
  element.value = value
  element.dispatchEvent(new Event('input', { bubbles: true }))
  await paint()
}
const changeJSON = async (value) => {
  $('textarea').value = value
  await click()
}
const context = {
  THREE,
  OrbitControls,
  React,
  createRoot,
  Vue,
  Fiber,
  PIXI,
  gsap,
  animate,
  Motion,
  writable,
  container: stage,
  locale,
}
// All overrides belong to this fresh harness realm and are restored in finally.
function resources() {
  const imageReads = [],
    notices = [],
    workerMessages = [],
    globalErrors = [],
    expectedFixtureErrors = []
  const error = (event) => {
    const message = event.message ?? String(event.reason)
    if (
      current === 'offscreen-canvas-02' &&
      message.includes('E09 isolated asynchronous worker fixture')
    )
      expectedFixtureErrors.push(message)
    else globalErrors.push(message)
  }
  addEventListener('error', error)
  addEventListener('unhandledrejection', error)
  const observer = new MutationObserver(() => {
    for (const node of stage.querySelectorAll('pre,output'))
      notices.push(node.textContent)
  })
  observer.observe(stage, {
    subtree: true,
    childList: true,
    characterData: true,
  })
  const restore = [],
    workers = new Set(),
    urls = new Set(),
    buffers = new Set(),
    devices = new Set(),
    counts = {
      workerCreated: 0,
      workerTerminated: 0,
      urlCreated: 0,
      urlRevoked: 0,
      bufferCreated: 0,
      bufferDestroyed: 0,
      deviceCreated: 0,
      deviceDestroyed: 0,
      threeDisposed: 0,
      pixiDestroyed: 0,
      webglDraws: 0,
      bitmapClosed: 0,
      visibilityAdded: 0,
      visibilityRemoved: 0,
      rafCancelled: 0,
    }
  const wrap = (object, key, fn) => {
    const original = object[key]
    object[key] = fn(original)
    restore.push(() => (object[key] = original))
  }
  const visibility = new Set(),
    rafs = new Set()
  wrap(
    document,
    'addEventListener',
    (original) =>
      function (type, listener, ...rest) {
        if (type === 'visibilitychange') {
          visibility.add(listener)
          counts.visibilityAdded++
        }
        return original.call(this, type, listener, ...rest)
      },
  )
  wrap(
    document,
    'removeEventListener',
    (original) =>
      function (type, listener, ...rest) {
        if (type === 'visibilitychange' && visibility.delete(listener))
          counts.visibilityRemoved++
        return original.call(this, type, listener, ...rest)
      },
  )
  wrap(
    globalThis,
    'requestAnimationFrame',
    (original) =>
      function (fn) {
        let id = original.call(this, (time) => {
          rafs.delete(id)
          fn(time)
        })
        rafs.add(id)
        return id
      },
  )
  wrap(
    globalThis,
    'cancelAnimationFrame',
    (original) =>
      function (id) {
        if (rafs.delete(id)) counts.rafCancelled++
        return original.call(this, id)
      },
  )
  for (const key of ['drawArrays', 'drawElements'])
    wrap(
      WebGL2RenderingContext.prototype,
      key,
      (original) =>
        function (...args) {
          counts.webglDraws++
          return original.apply(this, args)
        },
    )
  wrap(
    ImageBitmap.prototype,
    'close',
    (original) =>
      function (...args) {
        counts.bitmapClosed++
        return original.apply(this, args)
      },
  )
  wrap(
    CanvasRenderingContext2D.prototype,
    'getImageData',
    (original) =>
      function (...args) {
        const result = original.apply(this, args)
        if (args[2] === 640 && args[3] === 360)
          imageReads.push(result.data.slice())
        return result
      },
  )
  wrap(
    Worker.prototype,
    'postMessage',
    (original) =>
      function (data, ...args) {
        const record = {
          type: data.type,
          id: data.id,
          state: data.state ? { ...data.state } : undefined,
          value: data.value,
          bufferBytesBefore: data.buffer?.byteLength,
        }
        workerMessages.push(record)
        const result = original.call(this, data, ...args)
        record.bufferBytesAfter = data.buffer?.byteLength
        return result
      },
  )
  const OriginalWorker = globalThis.Worker
  globalThis.Worker = class extends OriginalWorker {
    constructor(...args) {
      super(...args)
      workers.add(this)
      counts.workerCreated++
    }
    terminate() {
      if (workers.delete(this)) counts.workerTerminated++
      return super.terminate()
    }
  }
  restore.push(() => (globalThis.Worker = OriginalWorker))
  wrap(
    URL,
    'createObjectURL',
    (original) =>
      function (...args) {
        const url = original.apply(this, args)
        urls.add(url)
        counts.urlCreated++
        return url
      },
  )
  wrap(
    URL,
    'revokeObjectURL',
    (original) =>
      function (url) {
        if (urls.delete(url)) counts.urlRevoked++
        return original.call(this, url)
      },
  )
  for (const Type of [THREE.BufferGeometry, THREE.Material, THREE.Texture])
    wrap(
      Type.prototype,
      'dispose',
      (original) =>
        function (...args) {
          counts.threeDisposed++
          return original.apply(this, args)
        },
    )
  wrap(
    PIXI.Application.prototype,
    'destroy',
    (original) =>
      function (...args) {
        counts.pixiDestroyed++
        return original.apply(this, args)
      },
  )
  if (globalThis.GPUDevice) {
    wrap(
      GPUAdapter.prototype,
      'requestDevice',
      (original) =>
        async function (...args) {
          const device = await original.apply(this, args)
          devices.add(device)
          counts.deviceCreated++
          return device
        },
    )
    wrap(
      GPUDevice.prototype,
      'createBuffer',
      (original) =>
        function (...args) {
          const buffer = original.apply(this, args)
          buffers.add(buffer)
          counts.bufferCreated++
          return buffer
        },
    )
    wrap(
      GPUBuffer.prototype,
      'destroy',
      (original) =>
        function (...args) {
          if (buffers.delete(this)) counts.bufferDestroyed++
          return original.apply(this, args)
        },
    )
    wrap(
      GPUDevice.prototype,
      'destroy',
      (original) =>
        function (...args) {
          if (devices.delete(this)) counts.deviceDestroyed++
          return original.apply(this, args)
        },
    )
  }
  return {
    counts,
    imageReads,
    notices,
    workerMessages,
    expectedFixtureErrors,
    restore: () => {
      removeEventListener('error', error)
      removeEventListener('unhandledrejection', error)
      observer.disconnect()
      restore.reverse().forEach((fn) => fn())
    },
    assert() {
      check('no unexpected global errors', globalErrors, [])
      check('owned workers terminated', workers.size, 0)
      check('owned blob URLs revoked', urls.size, 0)
      check('owned GPU buffers destroyed', buffers.size, 0)
      check('owned GPU devices destroyed', devices.size, 0)
      check('visibility listeners removed', visibility.size, 0)
      if (current.startsWith('offscreen-'))
        check('owned rAF cancelled', rafs.size, 0)
    },
  }
}
async function run(id, interact, kind = 'dom-interaction') {
  if ((focus && focus !== id) || (!focus && id === 'offscreen-canvas-step-18'))
    return
  current = id
  stage.removeAttribute('style')
  let dispose, spy
  try {
    const module = await import('/src/labs/' + id + '/example.js')
    spy = resources()
    spy.materials = []
    const mountContext = {
      ...context,
      THREE: {
        ...THREE,
        ShaderMaterial: class extends THREE.ShaderMaterial {
          constructor(...args) {
            super(...args)
            spy.materials.push(this)
          }
        },
      },
    }
    let fixtureRestore
    if (id === 'offscreen-canvas-02') {
      const Original = globalThis.Worker,
        url = URL.createObjectURL(
          new Blob(
            ["throw Error('E09 isolated asynchronous worker fixture')"],
            { type: 'text/javascript' },
          ),
        )
      globalThis.Worker = class extends Original {
        constructor(...args) {
          super(url, ...args.slice(1))
          URL.revokeObjectURL(url)
        }
      }
      fixtureRestore = () => (globalThis.Worker = Original)
    }
    try {
      dispose = await module.mount(mountContext)
    } finally {
      fixtureRestore?.()
    }
    await paint()
    const original = presentations[id]
    if (original) {
      const english = Object.values(englishPresentations).find(
        (rows) => rows[id],
      )?.[id]?.presentation
      const messages =
        locale === 'en'
          ? Object.fromEntries(
              Object.entries(english.values)
                .filter(([key]) => key.startsWith('messages.'))
                .map(([key, value]) => [key.slice(9), value]),
            )
          : original.messages
      const heading = $('h2,h3,strong')
      if (heading) {
        const expected =
          messages.title ??
          (id === 'css-02'
            ? messages.display005
            : (messages.display001 ?? messages.display01))
        if (expected && !expected.startsWith('<'))
          check('approved localized heading', heading.textContent, expected)
        else if (expected?.startsWith('<'))
          check(
            'approved localized heading',
            heading.textContent,
            new DOMParser()
              .parseFromString(expected, 'text/html')
              .querySelector('h3').textContent,
          )
      } else if (id === 'vue-step-04')
        check(
          'approved input aria',
          $('input').getAttribute('aria-label'),
          messages.display01,
        )
    }
    await interact(spy)
    if (
      [
        'threejs-step-04',
        'react-three-fiber-step-04',
        'pixijs-step-04',
        'glsl-step-26',
        'glsl-step-07',
        'glsl-step-17',
        'glsl-step-27',
      ].includes(id)
    )
      check('actual WebGL draw calls', spy.counts.webglDraws > 0)
    dispose()
    dispose = undefined
    await paint()
    check('cleanup empties stage', stage.childElementCount, 0)
    spy.assert()
    stage.removeAttribute('style')
    const remount = await module.mount(mountContext)
    await paint()
    remount()
    await paint()
    check('remount cleanup empties stage', stage.childElementCount, 0)
    spy.assert()
    cases.push({
      id,
      locale,
      status: 'pass',
      kind,
      cleanup: { ...spy.counts },
      errorInput: 'only where provided by example',
    })
  } catch (error) {
    cases.push({ id, locale, status: 'fail', kind, error: String(error) })
    results.push({
      id,
      locale,
      name: 'case error',
      ok: false,
      error: String(error),
    })
  } finally {
    try {
      dispose?.()
    } finally {
      spy?.restore()
      stage.replaceChildren()
    }
  }
}
await run(
  '18-gs-projection',
  async () => {
    check('initial composition', $('pre').textContent.includes('(0.25,0,0.5)'))
    check('projected radius', $('pre').textContent.includes('33.33'))
    const pixel = () => [
      ...$('canvas').getContext('2d').getImageData(100, 100, 1, 1).data,
    ]
    near('blue-front red byte', pixel()[0], 64, 1)
    near('blue-front blue byte', pixel()[2], 128, 1)
    await click()
    check('reverse composition', $('pre').textContent.includes('(0.5,0,0.25)'))
    near('red-front red byte', pixel()[0], 128, 1)
    await click()
    near('restored red byte', pixel()[0], 64, 1)
  },
  'cpu-canvas-readback',
)
await run('typescript-step-04', async () => {
  check('accepted', json().accepted)
  check('optional absent', json().optionalTag, 'absent')
  await changeJSON('{"id":"1","title":"A","tag":"x"}')
  check('reject runtime id', json(), { accepted: false, optionalTag: 'x' })
  await changeJSON('[')
  check('JSON error', typeof json().error, 'string')
  await changeJSON('{"id":1,"title":"A"}')
  check('JSON recovery', json().accepted)
})
await run('html-step-02', async () => {
  const shadow = () =>
    [...stage.querySelectorAll('section')].find((node) => node.shadowRoot)
      .shadowRoot
  check(
    'encoding fixture',
    shadow().querySelector('p').textContent,
    '한글 · café · 日本語',
  )
  check('lang', shadow().querySelector('.doc').lang, 'ko')
  $('textarea').value +=
    '<script>window.e09Injected=true</script><iframe src="about:blank"></iframe>'
  await click()
  check('scripts blocked', shadow().querySelector('script,iframe'), null)
  check(
    'blocked elements described',
    shadow().querySelectorAll('pre').length,
    2,
  )
  check('script did not execute', typeof window.e09Injected, 'undefined')
})
await run('vue-step-04', async () => {
  await input('input', 'State')
  check(
    'computed match',
    json().matches.map((x) => x.id),
    [1],
  )
  const before = json().evaluations
  await click()
  check('theme does not recompute', json().evaluations, before)
  await input('input', 'zzz')
  check('empty computed', json().matches, [])
  await input('input', '')
  check(
    'restore computed',
    json().matches.map((x) => x.id),
    [1, 2, 3],
  )
})
await run(
  'svelte-step-04',
  async () => {
    await input('input', 'e')
    check('derived matches', json().matches, ['State', 'Effects'])
    check('original preserved', json().original, ['State', 'Effects', 'Canvas'])
    await input('input', 'zzz')
    check('empty matches', json().matches, [])
    await input('input', '')
    check('restore', json().matches, ['State', 'Effects', 'Canvas'])
  },
  'svelte-dom-store-harness',
)
await run(
  'canvas-2d-step-04',
  async () => {
    const ctx = $('canvas').getContext('2d'),
      pixel = (x, y) =>
        [...ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data].slice(
          0,
          3,
        )
    check('initial blue sample', pixel(200, 100), [37, 99, 235])
    check('initial toggle', $('button').getAttribute('aria-pressed'), 'false')
    await click()
    check('toggle', $('button').getAttribute('aria-pressed'), 'true')
    check(
      'rotated blue center',
      pixel(
        180 * Math.cos(0.6) - 90 * Math.sin(0.6),
        180 * Math.sin(0.6) + 90 * Math.cos(0.6),
      ),
      [37, 99, 235],
    )
    check('pivot stays red', pixel(180, 90), [225, 29, 72])
    await click()
    check('restored toggle', $('button').getAttribute('aria-pressed'), 'false')
  },
  'cpu-canvas-readback',
)
await run('svg-step-04', async () => {
  check(
    'initial curve',
    $('path').getAttribute('d'),
    'M 30 160 Q 200 20 370 160',
  )
  await click()
  check(
    'changed curve',
    $('path').getAttribute('d'),
    'M 30 160 Q 200 120 370 160',
  )
  check('control point', $('circle').getAttribute('cy'), '120')
  await click()
  check('restored point', $('circle').getAttribute('cy'), '20')
})
await run(
  'threejs-step-04',
  async () => {
    check('initial pivot', $('output').textContent.includes('0'))
    await click()
    check('changed pivot/local', /\-1.*1/.test($('output').textContent))
    check('canvas rendered', $('canvas').width > 0)
    await click()
    check('restored toggle', $('button').getAttribute('aria-pressed'), 'false')
  },
  'hardware-webgl-render',
)
await run(
  'gaussian-splatting-step-04',
  async () => {
    check('quaternion initial', json().quaternionXYZW, [0, 0, 0, 1])
    await choose(1)
    near('angle', json().angleDegrees, 90)
    near('quaternion z', json().quaternionXYZW[2], Math.sqrt(0.5))
    await choose(0)
    near('restored angle', json().angleDegrees, 0)
  },
  'cpu-canvas',
)
await run(
  'webgpu-step-04',
  async () => {
    await wait(() => !$('button').disabled)
    check('first queue complete', json(), [
      'submit 1',
      'onSubmittedWorkDone: queue complete',
    ])
    await choose(1)
    check('second queue complete', json(), [
      'submit 1',
      'submit 2',
      'onSubmittedWorkDone: queue complete',
    ])
    await click()
    await wait(() => !$('button').disabled)
    check(
      'rerun queue complete',
      json().at(-1),
      'onSubmittedWorkDone: queue complete',
    )
  },
  'hardware-webgpu-queue-completion',
)
await run(
  'react-three-fiber-step-04',
  async () => {
    await wait(() => $('pre')?.textContent.includes('local'))
    near('initial local', json().local[0], 1.5)
    near('initial world', json().world[0], 1.5)
    await click()
    await wait(() => Math.abs(json().world[1] - 1.5) < 1e-6)
    near('local preserved', json().local[0], 1.5)
    near('world rotated x', json().world[0], 0)
    near('world rotated y', json().world[1], 1.5)
  },
  'hardware-webgl-render',
)
await run(
  'pixijs-step-04',
  async () => {
    await wait(() => $('output').textContent.length > 0)
    const count = () => Number($('output').textContent.match(/\d+/)[0])
    const first = count()
    await paint()
    check('rebuild increases', count() > first)
    await click()
    const fixed = count()
    await paint()
    check('position mode fixed rebuilds', count(), fixed)
    await click()
    await paint()
    check('rebuild resumes', count() > fixed)
  },
  'hardware-webgl-render',
)
await run(
  'glsl-step-26',
  async () => {
    check('valid shader no error', !/ERROR/.test($('pre').textContent))
    await choose(1)
    check('raw compiler failure', /ERROR|error/.test($('pre').textContent))
    await choose(0)
    check('valid shader recovers', !/ERROR/.test($('pre').textContent))
  },
  'hardware-webgl-fragment-compile',
)
await run(
  'wgsl-step-04',
  async () => {
    await wait(() => !$('button').disabled)
    if (new URLSearchParams(location.search).has('fallback')) {
      check(
        'unsupported adapter reason',
        $('pre').textContent,
        locale === 'en'
          ? 'No adapter is available.'
          : '사용 가능한 adapter가 없습니다.',
      )
      await click()
      await wait(() => !$('button').disabled)
      check('unsupported rerun recovers button', !$('button').disabled)
      return
    }
    check('input unchanged', json().input, [1, 2, 3, 4, 5, 6, 7, 8])
    check('scale1 GPU readback', json().output, [1, 2, 3, 4, 5, 6, 7, 8])
    await choose(1)
    check('scale2 GPU readback', json().output, [2, 4, 6, 8, 10, 12, 14, 16])
    check('last GPU element', json().last, 16)
    await choose(0)
    check('scale1 recovery', json().last, 8)
  },
  'hardware-webgpu-readback',
)
await run('motion-step-13', async () => {
  await wait(() => stage.querySelectorAll('button').length === 2)
  const control = $('button'),
    remove = stage.querySelectorAll('button')[1]
  remove.focus()
  if (new URLSearchParams(location.search).has('keyboard')) {
    stage.dataset.keyboardReady = 'true'
    await wait(() => stage.querySelectorAll('button').length === 1)
  } else remove.click()
  await wait(() => stage.querySelectorAll('button').length === 1)
  await wait(() => document.activeElement === control)
  check('exit restores focus', document.activeElement === control)
  control.click()
  await wait(() => stage.querySelectorAll('button').length === 2)
  check(
    'replay child',
    stage.querySelectorAll('button')[1].textContent,
    'Remove focused item',
  )
})
await run(
  'web-workers-step-20',
  async () => {
    await click()
    await wait(() => $('output').textContent.includes('"total":18'))
    const first = JSON.parse($('output').textContent)
    await click()
    await wait(() => $('output').textContent.includes('"id":4'))
    const second = JSON.parse($('output').textContent)
    check('new request total', second.total, 18)
    check('new request IDs', [first.id, second.id], [2, 4])
  },
  'actual-worker-error-response-replacement',
)
await run(
  'offscreen-canvas-step-04',
  async () => {
    await wait(() => $('output').textContent.includes('painted'))
    const first = $('canvas')
    await click()
    check('canvas replaced', $('canvas') !== first)
    check(
      'direct fallback reason',
      $('output').textContent.includes(
        locale === 'en'
          ? 'Direct fallback call: Canvas replaced'
          : 'fallback 직접 호출: Canvas 교체',
      ),
    )
    check(
      'fallback dimensions',
      [$('canvas').width, $('canvas').height],
      [320, 160],
    )
    const second = $('canvas')
    await click(1)
    check('manual fallback replaces', $('canvas') !== second)
    check(
      'manual reason',
      $('output').textContent.includes('manual comparison'),
    )
    await click()
    check(
      'repeat dimensions',
      [$('canvas').width, $('canvas').height],
      [320, 160],
    )
  },
  'worker-offscreen-and-direct-main-thread-fallback',
)
for (const id of ['webassembly-step-04', 'playwright-step-04'])
  await run(
    id,
    async () => {
      check('companion displayed', !!$('.stage pre'))
      await click()
      check('external boundary displayed', $('output').textContent.length > 0)
    },
    'external-source-preview-only',
  )
await run(
  'webgpu-step-16',
  async () => {
    const oracle = [1, 46 / 81, 20 / 81, 6 / 81, 1 / 81, ...Array(11).fill(0)]
    await wait(() => !$('button').disabled)
    json().after4.forEach((value, i) =>
      near('fixed GPU oracle ' + i, value, oracle[i]),
    )
    await choose(1)
    check('in-place not executed', json().inPlaceExecuted, false)
    json().safeReference.forEach((value, i) =>
      near('safe GPU oracle ' + i, value, oracle[i]),
    )
  },
  'hardware-webgpu-readback',
)
await run('html-step-06', async () => {
  check(
    'raw hrefs',
    json().links.map((x) => x.href),
    ['#result', './detail.html', '../detail.html'],
  )
  const shadow = [...stage.querySelectorAll('section')].find(
    (x) => x.shadowRoot,
  ).shadowRoot
  check('head base omitted', shadow.querySelector('base'), null)
  const before = location.href
  shadow.querySelector('a').click()
  check('hash navigation prevented', location.href, before)
})
await run('html-step-11', async () => {
  const shadow = [...stage.querySelectorAll('section')].find(
    (x) => x.shadowRoot,
  ).shadowRoot
  shadow.querySelector('[name=q]').value = 'canvas'
  const before = location.href
  shadow.querySelector('form').requestSubmit()
  check('form entries', json().forms[0].entries, [['q', 'canvas']])
  check('form navigation prevented', location.href, before)
})
await run(
  'gaussian-splatting-step-19',
  async () => {
    check('kept initial', json().kept, 256)
    await choose(1)
    check('kept changed', json().kept, 128)
  },
  'cpu-canvas',
)
for (const [id, expected] of [
  ['web-workers-step-11', 2],
  ['web-workers-step-22', 49995000],
])
  await run(
    id,
    async () => {
      await click()
      await wait(() => $('output').textContent.includes(String(expected)))
      check(
        'computed result',
        $('output').textContent.includes(String(expected)),
      )
      await new Promise((resolve) => setTimeout(resolve, 350))
      check(
        'late response preserves result',
        $('output').textContent.includes(String(expected)),
      )
    },
    'actual-worker',
  )
for (const id of ['glsl-step-07', 'glsl-step-17', 'glsl-step-27'])
  await run(
    id,
    async (spy) => {
      const material = spy.materials[0]
      check(
        'initial shader variant uniform',
        material.uniforms.uVariant.value,
        0,
      )
      const help = $('p').textContent
      check(
        'corrected limitation',
        id.endsWith('07')
          ? help.includes('smoothstep(.5,.1,...)')
          : help.includes(locale === 'en' ? 'interpolation' : '보간식'),
      )
      const initial = $('pre').textContent
      await choose(1)
      check('variant output changes', $('pre').textContent !== initial)
      check(
        'changed shader variant uniform',
        material.uniforms.uVariant.value,
        1,
      )
      if (!id.endsWith('07'))
        check(
          'interpolation tied to same variant',
          material.fragmentShader.includes('mix(f,f*f*(3.-2.*f),uVariant)'),
        )
      if (id.endsWith('17'))
        check(
          'octave count shares variant',
          material.fragmentShader.includes('mix(1.,5.,uVariant)'),
        )
      if (id.endsWith('27'))
        check(
          'half backing size',
          [$('canvas').width, $('canvas').height],
          [320, 180],
        )
      await choose(0)
      if (id.endsWith('27'))
        check(
          'full backing size',
          [$('canvas').width, $('canvas').height],
          [640, 360],
        )
    },
    'hardware-webgl-corrected-scope',
  )
await run(
  'gaussian-splatting-step-21',
  async (spy) => {
    const mse = () => {
      const [reference, candidate] = spy.imageReads.slice(-2),
        roi = json().roi
      let sum = 0,
        n = 0
      for (let y = roi.y; y < roi.y + roi.h; y++)
        for (let x = roi.x; x < roi.x + roi.w; x++)
          for (let c = 0; c < 3; c++) {
            const i = (y * 640 + x) * 4 + c
            sum += (reference[i] - candidate[i]) ** 2
            n++
          }
      near('independent RGB byte MSE', json().byteRGB_MSE, sum / n, 1e-10)
    }
    mse()
    check('full ROI', json().roi, { x: 0, y: 0, w: 640, h: 360 })
    check(
      'finite byte MSE',
      Number.isFinite(json().byteRGB_MSE) && json().byteRGB_MSE > 0,
    )
    await choose(1)
    check('strip ROI', json().roi, { x: 300, y: 60, w: 40, h: 240 })
    mse()
    check(
      'finite strip MSE',
      Number.isFinite(json().byteRGB_MSE) && json().byteRGB_MSE > 0,
    )
  },
  'cpu-canvas-mse',
)
await run(
  'gaussian-splatting-step-26',
  async () => {
    await wait(() => $('pre').textContent.includes('medianRafMs'))
    check('60 intervals', json().frames, 60)
    check('full scale', json().renderScale, 1)
    check(
      'finite timing',
      Number.isFinite(json().medianRafMs) && Number.isFinite(json().p95RafMs),
    )
    await choose(1)
    await wait(() => json().renderScale === 0.5)
    check('half scale', json().renderScale, 0.5)
    check(
      'half backing size',
      [$('canvas').width, $('canvas').height],
      [320, 180],
    )
  },
  'cpu-canvas-raf-timing',
)
await run(
  'web-workers-step-18',
  async () => {
    await click()
    await wait(() => $('output').textContent.includes('[[1,0],[2,1],[3,2]]'))
    check(
      'ordered response IDs and totals',
      $('output').textContent.endsWith('[[1,0],[2,1],[3,2]]'),
    )
  },
  'actual-worker',
)
await run(
  'web-workers-step-26',
  async (spy) => {
    $('button').click()
    check('budget immediately', $('output').textContent.includes('3145728'))
    await wait(() => $('output').textContent.includes('"total":0'))
    check('buffer sum zero', JSON.parse($('output').textContent).total, 0)
    const transfer = spy.workerMessages.find(
      (message) => message.bufferBytesBefore !== undefined,
    )
    check('transferred 1 MiB buffer', transfer.bufferBytesBefore, 1048576)
    check('buffer detached after transfer', transfer.bufferBytesAfter, 0)
  },
  'actual-worker-transfer',
)
for (const id of [
  'offscreen-canvas-step-17',
  'offscreen-canvas-step-22',
  'offscreen-canvas-step-23',
  'offscreen-canvas-step-24',
  'offscreen-canvas-step-25',
  'offscreen-canvas-step-27',
])
  await run(
    id,
    async (spy) => {
      await wait(() => $('output').textContent.includes('painted'))
      if (id.endsWith('17')) {
        await click()
        await wait(() => $('output').textContent.includes('paused'))
        check('pause true', JSON.parse($('output').textContent).value, true)
        $('canvas').dispatchEvent(
          new PointerEvent('pointermove', { clientX: 60, clientY: 50 }),
        )
        await wait(() => $('output').textContent.includes('painted'))
        check(
          'paused draw suppressed',
          'dt' in JSON.parse($('output').textContent),
          false,
        )
        await click()
        await wait(() => $('output').textContent.includes('paused'))
        check('pause false', JSON.parse($('output').textContent).value, false)
        $('canvas').dispatchEvent(
          new PointerEvent('pointermove', { clientX: 90, clientY: 70 }),
        )
        await wait(() => $('output').textContent.includes('painted'))
        check(
          'resumed draw finite dt',
          Number.isFinite(JSON.parse($('output').textContent).dt),
        )
      }
      if (id.endsWith('22')) {
        await click()
        await wait(() => stage.querySelectorAll('canvas').length === 2)
        check(
          'bitmap preview canvas',
          stage.querySelectorAll('canvas').length,
          2,
        )
      }
      if (id.endsWith('23')) {
        const events = []
        for (const type of ['contextlost', 'contextrestored'])
          $('canvas').addEventListener(type, () => events.push(type), {
            once: true,
          })
        await click()
        await wait(() => $('output').textContent.includes('painted'))
        check('synthetic events', events, ['contextlost', 'contextrestored'])
        check(
          'saved dimensions',
          JSON.parse($('output').textContent).width,
          320,
        )
      }
      if (id.endsWith('24') || id.endsWith('27')) {
        await click()
        await wait(() => $('output').textContent.includes('Request→ack ms'))
        check(
          'compositor exclusion',
          $('output').textContent.includes(
            'excludes display compositor latency',
          ),
        )
        check(
          'finite latency',
          Number.isFinite(
            Number($('output').textContent.match(/ms ([\d.]+)/)[1]),
          ),
        )
      }
      if (id.endsWith('25')) {
        await click()
        await wait(() => JSON.parse($('output').textContent).width === 640)
        check(
          'DPR2 backing',
          [$('canvas').width, $('canvas').height],
          [640, 320],
        )
        check(
          'DPR2 count patch',
          spy.workerMessages
            .filter((message) => message.state?.count !== undefined)
            .at(-1).state.count,
          800,
        )
        await click()
        await wait(() => JSON.parse($('output').textContent).width === 320)
        check(
          'DPR1 backing',
          [$('canvas').width, $('canvas').height],
          [320, 160],
        )
        check(
          'DPR1 count patch',
          spy.workerMessages
            .filter((message) => message.state?.count !== undefined)
            .at(-1).state.count,
          40,
        )
      }
    },
    'actual-offscreen-worker',
  )
await run(
  '15-nerf-gs',
  async () => {
    for (const count of [24, 4, 128]) {
      await input('input', String(count))
      let transmittance = 1,
        color = 0
      for (let i = 0; i < count; i++) {
        const step = 4 / count,
          x = (i + 0.5) * step - 2,
          alpha = 1 - Math.exp(-Math.exp(-x * x * 2) * step)
        color += transmittance * alpha
        transmittance *= 1 - alpha
      }
      check(
        'midpoint ray oracle ' + count,
        $('pre').textContent.includes(color.toFixed(4)),
      )
    }
  },
  'cpu-canvas-ray-integration',
)
await run('css-02', async () => {
  for (const width of [559, 560, 561]) {
    await input('#width', String(width + 26))
    const panel = $('.responsive-demo'),
      actual = panel.clientWidth - 24
    near('actual query content width ' + width, actual, width, 0.01)
    const columns = getComputedStyle(
      $('.responsive-cards'),
    ).gridTemplateColumns.split(' ').length
    check('container columns ' + width, columns, width <= 560 ? 1 : 3)
  }
})
await run('html-step-20', async () => {
  const shadow = [...stage.querySelectorAll('section')].find(
      (x) => x.shadowRoot,
    ).shadowRoot,
    image = shadow.querySelector('img')
  await wait(() => image.complete && image.currentSrc.length > 0)
  check(
    'picture source actual viewport ' + innerWidth,
    image.currentSrc.includes('coral'),
    innerWidth <= 600,
  )
  if (innerWidth <= 600)
    check(
      'decoded SVG bytes',
      decodeURIComponent(image.currentSrc.split(',')[1]),
      "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='coral'/></svg>",
    )
})
await run(
  'offscreen-canvas-step-18',
  async () => {
    await wait(() => $('output').textContent.includes('painted'))
    stage.dataset.visibilityReady = 'true'
    await wait(() => stage.dataset.visibilityDone === 'true')
    check('actual hidden observed', stage.dataset.hiddenObserved, 'true')
    check('visible restored', document.hidden, false)
  },
  'actual-document-visibility',
)
await run(
  'offscreen-canvas-02',
  async (spy) => {
    const canvas = $('canvas')
    await wait(() =>
      spy.notices.some((text) => text.includes('Worker unavailable:')),
    )
    check(
      'actual asynchronous worker error',
      spy.notices.some(
        (text) =>
          text.includes('Worker unavailable:') &&
          text.includes('E09 isolated asynchronous worker fixture'),
      ),
    )
    check('no automatic fallback canvas replacement', $('canvas') === canvas)
  },
  'isolated-actual-worker-error-fixture',
)
document.querySelector('#state').textContent = cases.every(
  (row) => row.status === 'pass',
)
  ? 'PASS'
  : 'FAIL'
document.querySelector('#results').textContent = JSON.stringify(
  {
    locale,
    cases,
    results,
    unverified: focus
      ? []
      : [
          {
            id: 'offscreen-canvas-step-18',
            scope: 'actual visibility pause/resume',
            reason:
              'Headless Chromium keeps both foregrounded tabs document.hidden=false; see separate capability evidence.',
          },
        ],
  },
  null,
  2,
)

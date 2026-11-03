import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'
import { transformSync } from 'esbuild'
import { createRuntimeLoader } from '../src/preview/loadRuntime.ts'

test('runtime profiles fetch only their own bundles and share pending loads', async () => {
  const calls = []
  const load = createRuntimeLoader(
    Object.fromEntries(
      ['legacy', 'core', 'controls', 'gltf'].map((name) => [
        name,
        async () => {
          calls.push(name)
          return { default: name }
        },
      ]),
    ),
  )
  assert.deepEqual(await load('html'), { modules: {} })
  assert.deepEqual(calls, [])
  const legacy = load('legacy')
  assert.equal(load('legacy'), legacy)
  assert.deepEqual(await legacy, { legacy: 'legacy', modules: {} })
  assert.deepEqual(calls, ['legacy'])
  assert.deepEqual(await load('threejs'), {
    modules: { core: 'core', controls: 'controls', gltf: 'gltf' },
  })
  await load('threejs')
  assert.deepEqual(calls, ['legacy', 'core', 'controls', 'gltf'])
})

test('failed runtime loads can be retried for each profile', async () => {
  for (const profile of ['legacy', 'threejs']) {
    let failing = true
    const importer = async () => {
      if (failing) throw new Error('offline')
      return { default: 'recovered' }
    }
    const load = createRuntimeLoader({
      legacy: importer,
      core: importer,
      controls: importer,
      gltf: importer,
    })
    await assert.rejects(load(profile), /offline/)
    failing = false
    const recovered = await load(profile)
    assert.equal(
      profile === 'legacy' ? recovered.legacy : recovered.modules.core,
      'recovered',
    )
  }
})

// Exercise the real Preview effects with controlled network and disposal events.
// This keeps races deterministic without requiring a browser or new test packages.
function previewHarness() {
  const slots = [],
    effects = [],
    timers = new Map(),
    listeners = new Set()
  const requests = [],
    posted = []
  let cursor = 0,
    timerId = 0,
    token = 0
  const target = { postMessage: (message) => posted.push(message) }
  const react = {
    useState(initial) {
      const index = cursor++
      if (!(index in slots))
        slots[index] = typeof initial === 'function' ? initial() : initial
      return [
        slots[index],
        (value) => {
          slots[index] =
            typeof value === 'function' ? value(slots[index]) : value
        },
      ]
    },
    useRef(initial) {
      const index = cursor++
      return (slots[index] ??= { current: initial })
    },
    useEffect(callback, deps) {
      const index = cursor++
      const previous = slots[index]
      if (!previous || deps.some((dep, i) => dep !== previous.deps[i])) {
        effects.push(() => {
          previous?.cleanup?.()
          slots[index] = { deps, cleanup: callback() }
        })
      }
    },
  }
  react.useLayoutEffect = react.useEffect
  const jsx = (type, props) => {
    if (type === 'iframe') props.ref.current = { contentWindow: target }
    return { type, props }
  }
  const module = { exports: {} }
  const code = transformSync(readFileSync('src/preview/Preview.tsx', 'utf8'), {
    loader: 'tsx',
    format: 'cjs',
    jsx: 'automatic',
  }).code
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(name) {
      if (name === 'react') return react
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx }
      if (name.endsWith('/messages')) return { messages: { ko: {}, en: {} } }
      if (name === './loadRuntime')
        return {
          loadRuntime(profile) {
            return new Promise((resolve, reject) =>
              requests.push({ profile, resolve, reject }),
            )
          },
        }
      if (name === './document')
        return {
          createPreviewDocument: (code, token, runtime, locale) =>
            `${code}:${locale}:${runtime}`,
        }
      if (name === './html-document')
        return {
          createHtmlPreviewDocument: (code, token, locale) =>
            `${code}:${locale}`,
        }
      if (name === './ConsoleOutput') return { ConsoleOutput() {} }
      throw new Error(name)
    },
    document: {
      createElement: () => ({
        getContext: () => ({ getExtension: () => null }),
      }),
    },
    crypto: { randomUUID: () => `token-${++token}` },
    window: {
      setTimeout(fn) {
        timers.set(++timerId, fn)
        return timerId
      },
      clearTimeout(id) {
        timers.delete(id)
      },
      addEventListener(type, fn) {
        listeners.add(fn)
      },
      removeEventListener(type, fn) {
        listeners.delete(fn)
      },
    },
  })
  return {
    requests,
    posted,
    render(props) {
      cursor = 0
      const tree = module.exports.Preview(props)
      effects.splice(0).forEach((effect) => effect())
      return tree
    },
    tick() {
      const current = [...timers.values()]
      timers.clear()
      current.forEach((fn) => fn())
    },
    message(data, source = target) {
      for (const listener of [...listeners]) listener({ data, source })
    },
  }
}

const props = (code, locale = 'ko', revision = 0) => ({
  input: { code, kind: 'javascript', profile: 'legacy' },
  locale,
  revision,
})
const frame = (tree) =>
  tree.props.children.find((node) => node?.props?.className === 'canvas-shell')
    .props.children
const settle = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

test('late runtime completion cannot replace the newest edit; locale applies on next run', async () => {
  const harness = previewHarness()
  harness.render(props('old'))
  harness.tick()
  harness.render(props('new'))
  harness.tick()
  harness.requests[1].resolve({ legacy: 'runtime', modules: {} })
  await settle()
  let tree = harness.render(props('new'))
  assert.equal(frame(tree).props.srcDoc, 'new:ko:runtime')
  harness.requests[0].resolve({ legacy: 'stale', modules: {} })
  await settle()
  tree = harness.render(props('new', 'en'))
  assert.equal(frame(tree).props.srcDoc, 'new:ko:runtime')
  assert.equal(harness.requests.length, 2)
  harness.render(props('new', 'en', 1))
  harness.tick()
  harness.requests[2].resolve({ legacy: 'runtime', modules: {} })
  await settle()
  assert.equal(harness.posted.at(-1).type, 'study-dispose')
  harness.tick()
  tree = harness.render(props('new', 'en', 1))
  assert.equal(frame(tree).props.srcDoc, 'new:en:runtime')
})

test('failed loads retain the last frame and retry waits for authenticated disposal', async () => {
  const harness = previewHarness()
  harness.render(props('working'))
  harness.tick()
  harness.requests[0].resolve({ legacy: 'runtime', modules: {} })
  await settle()
  const previous = frame(harness.render(props('working')))
  harness.render(props('next'))
  harness.tick()
  harness.requests[1].reject(new Error('offline'))
  await settle()
  let tree = harness.render(props('next'))
  assert.equal(frame(tree).props.srcDoc, previous.props.srcDoc)
  assert.equal(harness.posted.length, 0)
  const retry = tree.props.children.find((node) => node?.type === 'button')
  assert.equal(retry.props.children, '미리보기 다시 시도')
  retry.props.onClick()
  harness.render(props('next'))
  harness.tick()
  harness.requests[2].resolve({ legacy: 'runtime', modules: {} })
  await settle()
  const token = harness.posted.at(-1).token
  harness.message({ type: 'study-preview', status: 'disposed', token }, {})
  harness.message({ type: 'study-preview', status: 'disposed', token: 'wrong' })
  assert.equal(
    frame(harness.render(props('next'))).props.srcDoc,
    previous.props.srcDoc,
  )
  harness.message({ type: 'study-preview', status: 'disposed', token })
  tree = harness.render(props('next'))
  assert.equal(frame(tree).props.srcDoc, 'next:ko:runtime')
  assert.equal(frame(tree).props.sandbox, 'allow-scripts')
})

test('a stale loading failure cannot display retry over a newer successful frame', async () => {
  const harness = previewHarness()
  harness.render(props('old'))
  harness.tick()
  harness.render(props('new'))
  harness.tick()
  harness.requests[1].resolve({ legacy: 'runtime', modules: {} })
  await settle()
  harness.render(props('new'))
  harness.requests[0].reject(new Error('stale failure'))
  await settle()
  const tree = harness.render(props('new'))
  assert.equal(frame(tree).props.srcDoc, 'new:ko:runtime')
  assert.equal(
    tree.props.children.some((node) => node?.type === 'button'),
    false,
  )
})

import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'
import { transformSync } from 'esbuild'
import * as documents from '../src/app/documentLoader.ts'
import * as localePaths from '../src/i18n/locale.ts'
import * as messages from '../src/i18n/messages.ts'

const readJSON = (path) => JSON.parse(readFileSync(path, 'utf8'))
const catalogs = {
  ko: readJSON('src/app/catalog.json'),
  en: readJSON('src/app/catalog.en.json'),
}
const content = {
  ko: readJSON('content/learning/threejs.json'),
  en: readJSON('content/locales/en/learning/threejs.json'),
}
const curriculum = {
  units: catalogs.ko.units,
  getLocalizedUnit: (locale, id) =>
    catalogs[locale].units.find((unit) => unit.id === id),
}
const learningContent = {
  getLessonLearning: (id, locale) =>
    content[locale].lessons.find((lesson) => lesson.unitId === id),
  getApiReference: (id, locale) =>
    content[locale].apis.find((api) => api.id === id),
  readLearningCode: () => '',
}
const nodes = (tree) =>
  !tree || typeof tree !== 'object'
    ? []
    : Array.isArray(tree)
      ? tree.flatMap(nodes)
      : [tree, ...nodes(tree.props?.children)]

// Run actual component handlers/effects; child UI and browser events are controlled.
// Storage/editor internals and real browser history traversal are outside this harness.
function harness(file, initialId = 'threejs-01') {
  const slots = [],
    effects = [],
    listeners = new Map()
  let cursor = 0,
    dirty = false,
    locale = 'en'
  const react = {
    useState(initial) {
      const index = cursor++
      if (!(index in slots))
        slots[index] = typeof initial === 'function' ? initial() : initial
      return [
        slots[index],
        (value) => {
          const next = typeof value === 'function' ? value(slots[index]) : value
          if (!Object.is(next, slots[index])) dirty = true
          slots[index] = next
        },
      ]
    },
    useRef(initial) {
      const index = cursor++
      return (slots[index] ??= { current: initial })
    },
    useEffect(callback, deps) {
      const index = cursor++,
        previous = slots[index]
      if (
        !previous ||
        deps.some((dep, i) => !Object.is(dep, previous.deps[i]))
      ) {
        effects.push(() => {
          previous?.cleanup?.()
          slots[index] = { deps, cleanup: callback() }
        })
      }
    },
    lazy: () => 'Workspace',
    Suspense: 'Suspense',
  }
  react.useLayoutEffect = react.useEffect
  const jsx = (type, props) => ({ type, props })
  const location = { hash: '#' + initialId }
  const document = { documentElement: {}, getElementById: () => null }
  const module = { exports: {} }
  vm.runInNewContext(
    transformSync(readFileSync(file, 'utf8'), {
      loader: 'tsx',
      format: 'cjs',
      jsx: 'automatic',
    }).code,
    {
      module,
      exports: module.exports,
      require(name) {
        if (name === 'react') return react
        if (name === 'react/jsx-runtime')
          return { jsx, jsxs: jsx, Fragment: 'Fragment' }
        if (name === './curriculum') return curriculum
        if (name === './learningContent') return learningContent
        if (name === './documents') return documents
        if (name === '../i18n/messages') return messages
        if (name === '../i18n/locale') return localePaths
        if (name === '../i18n/LocaleProvider')
          return {
            useLocale: () => ({
              locale,
              setLocale: (next) => {
                locale = next
              },
            }),
          }
        const component = name.split('/').at(-1)
        return { [component]: component }
      },
      document,
      window: {
        location,
        scrollTo() {},
        scrollY: 0,
        addEventListener: (type, fn) => listeners.set(type, fn),
        removeEventListener: (type) => listeners.delete(type),
      },
      history: {
        pushState: (_state, _title, hash) => {
          location.hash = hash
        },
      },
      requestAnimationFrame: () => 1,
      cancelAnimationFrame() {},
    },
  )
  return {
    location,
    document,
    render(props) {
      let tree
      do {
        dirty = false
        cursor = 0
        tree = Object.values(module.exports)[0](props)
        effects.splice(0).forEach((effect) => effect())
      } while (dirty)
      return tree
    },
    navigate(type, id) {
      location.hash = '#' + id
      listeners.get(type)()
    },
    setLocale(next) {
      locale = next
    },
  }
}

for (const locale of ['ko', 'en']) {
  test(`${locale}: all 96 prerequisite buttons open existing localized documents`, () => {
    const opened = []
    for (const lesson of content[locale].lessons) {
      const ui = harness('src/app/LessonLearning.tsx')
      const tree = ui.render({
        lesson,
        locale,
        onDocument: (path) => opened.push(path),
      })
      const buttons = nodes(tree).filter(
        (node) => node.props?.className === 'text-link',
      )
      assert.equal(buttons.length, lesson.prerequisiteIds.length)
      buttons.forEach((button, index) => {
        button.props.onClick()
        const expected = curriculum.getLocalizedUnit(
          locale,
          lesson.prerequisiteIds[index],
        ).docPath
        assert.equal(opened.at(-1), expected)
        assert.ok(existsSync('.' + opened.at(-1)), opened.at(-1))
      })
    }
    assert.equal(opened.length, 96)
  })
}

const find = (tree, type) => nodes(tree).find((node) => node.type === type)
const reading = (tree) =>
  find(tree, 'Workspace').props.reading(
    () => {},
    () => {},
  )
const open = (ui) => {
  find(ui.render(), 'LearningNavigator').props.onDocument(
    catalogs.en.units.find((unit) => unit.id === 'threejs-01').docPath,
  )
  assert.ok(find(reading(ui.render()), 'DocumentDialog'))
}
for (const route of ['pagination', 'navigator', 'hashchange', 'popstate']) {
  test(`${route}: switching units closes old document and reveals matching learning content`, () => {
    const ui = harness('src/app/App.tsx')
    open(ui)
    if (route === 'pagination' || route === 'navigator') {
      find(
        ui.render(),
        route === 'pagination' ? 'UnitPagination' : 'LearningNavigator',
      ).props.onSelect('threejs-step-02')
    } else ui.navigate(route, 'threejs-step-02')
    const tree = ui.render(),
      panel = reading(tree)
    assert.equal(ui.location.hash, '#threejs-step-02')
    assert.equal(find(tree, 'Workspace').props.unit.id, 'threejs-step-02')
    assert.equal(find(panel, 'DocumentDialog'), undefined)
    assert.equal(find(panel, 'LessonLearning').props.hidden, false)
    assert.equal(
      find(panel, 'LessonLearning').props.lesson.unitId,
      'threejs-step-02',
    )
    assert.equal(find(panel, 'LessonLearning').props.locale, 'en')
    assert.match(ui.document.title, /Renderer/)
    // Return/forward events must not resurrect the document from the previous visit.
    ui.navigate('popstate', 'threejs-01')
    assert.equal(find(reading(ui.render()), 'DocumentDialog'), undefined)
    ui.navigate('popstate', 'threejs-step-02')
    assert.equal(find(reading(ui.render()), 'DocumentDialog'), undefined)
  })
}
test('same-unit selection and locale switch retain the document; home closes it', () => {
  const ui = harness('src/app/App.tsx')
  open(ui)
  find(ui.render(), 'UnitPagination').props.onSelect('threejs-01')
  ui.navigate('hashchange', 'threejs-01')
  assert.ok(find(reading(ui.render()), 'DocumentDialog'))
  ui.setLocale('ko')
  const document = find(reading(ui.render()), 'DocumentDialog')
  assert.equal(
    document.props.path,
    catalogs.ko.units.find((unit) => unit.id === 'threejs-01').docPath,
  )
  assert.equal(document.props.requestedLocale, 'ko')
  ui.navigate('hashchange', '')
  assert.equal(find(ui.render(), 'DocumentDialog'), undefined)
})

test('document policy also applies across integrated lessons, practice guides and home', () => {
  const ui = harness('src/app/App.tsx')
  open(ui)
  find(ui.render(), 'LearningNavigator').props.onSelect('html-step-02')
  let tree = ui.render()
  assert.equal(find(tree, 'DocumentDialog'), undefined)
  assert.equal(find(tree, 'PracticeGuide').props.unit.id, 'html-step-02')
  find(tree, 'LearningNavigator').props.onDocument(
    '/docs/en/learning-workspace.md',
  )
  assert.ok(find(ui.render(), 'DocumentDialog'))
  ui.navigate('hashchange', 'threejs-01')
  assert.equal(find(reading(ui.render()), 'DocumentDialog'), undefined)
  ui.navigate('hashchange', '')
  tree = ui.render()
  nodes(tree)
    .find(
      (node) =>
        node.type === 'button' &&
        node.props.children === messages.messages.en.usage,
    )
    .props.onClick()
  assert.ok(find(ui.render(), 'DocumentDialog'))
  find(ui.render(), 'Home').props.onSelect('threejs-01')
  assert.equal(find(reading(ui.render()), 'DocumentDialog'), undefined)
})

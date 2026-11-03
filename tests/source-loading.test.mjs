import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync, cpSync, mkdtempSync, rmSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { transformSync } from 'esbuild'
import { createSourceLoader } from '../src/app/sourceLoader.ts'
import { createDraftStore, draftKey } from '../src/shared/drafts.ts'
import { readLearningContent } from '../scripts/learning-content.mjs'

const deferred = () => {
  let resolve, reject
  const promise = new Promise((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
test('source loading is lazy, coalesces requests, preserves locale bytes and retries failure', async () => {
  let calls = 0
  const first = deferred()
  const loader = createSourceLoader({
    ko: () => {
      calls++
      return first.promise
    },
    en: async () => 'English',
  })
  assert.equal(calls, 0)
  assert.equal(loader.read('ko'), undefined)
  const a = loader.load('ko'),
    b = loader.load('ko')
  assert.equal(a, b)
  await Promise.resolve()
  assert.equal(calls, 1)
  first.resolve('한국어')
  await a
  await loader.load('en')
  assert.equal(loader.read('ko'), '한국어')
  assert.equal(loader.read('en'), 'English')
  await loader.load('ko')
  assert.equal(calls, 1)
  let attempts = 0
  const retry = createSourceLoader({
    file: async () => {
      if (++attempts === 1) throw Error('offline')
      return 'recovered'
    },
  })
  await assert.rejects(retry.load('file'), /offline/)
  assert.equal(retry.read('file'), undefined)
  await retry.load('file')
  assert.equal(retry.read('file'), 'recovered')
  await assert.rejects(retry.load('missing'), /Unknown code path/)
})
test('progress inspection does not poison unvisited backup originals and keeps in-memory edits', () => {
  const data = new Map()
  const storage = {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => data.set(k, v),
  }
  const store = createDraftStore(() => storage)
  assert.equal(store.inspect('unvisited').draft.code, '')
  assert.equal(
    store.load('unvisited', 'full original').draft.code,
    'full original',
  )
  assert.equal(data.size, 0)
  const started = store.begin('edited', 'original', 'en').draft
  storage.setItem = () => {
    throw Error('denied')
  }
  store.save('edited', {
    ...started,
    code: 'memory edit',
    progress: 'completed',
  })
  assert.equal(store.inspect('edited').draft.code, 'memory edit')
  assert.equal(store.inspect('edited').draft.progress, 'completed')
  data.set(draftKey('corrupt'), '{bad')
  assert.equal(store.inspect('corrupt').warning, 'read-failed')
  assert.equal(data.get(draftKey('corrupt')), '{bad')
})
test('build-time adapter rejects missing ko and en source files', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'frontory-source-validation-'))
  try {
    for (const file of [
      'content/learning',
      'content/locales/en/learning',
      'content/curricula/threejs.json',
      'src/app/catalog.json',
      'src/labs',
    ])
      cpSync(file, path.join(root, file), { recursive: true })
    readLearningContent(root)
    const source = readLearningContent(root).ko.lessons[0].steps[0].starterPath
    const localized = source.replace(/\.html$/, '.en.html')
    unlinkSync(path.join(root, localized))
    assert.throws(
      () => readLearningContent(root),
      /Missing|Unknown|ENOENT|localized/i,
    )
    cpSync(source.replace(/\.html$/, '.en.html'), path.join(root, localized))
    unlinkSync(path.join(root, source))
    assert.throws(
      () => readLearningContent(root),
      /Missing|Unknown|ENOENT|localized/i,
    )
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

function workspaceHarness() {
  const slots = [],
    effects = [],
    requests = []
  let reloads = 0
  let cursor = 0,
    dirty = false,
    locale = 'ko',
    props
  const react = {
    createElement: (type, props) => ({ type, props }),
    useState(initial) {
      const index = cursor++
      if (!(index in slots)) slots[index] = initial
      return [
        slots[index],
        (value) => {
          slots[index] =
            typeof value === 'function' ? value(slots[index]) : value
          dirty = true
        },
      ]
    },
    useEffect(callback, deps) {
      const index = cursor++,
        previous = slots[index]
      if (!previous || deps.some((v, i) => !Object.is(v, previous.deps[i]))) {
        effects.push(() => {
          previous?.cleanup?.()
          slots[index] = { deps, cleanup: callback() }
        })
      }
    },
  }
  const module = { exports: {} }
  new Function(
    'require',
    'module',
    'exports',
    'window',
    transformSync(readFileSync('src/app/SourceWorkspace.tsx', 'utf8'), {
      loader: 'tsx',
      format: 'cjs',
      jsx: 'automatic',
    }).code,
  )(
    (name) => {
      if (name === 'react') return react
      if (name === 'react/jsx-runtime')
        return {
          jsx: (type, props) => ({ type, props }),
          jsxs: (type, props) => ({ type, props }),
        }
      if (name === './Workspace') return { Workspace: 'LoadedWorkspace' }
      if (name === './curriculum')
        return {
          prepareUnitSources: (unit, locale) => {
            const request = deferred()
            requests.push({ ...request, id: unit.id, locale })
            return request.promise
          },
        }
      if (name === '../i18n/LocaleProvider')
        return { useLocale: () => ({ locale }) }
      if (name === '../i18n/messages')
        return {
          messages: {
            ko: { preparingWorkspace: 'loading' },
            en: { preparingWorkspace: 'loading' },
          },
        }
      throw Error(name)
    },
    module,
    module.exports,
    {
      location: {
        reload: () => {
          reloads++
        },
      },
    },
  )
  return {
    get reloads() {
      return reloads
    },
    requests,
    render(next = props, nextLocale = locale) {
      props = next
      locale = nextLocale
      let tree
      do {
        cursor = 0
        dirty = false
        tree = module.exports.Workspace(props)
        effects.splice(0).forEach((fn) => fn())
      } while (dirty)
      return tree
    },
  }
}
test('workspace blocks partial sources, ignores a slow old unit and retries failed current locale', async () => {
  const h = workspaceHarness(),
    a = { unit: { id: 'a' } },
    b = { unit: { id: 'b' } }
  assert.equal(h.render(a).props.role, 'status')
  h.render(b)
  h.requests[0].resolve()
  await Promise.resolve()
  assert.equal(h.render().props.role, 'status')
  h.requests[1].resolve()
  await Promise.resolve()
  assert.equal(h.render().type, 'LoadedWorkspace')
  assert.equal(h.render(b, 'en').props.role, 'status')
  h.requests[2].reject(Error('offline'))
  await Promise.resolve()
  const error = h.render()
  assert.equal(error.props.role, 'alert')
  error.props.children[1].props.onClick()
  assert.equal(
    h.reloads,
    1,
    'reset the browser cache of failed dynamic imports',
  )
  const reloaded = workspaceHarness()
  assert.equal(reloaded.render(b, 'en').props.role, 'status')
  reloaded.requests[0].resolve()
  await Promise.resolve()
  assert.equal(reloaded.render().type, 'LoadedWorkspace')
  assert.equal(reloaded.requests[0].locale, 'en')
})

test('all 644 unit originals and learning examples survive asynchronous loading in both locales', async () => {
  const { createRequire } = await import('node:module')
  const { readdirSync } = await import('node:fs')
  const require = createRequire(
    new URL('../src/app/curriculum.ts', import.meta.url),
  )
  let reads = 0
  const html = {},
    javascript = {}
  function collect(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = directory + '/' + entry.name
      if (entry.isDirectory()) collect(file)
      else if (file.endsWith('.html'))
        html['../' + file.slice(4)] = async () => {
          reads++
          return readFileSync(file, 'utf8')
        }
      else if (entry.name === 'example.js')
        javascript['../' + file.slice(4)] = async () => {
          reads++
          return readFileSync(file, 'utf8')
        }
    }
  }
  collect('src/labs')
  function evaluate(file, globs, dependencies = {}) {
    let index = 0
    const source = readFileSync(file, 'utf8').replace(
      /import\.meta\.glob[\s\S]*?\)\r?\n/g,
      () => `globs[${index++}]\n`,
    )
    const module = { exports: {} }
    new Function(
      'require',
      'exports',
      'module',
      'globs',
      transformSync(source, { loader: 'ts', format: 'cjs' }).code,
    )(
      (name) =>
        dependencies[name] ??
        require(name === './learningSchema' ? './learningSchema.ts' : name),
      module.exports,
      module,
      globs,
    )
    return module.exports
  }
  const learning = evaluate('src/app/learningContent.ts', [html])
  const details = Object.fromEntries(
    readdirSync('content/examples').map((file) => [
      file,
      JSON.parse(readFileSync('content/examples/' + file, 'utf8')),
    ]),
  )
  const catalog = evaluate('src/app/curriculum.ts', [details, javascript], {
    './learningContent': learning,
  })
  assert.equal(reads, 0, 'home metadata must not load source bytes')
  assert.equal(catalog.units.length, 644)
  assert.ok(catalog.units.every(catalog.hasUnitSource))
  // React development profiling enumerates nested unit props. Metadata reads
  // must not invoke an unloaded source getter, while explicit reads still fail.
  for (const locale of ['ko', 'en']) {
    const unloaded = catalog.getLocalizedUnit(locale, 'threejs-01')
    assert.throws(() => unloaded.source, /Unknown code path/)
    assert.doesNotThrow(() => {
      for (const key in unloaded) void unloaded[key]
    }, `${locale}: React development props diff must not read unloaded HTML`)
    for (const unit of catalog.getCatalog(locale).units) {
      assert.doesNotThrow(() => {
        for (const key in unit) void unit[key]
        JSON.stringify(unit)
        assert.equal('source' in { ...unit }, false)
        assert.equal('source' in Object.assign({}, unit), false)
      }, `${locale} ${unit.id}: metadata enumeration must not read source`)
    }
  }
  assert.equal(reads, 0, 'metadata enumeration must not load any source')
  const expected = readLearningContent()
  for (const locale of ['ko', 'en'])
    for (const unit of catalog.getCatalog(locale).units) {
      await catalog.prepareUnitSources(unit, locale)
      assert.equal(
        unit.source,
        unit.sourceLanguage === 'html'
          ? expected.readCode('src/labs/' + unit.id + '/example.html', locale)
          : readFileSync('src/labs/' + unit.id + '/example.js', 'utf8'),
        `${locale} ${unit.id}`,
      )
      for (const step of learning.getLessonLearning(unit.id, locale)?.steps ??
        [])
        for (const file of [step.starterPath, step.solutionPath])
          assert.equal(
            learning.readLearningCode(file, locale),
            expected.readCode(file, locale),
          )
    }
})

test('pagination classifies an unloaded source using metadata without reading bytes', () => {
  const selected = {
    id: 'threejs-01',
    seriesId: 'threejs',
    get source() {
      throw Error('not loaded')
    },
  }
  const module = { exports: {} }
  new Function(
    'require',
    'exports',
    'module',
    transformSync(readFileSync('src/app/UnitPagination.tsx', 'utf8'), {
      loader: 'tsx',
      format: 'cjs',
      jsx: 'automatic',
    }).code,
  )(
    (name) => {
      if (name === 'react/jsx-runtime')
        return {
          jsx: (type, props) => ({ type, props }),
          jsxs: (type, props) => ({ type, props }),
        }
      if (name === './curriculum')
        return {
          getCatalog: () => ({ units: [selected] }),
          hasUnitSource: () => true,
        }
      if (name === '../i18n/LocaleProvider')
        return { useLocale: () => ({ locale: 'ko' }) }
      if (name === '../i18n/messages')
        return { messages: { ko: { executableExample: 'ready' } } }
      throw Error(name)
    },
    module.exports,
    module,
  )
  assert.equal(
    module.exports.UnitPagination({ selected, onSelect() {} }).props.children[1]
      .props.children,
    'ready',
  )
})

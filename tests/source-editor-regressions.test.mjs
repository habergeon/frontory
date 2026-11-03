import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'
import { transformSync } from 'esbuild'
import { composeSource, splitSource } from '../src/shared/sourceFiles.ts'

function harness(eol = '\n') {
  const slots = [],
    effects = [],
    children = new Map(),
    changes = [],
    compilations = []
  let cursor = 0
  const react = {
    useState(initial) {
      const i = cursor++
      if (!(i in slots))
        slots[i] = typeof initial === 'function' ? initial() : initial
      return [
        slots[i],
        (next) => {
          slots[i] = typeof next === 'function' ? next(slots[i]) : next
        },
      ]
    },
    useRef(initial) {
      return (slots[cursor++] ??= { current: initial })
    },
    useEffect(fn, deps) {
      const i = cursor++
      if (!slots[i] || deps.some((value, n) => value !== slots[i][n])) {
        slots[i] = deps
        effects.push(fn)
      }
    },
    useImperativeHandle(ref, fn) {
      ref.current = fn()
    },
  }
  const Child = () => {}
  const jsx = (type, props, key) => ({ type, props, key })
  const module = { exports: {} }
  vm.runInNewContext(
    transformSync(readFileSync('src/editor/SourceFilesEditor.tsx', 'utf8'), {
      loader: 'tsx',
      format: 'cjs',
      jsx: 'automatic',
    }).code,
    {
      module,
      exports: module.exports,
      require(name) {
        if (name === 'react') return react
        if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx }
        if (name === './CodeEditor') return { __esModule: true, default: Child }
        if (name === '../shared/sourceFiles')
          return { composeSource, splitSource }
        if (name === './splitExample')
          return { splitExample: (code) => splitSource(code, 'javascript') }
        if (name.endsWith('/LocaleProvider'))
          return { useLocale: () => ({ locale: 'ko' }) }
        throw Error(name)
      },
    },
  )
  const props = {
    ref: { current: null },
    value: '<p>original</p>',
    language: 'html',
    unitId: 'test',
    wrap: true,
    onChange: (value) => changes.push(value),
    onCompile: (value) => compilations.push(value),
  }
  function render() {
    cursor = 0
    const tree = module.exports.default(props)
    function visit(node) {
      if (!node || typeof node !== 'object') return
      if (Array.isArray(node)) return node.forEach(visit)
      if (node.type === Child) {
        const p = node.props,
          file = p.unitId.split('/')[1]
        let child = children.get(file)
        if (!child || child.key !== node.key) {
          child = {
            key: node.key,
            code: p.value,
            history: [],
            language: p.language,
          }
          children.set(file, child)
        }
        child.props = p
        p.ref({
          replace(next, onHistory) {
            child.history.push({
              code: child.code,
              language: child.language,
              onHistory,
            })
            child.code = next.code.replace(/\r\n|\r|\n/g, eol)
            child.language = next.language
            child.props.onChange({ ...next, code: child.code })
          },
          format: async () => {},
        })
      }
      visit(node.props?.children)
    }
    visit(tree)
    while (effects.length) effects.shift()()
    return tree
  }
  const edit = (file, code, language = children.get(file).language) => {
    const child = children.get(file)
    child.code = code
    child.language = language
    child.props.onChange({ code, language })
    render()
  }
  return { props, changes, compilations, children, render, edit }
}

test('mount and compilation notify preview without saving a draft', () => {
  const h = harness()
  h.render()
  assert.equal(h.changes.length, 0)
  const script = h.children.get('javascript')
  script.props.onCompile({
    source: script.code,
    language: 'javascript',
    output: script.code,
    error: null,
  })
  h.render()
  assert.equal(h.changes.length, 0)
  assert.notEqual(h.compilations.at(-1).output, null)
  h.props.ref.current.replace({
    code: '<h1>new HTML, same script</h1>',
    language: 'html',
  })
  h.render()
  assert.notEqual(h.compilations.at(-1).output, null)
})

test('restore keeps each file model and its Undo boundary', () => {
  const h = harness()
  h.render()
  for (const [file, code] of Object.entries({
    html: '<p>edited</p>',
    css: 'p{color:red}',
    javascript: 'const marker = 1',
  }))
    h.edit(file, code)
  const before = new Map(h.children)
  h.props.ref.current.replace({ code: '<h1>reset</h1>', language: 'html' })
  h.render()
  for (const [file, child] of h.children) {
    assert.equal(child, before.get(file), `${file} model survived restore`)
    const previous = child.history.pop()
    assert.ok(previous, `${file} has an Undo entry`)
    previous.onHistory?.('undo')
    h.edit(file, previous.code, previous.language)
  }
  assert.equal(h.changes.at(-1).files.html, '<p>edited</p>')
  assert.equal(h.changes.at(-1).files.css, 'p{color:red}')
  assert.equal(h.changes.at(-1).files.javascript, 'const marker = 1')
})

test('replacement retains model-normalized line endings for compilation matching', () => {
  const h = harness('\r\n')
  h.render()
  h.props.ref.current.replace({
    code: 'export function mount() {\n  return () => {}\n}',
    language: 'javascript',
  })
  h.render()
  const script = h.children.get('javascript')
  assert.equal(h.changes.at(-1).files.javascript, script.code)
  script.props.onCompile({
    source: script.code,
    language: 'javascript',
    output: script.code,
    error: null,
  })
  h.render()
  assert.notEqual(h.compilations.at(-1).output, null)
})

test('automatic display formatting does not save, but the next user edit includes it', () => {
  const h = harness()
  h.render()
  h.children
    .get('html')
    .props.onDisplayChange({ code: '<p>\n  original\n</p>', language: 'html' })
  h.render()
  assert.equal(h.changes.length, 0)
  h.edit('css', 'p { color: red }')
  assert.equal(h.changes.at(-1).files.html, '<p>\n  original\n</p>')
})

test('Undo and Redo of a replacement restore script language and composition mode', () => {
  const h = harness()
  h.props.value = 'const value: number = 1'
  h.props.language = 'typescript'
  h.render()
  const child = h.children.get('javascript')
  h.props.ref.current.replace({ code: '<h1>document</h1>', language: 'html' })
  h.render()
  assert.equal(h.changes.at(-1).files.mode, 'document')
  const previous = child.history.at(-1)
  previous.onHistory('undo')
  h.edit('javascript', previous.code, previous.language)
  assert.equal(h.changes.at(-1).files.mode, 'legacy')
  assert.equal(h.changes.at(-1).language, 'typescript')
  assert.equal(h.changes.at(-1).files.scriptLanguage, 'typescript')
  previous.onHistory('redo')
  h.edit('javascript', '', 'javascript')
  assert.equal(h.changes.at(-1).files.mode, 'document')
  assert.equal(h.changes.at(-1).language, 'html')
  assert.equal(h.changes.at(-1).files.scriptLanguage, 'javascript')
})

// Run the real CodeEditor lifecycle with deterministic model events and formatting.
// Actual Monaco keyboard Undo is covered by tests/browser/source-files.js.
function codeEditorHarness() {
  const slots = [],
    effects = [],
    changes = [],
    displays = [],
    formats = []
  let cursor = 0,
    listener,
    text,
    language,
    version = 1,
    alternative = 1
  const history = [],
    redo = []
  const model = {
    updateOptions() {},
    getValue: () => text,
    getVersionId: () => version,
    getAlternativeVersionId: () => alternative,
    getEOL: () => '\n',
    getFullModelRange: () => ({}),
    onDidChangeContent(fn) {
      listener = fn
      return { dispose() {} }
    },
    dispose() {},
  }
  const instance = {
    getModel: () => model,
    updateOptions() {},
    pushUndoStop() {},
    dispose() {},
    executeEdits(_source, edits) {
      history.push({ text, alternative })
      text = edits[0].text
      alternative = ++version
      listener({ isUndoing: false, isRedoing: false })
    },
  }
  const monaco = {
    Uri: {
      parse: (value) => ({
        scheme: 'file',
        path: value,
        toString: () => value,
      }),
    },
    editor: {
      createModel(value, lang, uri) {
        text = value
        language = lang
        model.uri = uri
        return model
      },
      create: () => instance,
      setModelLanguage(_model, value) {
        language = value
      },
      setModelMarkers() {},
    },
    languages: {
      registerDocumentFormattingEditProvider: () => ({ dispose() {} }),
    },
  }
  const react = {
    useState(initial) {
      const i = cursor++
      if (!(i in slots))
        slots[i] = typeof initial === 'function' ? initial() : initial
      return [
        slots[i],
        (value) => {
          slots[i] = value
        },
      ]
    },
    useRef(initial) {
      return (slots[cursor++] ??= { current: initial })
    },
    useEffect(fn, deps) {
      const i = cursor++
      if (!slots[i] || deps.some((value, n) => value !== slots[i][n])) {
        slots[i] = deps
        effects.push(fn)
      }
    },
    useImperativeHandle(ref, fn) {
      ref.current = fn()
    },
  }
  const module = { exports: {} },
    jsx = (type, props) => ({ type, props })
  vm.runInNewContext(
    transformSync(readFileSync('src/editor/CodeEditor.tsx', 'utf8'), {
      loader: 'tsx',
      format: 'cjs',
      jsx: 'automatic',
    }).code,
    {
      module,
      exports: module.exports,
      window: {
        clearTimeout() {},
        setTimeout() {
          return 1
        },
      },
      require(name) {
        if (name === 'react') return react
        if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx }
        if (name === './monaco') return { monaco }
        if (name === './formatCode')
          return {
            CodeFormatError: Error,
            formatCode: (source) =>
              new Promise((resolve) => formats.push({ source, resolve })),
          }
        if (name.endsWith('/LocaleProvider'))
          return { useLocale: () => ({ locale: 'ko' }) }
        if (name.endsWith('/messages'))
          return { messages: { ko: {} }, message: () => '' }
        throw Error(name)
      },
    },
  )
  const props = {
    ref: { current: null },
    wrap: true,
    value: '<p>x</p>',
    language: 'html',
    unitId: 'test',
    formatOnLoad: true,
    onChange: (next) => changes.push(next),
    onDisplayChange: (next) => displays.push(next),
    onCompile() {},
  }
  function render() {
    cursor = 0
    module.exports.default(props)
    while (effects.length) effects.shift()()
  }
  function travel(direction) {
    const source = direction === 'undo' ? history : redo
    const target = direction === 'undo' ? redo : history
    const previous = source.pop()
    target.push({ text, alternative })
    text = previous.text
    alternative = previous.alternative
    version++
    listener({
      isUndoing: direction === 'undo',
      isRedoing: direction === 'redo',
    })
  }
  return {
    props,
    render,
    changes,
    displays,
    formats,
    travel,
    language: () => language,
    value: () => text,
  }
}

test('initial CodeEditor formatting updates display only, while manual formatting saves', async () => {
  const h = codeEditorHarness()
  h.render()
  h.formats.shift().resolve('<p>\n  x\n</p>')
  await new Promise((resolve) => setImmediate(resolve))
  assert.equal(h.changes.length, 0)
  assert.equal(h.displays.length, 1)
  assert.equal(h.value(), '<p>\n  x\n</p>')
  const formatted = h.props.ref.current.format()
  h.formats.shift().resolve('<p> x </p>')
  await formatted
  assert.equal(h.changes.at(-1).code, '<p> x </p>')
})

test('CodeEditor replacement Undo and Redo notify history and restore language', () => {
  const h = codeEditorHarness(),
    history = []
  h.props.formatOnLoad = false
  h.props.value = 'const value: number = 1'
  h.props.language = 'typescript'
  h.render()
  h.props.ref.current.replace(
    { code: 'const value = 2', language: 'javascript' },
    (direction) => history.push(direction),
  )
  assert.equal(h.language(), 'javascript')
  h.travel('undo')
  assert.equal(h.value(), 'const value: number = 1')
  assert.equal(h.language(), 'typescript')
  assert.equal(h.changes.at(-1).language, 'typescript')
  h.travel('redo')
  assert.equal(h.value(), 'const value = 2')
  assert.equal(h.language(), 'javascript')
  assert.deepEqual(history, ['undo', 'redo'])
})

test('initial formatting cannot overwrite an intervening replacement', async () => {
  const h = codeEditorHarness()
  h.render()
  h.props.ref.current.replace({ code: '<p>edited</p>', language: 'html' })
  h.formats.shift().resolve('<p>\n  x\n</p>')
  await new Promise((resolve) => setImmediate(resolve))
  assert.equal(h.value(), '<p>edited</p>')
  assert.equal(h.displays.length, 0)
  assert.equal(h.changes.length, 1)
})

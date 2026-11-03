import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { splitSource, composeSource } from '../src/shared/sourceFiles.ts'
import { splitExample } from '../src/editor/splitExample.ts'
import { createDraftStore, isDraft } from '../src/shared/drafts.ts'
import { parseBackup } from '../src/shared/backup.ts'
import { formatCode } from '../src/editor/formatCode.ts'
import { parse } from 'parse5'
import { runInNewContext } from 'node:vm'

test('HTML separates styles and module scripts and keeps execution order and type', () => {
  const source =
    '<html><head><style>h1 {color:red}</style></head><body><h1>A</h1><script type="module">document.title="A"</script><footer>B</footer></body></html>'
  const files = splitSource(source, 'html')
  assert.equal(files.css, 'h1 {color:red}')
  assert.equal(files.javascript, 'document.title="A"')
  assert.match(files.html, /href="style.css"/)
  assert.equal(composeSource(files), source)
  files.javascript = 'document.title="B"'
  files.css = 'h1 {color:blue}'
  assert.match(composeSource(files), /color:blue/)
  assert.match(composeSource(files), /title="B"/)
})

test('inline content cannot close a file block or trigger an injected HTML script', () => {
  const files = {
    mode: 'document',
    html: '<h1>Hi</h1>',
    css: '/* </style><script>bad()</script> */',
    javascript: 'console.log("</script><h1>")',
  }
  const result = composeSource(files)
  const tags = []
  const visit = (node) => {
    if (node.tagName) tags.push(node.tagName)
    node.childNodes?.forEach(visit)
  }
  visit(parse(result))
  assert.equal(tags.filter((tag) => tag === 'script').length, 1)
  assert.equal(tags.filter((tag) => tag === 'style').length, 1)
  assert.equal(tags.filter((tag) => tag === 'h1').length, 1)
})

test('multiple ordered scripts, import maps and inert template contents remain unchanged', () => {
  const source =
    '<template><style>x{}</style><script>inert()</script></template><script type="importmap">{"imports":{}}</script><script>let a=1</script><script>a++</script>'
  const files = splitSource(source, 'html')
  assert.equal(files.html, source)
  assert.equal(files.javascript, '')
})

test('dangerous script bodies retain exact bytes and attributes behind a parser-inserted Blob script', async () => {
  for (const javascript of [
    'const value = String.raw`</ScRiPt><h1>raw</h1>`;',
    'const value = "<!--<script>";',
    'export const value = "</script>";',
  ]) {
    const output = composeSource({
      mode: 'document',
      html: '<script type="module" data-label="keep" src="script.js"></script>',
      javascript,
      css: '',
    })
    let blob,
      inserted,
      removed = false
    const visit = (node) =>
      node.tagName === 'script'
        ? node
        : node.childNodes?.map(visit).find(Boolean)
    const bootstrap = visit(parse(output)).childNodes[0].value
    runInNewContext(bootstrap, {
      Blob,
      URL: {
        createObjectURL(value) {
          blob = value
          return 'blob:test'
        },
      },
      document: {
        addEventListener() {},
        currentScript: {
          remove() {
            removed = true
          },
        },
        write(value) {
          inserted = value
        },
      },
    })
    assert.equal(await blob.text(), javascript)
    assert.equal(
      inserted,
      '<script type="module" data-label="keep" src="blob:test"></script>',
    )
    assert.ok(removed)
  }
})

test('legacy HTML and CSS examples are separated without executing their source', async () => {
  const html = await readFile('src/labs/html-01/example.js', 'utf8')
  const ko = splitExample(html, 'ko'),
    en = splitExample(html, 'en')
  assert.match(ko.html, /나의 학습 카드/)
  assert.match(en.html, /My learning card/)
  assert.doesNotMatch(ko.javascript, /container.innerHTML\s*=/)
  const css = splitExample(
    await readFile('src/labs/css-01/example.js', 'utf8'),
    'ko',
  )
  assert.match(css.css, /grid-template-columns/)
  assert.doesNotMatch(css.html, /<style>|style.css/)
  assert.match(css.html, /class="cards"/)
  const dynamic =
    'export function mount({container}) {container.innerHTML = `<h1>${danger()}</h1>`}'
  assert.equal(splitExample(dynamic, 'ko').javascript, dynamic)
})

test('three empty or edited files survive reload and JSON backup import', () => {
  const data = new Map()
  const storage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  }
  const store = createDraftStore(() => storage)
  const files = { html: '<p>A</p>', css: '', javascript: '', mode: 'document' }
  const draft = {
    ...store.load('unit', '').draft,
    files,
    code: composeSource(files),
    language: 'html',
    notes: 'keep',
  }
  store.save('unit', draft)
  assert.deepEqual(
    createDraftStore(() => storage).load('unit', '').draft.files,
    files,
  )
  const imported = parseBackup(
    JSON.stringify({
      format: 'frontory',
      version: 3,
      exportedAt: new Date().toISOString(),
      selectedUnitId: 'unit',
      units: [{ id: 'unit', draft }],
    }),
    ['unit'],
  )
  assert.deepEqual(imported.units[0].draft.files, files)
  assert.equal(isDraft({ ...draft, files: { ...files, css: 42 } }), false)
})

test('CSS has its own formatter', async () => {
  const result = await formatCode('h1{color:red;padding:2px}', 'css')
  assert.match(result, /color: red/)
  assert.equal(await formatCode(result, 'css'), result)
})

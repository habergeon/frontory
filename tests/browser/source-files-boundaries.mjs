// PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs node tests/browser/source-files-boundaries.mjs
import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'
import { composeSource } from '../../src/shared/sourceFiles.ts'
import { createHtmlPreviewDocument } from '../../src/preview/html-document.ts'

const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : 'playwright'
)
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const instrumentation = `<script>
window.released = [];
const revoke = URL.revokeObjectURL.bind(URL);
URL.revokeObjectURL = url => { released.push(url); revoke(url); };
</script>`
async function run(html, javascript, css = '') {
  const source = composeSource({ mode: 'document', html, javascript, css })
  const document = createHtmlPreviewDocument(source, 'test-token', 'en', {})
  await page.setContent('<body></body>')
  await page.evaluate((srcdoc) => {
    window.received = []
    window.onmessage = (event) => window.received.push(event.data)
    const frame = document.createElement('iframe')
    frame.sandbox = 'allow-scripts'
    frame.srcdoc = srcdoc
    document.body.append(frame)
  }, document)
  await page.waitForFunction(() => window.received.some((m) => m.fixture), {
    timeout: 10000,
  })
  return page.evaluate(() => window.received)
}
try {
  const raw = '</ScRiPt><h1>not markup</h1>'
  const messages = await run(
    instrumentation +
      `<link rel="stylesheet" href="style.css"><p class="probe"></p><script data-preserve="yes" src="script.js"></script><script>
parent.postMessage({ fixture: 'classic', raw: value, attr: savedAttr,
  css: getComputedStyle(document.querySelector('.probe'), '::before').content,
  scripts: document.scripts.length }, '*');
setTimeout(() => parent.postMessage({ fixture: 'released', count: released.length }, '*'), 0);
</script>`,
    'let value = String.raw`' +
      raw +
      '`; var savedAttr = document.currentScript.dataset.preserve;',
    '.probe { --label: "</StYlE>"; } .probe::before { content: var(--label); } /* </style><script>bad()</script> */',
  )
  assert.equal(messages.find((m) => m.fixture === 'classic').raw, raw)
  assert.equal(messages.find((m) => m.fixture === 'classic').attr, 'yes')
  assert.equal(messages.find((m) => m.fixture === 'classic').css, '"</StYlE>"')
  await page.waitForFunction(() =>
    window.received.some((m) => m.fixture === 'released'),
  )
  assert.equal(
    await page.evaluate(
      () => window.received.find((m) => m.fixture === 'released').count,
    ),
    1,
  )

  const moduleMessages = await run(
    instrumentation +
      '<script type="module" data-preserve="module" src="script.js"></script>',
    'export const value = String.raw`</SCRIPT>`; const dependency = await import(URL.createObjectURL(new Blob(["export default 7"], {type:"text/javascript"}))); parent.postMessage({ fixture: "module", value, dependency: dependency.default }, "*");',
  )
  assert.equal(
    moduleMessages.find((m) => m.fixture === 'module').value,
    '</SCRIPT>',
  )
  assert.equal(moduleMessages.find((m) => m.fixture === 'module').dependency, 7)
  await page.waitForFunction(() =>
    window.received.some((m) => m.status === 'ready'),
  )

  const commentMessages = await run(
    instrumentation +
      '<script src="script.js"></script><script>parent.postMessage({fixture:"comment", value: escaped}, "*")</script>',
    'var escaped = "<!--<script>";',
  )
  assert.equal(
    commentMessages.find((m) => m.fixture === 'comment').value,
    '<!--<script>',
  )
  const failedLoad = await run(
    instrumentation +
      `<script>
const create = URL.createObjectURL.bind(URL);
URL.createObjectURL = blob => { const url = create(blob); revoke(url); return url; };
</script><script src="script.js"></script><script>
parent.postMessage({fixture: 'failed-load', count: released.length}, '*');
</script>`,
    'var neverExecuted = "</script>";',
  )
  assert.equal(failedLoad.find((m) => m.fixture === 'failed-load').count, 1)
  assert.ok(
    ![...messages, ...moduleMessages, ...commentMessages].some(
      (m) => m.status === 'error',
    ),
  )
  console.log(
    'PASS: classic raw value/scope/order/attributes, CSS content/custom property, module import/export, HTML escaped-state boundary, Blob load/error cleanup; allow-scripts sandbox and existing CSP',
  )
} finally {
  await browser.close()
}

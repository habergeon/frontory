// playwright-step-10: Download Events
export function mount({
  locale = 'ko',
  container,
  gsap,
  animate,
  React,
  createRoot,
  Motion,
  ScrollTrigger,
}) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<h3>Download Events</h3><p>Event order / File validation</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'Show execution boundary',
          display003:
            'External source only. This preview does not execute the test runner or claim any passing result.',
        }
      : {
          display001:
            '<h3>다운로드 이벤트</h3><p>이벤트 순서 / 파일 검증</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'Show execution boundary',
          display003:
            'External source only. This preview does not execute the test runner or claim any passing result.',
        }
  const root = document.createElement('section')
  root.style.cssText = 'padding:18px;font:14px system-ui;color:#172b46'
  container.append(root)
  root.innerHTML = messages.display001
  const button = root.querySelector('button'),
    out = root.querySelector('output'),
    stage = /** @type {HTMLDivElement} */ (root.querySelector('.stage'))
  let dead = false
  const stops = []

  stage.innerHTML = ''
  const text = document.createElement('pre')
  text.style.cssText = 'white-space:pre-wrap;max-height:420px;overflow:auto'
  stage.append(text)
  text.textContent =
    "Standalone fixture tests (not tests of the production Frontory UI). Copy this lesson folder into an empty test project. Run npm init -y; npm install -D @playwright/test; npx playwright install chromium; npx playwright test. Config starts fixture HTTP server on 127.0.0.1:4179. For visual units, create and review baselines with --update-snapshots. Run npx playwright show-trace <trace.zip> for retained failures. CI template assumes these files are project root and a committed package-lock.json.\n\n--- lesson.spec.mjs ---\nimport { test, expect } from '@playwright/test'\nimport { readFile } from 'node:fs/promises'\ntest.beforeEach(async ({ page }) => {\n  await page.goto('/')\n})\ntest('다운로드 이벤트', async ({ page, browser }, testInfo) => {\n  await page\n    .getByRole('textbox', { name: 'Notes', exact: true })\n    .fill('download content')\n  const event = page.waitForEvent('download')\n  await page.getByRole('button', { name: 'Download backup' }).click()\n  const download = await event\n  expect(download.suggestedFilename()).toBe('notes.json')\n  const file = await download.path()\n  expect(JSON.parse(await readFile(file, 'utf8'))).toEqual({\n    version: 1,\n    text: 'download content',\n  })\n})\n\n--- fixture.html ---\n<!doctype html>\n<html lang=\"en\">\n  <meta charset=\"utf-8\" /><title>Learning notes fixture</title\n  ><style>\n    body{font:16px system-ui;max-width:720px;margin:24px}nav{display:flex;gap:12px}textarea{display:block;width:90%;height:100px}section{padding:20px;background:#eef5fc}button{padding:8px;margin:5px}\n  </style>\n  <nav aria-label=\"Lessons\">\n    <button data-unit=\"a\">Lesson A</button\n    ><button data-unit=\"b\">Lesson B</button>\n  </nav>\n  <main>\n    <h1>Lesson A</h1>\n    <section aria-label=\"Notes\">\n      <label>Notes<textarea></textarea></label\n      ><button id=\"save\">Save notes</button\n      ><button id=\"download\">Download backup</button\n      ><label\n        >Import backup<input type=\"file\" accept=\"application/json\" /></label\n      ><output role=\"status\">Ready</output>\n    </section>\n    <button id=\"docs\">Load document</button\n    ><button id=\"next\">Load newer document</button>\n    <article aria-label=\"Document\"></article>\n  </main>\n  <script>\n    const input=document.querySelector('textarea'),status=document.querySelector('output'),doc=document.querySelector('article');let unit='a',generation=0,timer;\n    const read=()=>{input.value=localStorage.getItem('note:'+unit)||''};read();\n    const save=()=>{localStorage.setItem('note:'+unit,input.value);status.textContent='Saved'};\n    input.oninput=()=>{clearTimeout(timer);status.textContent='Unsaved';timer=setTimeout(save,500)};\n    document.querySelector('#save').onclick=()=>{clearTimeout(timer);save()};\n    document.querySelectorAll('[data-unit]').forEach(b=>b.onclick=()=>{clearTimeout(timer);unit=b.dataset.unit;document.querySelector('h1').textContent=b.textContent;read()});\n    document.querySelector('#download').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({version:1,text:input.value})],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='notes.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};\n    document.querySelector('input[type=file]').onchange=async e=>{try{const data=JSON.parse(await e.target.files[0].text());if(data.version!==1||typeof data.text!=='string')throw Error('schema');clearTimeout(timer);input.value=data.text;save();status.textContent='Imported'}catch{status.textContent='Invalid backup; existing note preserved'}};\n    const load=async id=>{const mine=++generation;doc.textContent='Loading';try{const response=await fetch('/docs/'+id);if(!response.ok)throw Error('HTTP '+response.status);const text=await response.text();doc.dataset.completed=id;if(mine===generation)doc.textContent=text}catch(e){if(mine===generation)doc.textContent=String(e)}};\n    document.querySelector('#docs').onclick=()=>load('old');document.querySelector('#next').onclick=()=>load('new');\n  </script>\n</html>\n\n--- server.mjs ---\nimport http from 'node:http'\nimport { readFile } from 'node:fs/promises'\nconst html = await readFile(new URL('./fixture.html', import.meta.url))\nhttp\n  .createServer((req, res) => {\n    if (req.url.startsWith('/docs/')) {\n      res.setHeader('Content-Type', 'text/plain')\n      res.end('Document ' + req.url.split('/').at(-1))\n    } else {\n      res.setHeader('Content-Type', 'text/html')\n      res.end(html)\n    }\n  })\n  .listen(4179, '127.0.0.1')\n\n--- playwright.config.mjs ---\nimport { defineConfig } from '@playwright/test'\nexport default defineConfig({\n  testDir: '.',\n  testMatch: 'lesson.spec.mjs',\n  fullyParallel: true,\n  retries: 0,\n  reporter: [['list'], ['html', { open: 'never' }]],\n  use: {\n    baseURL: 'http://127.0.0.1:4179',\n    browserName: 'chromium',\n    viewport: { width: 1000, height: 800 },\n    locale: 'en-US',\n    timezoneId: 'UTC',\n    colorScheme: 'light',\n    reducedMotion: 'reduce',\n    trace: 'retain-on-failure',\n    screenshot: 'only-on-failure',\n  },\n  webServer: {\n    command: 'node server.mjs',\n    url: 'http://127.0.0.1:4179',\n    reuseExistingServer: false,\n  },\n})\n"
  button.textContent = 'Show execution boundary'
  button.onclick = () =>
    (out.textContent =
      'External source only. This preview does not execute the test runner or claim any passing result.')
  button.click()
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}

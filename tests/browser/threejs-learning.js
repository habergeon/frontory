import assert from 'node:assert/strict'

const fixture = '/tests/browser/threejs-learning.html'
const editorState = (page) =>
  page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    const editor = monaco.editor.getEditors()[0],
      model = editor.getModel()
    return {
      code: model.getValue(),
      language: model.getLanguageId(),
      id: model.id,
      uri: model.uri.toString(),
      version: model.getVersionId(),
      markers: monaco.editor
        .getModelMarkers({ resource: model.uri })
        .map((m) => ({ owner: m.owner, code: m.code })),
    }
  })
const replaceText = async (page, code) => {
  await page.evaluate(async (code) => {
    const { monaco } = await import('/src/editor/monaco.ts')
    const editor = monaco.editor.getEditors()[0]
    editor.pushUndoStop()
    editor.executeEdits('fixture-input', [
      { range: editor.getModel().getFullModelRange(), text: code },
    ])
    editor.pushUndoStop()
  }, code)
}
const readyEditor = async (page) => {
  await page.waitForSelector('.monaco-editor')
  await page.waitForFunction(
    () =>
      !/준비하고|Preparing/.test(
        document.querySelector('.code-check-status').textContent,
      ),
  )
}
export async function runStorage(page, base) {
  const checks = []
  await page.goto(base + fixture)
  await readyEditor(page)
  const first = await editorState(page)
  assert.equal(first.language, 'html')
  assert.match(first.uri, /example\.html$/)
  assert.match(
    await page.locator('.code-check-status').textContent(),
    /타입 검사 대상 아님/,
  )
  await page.locator('.notes-editor').fill('필기 😀')
  await page.locator('.learning-status button').nth(2).click()
  const html = '<h1>저장 😀</h1><script>console.log("saved")</script>'
  await replaceText(page, html)
  await page.waitForFunction(
    (html) =>
      JSON.parse(localStorage.getItem('web-gl-study:unit:v1:fixture-threejs'))
        .code === html,
    html,
  )
  await page.reload()
  await readyEditor(page)
  assert.equal((await editorState(page)).code, html)
  assert.equal(await page.locator('.notes-editor').inputValue(), '필기 😀')
  assert.equal(
    await page
      .locator('.learning-status button')
      .nth(2)
      .getAttribute('aria-pressed'),
    'true',
  )
  checks.push('HTML Unicode save/reload preserves notes and completion')
  await page.selectOption('#code-language', 'typescript')
  assert.equal((await editorState(page)).code, html)
  await replaceText(
    page,
    'const amount: number = 3; export function mount() { return amount; }',
  )
  await page.waitForFunction(() =>
    document
      .querySelector('.code-check-status')
      .textContent.includes('검사 통과'),
  )
  const before = await editorState(page)
  assert.deepEqual(before.markers, [])
  const info = await page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    const model = monaco.editor.getEditors()[0].getModel()
    const worker = await (
      await monaco.typescript.getTypeScriptWorker()
    )(model.uri)
    return {
      emit: await worker.getEmitOutput(model.uri.toString()),
      quick: await worker.getQuickInfoAtPosition(model.uri.toString(), 7),
    }
  })
  assert.ok(
    info.emit.outputFiles.some((file) =>
      file.text.includes('const amount = 3'),
    ),
  )
  assert.ok(info.quick)
  await page.locator('.code-panel-actions button').first().click()
  await page.locator('.reset-confirm button').first().click()
  assert.equal((await editorState(page)).language, 'html')
  await page.locator('.monaco-editor [role="textbox"]').focus()
  await page.keyboard.press('Control+z')
  assert.equal((await editorState(page)).code, before.code)
  assert.equal((await editorState(page)).language, 'typescript')
  assert.equal((await editorState(page)).id, before.id)
  await page.keyboard.press('Control+y')
  assert.equal((await editorState(page)).language, 'html')
  checks.push(
    'fixed HTML URI preserves TS diagnostics/emit/QuickInfo and cross-language native Undo/Redo',
  )
  const sameCode = (await editorState(page)).code
  await page.selectOption('#code-language', 'typescript')
  await page.locator('.code-panel-actions button').first().click()
  await page.locator('.reset-confirm button').first().click()
  assert.equal((await editorState(page)).code, sameCode)
  await page.locator('.monaco-editor [role="textbox"]').focus()
  await page.keyboard.press('Control+z')
  assert.equal((await editorState(page)).language, 'typescript')
  assert.equal((await editorState(page)).code, sameCode)
  checks.push(
    'identical text cross-language replacement Undo restores language without inference',
  )

  await page.selectOption('#code-language', 'javascript')
  await replaceText(
    page,
    'const amount: number = 3; export function mount() {}',
  )
  await page.waitForSelector('.code-issues')
  assert.ok(
    (await editorState(page)).markers.some(
      (m) => m.code === '8010' && m.owner === 'study-check',
    ),
  )
  await page.evaluate(() => {
    const original = Worker.prototype.postMessage
    const pending = []
    window.semanticPending = false
    Worker.prototype.postMessage = function (message, ...args) {
      if (JSON.stringify(message).includes('getSemanticDiagnostics')) {
        window.semanticPending = true
        pending.push(() => original.call(this, message, ...args))
      } else original.call(this, message, ...args)
    }
    window.releaseSemantic = () => {
      for (const send of pending) send()
    }
    window.restoreSemantic = () => {
      Worker.prototype.postMessage = original
    }
  })
  await replaceText(
    page,
    'const delayed: number = "bad"; export function mount() {}',
  )
  await page.waitForFunction(() => window.semanticPending)
  await page.selectOption('#code-language', 'html')
  await page.evaluate(() => {
    window.releaseSemantic()
    window.restoreSemantic()
  })
  await page.waitForFunction(() => !document.querySelector('.code-issues'))
  await page.waitForTimeout(900)
  assert.deepEqual((await editorState(page)).markers, [])
  checks.push(
    'JS script kind and sole explicit diagnostic owner; HTML clears late JS results',
  )
  for (const language of ['javascript', 'typescript']) {
    await page.selectOption('#code-language', language)
    await replaceText(
      page,
      'export function mount({container}) { container.textContent="legacy-' +
        language +
        '"; return () => {}; }',
    )
    await page
      .frameLocator('.workspace iframe')
      .getByText('legacy-' + language, { exact: true })
      .waitFor()
  }
  checks.push('JS and TS in a threejs unit still execute through legacy mount')

  const saved = await page.evaluate(async () => {
    const { draftStore } = await import('/src/shared/drafts.ts')
    const { parseBackup } = await import('/src/shared/backup.ts')
    const draft = draftStore.load('fixture-threejs', '').draft
    const parsed = parseBackup(
      JSON.stringify({
        format: 'frontory',
        version: 3,
        exportedAt: new Date().toISOString(),
        selectedUnitId: 'fixture-threejs',
        units: [{ id: 'fixture-threejs', draft }],
      }),
      ['fixture-threejs'],
    )
    draftStore.replaceAll({ 'fixture-threejs': parsed.units[0].draft })
    return parsed.units[0].draft
  })
  await page.reload()
  await readyEditor(page)
  assert.equal((await editorState(page)).code, saved.code)
  assert.equal((await editorState(page)).language, saved.language)
  checks.push('backup parse and atomic snapshot restore round trip')
  await page.evaluate(() => {
    localStorage.removeItem('web-gl-study:all:v1')
    localStorage.setItem(
      'web-gl-study:unit:v1:fixture-threejs',
      JSON.stringify({
        version: 1,
        code: '',
        notes: 'legacy',
        updatedAt: '',
        progress: 'completed',
      }),
    )
  })
  await page.reload()
  await readyEditor(page)
  assert.equal((await editorState(page)).code, '')
  assert.equal((await editorState(page)).language, 'javascript')
  assert.equal(await page.locator('.notes-editor').inputValue(), 'legacy')
  const stable = await editorState(page)
  await page.locator('#locale').click()
  assert.deepEqual(await editorState(page), stable)
  checks.push(
    'saved missing-language blank remains JS across locale without model changes',
  )
  await page.locator('.code-panel-actions button').first().click()
  await page.locator('.reset-confirm button').first().click()
  assert.equal((await editorState(page)).language, 'html')
  await page.locator('.monaco-editor [role="textbox"]').focus()
  await page.keyboard.press('Control+z')
  assert.equal((await editorState(page)).code, '')
  assert.equal((await editorState(page)).language, 'javascript')
  checks.push(
    'saved empty JS draft loading HTML starter returns to empty JS with native Undo',
  )
  for (let index = 0; index < 5; index++) {
    const id = (await editorState(page)).id
    await page.evaluate(async () => {
      const { monaco } = await import('/src/editor/monaco.ts')
      const editor = monaco.editor.getEditors()[0]
      editor.focus()
      editor.trigger('fixture', 'editor.action.triggerSuggest', {})
    })
    await page.waitForTimeout(10)
    await page.evaluate(() => window.remountWorkspace())
    await page.waitForFunction(async (id) => {
      const { monaco } = await import('/src/editor/monaco.ts')
      return monaco.editor.getEditors()[0]?.getModel()?.id !== id
    }, id)
    await readyEditor(page)
  }
  checks.push(
    'five actual Workspace suggest/dispose cycles have no unhandled Canceled',
  )
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      return kind === 'webgl2' ? null : original.call(this, kind, ...args)
    }
  })
  await page.evaluate(() => {
    localStorage.removeItem('web-gl-study:all:v1')
    localStorage.removeItem('web-gl-study:unit:v1:fixture-threejs')
  })
  await page.goto(base + fixture)
  await readyEditor(page)
  await page.waitForFunction(() =>
    document.querySelector('.preview-status')?.textContent.includes('WebGL2'),
  )
  assert.equal(await page.locator('iframe').count(), 0)
  assert.equal((await editorState(page)).language, 'html')
  assert.equal(await page.locator('.notes-editor').count(), 1)
  checks.push(
    'WebGL2 unavailable blocks execution while source and notes remain readable',
  )
  return checks
}

export async function runRuntime(page, base) {
  const checks = []
  await page.goto(base + fixture + '?runtime')
  await page.waitForSelector('iframe')
  const run = async (code, profile = 'html') => {
    await page.evaluate(
      ({ code, profile }) => window.runPreview({ code, kind: 'html', profile }),
      { code, profile },
    )
  }
  await run(
    '<script>for(let i=0;i<250;i++)console.log(String(i));setTimeout(()=>console.error("later"),300)</script>',
  )
  await page.waitForFunction(
    () =>
      document.querySelector('.preview-console li:last-child pre')
        ?.textContent === 'later',
  )
  const logs = await page.locator('.preview-console li pre').allTextContents()
  assert.equal(logs.length, 200)
  assert.equal(logs[0], '51')
  assert.equal(logs.at(-2), '249')
  await run('<script>for(let i=0;i<250;i++)console.log(String(i))</script>')
  await page.waitForFunction(
    () =>
      document.querySelector('.preview-console li:last-child pre')
        ?.textContent === '249',
  )
  assert.equal(await page.locator('.preview-console li').count(), 200)
  assert.equal(
    await page.locator('.preview-console li pre').first().textContent(),
    '50',
  )
  checks.push(
    'actual UI keeps latest 200 logs 50..249 and continues accepting later messages',
  )
  await page.evaluate(() => {
    window.oldFrame = document.querySelector('iframe')
    window.oldWindow = window.oldFrame.contentWindow
    window.frameBeforeLocale = window.oldFrame
    window.docBeforeLocale = window.oldFrame.srcdoc
  })
  await page.locator('#locale').click()
  assert.ok(
    await page.evaluate(
      () =>
        document.querySelector('iframe') === window.frameBeforeLocale &&
        document.querySelector('iframe').srcdoc === window.docBeforeLocale,
    ),
  )
  assert.equal(await page.locator('.preview-console li').count(), 200)
  checks.push('locale changes preserve iframe document and console')
  await page.evaluate(() => {
    const frame = document.querySelector('iframe')
    const token = frame.srcdoc.match(/[0-9a-f]{8}-[0-9a-f-]{27,}/)[0]
    for (const data of [
      {
        type: 'study-preview',
        token,
        status: 'console',
        level: 'log',
        message: 'forged-source',
      },
      {
        type: 'study-preview',
        token: 'wrong',
        status: 'console',
        level: 'log',
        message: 'wrong-token',
      },
      {
        type: 'study-preview',
        token,
        status: 'console',
        level: 'log',
        message: 'x'.repeat(4001),
      },
      {
        type: 'study-preview',
        token,
        status: 'console',
        level: 'bad',
        message: 'malformed',
      },
      { type: 'study-preview', token, status: 'error', message: {}, line: 0 },
    ])
      window.dispatchEvent(
        new MessageEvent('message', {
          source:
            data.message === 'forged-source' ? window : frame.contentWindow,
          data,
        }),
      )
  })
  assert.equal(
    await page.locator('.preview-console li pre').first().textContent(),
    '50',
  )
  assert.equal(
    await page.locator('.preview-console li pre').last().textContent(),
    '249',
  )
  checks.push(
    'parent filters wrong source/token, oversized and malformed messages',
  )
  await run('<script>console.log("new-run")</script>')
  await page.waitForFunction(
    () =>
      document.querySelector('.preview-console li pre')?.textContent ===
      'new-run',
  )
  assert.equal(await page.locator('.preview-console li').count(), 1)
  await page.evaluate(() => {
    const token = document
      .querySelector('iframe')
      .srcdoc.match(/[0-9a-f]{8}-[0-9a-f-]{27,}/)[0]
    window.dispatchEvent(
      new MessageEvent('message', {
        source: window.oldWindow,
        data: {
          type: 'study-preview',
          token,
          status: 'console',
          level: 'log',
          message: 'old-frame',
        },
      }),
    )
  })
  assert.equal(await page.locator('.preview-console li').count(), 1)
  checks.push('execution resets console and rejects old-frame payload')
  await run(
    '<script type="module">import * as T from "three";import {OrbitControls} from "three/addons/controls/OrbitControls.js";const c=new T.PerspectiveCamera();const r=new T.WebGLRenderer();document.body.append(r.domElement);r.setSize(100,100);r.render(new T.Scene(),c);const controls=new OrbitControls(c,r.domElement);console.log(JSON.stringify({revision:T.REVISION,same:controls.object instanceof T.Object3D}));controls.dispose();r.dispose()</script>',
    'threejs',
  )
  await page.waitForFunction(() =>
    document
      .querySelector('.preview-console pre')
      ?.textContent.includes('revision'),
  )
  const cube = JSON.parse(
    await page.locator('.preview-console pre').textContent(),
  )
  assert.equal(cube.revision, '186')
  assert.equal(cube.same, true)
  checks.push('actual Preview supplies installed core/addon sharing and WebGL2')
  await run('<html><head><script>missingKnownSource()</script></head></html>')
  await page.waitForSelector('.preview-error')
  assert.match(await page.locator('.preview-error pre').textContent(), /^1:21 /)
  assert.equal(await page.locator('.preview-error script').count(), 0)
  checks.push('original inline error location renders as text')
  return checks
}

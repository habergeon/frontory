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
      eol: model.getEOL(),
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

export async function runFormat(page, base) {
  const checks = []
  // Delay the real formatter at its public boundary, without a production test hook.
  await page.route('**/src/editor/formatCode.ts', async (route) => {
    const response = await route.fetch()
    const source = await response.text()
    assert.ok(source.includes('export async function formatCode('))
    await route.fulfill({
      response,
      body:
        source.replace(
          'export async function formatCode(',
          'async function actualFormatCode(',
        ) +
        '\nexport async function formatCode(...args) { await window.formatGate?.(); return actualFormatCode(...args) }\n',
    })
  })
  await page.goto(base + fixture)
  await readyEditor(page)
  const button = page.getByRole('button', { name: '코드 정렬', exact: true })
  let input =
    '<main><script type="module">const raw=`a\nb`;const h=html`<b  id="x">Keep  spaces</b>`;</script><style>.a{--x:  a  b  ;color:red}</style><pre>  raw\n  keep</pre></main>'
  await replaceText(page, input)
  const before = await editorState(page)
  input = before.code
  const expected = (
    await page.evaluate(
      async (source) =>
        (await import('/src/editor/formatCode.ts')).formatCode(source, 'html'),
      input,
    )
  ).replace(/\r\n|\r|\n/g, before.eol)
  await button.click()
  await page.waitForFunction(async (expected) => {
    const { monaco } = await import('/src/editor/monaco.ts')
    return monaco.editor.getEditors()[0].getValue() === expected
  }, expected)
  assert.equal((await editorState(page)).id, before.id)
  assert.ok(expected.includes('`a' + before.eol + 'b`'))
  assert.ok(expected.includes('--x:  a  b  ;'))
  await page.locator('.monaco-editor [role="textbox"]').focus()
  await page.keyboard.press('Control+z')
  assert.equal((await editorState(page)).code, input, 'button Undo')
  await page.keyboard.press('Control+y')
  assert.equal((await editorState(page)).code, expected, 'button Redo')
  checks.push(
    'actual button formats protected HTML atomically with one native Undo/Redo and stable model',
  )
  await replaceText(page, input)
  const providerBefore = await editorState(page)
  await page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    await monaco.editor
      .getEditors()[0]
      .getAction('editor.action.formatDocument')
      .run()
  })
  assert.equal((await editorState(page)).code, expected, 'provider result')
  await page.locator('.monaco-editor [role="textbox"]').focus()
  await page.keyboard.press('Control+z')
  assert.equal(
    (await editorState(page)).code,
    providerBefore.code,
    'provider Undo',
  )
  checks.push(
    'Monaco Format Document provider matches button and one native Undo',
  )
  await page.keyboard.press('Control+y')
  assert.equal((await editorState(page)).code, expected, 'provider Redo')
  assert.equal((await editorState(page)).eol, before.eol)
  await page.keyboard.press('Control+z')
  await button.click()
  await page.waitForFunction(async (expected) => {
    const { monaco } = await import('/src/editor/monaco.ts')
    return monaco.editor.getEditors()[0].getValue() === expected
  }, expected)
  await page.evaluate(() => {
    window.formatSaves = 0
    const original = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, ...args) {
      if (key.startsWith('web-gl-study:')) window.formatSaves++
      return original.call(this, key, ...args)
    }
  })
  const stable = await editorState(page)
  await button.click()
  await page.waitForTimeout(100)
  assert.deepEqual(await editorState(page), stable)
  assert.equal(await page.evaluate(() => window.formatSaves), 0)
  await page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    await monaco.editor
      .getEditors()[0]
      .getAction('editor.action.formatDocument')
      .run()
  })
  assert.deepEqual(await editorState(page), stable)
  assert.equal(await page.evaluate(() => window.formatSaves), 0)
  checks.push(
    'fixed-point button produces no model edit, Undo entry, or draft save',
  )
  const malformed =
    '<html>\n<head>\n<script>const earlier={x:1};</script>\n<style>.a{color:red}</style>\n</head>\n<body>\n<script>\nconst valid=1\nconst = 2\n</script>\n</body>\n</html>'
  await replaceText(page, malformed)
  const invalid = await editorState(page)
  const writes = await page.evaluate(() => window.formatSaves)
  await button.click()
  await page.waitForSelector('.format-error')
  assert.match(await page.locator('.format-error').textContent(), /9:7/)
  assert.deepEqual(await editorState(page), invalid)
  assert.equal(await page.evaluate(() => window.formatSaves), writes)
  await page.locator('.monaco-editor [role="textbox"]').focus()
  await page.keyboard.press('Control+z')
  assert.equal((await editorState(page)).code, expected)
  checks.push(
    'later parse failure displays original HTML 9:7, leaves text/save/Undo unchanged',
  )
  const hold = async () =>
    page.evaluate(() => {
      window.formatStarted = false
      window.formatDone = false
      window.formatGate = () =>
        new Promise((resolve) => {
          window.formatStarted = true
          window.releaseFormat = resolve
        })
    })
  const release = async () => {
    await page.evaluate(() => {
      window.releaseFormat()
      window.formatGate = undefined
    })
    await page.waitForTimeout(100)
  }
  for (const operation of [
    'typing',
    'undo-back',
    'language',
    'model',
    'unit',
  ]) {
    await replaceText(page, input)
    await hold()
    await button.click()
    await page.waitForFunction(() => window.formatStarted)
    if (operation === 'typing' || operation === 'undo-back') {
      await replaceText(page, '<p>new typing</p>')
      if (operation === 'undo-back') {
        await page.locator('.monaco-editor [role="textbox"]').focus()
        await page.keyboard.press('Control+z')
      }
    } else if (operation === 'language') {
      await page.selectOption('#code-language', 'javascript')
      await page.selectOption('#code-language', 'html')
    } else if (operation === 'model') {
      await page.evaluate(() => window.remountWorkspace())
      await readyEditor(page)
    } else {
      await page.evaluate(() => window.switchUnit('fixture-format-other'))
      await readyEditor(page)
    }
    const current = await editorState(page)
    await release()
    assert.deepEqual(await editorState(page), current, operation)
    assert.equal(await page.locator('.format-error').count(), 0)
    checks.push(
      `late format discarded after ${operation} without writing the current model`,
    )
  }
  await replaceText(page, input)
  await hold()
  await page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    window.pendingFormatAction = monaco.editor
      .getEditors()[0]
      .getAction('editor.action.formatDocument')
      .run()
  })
  await page.waitForFunction(() => window.formatStarted)
  await replaceText(page, '<p>provider typing</p>')
  const providerStale = await editorState(page)
  await release()
  await page.evaluate(() => window.pendingFormatAction)
  assert.deepEqual(await editorState(page), providerStale)
  checks.push('provider returns no edit for a late result after typing')
  await page.selectOption('#code-language', 'typescript')
  await replaceText(page, 'const value:number=3;')
  await button.click()
  await page.waitForFunction(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    return (
      monaco.editor.getEditors()[0].getValue() ===
      'const value: number = 3' +
        monaco.editor.getEditors()[0].getModel().getEOL()
    )
  })
  assert.equal((await editorState(page)).language, 'typescript')
  await page.selectOption('#code-language', 'javascript')
  await replaceText(page, 'const value={a:1};')
  await page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    await monaco.editor
      .getEditors()[0]
      .getAction('editor.action.formatDocument')
      .run()
  })
  assert.equal(
    (await editorState(page)).code,
    'const value = { a: 1 }' + (await editorState(page)).eol,
  )
  await page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    const model = monaco.editor.getEditors()[0].getModel()
    model.pushStackElement()
    model.pushEOL(monaco.editor.EndOfLineSequence.LF)
    model.pushStackElement()
  })
  for (const [language, code, expected] of [
    [
      'javascript',
      'const lf={a:1};',
      'const lf = { a: 1 }' + String.fromCharCode(10),
    ],
    [
      'typescript',
      'const lf:number=1;',
      'const lf: number = 1' + String.fromCharCode(10),
    ],
  ]) {
    await page.selectOption('#code-language', language)
    for (const action of ['button', 'provider']) {
      await replaceText(page, code)
      const original = await editorState(page)
      if (action === 'button') await button.click()
      else
        await page.evaluate(async () => {
          const { monaco } = await import('/src/editor/monaco.ts')
          await monaco.editor
            .getEditors()[0]
            .getAction('editor.action.formatDocument')
            .run()
        })
      await page.waitForFunction(async (expected) => {
        const { monaco } = await import('/src/editor/monaco.ts')
        return monaco.editor.getEditors()[0].getValue() === expected
      }, expected)
      await page.locator('.monaco-editor [role="textbox"]').focus()
      await page.keyboard.press('Control+z')
      assert.equal((await editorState(page)).code, original.code)
      await page.keyboard.press('Control+y')
      assert.equal((await editorState(page)).code, expected)
      assert.equal((await editorState(page)).eol, String.fromCharCode(10))
      const count = await page.evaluate(() => window.formatSaves)
      await button.click()
      await page.evaluate(async () => {
        const { monaco } = await import('/src/editor/monaco.ts')
        await monaco.editor
          .getEditors()[0]
          .getAction('editor.action.formatDocument')
          .run()
      })
      assert.equal(await page.evaluate(() => window.formatSaves), count)
    }
  }
  checks.push(
    'LF JS/TS button and provider each preserve native Undo/Redo and suppress no-op saves',
  )
  await page.locator('#locale').click()
  await page.getByRole('button', { name: 'Format code', exact: true }).waitFor()
  checks.push(
    'standalone TS button and JS provider use common options; format label follows locale',
  )
  return checks
}

const checkNotesPreview = async (page, value) => {
  const textarea = page.locator('.notes-editor')
  await textarea.fill(value)
  await textarea.evaluate((element) => {
    element.setSelectionRange(1, 6, 'backward')
    window.notesElementBeforePreview = element
  })
  await page.locator('.notes-toolbar button').nth(1).click()
  const hidden = await textarea.evaluate((element) => {
    element.focus()
    return {
      identity: element === window.notesElementBeforePreview,
      hidden: element.hidden,
      display: getComputedStyle(element).display,
      height: element.getBoundingClientRect().height,
      focused: document.activeElement === element,
      value: element.value,
      start: element.selectionStart,
      end: element.selectionEnd,
      direction: element.selectionDirection,
    }
  })
  assert.deepEqual(hidden, {
    identity: true,
    hidden: true,
    display: 'none',
    height: 0,
    focused: false,
    value,
    start: 1,
    end: 6,
    direction: 'backward',
  })
  await page.locator('.notes-toolbar button').nth(1).press('Tab')
  assert.equal(
    await textarea.evaluate((element) => document.activeElement === element),
    false,
  )
  assert.equal(await page.locator('.notes-preview').isVisible(), true)
  assert.equal(await page.locator('.notes-preview').textContent(), value)
  await page.locator('.notes-toolbar button').first().click()
  assert.equal(await textarea.isVisible(), true)
  assert.deepEqual(
    await textarea.evaluate((element) => ({
      identity: element === window.notesElementBeforePreview,
      value: element.value,
      start: element.selectionStart,
      end: element.selectionEnd,
      direction: element.selectionDirection,
    })),
    { identity: true, value, start: 1, end: 6, direction: 'backward' },
  )
  return hidden
}

export async function runLearning(page, base) {
  const checks = []
  await page.goto(base + fixture + '?learning#threejs-01')
  await readyEditor(page)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page
    .frameLocator('#panel-result iframe')
    .locator('canvas')
    .waitFor({ state: 'visible' })
  const initialCanvas = []
  for (const [width, height] of [
    [1440, 900],
    [1100, 768],
  ]) {
    await page.setViewportSize({ width, height })
    await page.evaluate(() => window.scrollTo(0, 0))
    const canvas = await page
      .frameLocator('#panel-result iframe')
      .locator('canvas')
      .boundingBox()
    const editor = await page.locator('.monaco-host').boundingBox()
    assert.ok(
      canvas && canvas.width > 0 && canvas.height > 0 && canvas.y < height,
    )
    assert.ok(editor && editor.y < height)
    initialCanvas.push({ width, height, canvas, editor })
    await page.screenshot({
      path:
        '.superpowers/sdd/2026-10-26-threejs-contained-learning/task-5-fix1-initial-canvas-' +
        width +
        '.png',
    })
  }
  checks.push({ initialCanvas })
  await page.setViewportSize({ width: 1440, height: 900 })
  const draft =
    '<!doctype html><html><input aria-label="state" value="initial"><script>console.log("learning-state")</script></html>'
  await page.selectOption('#code-language', 'html')
  await replaceText(page, draft)
  const frame = page.locator('#panel-result iframe')
  await page
    .frameLocator('#panel-result iframe')
    .getByRole('textbox')
    .fill('kept-input')
  await page.locator('.lesson-learning button').last().click()
  checks.push({
    learningNotesPreview: await checkNotesPreview(page, 'learning notes'),
  })
  await page.locator('.learning-status button').nth(2).click()
  await page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    const editor = monaco.editor.getEditors()[0]
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 3,
      endLineNumber: 1,
      endColumn: 8,
    })
    window.learningModel = editor.getModel()
    window.learningSelection = editor.getSelection()
    window.learningFrame = document.querySelector('#panel-result iframe')
    window.learningWindow = window.learningFrame.contentWindow
    window.learningSource = window.learningFrame.srcdoc
    window.learningLoads = 0
    window.learningFrame.addEventListener('load', () => window.learningLoads++)
  })
  const before = await editorState(page)
  const storage = await page.evaluate(() =>
    localStorage.getItem('web-gl-study:unit:v1:threejs-01'),
  )
  await page
    .locator('.lesson-learning summary')
    .filter({ hasText: '힌트' })
    .click()
  await page
    .locator('.lesson-learning summary')
    .filter({ hasText: '완성 코드와 해설' })
    .click()
  await page.locator('.api-reference summary').click()
  await page.locator('.wide-code-toggle').click()
  assert.equal(await page.locator('#panel-result').isVisible(), false)
  await page.setViewportSize({ width: 1024, height: 900 })
  await page.locator('.tablet-learning-tabs button').nth(1).click()
  assert.equal(await page.locator('#panel-reading').isVisible(), false)
  assert.equal(await page.locator('#panel-code').isVisible(), true)
  assert.equal(await page.locator('#panel-result').isVisible(), true)
  await page.setViewportSize({ width: 320, height: 900 })
  await page.locator('#tab-code').click()
  assert.equal(await page.locator('#panel-code').isVisible(), true)
  assert.equal(await page.locator('#panel-reading').isVisible(), false)
  assert.equal(await page.locator('#panel-result').isVisible(), false)
  await page.locator('#tab-result').click()
  assert.equal(await page.locator('#panel-result').isVisible(), true)
  assert.equal(await page.locator('#panel-code').isVisible(), false)
  await page.setViewportSize({ width: 1440, height: 900 })
  assert.equal(
    await page.locator('.wide-code-toggle').getAttribute('aria-pressed'),
    'true',
  )
  assert.equal(await page.locator('#panel-result').isVisible(), false)
  await page.locator('.wide-code-toggle').click()
  assert.equal(await page.locator('#panel-result').isVisible(), true)
  checks.push(
    'Wide-code desktop to 1024 and 320 keeps the chosen panels usable; returning to desktop preserves wide-code state',
  )
  const widths = []
  for (const width of [320, 768, 1024, 1100, 1440]) {
    await page.setViewportSize({ width, height: width === 1100 ? 768 : 900 })
    if (width < 768) {
      await page
        .getByRole('tab', { name: '학습 내용', exact: true })
        .count()
        .then(async (count) => {
          if (count)
            await page
              .getByRole('tab', { name: '학습 내용', exact: true })
              .click()
          else await page.locator('#tab-reading').click()
        })
      await page.locator('#tab-reading').press('ArrowRight')
      assert.equal(
        await page.locator('#tab-code').getAttribute('aria-selected'),
        'true',
      )
      assert.equal(
        await page.locator('.reading-panel').isVisible(),
        false,
        'hidden panel retains visibility',
      )
      assert.equal(
        await page.locator('#panel-result').isVisible(),
        false,
        'hidden panel retains visibility',
      )
      await page.locator('#tab-code').press('Tab')
      assert.equal(
        await page.evaluate(
          () =>
            !!document.activeElement.closest('#panel-reading, #panel-result'),
        ),
        false,
      )
      await page.locator('#tab-reading').click()
    } else if (width < 1100) {
      await page.locator('.tablet-learning-tabs button').nth(1).click()
      assert.equal(await page.locator('#panel-code').isVisible(), true)
      assert.equal(await page.locator('#panel-result').isVisible(), true)
      assert.equal(
        await page.locator('#panel-reading').isVisible(),
        false,
        'hidden panel retains visibility',
      )
      await page.locator('.tablet-learning-tabs button').first().click()
    }
    await page.evaluate(() => {
      window.scrollTo(0, 0)
      document.querySelector('#panel-reading').scrollTop = 0
    })
    const measure = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      panels: [
        ...document.querySelectorAll('.contained-learning .workspace > .panel'),
      ].map((el) => ({
        id: el.id,
        width: el.getBoundingClientRect().width,
        top: el.getBoundingClientRect().top,
        visible: !!el.getClientRects().length,
      })),
    }))
    assert.ok(measure.scroll <= width, JSON.stringify(measure))
    if (width >= 1100)
      assert.ok(
        measure.panels
          .filter((p) =>
            ['panel-reading', 'panel-code', 'panel-result'].includes(p.id),
          )
          .every(
            (p) =>
              p.visible &&
              p.width >= 260 &&
              p.top < (width === 1100 ? 648 : 780),
          ),
        JSON.stringify(measure),
      )
    widths.push(measure)
    await page.screenshot({
      path:
        '.superpowers/sdd/2026-10-26-threejs-contained-learning/task-5-fix1-width-' +
        width +
        '.png',
      fullPage: false,
    })
  }
  await page.getByRole('button', { name: 'English', exact: true }).click()
  await page.getByRole('button', { name: '한국어', exact: true }).click()
  const identity = await page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    const editor = monaco.editor.getEditors()[0],
      frame = document.querySelector('#panel-result iframe')
    return {
      model: editor.getModel() === window.learningModel,
      selection: editor
        .getSelection()
        .equalsSelection(window.learningSelection),
      frame: frame === window.learningFrame,
      contentWindow: frame.contentWindow === window.learningWindow,
      source: frame.srcdoc === window.learningSource,
      loads: window.learningLoads,
    }
  })
  assert.deepEqual(identity, {
    model: true,
    selection: true,
    frame: true,
    contentWindow: true,
    source: true,
    loads: 0,
  })
  assert.equal(
    await page
      .frameLocator('#panel-result iframe')
      .getByRole('textbox')
      .inputValue(),
    'kept-input',
  )
  assert.equal((await editorState(page)).version, before.version)
  assert.equal(
    await page.locator('.notes-editor').inputValue(),
    'learning notes',
  )
  assert.equal(
    await page.evaluate(() =>
      localStorage.getItem('web-gl-study:unit:v1:threejs-01'),
    ),
    storage,
  )
  checks.push({
    readingPreserves: identity,
    widths,
    inputValue: 'kept-input',
    modelVersion: before.version,
    notesProgressStorage: 'unchanged',
  })
  await page.locator('.lesson-learning nav button').click()
  await page.waitForSelector('.document-reader .markdown')
  assert.equal(await page.evaluate(() => location.hash), '#threejs-01')
  assert.equal((await editorState(page)).code, before.code)
  await page
    .getByRole('button', { name: '현재 단원으로 돌아가기', exact: true })
    .click()
  await page
    .locator('.lesson-learning summary')
    .filter({ hasText: '시작 코드' })
    .click()
  const load = page
    .locator('.lesson-learning details')
    .first()
    .getByRole('button')
  await load.click()
  await page.locator('.example-confirm button').last().click()
  assert.deepEqual(await editorState(page), before)
  assert.equal(
    await page.evaluate(() =>
      localStorage.getItem('web-gl-study:unit:v1:threejs-01'),
    ),
    storage,
  )
  const undo = () =>
    page.evaluate(async () => {
      const { monaco } = await import('/src/editor/monaco.ts')
      monaco.editor.getEditors()[0].trigger('fixture', 'undo', null)
    })
  for (const [language, code] of [
    ['html', draft],
    ['javascript', 'export function mount() { return 42 }'],
    ['javascript', ''],
  ]) {
    await page.selectOption('#code-language', language)
    await replaceText(page, code)
    const prior = await editorState(page)
    await load.click()
    await page.locator('.example-confirm button').first().click()
    const after = await editorState(page)
    assert.equal(after.id, prior.id)
    assert.equal(after.language, 'html')
    assert.match(after.code, /Scene, Object3D/)
    await undo()
    const undone = await editorState(page)
    assert.equal(undone.code, prior.code)
    assert.equal(undone.language, prior.language)
    assert.equal(
      await page.locator('.notes-editor').inputValue(),
      'learning notes',
    )
    assert.equal(
      await page
        .locator('.learning-status button')
        .nth(2)
        .getAttribute('aria-pressed'),
      'true',
    )
    checks.push(
      'Confirmed example and one Undo: ' +
        language +
        (code ? ' nonempty' : ' empty draft'),
    )
  }
  await page.getByRole('button', { name: 'English', exact: true }).click()
  await load.click()
  await page.locator('.example-confirm button').first().click()
  assert.match((await editorState(page)).code, /lang="en"/)
  assert.match((await editorState(page)).code, /Scene experiment/)
  assert.match(
    await page.locator('#panel-code .panel-hint').textContent(),
    /isolated preview/,
  )

  await undo()
  assert.equal((await editorState(page)).code, '')
  assert.equal((await editorState(page)).language, 'javascript')
  await page.getByRole('button', { name: '한국어', exact: true }).click()
  await load.click()
  await page.locator('.example-confirm button').first().click()
  assert.match((await editorState(page)).code, /lang="ko"/)
  assert.match((await editorState(page)).code, /장면 구조 실험/)
  assert.match(
    await page.locator('#panel-code .panel-hint').textContent(),
    /HTML 문서/,
  )
  await undo()
  checks.push(
    'Locale-aware English/Korean HTML source reading and confirmed loading with single Undo',
  )
  checks.push(
    'Prerequisite reading keeps active unit; cancellation keeps model, Undo boundary, language and storage',
  )
  assert.equal(await frame.count(), 1)
  await page.goto(base + fixture + '?learning#javascript-01')
  await readyEditor(page)
  await page.waitForSelector('#panel-result iframe')
  assert.equal(await page.locator('.contained-learning').count(), 0)
  checks.push({
    ordinaryUnitNotesPreview: await checkNotesPreview(page, 'ordinary notes'),
  })
  return checks
}

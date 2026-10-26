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
const readyEditor = async (page, state = 'visible') => {
  await page.waitForSelector('.monaco-editor', { state })
  await page.waitForFunction(
    () =>
      !/준비하고|Preparing/.test(
        document.querySelector('.code-check-status').textContent,
      ),
  )
}

// Run through the actual learning workspace and its localized source loader.
export async function runLesson01(page, base) {
  const checks = []
  const prefix =
    (
      process.env.THREEJS_EVIDENCE ??
      '.superpowers/sdd/2026-10-26-threejs-contained-learning/task-6a-browser'
    ).replace(/\.json$/, '') + '-'
  const waitFrame = async () => {
    await page.waitForFunction(
      () => !!document.querySelector('#panel-result iframe'),
    )
    await page
      .frameLocator('#panel-result iframe')
      .locator('canvas')
      .waitFor({ state: 'attached' })
    return (
      await page.locator('#panel-result iframe').elementHandle()
    ).contentFrame()
  }
  const showReading = async () => {
    const width = await page.evaluate(() => innerWidth)
    if (width < 768) await page.locator('#tab-reading').click()
    else if (width < 1100)
      await page.locator('.tablet-learning-tabs button').first().click()
  }
  const showPreview = async () => {
    const width = await page.evaluate(() => innerWidth)
    if (width < 768) await page.locator('#tab-result').click()
    else if (width < 1100)
      await page.locator('.tablet-learning-tabs button').nth(1).click()
    await page
      .frameLocator('#panel-result iframe')
      .locator('canvas')
      .waitFor({ state: 'visible' })
    await page.waitForFunction(
      () =>
        document.querySelector('#panel-result iframe').getBoundingClientRect()
          .width > 0,
    )
  }
  const load = async (step, solution = false) => {
    await showReading()
    await page.selectOption('#learning-step', 'threejs-01-' + step)
    const details = page
      .locator('.lesson-learning > details')
      .nth(solution ? 2 : 0)
    await details.locator('summary').click()
    await details.getByRole('button').click()
    await page.locator('.example-confirm button').first().click()
    const source = (await editorState(page)).code
    await waitFrame()
    // Source replacement and preview compilation are asynchronous.
    await page.waitForFunction(
      (title) => {
        const f = document.querySelector('#panel-result iframe')
        return f.srcdoc.includes(title)
      },
      source.match(/<title>(.*?)<\/title>/)[1],
    )
    return source
  }
  let serial = 0
  const run = async (source, step) => {
    const tag = ++serial
    const hook = `\nglobalThis.__lesson = {tag:${tag}, snapshot() {
      draw();
      const gl = renderer.getContext();
      const pixels = new Uint8Array(canvas.width * canvas.height * 4);
      gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      const bg = scene.background.getHexString();
      const expected = [0,2,4].map(i => parseInt(bg.slice(i,i+2),16));
      let count=0,minX=canvas.width,maxX=-1;
      for(let p=0;p<pixels.length;p+=4) if(expected.some((c,i)=>Math.abs(c-pixels[p+i])>12)) {count++;minX=Math.min(minX,(p/4)%canvas.width);maxX=Math.max(maxX,(p/4)%canvas.width);}
      return {w:canvas.clientWidth,h:canvas.clientHeight,buffer:[canvas.width,canvas.height],aspect:camera.aspect,background:bg,camera:[camera.position.x,camera.position.y,camera.position.z],pixels:count,minX,maxX,output:output.textContent,
        ${step === 'canvas' ? '' : step === 'localworld' ? 'local:[child.position.x,child.position.y,child.position.z],world:[world.x,world.y,world.z],parent:[parent.position.x,parent.position.y,parent.position.z],angle:parent.rotation.y,' : `position:[cube.position.x,cube.position.y,cube.position.z],color:material.color.getHexString(),width:geometry.parameters.width,angle:cube.rotation.y,`}
        ${step === 'animation' ? 'seconds,speed,' : ''}
      };
    }};`
    await replaceText(page, source.replace('</script>', hook + '\n</script>'))
    await page.waitForFunction(
      (tag) =>
        document
          .querySelector('#panel-result iframe')
          .srcdoc.includes('tag:' + tag + ','),
      tag,
    )
    await showPreview()
    const f = await waitFrame()
    await f.waitForFunction((tag) => globalThis.__lesson?.tag === tag, tag)
    return f
  }
  const snapshot = async (f) => f.evaluate(() => globalThis.__lesson.snapshot())
  for (const locale of ['ko', 'en']) {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(base + fixture + '?learning#threejs-01')
    await readyEditor(page, 'attached')
    if (locale === 'en')
      await page.getByRole('button', { name: 'English', exact: true }).click()
    if (locale === 'en') {
      // No saved code: a fresh mount must select the actual English default.
      await page.evaluate(() =>
        localStorage.removeItem('web-gl-study:unit:v1:threejs-01'),
      )
      await page.reload()
      await readyEditor(page, 'attached')
    }
    assert.equal((await editorState(page)).language, 'html')
    assert.match(
      (await editorState(page)).code,
      new RegExp('lang="' + locale + '"'),
    )
    for (const step of ['canvas', 'cube', 'animation', 'localworld']) {
      const source = await load(step)
      assert.match(source, new RegExp('lang="' + locale + '"'))
      const hidden = await (
        await waitFrame()
      )
        .locator('canvas')
        .evaluate((c) => ({ w: c.clientWidth, h: c.clientHeight }))
      assert.equal(hidden.w, 0)
      await page.setViewportSize({ width: 360, height: 900 })
      await showPreview()
      await (
        await waitFrame()
      ).waitForFunction(
        () =>
          !document.querySelector('output').textContent.includes('기다리는') &&
          !document.querySelector('output').textContent.includes('Waiting'),
      )
      const displayed = await (
        await waitFrame()
      )
        .locator('canvas')
        .evaluate((c) => ({
          w: c.clientWidth,
          h: c.clientHeight,
          buffer: [c.width, c.height],
        }))
      assert.ok(displayed.w > 0 && displayed.h > 0)
      assert.deepEqual(displayed.buffer, [displayed.w, displayed.h])
      checks.push({ locale, step, hidden, displayed })
      await page.setViewportSize({ width: 1440, height: 900 })
      const f = await run(source, step)
      if (step === 'animation')
        await f.waitForFunction(
          () => globalThis.__lesson.snapshot().seconds >= 0.1,
        )
      const initial = await snapshot(f)
      assert.ok(Number.isFinite(initial.aspect) && initial.w > 0)
      if (step === 'canvas') assert.equal(initial.background, 'edf2f7')
      else assert.ok(initial.pixels > 0)
      if (step === 'animation') assert.equal(initial.angle, 0)
      if (step === 'localworld') assert.deepEqual(initial.world, [2, 0, 0])
      const solution = await load(step, true)
      const sf = await run(solution, step)
      const completed = await snapshot(sf)
      if (step === 'canvas') assert.equal(completed.background, '172554')
      if (step === 'cube') assert.deepEqual(completed.camera, [2, 0, 5])
      if (step === 'localworld')
        for (const [i, n] of [0, 0, -2].entries())
          assert.ok(Math.abs(completed.world[i] - n) < 1e-6)
      if (step === 'localworld') {
        await page.setViewportSize({ width: 320, height: 900 })
        await showReading()
        await page.setViewportSize({ width: 768, height: 900 })
        await showPreview()
        const preserved = await snapshot(sf)
        assert.deepEqual(preserved.world, completed.world)
        assert.equal(preserved.angle, completed.angle)
        assert.ok(
          Math.abs(
            Number(await sf.locator('#angle').inputValue()) - Math.PI / 2,
          ) < 1e-12,
        )
        checks.push({ locale, inputAcrossHiddenResize: preserved })
        await page.setViewportSize({ width: 1440, height: 900 })
      }
      checks.push({ locale, step, initial, completed })
      if (locale === 'ko') {
        if (step === 'canvas') {
          const edited = await run(
            source.replace("'#edf2f7'", "'#172554'"),
            step,
          )
          assert.equal((await snapshot(edited)).background, '172554')
        }
        if (step === 'cube') {
          const moved = await snapshot(
            await run(
              source
                .replace('cube.position.x = 0', 'cube.position.x = 1')
                .replace("'#2563eb'", "'#f97316'"),
              step,
            ),
          )
          assert.equal(moved.position[0], 1)
          assert.equal(moved.color, 'f97316')
          assert.ok(moved.minX > initial.minX)
          const far = await snapshot(
            await run(
              source.replace(
                'camera.position.set(0, 0, 5)',
                'camera.position.set(0, 0, 7)',
              ),
              step,
            ),
          )
          assert.equal(far.camera[2], 7)
          assert.equal(far.width, 1)
          assert.ok(far.pixels < initial.pixels)
          const removed = await snapshot(
            await run(
              source.replace('scene.add(cube);', '// scene.add(cube);'),
              step,
            ),
          )
          assert.equal(removed.pixels, 0)
          checks.push({ studentCube: { moved, far, removed } })
        }
        if (step === 'animation')
          for (const speed of [0.5, 1]) {
            const af = await run(
              source.replace('const speed = 0;', `const speed = ${speed};`),
              step,
            )
            await af.waitForFunction(
              () => globalThis.__lesson.snapshot().seconds >= 2,
            )
            const observed = await snapshot(af)
            assert.ok(
              Math.abs(observed.angle - observed.seconds * speed) < 1e-6,
            )
            checks.push({ studentAnimation: observed })
          }
        if (step === 'localworld') {
          const lf = await run(source, step)
          const before = await snapshot(lf)
          await lf.locator('#angle').evaluate((input) => {
            input.value = String(Math.PI / 2)
            input.dispatchEvent(new Event('input', { bubbles: true }))
          })
          const after = await snapshot(lf)
          assert.deepEqual(after.local, [2, 0, 0])
          assert.deepEqual(after.parent, [0, 0, 0])
          for (const [i, n] of [0, 0, -2].entries())
            assert.ok(Math.abs(after.world[i] - n) < 1e-6)
          assert.notEqual(before.minX, after.minX)
          await page.screenshot({ path: prefix + 'localworld-90.png' })
          checks.push({ studentLocalWorld: { before, after } })
        }
      }
      await page.setViewportSize({ width: 320, height: 900 })
    }
    for (const width of [320, 768, 1024, 1100, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await showReading()
      await page.evaluate(() => window.scrollTo(0, 0))
      const metrics = await page.evaluate(() => ({
        viewport: innerWidth,
        page: document.documentElement.scrollWidth,
        reading: document
          .querySelector('#panel-reading')
          .getBoundingClientRect().width,
      }))
      assert.ok(metrics.page <= metrics.viewport)
      await page.screenshot({
        path: prefix + locale + '-width-' + width + '.png',
      })
      checks.push({ locale, metrics })
    }
    await page.evaluate(() =>
      localStorage.removeItem('web-gl-study:unit:v1:threejs-01'),
    )
  }
  // Historical drafts (including omitted language and empty code) win over defaults.
  for (const code of [
    'export function mount({container}) { container.textContent="saved-js"; return () => {}; }',
    '',
  ]) {
    await page.evaluate(
      (code) =>
        localStorage.setItem(
          'web-gl-study:unit:v1:threejs-01',
          JSON.stringify({
            version: 1,
            code,
            notes: 'saved note',
            progress: 'completed',
            updatedAt: '2026-10-26T00:00:00.000Z',
          }),
        ),
      code,
    )
    await page.reload()
    await readyEditor(page)
    assert.equal((await editorState(page)).code, code)
    assert.equal((await editorState(page)).language, 'javascript')
    assert.equal(await page.locator('.notes-editor').inputValue(), 'saved note')
    assert.equal(
      await page
        .locator('.learning-status button')
        .nth(2)
        .getAttribute('aria-pressed'),
      'true',
    )
    const stored = await page.evaluate(() =>
      localStorage.getItem('web-gl-study:unit:v1:threejs-01'),
    )
    await page
      .getByRole('button', { name: /^(English|한국어)$/, exact: true })
      .click()
    assert.equal((await editorState(page)).code, code)
    assert.equal(
      await page.evaluate(() =>
        localStorage.getItem('web-gl-study:unit:v1:threejs-01'),
      ),
      stored,
    )
    checks.push({
      historicalDraft: {
        empty: code === '',
        language: 'javascript',
        notes: 'saved note',
        completed: true,
        unchanged: true,
      },
    })
  }
  const old = await editorState(page)
  await replaceText(page, '// saved draft edit')
  const edited = await editorState(page)
  await page
    .getByRole('button', { name: /^(English|한국어)$/, exact: true })
    .click()
  assert.deepEqual(await editorState(page), edited)
  await page.evaluate(async () => {
    const { monaco } = await import('/src/editor/monaco.ts')
    monaco.editor.getEditors()[0].trigger('fixture', 'undo', null)
  })
  assert.equal((await editorState(page)).code, old.code)
  assert.equal((await editorState(page)).language, old.language)
  checks.push({
    localeChange: {
      model: edited.id,
      codeAndLanguageAndVersionPreserved: true,
      nativeUndoRestored: true,
    },
  })
  return checks
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
  await page.locator('.lesson-learning nav button').first().click()
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
    assert.match(after.code, /new THREE.Scene/)
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
  assert.match((await editorState(page)).code, /Draw a scene on a canvas/)
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
  assert.match((await editorState(page)).code, /canvas에 장면 그리기/)
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

// The shared rollout case can run a single implemented lesson while iterating.
export async function runLessons0204(page, base) {
  const selected = process.env.THREEJS_LESSON ?? 'all'
  assert.ok(['02', '03', 'all'].includes(selected))
  if (selected === '03') return runLesson03(page, base)
  const checks = []
  const prefix = (process.env.THREEJS_EVIDENCE ?? 'task-6b-browser').replace(
    /\.json$/,
    '',
  )
  let serial = 0
  const frame = async () => {
    await page
      .frameLocator('#panel-result iframe')
      .locator('canvas')
      .waitFor({ state: 'attached' })
    return (
      await page.locator('#panel-result iframe').elementHandle()
    ).contentFrame()
  }
  const tab = async (preview) => {
    const w = await page.evaluate(() => innerWidth)
    if (w < 768)
      await page.locator(preview ? '#tab-result' : '#tab-reading').click()
    else if (w < 1100)
      await page
        .locator('.tablet-learning-tabs button')
        .nth(preview ? 1 : 0)
        .click()
  }
  const load = async (step, solution = false) => {
    await tab(false)
    await page.selectOption('#learning-step', 'threejs-step-02-' + step)
    const details = page
      .locator('.lesson-learning > details')
      .nth(solution ? 2 : 0)
    await details.locator('summary').click()
    await details.getByRole('button').click()
    await page.locator('.example-confirm button').first().click()
    return (await editorState(page)).code
  }
  const run = async (source, hidden = false) => {
    const tag = ++serial
    const hook = `\nglobalThis.__sizing={tag:${tag},snapshot(){
      renderer.render(scene,camera);
      const gl=renderer.getContext(),p=new Uint8Array(canvas.width*canvas.height*4);
      gl.readPixels(0,0,canvas.width,canvas.height,gl.RGBA,gl.UNSIGNED_BYTE,p);
      let minX=canvas.width,minY=canvas.height,maxX=-1,maxY=-1;
      for(let i=0;i<p.length;i+=4)if(p[i+2]>p[i]+30&&p[i+1]<200){const x=(i/4)%canvas.width,y=Math.floor(i/4/canvas.width);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
      return {w:stage.clientWidth,h:stage.clientHeight,buffer:[canvas.width,canvas.height],aspect:camera.aspect,dpr:renderer.getPixelRatio(),pixelBox:[maxX-minX+1,maxY-minY+1],output:output.textContent};
    }};`
    await replaceText(page, source.replace('</script>', hook + '\n</script>'))
    await page.waitForFunction(
      (tag) =>
        document
          .querySelector('#panel-result iframe')
          .srcdoc.includes('tag:' + tag + ','),
      tag,
    )
    const f = await frame()
    await f.waitForFunction((tag) => globalThis.__sizing?.tag === tag, tag, {
      polling: 50,
    })
    if (!hidden) {
      await tab(true)
      await f.waitForFunction(
        () => document.querySelector('canvas').width !== 300,
      )
    }
    return f
  }
  const snap = (f) => f.evaluate(() => globalThis.__sizing.snapshot())
  const settle = async (f) =>
    f.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    )
  const wide = async (f) => {
    await f.locator('#wide').click()
    await settle(f)
    return snap(f)
  }
  for (const locale of ['ko', 'en']) {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(base + fixture + '?learning#threejs-step-02')
    await readyEditor(page, 'attached')
    if (locale === 'en')
      await page.getByRole('button', { name: 'English', exact: true }).click()
    await page.evaluate(() =>
      localStorage.removeItem('web-gl-study:unit:v1:threejs-step-02'),
    )
    await page.reload()
    await readyEditor(page, 'attached')
    assert.equal((await editorState(page)).language, 'html')
    assert.match(
      (await editorState(page)).code,
      new RegExp('lang="' + locale + '"'),
    )
    for (const step of [
      'display-buffer',
      'buffer-resize',
      'observer',
      'dpr',
      'zero-size',
    ]) {
      await page.setViewportSize({ width: 320, height: 900 })
      console.log('sizing', locale, step)
      const source = await load(step)
      assert.match(source, new RegExp('lang="' + locale + '"'))
      const f = await run(source, true)
      const hidden = await snap(f)
      assert.equal(hidden.w, 0)
      await page.setViewportSize({ width: 360, height: 900 })
      await tab(true)
      await f.waitForFunction(
        () => document.querySelector('canvas').width !== 300,
      )
      const displayed = await snap(f)
      assert.deepEqual(displayed.buffer, [displayed.w, displayed.h])
      checks.push({ locale, step, hidden, displayed })
      await page.setViewportSize({ width: 1920, height: 1000 })
      const initialFrame = await run(source),
        initial = await snap(initialFrame)
      assert.equal(initial.w, 240)
      assert.equal(initial.h, 240)
      const before = await wide(initialFrame)
      assert.equal(before.w, 480)
      if (step === 'display-buffer' || step === 'observer')
        assert.deepEqual(before.buffer, [240, 240])
      if (step === 'buffer-resize') {
        assert.deepEqual(before.buffer, [480, 240])
        assert.equal(before.aspect, 1)
      }
      if (step === 'dpr') {
        await initialFrame.locator('#dpr').selectOption('2')
        await settle(initialFrame)
        const missing = await snap(initialFrame)
        assert.equal(missing.dpr, 1)
        checks.push({ locale, dprBeforeEdit: missing })
      }
      let edited = source
      if (step === 'buffer-resize')
        edited = source.replace(
          /\/\/ ASPECT:[^\n]*/,
          'camera.aspect = w / h;\n        camera.updateProjectionMatrix();',
        )
      if (step === 'observer')
        edited = source.replace(
          /\/\/ OBSERVER:[^\n]*/,
          'const observer = new ResizeObserver(resizeScene);\n      observer.observe(stage);',
        )
      if (step === 'dpr')
        edited = source.replace(
          /\/\/ DPR:[^\n]*/,
          'renderer.setPixelRatio(dpr);',
        )
      const ef = await run(edited),
        after = await wide(ef)
      if (step !== 'display-buffer') {
        assert.deepEqual(after.buffer, [480, 240])
        assert.equal(after.aspect, 2)
        assert.ok(Math.abs(after.pixelBox[0] - after.pixelBox[1]) <= 2)
      }
      if (step === 'buffer-resize')
        assert.ok(before.pixelBox[0] / before.pixelBox[1] > 1.9)
      if (step === 'dpr') {
        await ef.locator('#square').click()
        await settle(ef)
        const one = await snap(ef)
        await ef.locator('#dpr').selectOption('2')
        await settle(ef)
        const two = await snap(ef)
        assert.deepEqual(one.buffer, [240, 240])
        assert.deepEqual(two.buffer, [480, 480])
        assert.equal(two.w, one.w)
        assert.equal(two.aspect, one.aspect)
        await page.setViewportSize({ width: 320, height: 900 })
        await tab(false)
        await page.setViewportSize({ width: 768, height: 900 })
        await tab(true)
        await settle(ef)
        assert.equal(await ef.locator('#dpr').inputValue(), '2')
        checks.push({ locale, dpr: { one, two, preserved: await snap(ef) } })
        await page.setViewportSize({ width: 1920, height: 1000 })
      }
      if (step === 'zero-size') {
        await ef.locator('#hide').click()
        await settle(ef)
        const zero = await snap(ef)
        assert.equal(zero.w, 0)
        assert.equal(zero.h, 0)
        assert.ok(Number.isFinite(zero.aspect))
        assert.match(zero.output, /0 × 0/)
        await ef.locator('#show').click()
        await settle(ef)
        const restored = await snap(ef)
        assert.equal(restored.w, 480)
        assert.equal(restored.aspect, 2)
        checks.push({ locale, zero, restored })
      }
      const solution = await load(step, true)
      const sf = await run(solution),
        completed = await wide(sf)
      if (step !== 'display-buffer') {
        assert.deepEqual(completed.buffer, [480, 240])
        assert.equal(completed.aspect, 2)
      }
      checks.push({
        locale,
        step,
        initial,
        before,
        studentEdit: after,
        completed,
      })
      await page.screenshot({
        path: prefix + '-' + locale + '-' + step + '.png',
      })
    }
    for (const width of [320, 768, 1024, 1100, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await tab(true)
      await page.evaluate(() => scrollTo(0, 0))
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        y: document.querySelector('.workspace').getBoundingClientRect().y,
      }))
      assert.ok(metrics.scroll <= width)
      checks.push({ locale, viewport: metrics })
    }
  }
  for (const code of ['', 'export function mount() { return () => {}; }']) {
    await page.evaluate(
      (code) =>
        localStorage.setItem(
          'web-gl-study:unit:v1:threejs-step-02',
          JSON.stringify({
            version: 1,
            code,
            notes: 'saved note',
            progress: 'completed',
            updatedAt: '2026-10-26T00:00:00.000Z',
          }),
        ),
      code,
    )
    await page.reload()
    await readyEditor(page, 'attached')
    assert.equal((await editorState(page)).code, code)
    assert.equal((await editorState(page)).language, 'javascript')
    assert.equal(await page.locator('.notes-editor').inputValue(), 'saved note')
    assert.equal(
      await page
        .locator('.learning-status button')
        .nth(2)
        .getAttribute('aria-pressed'),
      'true',
    )
  }
  return selected === 'all'
    ? [...checks, ...(await runLesson03(page, base))]
    : checks
}

async function runLesson03(page, base) {
  const checks = []
  const steps = [
    'perspective-depth',
    'distance-fov',
    'orthographic',
    'clipping',
    'controls',
    'helper',
  ]
  const selectedSteps = process.env.THREEJS_CAMERA_STEPS?.split(',') ?? steps
  assert.ok(
    selectedSteps.length > 0 &&
      selectedSteps.every((step) => steps.includes(step)),
  )
  const prefix = (process.env.THREEJS_EVIDENCE ?? 'task-6c-browser').replace(
    /\.json$/,
    '',
  )
  let serial = 0
  const tab = async (preview) => {
    const w = await page.evaluate(() => innerWidth)
    if (w < 768)
      await page.locator(preview ? '#tab-result' : '#tab-reading').click()
    else if (w < 1100)
      await page
        .locator('.tablet-learning-tabs button')
        .nth(preview ? 1 : 0)
        .click()
  }
  const load = async (step, solution = false) => {
    await tab(false)
    await page.selectOption('#learning-step', 'threejs-step-03-' + step)
    const detail = page
      .locator('.lesson-learning > details')
      .nth(solution ? 2 : 0)
    await detail.locator('summary').click()
    await detail.getByRole('button').click()
    await page.locator('.example-confirm button').first().click()
    return (await editorState(page)).code
  }
  const run = async (source, hidden = false) => {
    const tag = ++serial
    // Observe only renders initiated by the product. snapshot never renders.
    // Install after setup, before the first ResizeObserver/animation callback.
    const hook = `\nconst productRender = renderer.render.bind(renderer);
      let renderCalls = 0, lastPixels = null;
      renderer.render = (...args) => {
        productRender(...args); renderCalls++;
        const gl=renderer.getContext(), pixels=new Uint8Array(canvas.width*canvas.height*4);
        gl.readPixels(0,0,canvas.width,canvas.height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
        const boxes=[0,1].map(kind=>{
          let minX=canvas.width,minY=canvas.height,maxX=-1,maxY=-1,count=0;
          for(let i=0;i<pixels.length;i+=4){const r=pixels[i],g=pixels[i+1],b=pixels[i+2];
            if(kind===0 ? b>r+60&&g<180 : r>b+100&&g<180){
              const x=(i/4)%canvas.width,y=Math.floor(i/4/canvas.width);count++;
              minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
            }}
          return {count,width:count?maxX-minX+1:0,height:count?maxY-minY+1:0};
        });
        let colored=0; for(let i=0;i<pixels.length;i+=4)if(Math.max(pixels[i],pixels[i+1],pixels[i+2])-Math.min(pixels[i],pixels[i+1],pixels[i+2])>50)colored++;
        lastPixels={boxes,colored};
      };
      globalThis.__cameraLesson={tag:${tag},snapshot(){return {
        renderCalls,pixels:lastPixels,w:stage.clientWidth,h:stage.clientHeight,buffer:[canvas.width,canvas.height],
        active:activeCamera.type,camera:activeCamera.position.toArray(),subject:subjectCamera.position.toArray(),
        fov:subjectCamera.fov,aspect:subjectCamera.aspect,near:subjectCamera.near,far:subjectCamera.far,
        a:cubeA.position.toArray(),b:cubeB.position.toArray(),rotation:[cubeA.rotation.y,cubeB.rotation.y],
        ortho:typeof ortho==='undefined'?null:{position:ortho.position.toArray(),zoom:ortho.zoom,bounds:[ortho.left,ortho.right,ortho.top,ortho.bottom]},
        controls:typeof controls==='undefined'?null:{target:controls.target.toArray(),enabled:controls.enabled,damping:controls.enableDamping,object:controls.object===activeCamera},
        helper:typeof helper==='undefined'?null:{visible:helper.visible,subjectInScene:subjectCamera.parent===scene,direct:helper.parent===scene,matrix:subjectCamera.matrixWorld.elements.slice(),points:Array.from(helper.geometry.attributes.position.array)},
        output:output.textContent
      }}};`
    await replaceText(page, source.replace('</script>', hook + '\n</script>'))
    await page.waitForFunction(
      (tag) =>
        document
          .querySelector('#panel-result iframe')
          .srcdoc.includes('tag:' + tag + ','),
      tag,
    )
    await page
      .frameLocator('#panel-result iframe')
      .locator('canvas')
      .waitFor({ state: 'attached' })
    const f = await (
      await page.locator('#panel-result iframe').elementHandle()
    ).contentFrame()
    try {
      await f.waitForFunction(
        (tag) => globalThis.__cameraLesson?.tag === tag,
        tag,
        { polling: 50 },
      )
    } catch (error) {
      console.log(
        'camera runtime status',
        await page.locator('.preview-error').allTextContents(),
        await page.locator('.preview-status').allTextContents(),
      )
      console.log(
        'camera hook failure',
        await f.evaluate(() => ({
          url: location.href,
          html: document.documentElement.outerHTML.slice(-4000),
          keys: Object.keys(globalThis).filter((k) => k.includes('camera')),
        })),
      )
      throw error
    }
    if (!hidden) {
      await tab(true)
      await f.waitForFunction(
        () => globalThis.__cameraLesson.snapshot().renderCalls > 0,
      )
    }
    return f
  }
  const snap = (f) => f.evaluate(() => globalThis.__cameraLesson.snapshot())
  const changed = async (f, action) => {
    const before = await snap(f)
    await action()
    await f.waitForFunction(
      (count) => globalThis.__cameraLesson.snapshot().renderCalls > count,
      before.renderCalls,
    )
    const after = await snap(f)
    assert.ok(after.pixels)
    return after
  }
  const apply = async (f, values) =>
    changed(f, async () => {
      for (const [id, value] of Object.entries(values))
        await f.locator('#' + id).fill(String(value))
      await f.locator('#apply').click()
    })
  const reset = (f) => changed(f, () => f.locator('#reset').click())
  const project = (f, kind) =>
    changed(f, () => f.locator('#projection').selectOption(kind))
  const sameObjects = (s) => {
    assert.deepEqual(s.a, [-1, 0, 2])
    assert.deepEqual(s.b, [1, 0, -2])
    assert.deepEqual(s.rotation, [0, 0])
  }
  const squarePixels = (s) => {
    for (const box of s.pixels.boxes) {
      assert.ok(box.count > 0)
      if (s.active === 'OrthographicCamera')
        assert.ok(Math.abs(box.width - box.height) <= 2, JSON.stringify(s))
    }
  }
  for (const locale of ['ko', 'en']) {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(base + fixture + '?learning#threejs-step-03')
    await readyEditor(page, 'attached')
    const localeButton = page.getByRole('button', {
      name: locale === 'en' ? 'English' : '한국어',
      exact: true,
    })
    if (await localeButton.count()) await localeButton.click()
    await page.evaluate(() =>
      localStorage.removeItem('web-gl-study:unit:v1:threejs-step-03'),
    )
    await page.reload()
    await readyEditor(page, 'attached')
    assert.equal((await editorState(page)).language, 'html')
    assert.match(
      (await editorState(page)).code,
      new RegExp('lang="' + locale + '"'),
    )
    for (const step of selectedSteps) {
      console.log('camera', locale, step)
      await page.setViewportSize({ width: 320, height: 900 })
      const source = await load(step)
      assert.match(source, new RegExp('lang="' + locale + '"'))
      const hiddenFrame = await run(source, true),
        hidden = await snap(hiddenFrame)
      assert.equal(hidden.w, 0)
      assert.equal(hidden.renderCalls, 0)
      await page.setViewportSize({ width: 360, height: 900 })
      await tab(true)
      await hiddenFrame.waitForFunction(
        () => globalThis.__cameraLesson.snapshot().renderCalls > 0,
      )
      const displayed = await snap(hiddenFrame)
      assert.deepEqual(displayed.buffer, [displayed.w, displayed.h])
      assert.ok(displayed.pixels.colored > 0)
      checks.push({ locale, step, hidden, displayed })
      await page.setViewportSize({ width: 1920, height: 1000 })
      let f = await run(source),
        initial = await snap(f)
      assert.equal(initial.w, 480)
      assert.equal(initial.h, 240)
      sameObjects(initial)
      if (step === 'perspective-depth') {
        assert.ok(initial.pixels.boxes[0].width > initial.pixels.boxes[1].width)
        checks.push({ locale, depth: initial })
      }
      if (step === 'distance-fov') {
        const distance = await apply(f, { distance: 13 })
        assert.equal(distance.camera[2], 13)
        assert.equal(distance.fov, 50)
        assert.ok(
          distance.pixels.boxes[0].width < initial.pixels.boxes[0].width,
        )
        await reset(f)
        const narrow = await apply(f, { fov: 30 })
        assert.equal(narrow.camera[2], 9)
        assert.equal(narrow.fov, 30)
        assert.ok(narrow.pixels.boxes[0].width > initial.pixels.boxes[0].width)
        // A real source edit is run through the same editor/iframe pipeline.
        f = await run(
          source.replace('baselineDistance = 9', 'baselineDistance = 13'),
        )
        const studentDistance = await snap(f)
        assert.equal(studentDistance.camera[2], 13)
        assert.equal(await f.locator('#distance').inputValue(), '13')
        assert.deepEqual(studentDistance.pixels.boxes, distance.pixels.boxes)
        f = await run(source.replace('baselineFov = 50', 'baselineFov = 30'))
        const studentFov = await snap(f)
        assert.equal(studentFov.fov, 30)
        assert.deepEqual(studentFov.pixels.boxes, narrow.pixels.boxes)
        checks.push({ locale, distance, narrow, studentDistance, studentFov })
      }
      if (step === 'orthographic') {
        const ortho = await project(f, 'ortho')
        squarePixels(ortho)
        assert.equal(await f.locator('#fov').isDisabled(), true)
        assert.equal(ortho.pixels.boxes[0].width, ortho.pixels.boxes[1].width)
        const distance = await apply(f, { distance: 13 })
        assert.deepEqual(distance.pixels.boxes, ortho.pixels.boxes)
        await apply(f, { distance: 9 })
        const zoom = await apply(f, { zoom: 2 })
        assert.ok(
          zoom.pixels.boxes[0].width > ortho.pixels.boxes[0].width * 1.9,
        )
        await reset(f)
        const sizes = []
        for (const kind of ['perspective', 'ortho']) {
          await project(f, kind)
          const square = await changed(f, () => f.locator('#square').click())
          squarePixels(square)
          const wide = await changed(f, () => f.locator('#wide').click())
          squarePixels(wide)
          assert.deepEqual(wide.buffer, [480, 240])
          assert.equal(wide.aspect, 2)
          assert.deepEqual(wide.ortho.bounds, [-6, 6, 3, -3])
          assert.ok(
            Math.abs(
              square.pixels.boxes[0].width - wide.pixels.boxes[0].width,
            ) <= 2,
          )
          assert.ok(
            Math.abs(
              square.pixels.boxes[0].height - wide.pixels.boxes[0].height,
            ) <= 2,
          )
          sizes.push({ kind, square, wide })
        }
        checks.push({ locale, orthographic: ortho, distance, zoom, sizes })
      }
      if (step === 'clipping') {
        const partial = await apply(f, { near: 7 })
        await page.screenshot({
          path: prefix + '-' + locale + '-near-partial.png',
        })
        assert.ok(partial.pixels.boxes[0].count > 0)
        assert.ok(partial.pixels.boxes[0].count < initial.pixels.boxes[0].count)
        const whole = await apply(f, { near: 8 })
        assert.equal(whole.pixels.boxes[0].count, 0)
        assert.ok(whole.pixels.boxes[1].count > 0)
        await reset(f)
        const far = await apply(f, { far: 9 })
        assert.ok(far.pixels.boxes[0].count > 0)
        assert.equal(far.pixels.boxes[1].count, 0)
        const restored = await reset(f)
        assert.deepEqual(restored.pixels.boxes, initial.pixels.boxes)
        await f.locator('#near').fill('10')
        await f.locator('#far').fill('9')
        await f.locator('#apply').click()
        assert.match(
          await f.locator('#error').textContent(),
          locale === 'ko' ? /far는 near보다/ : /far must/,
        )
        checks.push({ locale, partial, whole, far, restored })
      }
      if (step === 'controls') {
        assert.equal(initial.controls.damping, false)
        // Numeric controls provide keyboard equivalents for position and target experiments.
        await f.locator('#compare').check()
        const numeric = await apply(f, { 'camera-x': 3, 'target-x': 1 })
        numeric.camera.forEach((value, index) =>
          assert.ok(Math.abs(value - [3, 0, 9][index]) < 1e-6),
        )
        assert.deepEqual(numeric.controls.target, [1, 0, 0])
        sameObjects(numeric)
        const frozen1 = await snap(f)
        await f.waitForFunction(
          (count) =>
            globalThis.__cameraLesson.snapshot().renderCalls > count + 3,
          frozen1.renderCalls,
        )
        const frozen2 = await snap(f)
        assert.deepEqual(frozen2.camera, frozen1.camera)
        f = await run(
          source.replace('const damping = false', 'const damping = true'),
        )
        const damping = await snap(f)
        assert.equal(damping.controls.damping, true)
        const canvas = f.locator('canvas'),
          box = await canvas.boundingBox()
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
        await page.mouse.down()
        await page.mouse.move(
          box.x + box.width / 2 + 25,
          box.y + box.height / 2,
          { steps: 2 },
        )
        await page.mouse.up()
        const released = await snap(f)
        await f.waitForFunction(
          (count) =>
            globalThis.__cameraLesson.snapshot().renderCalls > count + 3,
          released.renderCalls,
        )
        const continued = await snap(f)
        assert.notDeepEqual(continued.camera, released.camera)
        sameObjects(continued)
        const wheel = await changed(f, () => page.mouse.wheel(0, 100))
        assert.notDeepEqual(wheel.camera, continued.camera)
        await reset(f)
        const ortho = await project(f, 'ortho')
        assert.equal(ortho.controls.object, true)
        await canvas.hover()
        const orthoWheel = await changed(f, () => page.mouse.wheel(0, 100))
        assert.notEqual(orthoWheel.ortho.zoom, ortho.ortho.zoom)
        sameObjects(orthoWheel)
        const restored = await reset(f)
        assert.equal(restored.controls.object, true)
        assert.equal(restored.ortho.zoom, 1)
        assert.deepEqual(restored.controls.target, [0, 0, 0])
        checks.push({
          locale,
          numeric,
          frozen1,
          frozen2,
          damping,
          released,
          continued,
          wheel,
          orthoWheel,
          restored,
        })
      }
      if (step === 'helper') {
        const overview = await changed(f, () =>
          f.locator('#view').selectOption('overview'),
        )
        await page.screenshot({ path: prefix + '-' + locale + '-overview.png' })
        assert.ok(
          overview.helper.visible &&
            overview.helper.direct &&
            overview.helper.subjectInScene,
        )
        assert.deepEqual(overview.helper.matrix.slice(12, 15), [0, 0, 9])
        assert.equal(overview.far, 12)
        const narrow = await apply(f, { fov: 30 })
        await page.screenshot({
          path: prefix + '-' + locale + '-overview-fov30.png',
        })
        assert.notDeepEqual(narrow.helper.points, overview.helper.points)
        assert.notEqual(narrow.pixels.colored, overview.pixels.colored)
        assert.deepEqual(narrow.camera, [10, 8, 16])
        assert.equal(narrow.fov, 30)
        const near = await apply(f, { fov: 50, near: 7 })
        const far = await apply(f, { near: 0.1, far: 9 })
        assert.notDeepEqual(near.helper.points, overview.helper.points)
        assert.notDeepEqual(far.helper.points, overview.helper.points)
        const subject = await changed(f, () =>
          f.locator('#view').selectOption('subject'),
        )
        assert.equal(subject.helper.visible, false)
        assert.equal(subject.pixels.boxes[1].count, 0)
        f = await run(source.replace('baselineFov = 50', 'baselineFov = 30'))
        const edited = await changed(f, () =>
          f.locator('#view').selectOption('overview'),
        )
        assert.deepEqual(edited.helper.points, narrow.helper.points)
        checks.push({ locale, overview, narrow, near, far, subject, edited })
      }
      const solution = await load(step, true)
      const sf = await run(solution),
        completed = await snap(sf)
      assert.ok(completed.pixels.colored > 0)
      sameObjects(completed)
      if (step === 'distance-fov' || step === 'helper')
        assert.equal(completed.fov, 30)
      if (step === 'orthographic') assert.equal(completed.ortho.zoom, 2)
      if (step === 'clipping') assert.equal(completed.pixels.boxes[0].count, 0)
      if (step === 'controls') assert.equal(completed.controls.damping, true)
      checks.push({ locale, step, initial, completed })
      await page.screenshot({
        path: prefix + '-' + locale + '-' + step + '.png',
      })
    }
    // Both camera modes survive hidden reading, resize, and preview return with inputs intact.
    const resizeSource = await load('orthographic'),
      rf = await run(resizeSource)
    const recovery = []
    for (const kind of ['perspective', 'ortho']) {
      await page.setViewportSize({ width: 1920, height: 1000 })
      await project(rf, kind)
      await apply(rf, { distance: 13 })
      await page.setViewportSize({ width: 320, height: 900 })
      await tab(false)
      await page.setViewportSize({ width: 768, height: 900 })
      const before = await snap(rf)
      await tab(true)
      await rf.waitForFunction(
        (count) => globalThis.__cameraLesson.snapshot().renderCalls > count,
        before.renderCalls,
      )
      const restored = await snap(rf)
      assert.equal(await rf.locator('#distance').inputValue(), '13')
      assert.deepEqual(restored.buffer, [restored.w, restored.h])
      assert.ok(restored.pixels.colored > 0)
      squarePixels(restored)
      recovery.push({ kind, before, restored })
    }
    checks.push({ locale, recovery })
    for (const width of [320, 768, 1024, 1100, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await tab(true)
      await page.evaluate(() => scrollTo(0, 0))
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        y: document.querySelector('.workspace').getBoundingClientRect().y,
      }))
      assert.ok(metrics.scroll <= width)
      checks.push({ locale, viewport: metrics })
    }
  }
  for (const code of ['', 'export function mount() { return () => {}; }']) {
    await page.evaluate(
      (code) =>
        localStorage.setItem(
          'web-gl-study:unit:v1:threejs-step-03',
          JSON.stringify({
            version: 1,
            code,
            notes: 'saved note',
            progress: 'completed',
            updatedAt: '2026-10-26T00:00:00.000Z',
          }),
        ),
      code,
    )
    await page.reload()
    await readyEditor(page, 'attached')
    assert.equal((await editorState(page)).code, code)
    assert.equal((await editorState(page)).language, 'javascript')
    assert.equal(await page.locator('.notes-editor').inputValue(), 'saved note')
    assert.equal(
      await page
        .locator('.learning-status button')
        .nth(2)
        .getAttribute('aria-pressed'),
      'true',
    )
  }
  return checks
}

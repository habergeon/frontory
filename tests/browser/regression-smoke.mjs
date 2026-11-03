import assert from 'node:assert/strict'

// Every invocation receives a new, non-persistent browser context from the runner.
export async function runRegressionSmoke(page, base) {
  const documents = []
  page.on('response', (response) => {
    if (/\/docs\//.test(response.url()))
      documents.push({ url: response.url(), status: response.status() })
  })
  await page.goto(base + '/en/#threejs-01')
  await page.locator('.lesson-learning .text-link').first().waitFor()
  const openDocument = async () => {
    await page.locator('.lesson-learning .text-link').first().click()
    await page.locator('.document-reader h1').waitFor()
    assert.doesNotMatch(
      await page.locator('.document-reader').innerText(),
      /Document not found/,
    )
  }
  const closedAt = async (hash) => {
    await page.waitForFunction(
      (hash) =>
        location.hash === hash && !document.querySelector('.document-reader'),
      hash,
    )
  }
  await openDocument()
  await page.getByRole('button', { name: 'Next unit →', exact: true }).click()
  await page.waitForFunction(
    () =>
      location.hash !== '#threejs-01' &&
      !document.querySelector('.document-reader'),
  )
  const next = await page.evaluate(() => location.hash)
  await openDocument()
  await page.goBack()
  await closedAt('#threejs-01')
  await openDocument()
  await page.goForward()
  await closedAt(next)
  await openDocument()
  await page.evaluate(() => {
    location.hash = '#threejs-01'
  })
  await closedAt('#threejs-01')
  assert.ok(
    documents.some(
      ({ url, status }) => /\/docs\/en\//.test(url) && status === 200,
    ),
    'English prerequisite was fetched successfully',
  )
  assert.deepEqual(
    documents.filter(({ status }) => status >= 400),
    [],
  )

  await page.goto(base + '/#html-01')
  await page.waitForFunction(
    () => document.querySelector('.preview-status')?.textContent === '실행 중',
  )
  const editing = await page.evaluate(async () => {
    const results = []
    const check = (name, ok) => {
      results.push({ name, ok })
      if (!ok) throw new Error(name)
    }
    const wait = async (predicate) => {
      const end = Date.now() + 15000
      while (!predicate()) {
        if (Date.now() > end) throw new Error('Timed out: ' + predicate)
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
    }
    await wait(
      () =>
        document.querySelector('.preview-status')?.textContent === '실행 중',
    )
    const { monaco } = await import('/src/editor/monaco.ts')
    const key = 'web-gl-study:unit:v1:html-01'
    check(
      'Initial compilation and formatting do not save',
      localStorage.getItem(key) === null,
    )
    const files = ['html', 'javascript', 'css']
    const models = Object.fromEntries(
      files.map((file) => [
        file,
        monaco.editor
          .getModels()
          .find((model) => model.uri.path.includes('/html-01/' + file + '/')),
      ]),
    )
    check(
      'All three models exist',
      files.every((file) => !!models[file]),
    )
    const markers = {
      html: '<p id="undo-proof">UNDO_PROOF</p>',
      javascript:
        'export function mount() { console.log("UNDO_PROOF"); return () => {}; }',
      css: '#undo-proof { color: rgb(1, 2, 3); }',
    }
    for (const file of files) {
      const model = models[file]
      model.pushStackElement()
      model.pushEditOperations(
        [],
        [{ range: model.getFullModelRange(), text: markers[file] }],
        () => null,
      )
      model.pushStackElement()
    }
    await wait(
      () =>
        JSON.parse(localStorage.getItem(key) || 'null')?.files?.css ===
        markers.css,
    )
    const stored = JSON.parse(localStorage.getItem(key))
    localStorage.setItem(
      key,
      JSON.stringify({ ...stored, notes: 'NEW_NOTES_FROM_OTHER_TAB' }),
    )
    const model = models.html
    model.pushEditOperations(
      [],
      [{ range: model.getFullModelRange(), text: markers.html + '\n' }],
      () => null,
    )
    markers.html = model.getValue()
    await wait(
      () => JSON.parse(localStorage.getItem(key)).files.html === markers.html,
    )
    check(
      'Editing code preserves externally updated notes',
      JSON.parse(localStorage.getItem(key)).notes ===
        'NEW_NOTES_FROM_OTHER_TAB',
    )
    ;[...document.querySelectorAll('button')]
      .find((button) => button.textContent.trim() === '원본 코드로')
      .click()
    await wait(() => document.querySelector('.reset-confirm button'))
    document.querySelector('.reset-confirm button').click()
    await wait(() => models.html.getValue() !== markers.html)
    check(
      'Restore keeps model identity',
      files.every((file) => monaco.editor.getModels().includes(models[file])),
    )
    for (const file of files) {
      document.getElementById('file-tab-' + file).click()
      await wait(() => !document.getElementById('file-panel-' + file).hidden)
      const editor = monaco.editor
        .getEditors()
        .find((editor) => editor.getModel() === models[file])
      editor.focus()
      editor.trigger('regression', 'undo', null)
      await wait(() => models[file].getValue() === markers[file])
      check(
        file + ' Undo restores pre-reset edits',
        models[file].getValue() === markers[file],
      )
    }
    await wait(() =>
      files.every(
        (file) =>
          JSON.parse(localStorage.getItem(key)).files[file] === markers[file],
      ),
    )
    check(
      'Undo keeps latest notes',
      JSON.parse(localStorage.getItem(key)).notes ===
        'NEW_NOTES_FROM_OTHER_TAB',
    )
    return { results, url: location.href }
  })
  const saved = await page.evaluate(() =>
    localStorage.getItem('web-gl-study:unit:v1:html-01'),
  )
  await page.reload()
  await page.waitForFunction(
    () => document.querySelector('.preview-status')?.textContent === '실행 중',
  )
  assert.equal(
    await page.evaluate(() =>
      localStorage.getItem('web-gl-study:unit:v1:html-01'),
    ),
    saved,
    'Reload preserves saved source and notes byte-for-byte',
  )
  return [
    'English prerequisite',
    'Reload preserves saved source and notes',
    'next/back/forward/hash closes document',
    ...editing.results.map(({ name }) => name),
  ]
}

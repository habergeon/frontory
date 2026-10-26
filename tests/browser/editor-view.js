;async (page, baseUrl = 'http://127.0.0.1:4187') => {
  const checks = [],
    measurements = []
  const check = (name, ok) => {
    checks.push({ name, ok })
    if (!ok) throw Error(name)
  }
  const wrap = () => page.locator('.code-panel-actions button').last()
  const wide = () => page.locator('.wide-code-toggle')
  const unchanged = () =>
    page.evaluate(() => {
      const before = window.l03e
      return (
        before.editor.getModel() === before.model &&
        before.model.getVersionId() === before.version &&
        JSON.stringify(before.editor.getSelection()) === before.selection &&
        document.querySelector('.notes-editor') === before.notes &&
        before.notes.value === before.notesValue &&
        document.querySelector('.workspace iframe') === before.frame &&
        before.frame.srcdoc === before.srcdoc &&
        before.frame.contentWindow === before.frameWindow &&
        before.loads === 0 &&
        JSON.stringify({ ...localStorage }) === before.storage
      )
    })
  const buttonsFit = () =>
    page.locator('#panel-code>.panel-header').evaluate((header) => {
      const bounds = header.getBoundingClientRect()
      return (
        [...header.querySelectorAll('button')]
          .filter((button) => getComputedStyle(button).display !== 'none')
          .every((button) => {
            const rect = button.getBoundingClientRect()
            return (
              rect.left >= bounds.left &&
              rect.right <= bounds.right &&
              rect.right <= innerWidth
            )
          }) && document.documentElement.scrollWidth <= innerWidth
      )
    })
  const endVisible = async () => {
    await page.locator('.monaco-editor [role="textbox"]').focus()
    await page.keyboard.press('Control+End')
    await page.waitForFunction(() => {
      const { editor, model } = window.l03e
      const end = {
        lineNumber: model.getLineCount(),
        column: model.getLineMaxColumn(model.getLineCount()),
      }
      const point = editor.getScrolledVisiblePosition(end),
        size = editor.getLayoutInfo()
      return (
        editor.getPosition().lineNumber === end.lineNumber &&
        editor.getPosition().column === end.column &&
        point &&
        point.left >= size.contentLeft &&
        point.left < size.width &&
        point.top >= 0 &&
        point.top < size.height
      )
    })
  }
  for (const locale of ['ko', 'en'])
    for (const width of [390, 1100, 1440]) {
      const label = locale + ' ' + width
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
      await page.goto(
        baseUrl +
          (locale === 'en' ? '/en/' : '/') +
          '?editor=view#javascript-step-02',
        { waitUntil: 'domcontentloaded' },
      )
      await page.waitForFunction(() => document.readyState === 'complete')
      await page.locator('.current-lesson-actions button').last().click()
      await page.waitForSelector('.monaco-editor')
      await page.locator('#tab-notes').evaluate((button) => button.click())
      await page.locator('.notes-editor').fill('# L03E notes — keep this value')
      await page.locator('.current-lesson-actions button').last().click()
      await page.evaluate(async () => {
        const { monaco } = await import('/src/editor/monaco.ts')
        const editor = monaco.editor.getEditors()[0],
          model = editor.getModel(),
          original = model.getValue()
        editor.pushUndoStop()
        const line = model.getLineCount(),
          column = model.getLineMaxColumn(line)
        editor.executeEdits('l03e', [
          {
            range: new monaco.Range(line, column, line, column),
            text: '\n// ' + 'long_line_'.repeat(100) + 'L03E_LINE_END',
          },
        ])
        editor.pushUndoStop()
        window.l03e = { editor, model, monaco, original }
      })
      await page.waitForFunction(
        () =>
          /실행 중|Running/.test(
            document.querySelector('.preview-status')?.textContent ?? '',
          ) && JSON.stringify({ ...localStorage }).includes('L03E_LINE_END'),
      )
      check(
        label + ' wrap starts enabled',
        (await wrap().getAttribute('aria-pressed')) === 'true' &&
          (await page.evaluate(
            () =>
              window.l03e.editor.getOption(
                window.l03e.monaco.editor.EditorOption.wordWrap,
              ) === 'on',
          )),
      )
      await endVisible()
      check(label + ' wrapped long-line endpoint reachable by keyboard', true)
      await page.evaluate(() => {
        const before = window.l03e
        Object.assign(before, {
          version: before.model.getVersionId(),
          selection: JSON.stringify(before.editor.getSelection()),
          notes: document.querySelector('.notes-editor'),
          notesValue: document.querySelector('.notes-editor').value,
          frame: document.querySelector('.workspace iframe'),
          srcdoc: document.querySelector('.workspace iframe').srcdoc,
          frameWindow:
            document.querySelector('.workspace iframe').contentWindow,
          loads: 0,
          storage: JSON.stringify({ ...localStorage }),
          statusChanges: 0,
        })
        before.frame.addEventListener('load', () => {
          before.loads += 1
        })
        before.observer = new MutationObserver(() => {
          before.statusChanges += 1
        })
        before.observer.observe(document.querySelector('.code-check-status'), {
          subtree: true,
          childList: true,
          characterData: true,
        })
      })
      check(label + ' initial toolbar fits', await buttonsFit())
      await wrap().click()
      check(
        label + ' wrap off keeps the same focused button',
        await wrap().evaluate(
          (button) =>
            document.activeElement === button &&
            button.getAttribute('aria-pressed') === 'false',
        ),
      )
      check(
        label + ' wrap update changes options only',
        (await page.evaluate(
          () =>
            window.l03e.editor.getOption(
              window.l03e.monaco.editor.EditorOption.wordWrap,
            ) === 'off',
        )) && (await unchanged()),
      )
      await endVisible()
      check(
        label + ' unwrapped endpoint is horizontally accessible',
        await page.evaluate(() => window.l03e.editor.getScrollLeft() > 0),
      )
      await wrap().click()
      check(label + ' wrap on preserves state', await unchanged())
      const desktopWidth = width === 390 ? 1440 : width
      await page.setViewportSize({ width: desktopWidth, height: 1000 })
      const normalWidth = await page
        .locator('#panel-code')
        .evaluate((panel) => panel.getBoundingClientRect().width)
      await wide().click()
      const wideWidth = await page
        .locator('#panel-code')
        .evaluate((panel) => panel.getBoundingClientRect().width)
      check(
        label + ' wider code keeps toggle focus and hides siblings',
        wideWidth > normalWidth + 200 &&
          (await wide().evaluate(
            (button) =>
              document.activeElement === button &&
              button.getAttribute('aria-pressed') === 'true',
          )) &&
          !(await page.locator('#panel-result').isVisible()) &&
          !(await page.locator('#panel-notes').isVisible()),
      )
      check(
        label + ' wider view preserves editor frame notes and storage',
        await unchanged(),
      )
      await page.locator('.current-lesson-actions button').first().click()
      await page
        .locator('.document-reader article[aria-busy="false"] h1')
        .waitFor()
      const readerWideWidth = await page
        .locator('#panel-code')
        .evaluate((panel) => panel.getBoundingClientRect().width)
      check(
        label + ' wider code keeps desktop reader visible',
        (await page.locator('.document-reader').isVisible()) &&
          (await unchanged()),
      )
      await wide().click()
      const readerNormalWidth = await page
        .locator('#panel-code')
        .evaluate((panel) => panel.getBoundingClientRect().width)
      check(
        label + ' restoring panels keeps focus and reader',
        (await wide().evaluate(
          (button) =>
            document.activeElement === button &&
            button.getAttribute('aria-pressed') === 'false',
        )) &&
          (await page.locator('#panel-result').isVisible()) &&
          (await page.locator('#panel-notes').isVisible()) &&
          (await page.locator('.document-reader').isVisible()),
      )
      check(label + ' reader-open toolbar fits', await buttonsFit())
      measurements.push({
        label,
        desktopWidth,
        normalWidth,
        wideWidth,
        readerWideWidth,
        readerNormalWidth,
      })
      await wide().click()
      await page.setViewportSize({ width: 390, height: 844 })
      await page.locator('.reader-view-controls button').last().click()
      await page.locator('#tab-notes').click()
      check(
        label +
          ' mobile selected notes remain visible with wide state retained',
        (await page.locator('#panel-notes').isVisible()) &&
          !(await wide().isVisible()),
      )
      await page.locator('#tab-code').click()
      check(label + ' mobile code toolbar fits', await buttonsFit())
      await page.setViewportSize({ width: desktopWidth, height: 1000 })
      check(
        label + ' desktop resize restores wider view',
        (await wide().getAttribute('aria-pressed')) === 'true' &&
          !(await page.locator('#panel-result').isVisible()) &&
          (await page.locator('.document-reader').isVisible()),
      )
      await wide().click()
      check(
        label + ' all view changes preserve state and do not recompile',
        (await unchanged()) &&
          (await page.evaluate(() => window.l03e.statusChanges === 0)),
      )
      await page.evaluate(() => window.l03e.observer.disconnect())
      await page.locator('.document-reader .dialog-header button').click()
      check(
        label + ' closing reader preserves all editor state',
        await unchanged(),
      )
      check(
        label + ' undo stack survives view and wrap changes',
        await page.evaluate(() => {
          window.l03e.editor.trigger('l03e', 'undo')
          return window.l03e.model.getValue() === window.l03e.original
        }),
      )
      await page.evaluate(() => window.l03e.editor.trigger('l03e', 'redo'))
    }
  return { checks, measurements }
}

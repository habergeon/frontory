;async (page) => {
  const results = []
  const check = (name, actual, expected = true) => {
    results.push({ name, actual, expected, ok: actual === expected })
    if (actual !== expected) throw Error(name + ': ' + JSON.stringify(actual))
  }
  const source =
    "export function mount({ container, locale }) { const input = document.createElement('input'); input.setAttribute('aria-label', 'Locale proof'); input.value = locale; container.append(input); return () => input.remove(); }"
  const edit = async (value) => {
    await page.locator('.monaco-editor [role="textbox"]').focus()
    await page.keyboard.press('Control+A')
    await page.keyboard.insertText(value)
  }
  const frame = () => page.frameLocator('.workspace iframe')
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('http://127.0.0.1:4185/#javascript-step-02')
  await page.reload()
  await page.waitForSelector('.monaco-editor')
  // Preserve the original example through the actual restore UI, including after RED.
  const restore = async () => {
    await page
      .locator('#panel-code .code-panel-actions button:first-child')
      .click()
    await page.locator('.reset-confirm button').first().click()
    await page
      .frameLocator('.workspace iframe')
      .getByRole('textbox', { name: /실험 JSON 입력|Experiment JSON input/ })
      .waitFor()
    await page.waitForFunction(
      () =>
        document
          .querySelector('.code-check-status')
          ?.textContent.includes('검사 통과') ||
        document
          .querySelector('.code-check-status')
          ?.textContent.includes('checks passed'),
    )
  }
  await restore()
  try {
    await edit(source)
    await frame().getByRole('textbox', { name: 'Locale proof' }).waitFor()
    check(
      'Initial frame uses Korean mount context',
      await frame().getByRole('textbox').inputValue(),
      'ko',
    )
    await frame().getByRole('textbox').fill('user state')
    await page.evaluate(() => {
      const element = document.querySelector('.workspace iframe')
      window.f12refs = {
        element,
        target: element.contentWindow,
        document: element.srcdoc,
        editor: document.querySelector('.monaco-editor'),
        storage: JSON.stringify(
          Object.keys(localStorage)
            .sort()
            .map((key) => [key, localStorage.getItem(key)]),
        ),
      }
    })
    await page.locator('.interface-language button').click()
    check('English URL', page.url().endsWith('/en/#javascript-step-02'))
    check(
      'Exterior status translates immediately',
      await page.locator('.preview-status').textContent(),
      'Running',
    )
    check(
      'Iframe title translates immediately',
      await page.locator('.workspace iframe').getAttribute('title'),
      'Practice preview',
    )
    check(
      'Iframe element and contentWindow preserved',
      await page.evaluate(() => {
        const element = document.querySelector('.workspace iframe')
        return (
          element === window.f12refs.element &&
          element.contentWindow === window.f12refs.target &&
          element.srcdoc === window.f12refs.document
        )
      }),
    )
    check(
      'Example user input preserved',
      await frame().getByRole('textbox').inputValue(),
      'user state',
    )
    check(
      'Running frame lang remains Korean',
      await frame().locator('html').getAttribute('lang'),
      'ko',
    )
    check(
      'Language mismatch notice is English',
      await page.locator('.preview-locale-notice').textContent(),
      'The example language will change the next time you run or edit the code.',
    )
    check(
      'Language switch preserves editor and all storage bytes',
      await page.evaluate(
        () =>
          document.querySelector('.monaco-editor') === window.f12refs.editor &&
          JSON.stringify(
            Object.keys(localStorage)
              .sort()
              .map((key) => [key, localStorage.getItem(key)]),
          ) === window.f12refs.storage,
      ),
    )
    await page.locator('#panel-result .panel-header button').click()
    await page.waitForFunction(
      () =>
        document.querySelector('.workspace iframe').srcdoc !==
        window.f12refs.document,
    )
    await frame().getByRole('textbox', { name: 'Locale proof' }).waitFor()
    check(
      'Explicit rerun uses English context',
      await frame().getByRole('textbox').inputValue(),
      'en',
    )
    check(
      'Rerun frame lang is English',
      await frame().locator('html').getAttribute('lang'),
      'en',
    )
    check(
      'Mismatch clears after rerun',
      await page.locator('.preview-locale-notice').count(),
      0,
    )
    await page.locator('.interface-language button').click()
    check(
      'Mismatch notice translates back',
      await page.locator('.preview-locale-notice').textContent(),
      '예제 언어는 다음 실행이나 코드 수정 때 바뀝니다.',
    )
    await edit(source + '\n// first edit after locale switch')
    await page.waitForFunction(() =>
      document
        .querySelector('.workspace iframe')
        .srcdoc.includes('first edit after locale switch'),
    )
    await frame().getByRole('textbox', { name: 'Locale proof' }).waitFor()
    check(
      'First code application uses latest Korean context',
      await frame().getByRole('textbox').inputValue(),
      'ko',
    )
    check(
      'Code application frame lang is Korean',
      await frame().locator('html').getAttribute('lang'),
      'ko',
    )
    check(
      'Mismatch clears after code application',
      await page.locator('.preview-locale-notice').count(),
      0,
    )
    await edit(`export function mount() { throw new Error('F12 raw error'); }`)
    await page.waitForSelector('.preview-error')
    await page.evaluate(() => {
      window.f12refs.errorDocument =
        document.querySelector('.workspace iframe').srcdoc
    })
    await page.locator('.interface-language button').click()
    check(
      'Runtime error status translates',
      await page.locator('.preview-status').textContent(),
      'Runtime error',
    )
    check(
      'Error heading translates',
      await page.locator('.preview-error strong').textContent(),
      'Check your code',
    )
    check(
      'Error help translates',
      await page.locator('.preview-error p').textContent(),
      'Edit the code to run it again. Your notes will be kept.',
    )
    check(
      'Raw runtime error preserved',
      await page.locator('.preview-error pre').textContent(),
      'F12 raw error',
    )
    check(
      'Error frame preserved on language switch',
      await page.evaluate(
        () =>
          document.querySelector('.workspace iframe').srcdoc ===
          window.f12refs.errorDocument,
      ),
    )
    check(
      'Sandbox preserved',
      await page.locator('.workspace iframe').getAttribute('sandbox'),
      'allow-scripts',
    )
    check(
      'No framework overlay',
      await page.locator('vite-error-overlay').count(),
      0,
    )
    return { url: page.url(), title: await page.title(), results }
  } catch (error) {
    throw new Error(
      error.message +
        ' | issues: ' +
        (await page.locator('.code-issues').allTextContents()) +
        ' | preview: ' +
        (await page.locator('.preview-status').textContent()),
    )
  } finally {
    await restore()
  }
}

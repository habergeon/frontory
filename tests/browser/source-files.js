;async (
  page,
  baseUrl = (typeof process !== 'undefined' && process.env.FRONTORY_TEST_URL) ||
    'http://web-gl-study.orca.localhost:59226',
) => {
  const context = await page.context().browser().newContext()
  const testPage = await context.newPage()
  const errors = []
  testPage.on('pageerror', (error) => errors.push(error.message))
  const results = []
  const check = (name, condition) => {
    if (!condition) throw Error(name)
    results.push(name)
  }
  const setFile = async (file, value) => {
    await testPage.locator('#file-tab-' + file).click()
    await testPage.evaluate(
      async ({ file, value }) => {
        const { monaco } = await import('/src/editor/monaco.ts')
        const model = monaco.editor
          .getModels()
          .find((m) => m.uri.path.includes('/' + file + '/'))
        model.setValue(value)
      },
      { file, value },
    )
  }
  try {
    await testPage.setViewportSize({ width: 1440, height: 1000 })
    await testPage.goto(baseUrl + '/#html-01')
    await testPage.waitForFunction(
      () =>
        document.querySelector('.preview-status')?.textContent === '실행 중',
    )
    check(
      'three source file tabs',
      (await testPage.locator('.source-file-tabs button').count()) === 3,
    )
    await testPage.waitForFunction(async () => {
      const { monaco } = await import('/src/editor/monaco.ts')
      return monaco.editor
        .getModels()
        .some(
          (model) =>
            model.uri.path.includes('/html/') &&
            model.getValue().includes('\n  <header>'),
        )
    })
    check('HTML opens with nested indentation', true)
    check(
      'opening and initial formatting do not save',
      await testPage.evaluate(
        () => localStorage.getItem('web-gl-study:unit:v1:html-01') === null,
      ),
    )
    await testPage.locator('#tab-code').evaluate((el) => el.click())
    await setFile('html', '<button id="demo">Before</button>')
    await setFile('css', '#demo{color:rgb(1, 2, 3)}')
    await setFile(
      'javascript',
      'document.querySelector("#demo").textContent = "After"',
    )
    await testPage.waitForFunction(
      () =>
        document.querySelector('.preview-status')?.textContent === '실행 중',
    )
    await testPage
      .frameLocator('.workspace iframe')
      .locator('#demo')
      .filter({ hasText: 'After' })
      .waitFor()
    check('HTML and JS execute together', true)
    check(
      'CSS applies to HTML',
      (await testPage
        .frameLocator('.workspace iframe')
        .locator('#demo')
        .evaluate((el) => getComputedStyle(el).color)) === 'rgb(1, 2, 3)',
    )
    await testPage.reload()
    await testPage
      .frameLocator('.workspace iframe')
      .locator('#demo')
      .filter({ hasText: 'After' })
      .waitFor()
    check('all files survive reload', true)
    await testPage.locator('#tab-code').evaluate((el) => el.click())
    await setFile('css', '#demo{color:rgb(1, 2, 3)}')
    await testPage
      .getByRole('button', { name: '코드 정렬', exact: true })
      .click()
    await testPage.waitForFunction(() =>
      JSON.parse(
        localStorage.getItem('web-gl-study:unit:v1:html-01'),
      ).files.css.includes('color: rgb'),
    )
    check('CSS formatting works', true)
    await testPage.locator('#file-tab-javascript').click()
    await testPage.selectOption('#code-language', 'typescript')
    await setFile('javascript', 'const value: number = "bad"')
    await testPage.waitForSelector('#file-panel-javascript .code-issues')
    check(
      'invalid TS keeps last preview',
      (await testPage
        .frameLocator('.workspace iframe')
        .locator('#demo')
        .textContent()) === 'After',
    )
    await testPage.locator('#file-tab-html').focus()
    await testPage.keyboard.press('ArrowRight')
    check(
      'keyboard changes file tabs',
      (await testPage
        .locator('#file-tab-javascript')
        .getAttribute('aria-selected')) === 'true',
    )
    await testPage.locator('.notes-editor').evaluate((el) => {
      const set = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        'value',
      ).set
      set.call(el, 'Preserve my notes')
      el.dispatchEvent(new Event('input', { bubbles: true }))
    })
    await testPage
      .getByRole('button', { name: '원본 코드로', exact: true })
      .click()
    const beforeReset = await testPage.evaluate(async () => {
      const { monaco } = await import('/src/editor/monaco.ts')
      return Object.fromEntries(
        monaco.editor
          .getModels()
          .filter((model) => model.uri.path.startsWith('/labs/'))
          .map((model) => [
            model.uri.path.split('/')[3],
            {
              id: model.id,
              code: model.getValue(),
              language: model.getLanguageId(),
            },
          ]),
      )
    })
    await testPage.locator('.reset-confirm button').first().click()
    await testPage
      .frameLocator('.workspace iframe')
      .getByRole('heading', { name: '나의 학습 카드', exact: true })
      .waitFor()
    check('reset restores separated original', true)
    check(
      'reset keeps notes',
      (await testPage.locator('.notes-editor').inputValue()) ===
        'Preserve my notes',
    )
    for (const file of ['html', 'css', 'javascript']) {
      await testPage.locator('#file-tab-' + file).click()
      await testPage
        .locator('#file-panel-' + file + ' .monaco-editor [role="textbox"]')
        .focus()
      await testPage.keyboard.press('Control+z')
      await testPage.waitForFunction(
        async ({ file, expected }) => {
          const { monaco } = await import('/src/editor/monaco.ts')
          const model = monaco.editor
            .getModels()
            .find((model) => model.uri.path.includes('/' + file + '/'))
          return (
            model?.id === expected.id &&
            model.getValue() === expected.code &&
            model.getLanguageId() === expected.language
          )
        },
        { file, expected: beforeReset[file] },
      )
    }
    check(
      'each restored file supports one native Undo, preserving models and script language',
      true,
    )
    check(
      'Undo keeps notes',
      (await testPage.locator('.notes-editor').inputValue()) ===
        'Preserve my notes',
    )
    for (const width of [320, 768, 1024, 1440]) {
      await testPage.setViewportSize({ width, height: 1000 })
      await testPage.locator('#tab-code').evaluate((el) => el.click())
      check(
        'tabs fit at ' + width,
        await testPage
          .locator('.source-file-tabs')
          .evaluate((el) => el.scrollWidth <= el.clientWidth),
      )
    }
    await testPage.evaluate(() =>
      localStorage.setItem(
        'web-gl-study:unit:v1:html-02',
        JSON.stringify({
          version: 1,
          language: 'html',
          code: '<p id="native">Native</p><script type="module">document.querySelector("#native").textContent="JS"</script>',
          notes: '',
          updatedAt: '',
        }),
      ),
    )
    await testPage.goto(baseUrl + '/?sourceFilesTest=1#html-02')
    await testPage.reload()
    await testPage
      .frameLocator('.workspace iframe')
      .locator('#native')
      .filter({ hasText: 'JS' })
      .waitFor()
    await testPage.locator('#tab-code').evaluate((el) => el.click())
    await testPage.locator('#file-tab-javascript').click()
    await testPage.selectOption('#code-language', 'typescript')
    await setFile(
      'javascript',
      'const label: string = "TS"; document.querySelector("#native").textContent = label',
    )
    await testPage
      .frameLocator('.workspace iframe')
      .locator('#native')
      .filter({ hasText: 'TS' })
      .waitFor()
    await testPage.reload()
    await testPage
      .frameLocator('.workspace iframe')
      .locator('#native')
      .filter({ hasText: 'TS' })
      .waitFor()
    check('native HTML preserves TypeScript across reload', true)
    await testPage.goto(baseUrl + '/#css-01')
    await testPage.waitForFunction(async () => {
      const { monaco } = await import('/src/editor/monaco.ts')
      return monaco.editor
        .getModels()
        .some(
          (model) =>
            model.uri.path.includes('/css/') &&
            model.getValue().includes('grid-template-columns: '),
        )
    })
    check('CSS opens with automatic formatting', true)
    check(
      'CSS initial formatting does not save',
      await testPage.evaluate(
        () => localStorage.getItem('web-gl-study:unit:v1:css-01') === null,
      ),
    )
    await testPage.locator('#tab-code').evaluate((el) => el.click())
    await setFile('css', '.cards{color:')
    await testPage
      .getByRole('button', { name: '코드 정렬', exact: true })
      .click()
    await testPage.locator('#file-panel-css .format-error').waitFor()
    check(
      'invalid CSS is preserved after failed format',
      (await testPage.evaluate(
        () =>
          JSON.parse(localStorage.getItem('web-gl-study:unit:v1:css-01')).files
            .css,
      )) === '.cards{color:',
    )
    await testPage.locator('#file-tab-javascript').click()
    await testPage
      .getByRole('button', { name: '원본 코드로', exact: true })
      .click()
    await testPage.locator('.reset-confirm button').first().click()
    await testPage.waitForFunction(
      () =>
        document
          .querySelector('#file-tab-html')
          ?.getAttribute('aria-selected') === 'true',
    )
    check('restoring an HTML-based legacy example selects HTML', true)
    await testPage.waitForFunction(() =>
      JSON.parse(
        localStorage.getItem('web-gl-study:unit:v1:css-01'),
      ).files.css.includes('grid-template-columns'),
    )
    check(
      'restore recovers original CSS without adding a format Undo entry',
      true,
    )
    await setFile(
      'javascript',
      'const message="format me";console.log(message)',
    )
    await testPage
      .getByRole('button', { name: '코드 정렬', exact: true })
      .click()
    await testPage.waitForFunction(() =>
      JSON.parse(
        localStorage.getItem('web-gl-study:unit:v1:css-01'),
      ).files.javascript.includes("const message = 'format me'"),
    )
    check('JavaScript manual formatting remains available', true)
    check(
      'all editor models use two-space indentation',
      await testPage.evaluate(async () => {
        const { monaco } = await import('/src/editor/monaco.ts')
        return monaco.editor
          .getModels()
          .filter((model) => model.uri.path.startsWith('/labs/'))
          .every((model) => {
            const options = model.getOptions()
            return (
              options.tabSize === 2 &&
              options.indentSize === 2 &&
              options.insertSpaces
            )
          })
      }),
    )
    const compactCss = 'h1{--raw: a  b  ;color:red}'
    await setFile('css', compactCss)
    await testPage
      .locator('#file-panel-css .monaco-editor [role="textbox"]')
      .focus()
    await testPage.keyboard.press('Shift+Alt+F')
    await testPage.waitForFunction(() =>
      JSON.parse(
        localStorage.getItem('web-gl-study:unit:v1:css-01'),
      ).files.css.includes('color: red'),
    )
    check(
      'CSS keyboard format preserves custom property spacing',
      await testPage.evaluate(() =>
        JSON.parse(
          localStorage.getItem('web-gl-study:unit:v1:css-01'),
        ).files.css.includes('--raw: a  b  ;'),
      ),
    )
    await testPage.keyboard.press('Control+z')
    await testPage.waitForFunction(
      (raw) =>
        JSON.parse(localStorage.getItem('web-gl-study:unit:v1:css-01')).files
          .css === raw,
      compactCss,
    )
    await testPage.keyboard.press('Control+y')
    await testPage.waitForFunction(() =>
      JSON.parse(
        localStorage.getItem('web-gl-study:unit:v1:css-01'),
      ).files.css.includes('color: red'),
    )
    check('CSS keyboard formatting supports Undo and Redo', true)
    await testPage.evaluate(async () => {
      const { monaco } = await import('/src/editor/monaco.ts')
      const model = monaco.editor
        .getModels()
        .find((item) => item.uri.path.includes('/css/'))
      model.setValue('.before{color:red}')
      ;[...document.querySelectorAll('#panel-code button')]
        .find((button) => button.textContent === '코드 정렬')
        .click()
      model.setValue('.latest{color:blue}')
    })
    await testPage.waitForTimeout(500)
    check(
      'format in flight does not overwrite a newer edit',
      (await testPage.evaluate(
        () =>
          JSON.parse(localStorage.getItem('web-gl-study:unit:v1:css-01')).files
            .css,
      )) === '.latest{color:blue}',
    )
    await testPage.setViewportSize({ width: 390, height: 900 })
    await testPage.goto(baseUrl + '/#threejs-01')
    await testPage.waitForSelector('.source-file-tabs', { state: 'attached' })
    await testPage
      .locator('.lesson-learning summary')
      .filter({ hasText: '시작 코드' })
      .click()
    await testPage
      .getByRole('button', { name: '이 코드로 실습하기', exact: true })
      .first()
      .click()
    await testPage
      .getByRole('button', { name: '코드 교체', exact: true })
      .click()
    await testPage.waitForFunction(
      () => document.activeElement?.id === 'panel-code',
    )
    await testPage.locator('#file-tab-html[aria-selected="true"]').waitFor()
    check(
      'reading example opens HTML and focuses the code panel on mobile',
      true,
    )
    check('no browser errors', errors.length === 0)
    return { results, errors }
  } finally {
    await context.close()
  }
}

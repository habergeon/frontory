;async (page) => {
  const results = []
  const check = (name, value) => {
    results.push({ name, ok: value })
    if (!value) throw Error(name)
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  for (const id of [
    'javascript-step-02',
    'css-step-04',
    'react-step-03',
    'gsap-step-02',
    '01-scene',
    'javascript-01',
  ]) {
    await page.goto('http://127.0.0.1:4185/en/#' + id)
    await page.waitForSelector('.monaco-editor')
    const before = await page.evaluate(() =>
      JSON.stringify(
        Object.keys(localStorage)
          .sort()
          .map((key) => [key, localStorage.getItem(key)]),
      ),
    )
    const link = page.getByRole('link', {
      name: 'Download source with English comments · for reading',
    })
    check(
      id + ' exact download path',
      (await link.getAttribute('href')) ===
        '/examples-en/' + id + '/example.js',
    )
    const response = await page.request.get(
      new URL(await link.getAttribute('href'), page.url()).href,
    )
    check(id + ' reading source exists', response.status() === 200)
    check(
      id + ' English comment header',
      !/[가-힣]/.test((await response.text()).split('\n')[0]),
    )
    const event = page.waitForEvent('download')
    await link.click()
    check(
      id + ' actual download',
      (await event).suggestedFilename() === 'example.js',
    )
    check(
      id + ' all storage bytes unchanged',
      before ===
        (await page.evaluate(() =>
          JSON.stringify(
            Object.keys(localStorage)
              .sort()
              .map((key) => [key, localStorage.getItem(key)]),
          ),
        )),
    )
  }
  await page.goto('http://127.0.0.1:4185/en/#javascript-step-02')
  await page.waitForSelector('.monaco-editor')
  const original = await page.evaluate(() =>
    Object.fromEntries(
      Object.keys(localStorage).map((key) => [key, localStorage.getItem(key)]),
    ),
  )
  try {
    await page.locator('.notes-editor').fill('F13 edited notes 한글 😀')
    await page.locator('.monaco-editor [role="textbox"]').focus()
    await page.keyboard.press('Control+End')
    await page.keyboard.insertText(
      '\n// F13 reading download must preserve this draft',
    )
    await page.waitForFunction(() =>
      JSON.parse(
        localStorage.getItem('web-gl-study:unit:v1:javascript-step-02'),
      ).code.includes('F13 reading download must preserve this draft'),
    )
    const before = await page.evaluate(() => {
      window.f13refs = {
        editor: document.querySelector('.monaco-editor'),
        frame: document.querySelector('.workspace iframe'),
      }
      return JSON.stringify(
        Object.keys(localStorage)
          .sort()
          .map((key) => [key, localStorage.getItem(key)]),
      )
    })
    const event = page.waitForEvent('download')
    await page
      .getByRole('link', {
        name: 'Download source with English comments · for reading',
      })
      .click()
    await event
    check(
      'edited code, notes, progress and ISO time remain byte-identical',
      before ===
        (await page.evaluate(() =>
          JSON.stringify(
            Object.keys(localStorage)
              .sort()
              .map((key) => [key, localStorage.getItem(key)]),
          ),
        )),
    )
    check(
      'edited notes stay in editor',
      (await page.locator('.notes-editor').inputValue()) ===
        'F13 edited notes 한글 😀',
    )
    check(
      'Monaco and running frame stay mounted',
      await page.evaluate(
        () =>
          window.f13refs.editor === document.querySelector('.monaco-editor') &&
          window.f13refs.frame === document.querySelector('.workspace iframe'),
      ),
    )
    check(
      'no framework overlay',
      (await page.locator('vite-error-overlay').count()) === 0,
    )
    return { url: page.url(), title: await page.title(), results }
  } finally {
    await page.evaluate((original) => {
      for (const key of Object.keys(localStorage))
        if (!(key in original)) localStorage.removeItem(key)
      for (const [key, value] of Object.entries(original))
        localStorage.setItem(key, value)
    }, original)
    await page.reload()
  }
}

// Uses the normal built preview, not the injected development iframe harness.
async page => {
  const context = await page.context().browser().newContext({ viewport: { width: 1280, height: 1000 } })
  const app = await context.newPage()
  const results = []
  const consoleMessages = []
  const runtimeErrors = []
  app.on('console', entry => { if (['error', 'warning'].includes(entry.type())) consoleMessages.push({ type: entry.type(), text: entry.text() }) })
  app.on('pageerror', entry => runtimeErrors.push(entry.message))
  const check = (name, value) => { results.push({ name, ok: value }); if (!value) throw Error(name) }
  try {
    await app.goto('http://127.0.0.1:4186/en/')
    await app.locator('.home-series-row').first().waitFor()
    check('Direct /en/ renders actual app', app.url().endsWith('/en/') && await app.locator('html').getAttribute('lang') === 'en' && await app.title() === 'Frontory')
    check('Direct /en/ has four published series', await app.locator('.home-series-row').count() === 4)
    await app.reload()
    await app.locator('.home-series-row').first().waitFor()
    check('Refresh keeps real English app', await app.locator('html').getAttribute('lang') === 'en' && await app.locator('.home-series-row').count() === 4)
    await app.goto('http://127.0.0.1:4186/en/learn/javascript/javascript-step-02/')
    check('English public document loads', await app.locator('h1').innerText() === 'JavaScript · 02 String input and number conversion')
    await app.locator('.launch a').first().click()
    await app.locator('.monaco-editor').waitFor()
    check('Public document opens practice stable ID', app.url().endsWith('/en/#javascript-step-02'))
    await app.locator('.notes-editor').fill('F17 production entry 한국어 😀')
    const before = await app.evaluate(() => JSON.stringify(Object.entries(localStorage)))
    await app.locator('.interface-language button').click()
    check('Production locale switch to ko', app.url().endsWith('/#javascript-step-02'))
    await app.goBack()
    check('Production back restores en same unit', app.url().endsWith('/en/#javascript-step-02'))
    check('Production switch and back preserve bytes', before === await app.evaluate(() => JSON.stringify(Object.entries(localStorage))))
    await app.reload()
    await app.locator('.notes-editor').waitFor()
    check('Practice direct refresh preserves edited notes', await app.locator('.notes-editor').inputValue() === 'F17 production entry 한국어 😀')
    await app.locator('a[href="/en/learn/javascript/javascript-step-02/"]').click()
    check('Practice returns to English public document', app.url().endsWith('/en/learn/javascript/javascript-step-02/') && (await app.locator('h1').innerText()).includes('String input'))
    const missing = await app.goto('http://127.0.0.1:4186/en/learn/vue/')
    check('Unavailable public English URL is real 404', missing.status() === 404 && await app.locator('html').getAttribute('lang') === 'en' && !/[가-힣]/.test(await app.locator('body').innerText()))
    check('No framework overlay', await app.locator('vite-error-overlay').count() === 0)
    check('No uncaught runtime errors', runtimeErrors.length === 0)
    return { results, consoleMessages, runtimeErrors }
  } finally { await context.close() }
}

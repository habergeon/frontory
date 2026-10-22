async page => {
  const results = []
  const check = (name, actual) => { results.push({ name, ok: actual }); if (!actual) throw Error(name) }
  for (const fixture of ['blocked-read', 'blocked-write', 'corrupt-unit', 'corrupt-snapshot']) {
    const context = await page.context().browser().newContext()
    const app = await context.newPage()
    const runtimeErrors = []
    app.on('pageerror', error => runtimeErrors.push(error.message))
    try {
      await context.addInitScript(fixture => {
        if (fixture === 'corrupt-unit') localStorage.setItem('web-gl-study:unit:v1:javascript-step-02', '{broken')
        if (fixture === 'corrupt-snapshot') localStorage.setItem('web-gl-study:all:v1', '{broken')
        if (fixture.startsWith('blocked')) {
          const method = fixture === 'blocked-read' ? 'getItem' : 'setItem'
          const descriptor = Object.getOwnPropertyDescriptor(Storage.prototype, method)
          window.restoreFixtureStorage = () => Object.defineProperty(Storage.prototype, method, descriptor)
          Object.defineProperty(Storage.prototype, method, { configurable: true, value() { throw new DOMException('F17 intentional storage denial', 'SecurityError') } })
        }
      }, fixture)
      await app.goto('http://127.0.0.1:4185/en/#javascript-step-02')
      await app.waitForSelector('.notes-editor')
      if (fixture !== 'blocked-write') await app.locator('.storage-warning').waitFor()
      await app.locator('.notes-editor').fill('unsaved ' + fixture + ' 한글 😀')
      if (fixture === 'corrupt-unit') {
        check('Corrupt unit recovers through actual edit', await app.locator('.storage-warning').count() === 0 && await app.evaluate(() => JSON.parse(localStorage.getItem('web-gl-study:unit:v1:javascript-step-02')).notes === 'unsaved corrupt-unit 한글 😀'))
        check(fixture + ' no uncaught runtime error', runtimeErrors.length === 0)
        continue
      }
      await app.locator('.storage-warning').waitFor()
      check(fixture + ' visible English warning', (await app.locator('.storage-warning').innerText()).includes('sav'))
      const before = await app.evaluate(() => JSON.stringify(Object.keys(localStorage).map(key => [key, localStorage[key]])))
      await app.locator('.interface-language button').click()
      check(fixture + ' warning translates Korean', /[가-힣]/.test(await app.locator('.storage-warning').innerText()))
      check(fixture + ' in-memory notes preserved', await app.locator('.notes-editor').inputValue() === 'unsaved ' + fixture + ' 한글 😀')
      check(fixture + ' locale does not write corrupted storage', before === await app.evaluate(() => JSON.stringify(Object.keys(localStorage).map(key => [key, localStorage[key]]))))
      if (fixture === 'blocked-write') {
        await app.evaluate(() => window.restoreFixtureStorage())
        await app.locator('.storage-warning button').click()
        check('Retry saves after storage recovers', await app.locator('.storage-warning').count() === 0 && await app.evaluate(() => JSON.parse(localStorage.getItem('web-gl-study:unit:v1:javascript-step-02')).notes === 'unsaved blocked-write 한글 😀'))
      }
      check(fixture + ' no uncaught runtime error', runtimeErrors.length === 0)
    } catch (error) { throw Error(fixture + ': ' + error.message) }
    finally { await context.close() }
  }
  return { results }
}

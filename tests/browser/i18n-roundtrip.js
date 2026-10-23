// Run through Playwright browser_run_code_unsafe. Each scenario owns its storage.
async page => {
  const results = []
  const check = (name, actual, expected = true) => {
    results.push({ name, actual, expected, ok: actual === expected })
    if (actual !== expected) throw Error(name + ': ' + JSON.stringify(actual))
  }
  const browser = page.context().browser()
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } })
  const app = await context.newPage()
  const errors = []
  app.on('pageerror', error => errors.push(error.message))
  const storage = () => app.evaluate(() => JSON.stringify(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])))
  const open = async (url = 'http://127.0.0.1:4185/en/#javascript-step-02') => {
    await app.goto(url)
    await app.waitForSelector('.monaco-editor')
  }
  const upload = async backup => {
    await app.locator('input[type=file]').setInputFiles({ name: 'fixture.json', mimeType: 'application/json', buffer: Buffer.from(typeof backup === 'string' ? backup : JSON.stringify(backup)) })
  }
  try {
    await open()
    await app.locator('.notes-editor').fill('![F17 image](fixture.png)\n\n한국어 English 😀')
    await app.locator('.learning-status button').nth(2).click()
    const saved = await storage()
    check('UI saves notes progress and ISO time', await app.evaluate(() => {
      const draft = JSON.parse(localStorage.getItem('web-gl-study:unit:v1:javascript-step-02'))
      return draft.notes.includes('한국어 English 😀') && draft.progress === 'completed' && Number.isFinite(Date.parse(draft.updatedAt))
    }))
    await app.locator('.notes-toolbar button').nth(1).click()
    check('English note image placeholder', (await app.locator('.image-placeholder').innerText()).includes('external images'))
    for (const locale of ['ko', 'en']) {
      await app.locator('.interface-language button').click()
      check(locale + ' note preview language', await app.locator('html').getAttribute('lang'), locale)
      check(locale + ' switch preserves every storage byte', await storage() === saved)
    }
    await app.locator('.notes-toolbar button').first().click()
    await app.locator('.notes-editor').fill('')
    await app.reload()
    await app.waitForSelector('.notes-editor')
    check('Intentionally empty notes survive reload', await app.locator('.notes-editor').inputValue(), '')
    await app.locator('.backup-disclosure summary').click()
    const downloading = app.waitForEvent('download')
    await app.locator('.backup-toolbar button').first().click()
    const download = await downloading
    const chunks = []
    for await (const chunk of await download.createReadStream()) chunks.push(chunk)
    const backup = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    check('UI exports version 3', backup.version, 3)
    check('UI exports complete stable catalog', backup.units.length, 644)
    const beforeImport = await storage()
    await upload('{broken')
    await app.locator('.backup-controls [role=alert]').waitFor()
    check('Malformed JSON does not write', await storage() === beforeImport)
    await upload(backup)
    await app.locator('.backup-confirm').waitFor()
    await app.locator('.backup-confirm button').last().click()
    check('Cancel restore does not write', await storage() === beforeImport)
    await upload(backup)
    await app.locator('.backup-confirm button').first().click()
    await app.waitForSelector('.monaco-editor')
    check('v3 restores code notes progress ISO language exactly', await app.evaluate(entries => {
      const snapshot = JSON.parse(localStorage.getItem('web-gl-study:all:v1'))
      return entries.every(({ id, draft }) => ['code', 'notes', 'progress', 'updatedAt', 'language'].every(key => snapshot[id][key] === draft[key]))
    }, backup.units))
    const ids = await app.evaluate(async () => {
      const { legacyUnitIds, v2UnitIds } = await import('/src/app/curriculum.ts')
      return { legacyUnitIds, v2UnitIds }
    })
    // Historical catalogs are fixture data; restoring still uses the visible UI.
    for (const version of [1, 2]) {
      const wanted = version === 1 ? ids.legacyUnitIds : ids.v2UnitIds
      const legacy = { ...backup, version, format: version === 1 ? 'web-gl-study' : 'frontory', selectedUnitId: wanted[0], units: backup.units.filter(entry => wanted.includes(entry.id)).map(entry => ({ ...entry, draft: { ...entry.draft, notes: 'legacy-' + version + ' 한글 😀', progress: 'completed' } })) }
      const newerId = backup.units.find(entry => !wanted.includes(entry.id)).id
      const newer = await app.evaluate(id => ({ id, draft: JSON.parse(localStorage.getItem('web-gl-study:all:v1'))[id] }), newerId)
      await upload(legacy)
      await app.locator('.backup-confirm button').first().click()
      await app.waitForSelector('.notes-editor')
      check('v' + version + ' restores legacy notes in actual UI', await app.locator('.notes-editor').inputValue(), 'legacy-' + version + ' 한글 😀')
      check('v' + version + ' preserves newer unit bytes', await app.evaluate(({ id, draft }) => JSON.stringify(JSON.parse(localStorage.getItem('web-gl-study:all:v1'))[id]) === JSON.stringify(draft), newer))
    }
    await open()
    for (const locale of ['en', 'ko']) {
      if (await app.locator('html').getAttribute('lang') !== locale) await app.locator('.interface-language button').click()
      for (const width of [320, 375, 768, 1280]) {
        await app.setViewportSize({ width, height: 1000 })
        await app.locator('.practice-guide table').waitFor()
        check(locale + ' ' + width + ' document does not overflow', await app.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
        check(locale + ' ' + width + ' header/footer/button bounds', await app.locator('.app-header, .app-footer, .practice-guide footer button').evaluateAll(elements => elements.every(element => { const rect = element.getBoundingClientRect(); return rect.left >= 0 && rect.right <= innerWidth })))
        if (locale === 'en') check('English ' + width + ' table columns readable', await app.locator('.practice-guide th').evaluateAll(elements => elements.every(element => element.getBoundingClientRect().width >= 99)))
        check(locale + ' ' + width + ' code uses internal scrolling', await app.locator('.practice-guide pre').evaluateAll(elements => elements.every(element => getComputedStyle(element).overflowX === 'auto')))
      }
    }
    await app.setViewportSize({ width: 1280, height: 1000 })
    await app.locator('.interface-language button').click()
    const trigger = app.locator('.current-lesson-actions button').first()
    await trigger.focus()
    await app.keyboard.press('Enter')
    await app.locator('.document-reader article h1').waitFor()
    check('Dialog accessible name', await app.locator('.document-reader').getAttribute('aria-labelledby'), 'document-title')
    check('Reader initially receives focus', await app.evaluate(() => document.activeElement === document.querySelector('.document-reader')))
    await app.keyboard.press('Shift+Tab')
    check('Nonmodal reader permits keyboard access to practice', await app.evaluate(() => document.querySelector('.practice-pane').contains(document.activeElement) && !document.querySelector('dialog:modal')))
    // Start competing requests via the actual document navigation buttons.
    await app.locator('.document-nav button').nth(1).click()
    await app.locator('.document-nav button').nth(2).click()
    await app.locator('.document-nav button').first().click()
    await app.waitForFunction(() => document.querySelector('.document-reader article h1')?.textContent.includes('String input'))
    check('Rapid navigation shows final requested document', (await app.locator('.document-reader article h1').innerText()).includes('String input'))
    await app.keyboard.press('Escape')
    check('Escape closes dialog', await app.locator('.document-reader').count(), 0)
    check('Focus restored to document trigger', await trigger.evaluate(element => document.activeElement === element))
    check('No framework overlay', await app.locator('vite-error-overlay').count(), 0)
    check('No application runtime errors', errors.length, 0)
    return { results, runtimeErrors: errors }
  } finally { await context.close() }
}

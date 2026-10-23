async (page, baseUrl = 'http://127.0.0.1:4187') => {
  const checks = []
  const measurements = []
  const check = (name, ok) => { checks.push({ name, ok }); if (!ok) throw new Error(name) }
  await page.addInitScript(() => {
    if (window !== window.top) return
    const key = 'web-gl-study:unit:v1:html-step-08'
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({ version: 1, code: 'export function mount({ container }) { container.textContent = "Preserved HTML draft"; return () => {} }', notes: '# 이어갈 HTML 필기\n\nKeep my notes.', updatedAt: '2026-10-22T10:00:00.000Z', progress: 'in-progress', language: 'javascript' }))
  })
  const home = () => page.locator('.learning-header .header-navigation>a').click()
  const records = () => page.evaluate(() => JSON.stringify({ ...localStorage }))
  for (const locale of ['ko', 'en']) for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
    await page.goto(baseUrl + (locale === 'en' ? '/en/' : '/') + '?home=entry', { waitUntil: 'domcontentloaded' })
    await page.waitForFunction(() => document.readyState === 'complete')
    await page.waitForSelector('.home-start-row')
    const stored = await records()
    const geometry = await page.locator('.home-hero-action .home-primary').evaluate(button => {
      const rect = button.getBoundingClientRect()
      return { top: rect.top, bottom: rect.bottom, right: rect.right, viewport: innerWidth, documentWidth: document.documentElement.scrollWidth, firstViewport: rect.top >= 0 && rect.bottom <= innerHeight, overflow: document.documentElement.scrollWidth > innerWidth }
    })
    measurements.push({ locale, width, ...geometry })
    check(locale + ' ' + width + ' first HTML CTA in initial viewport', geometry.firstViewport)
    check(locale + ' ' + width + ' no horizontal overflow', !geometry.overflow)
    check('recommended route explicitly ordered', JSON.stringify(await page.locator('.home-start-topic h3').allTextContents()) === JSON.stringify(['HTML','CSS','JavaScript']))
    check('recommended route does not hide catalog', await page.locator('.home-series-list>.home-series-row').count() === 23)
    const expected = await page.evaluate(async locale => {
      const { getCatalog } = await import('/src/app/curriculum.ts')
      const { messages } = await import('/src/i18n/messages.ts')
      const catalog = getCatalog(locale)
      return { unitTitles: Object.fromEntries(catalog.units.filter(unit => ['html-01','css-01','javascript-01','html-step-08'].includes(unit.id)).map(unit => [unit.id,unit.title])), prerequisites: ['html','css','javascript'].map(id => catalog.series.find(item => item.id === id).prerequisites), links: catalog.series.map(item => (locale === 'en' ? '/en' : '') + '/learn/' + item.id + '/'), framework: messages[locale].categoryFrameworks }
    }, locale)
    const prerequisites = await page.locator('.home-start-prerequisite').allTextContents()
    check('reviewed entry prerequisites shown from catalog', prerequisites.every((text,index) => text.endsWith(expected.prerequisites[index])))
    check('all interest-series links preserved', JSON.stringify(await page.locator('.home-series-list h3 a').evaluateAll(links => links.map(link => link.getAttribute('href')))) === JSON.stringify(expected.links))
    await page.locator('.home-hero-action .home-primary').click()
    await page.waitForFunction(() => location.hash === '#html-01')
    check('hero starts html-01 even with an ongoing later HTML unit', page.url().endsWith('?home=entry#html-01'))
    check('hero renders the first HTML unit', await page.locator('.current-lesson h2').textContent() === expected.unitTitles['html-01'])
    check('hero preserves existing code notes progress and timestamp', await records() === stored)
    await home()
    for (const [index,id] of ['html-01','css-01','javascript-01'].entries()) {
      await page.locator('.home-start-row button').nth(index).click()
      await page.waitForFunction(id => location.hash === '#' + id, id)
      check(locale + ' ' + width + ' recommendation opens ' + id, await records() === stored && await page.locator('.current-lesson h2').textContent() === expected.unitTitles[id])
      await home()
    }
    const htmlRow = page.locator('.home-series-list>.home-series-row').filter({ has: page.getByRole('heading', { level: 3, name: 'HTML', exact: true }) })
    await htmlRow.locator('button').click()
    await page.waitForFunction(() => location.hash === '#html-step-08')
    check('original HTML series action resumes ongoing unit', await records() === stored && await page.locator('.current-lesson h2').textContent() === expected.unitTitles['html-step-08'])
    await home()
    await page.locator('.home-catalog input').fill('CSS')
    check('search filters existing catalog and keeps recommendations', await page.locator('.home-series-list>.home-series-row').count() < 23 && await page.locator('.home-start-row').count() === 3)
    await page.locator('.home-catalog input').fill('')
    await page.getByRole('button', { name: expected.framework, exact: true }).click()
    check('interest category remains usable', await page.locator('.home-series-list>.home-series-row').count() === 3)
    await page.locator('.home-filters button').first().click()
    check('all 23 series return after resetting category', await page.locator('.home-series-list>.home-series-row').count() === 23)
    check('home interactions preserve storage bytes', await records() === stored)
    check('no framework overlay', await page.locator('vite-error-overlay').count() === 0)
  }
  return { checks, measurements }
}

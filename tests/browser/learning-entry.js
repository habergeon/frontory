async (page, baseUrl = 'http://127.0.0.1:4187') => {
  const checks = []
  const measurements = []
  const check = (name, ok) => { checks.push({ name, ok }); if (!ok) throw new Error(name) }
  const practice = page.locator('.current-lesson-actions button').last()
  await page.addInitScript(() => {
    if (window !== window.top) return
    const key = 'web-gl-study:unit:v1:javascript-01'
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({ version: 1, code: 'export function mount(container) { container.textContent = "L02 saved code"; return () => {} }', notes: '# 기존 한국어 필기\n\nKeep this draft.', updatedAt: '2026-10-22T10:00:00.000Z', progress: 'completed', language: 'javascript' }))
  })
  const assertEntry = async name => {
    await page.waitForFunction(() => !document.querySelector('.current-lesson-actions button:last-child')?.disabled)
    await page.evaluate(() => window.scrollTo(0, 0))
    const result = await page.locator('.current-lesson').evaluate(element => {
      const bounds = [...element.querySelectorAll('h2,p,button')].map(item => { const rect = item.getBoundingClientRect(); return { text: item.textContent, top: rect.top, bottom: rect.bottom } })
      return { bounds, clear: bounds.every(rect => rect.top >= 0 && rect.bottom <= innerHeight), overflow: document.documentElement.scrollWidth > innerWidth }
    })
    measurements.push({ name, ...result })
    check(name + ' title goal and two CTAs in first viewport', result.clear && !result.overflow)
  }
  const assertCodeFocus = async name => {
    await practice.click()
    await page.waitForFunction(() => document.activeElement?.id === 'panel-code')
    check(name + ' code panel selected and focused below sticky header', await page.locator('#panel-code').evaluate(panel => panel.classList.contains('mobile-active') && panel.getBoundingClientRect().top >= document.querySelector('.learning-header').getBoundingClientRect().bottom))
  }
  for (const locale of ['ko', 'en']) for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
    await page.goto(baseUrl + (locale === 'en' ? '/en/' : '/') + '?l02=entry#javascript-01')
    await assertEntry(locale + ' ' + width)
    check('outline collapsed initially', await page.locator('.journey-outline').getAttribute('open') === null)
    check('two matching pagination controls', await page.locator('.unit-pagination').count() === 2 && await page.locator('.unit-pagination button:first-child:disabled').count() === 2)
    await page.waitForSelector('.monaco-editor', { state: 'attached' })
    await page.waitForSelector('.workspace iframe', { state: 'attached' })
    await page.evaluate(async () => {
      const { monaco } = await import('/src/editor/monaco.ts')
      const editor = monaco.editor.getEditors()[0]
      window.l02 = { editor, model: editor.getModel(), version: editor.getModel().getVersionId(), selection: JSON.stringify(editor.getSelection()), iframe: document.querySelector('.workspace iframe'), notes: document.querySelector('.notes-editor'), storage: JSON.stringify({ ...localStorage }) }
    })
    await assertCodeFocus('initial practice CTA')
    await page.locator('#tab-notes').evaluate(element => element.click())
    await assertCodeFocus('practice CTA from notes')
    await assertCodeFocus('practice CTA from code')
    await page.locator('.current-lesson-actions button').first().click()
    await page.waitForSelector('.document-dialog[open]')
    await page.keyboard.press('Escape')
    check('document close returns focus to read CTA', await page.locator('.current-lesson-actions button').first().evaluate(element => document.activeElement === element))
    await page.locator('.journey-outline summary').click()
    check('all stages and current seven units exposed', await page.locator('.stage-rail button').count() === 4 && await page.locator('.unit-grid button').count() === 7)
    await page.locator('.journey-outline summary').click()
    check('CTA document and outline preserve model frame notes and saved draft', await page.evaluate(() => {
      const before = window.l02
      return before.editor.getModel() === before.model && before.model.getVersionId() === before.version && JSON.stringify(before.editor.getSelection()) === before.selection && document.querySelector('.workspace iframe') === before.iframe && document.querySelector('.notes-editor') === before.notes && JSON.stringify({ ...localStorage }) === before.storage
    }))
    await page.locator('.app-shell>.unit-pagination button').last().click()
    await page.waitForFunction(() => location.hash === '#javascript-step-02')
    check('bottom next keeps locale and query', page.url().includes((locale === 'en' ? '/en/' : '/') + '?l02=entry#javascript-step-02'))
    await page.goBack()
    await page.waitForFunction(() => location.hash === '#javascript-01')
    check('history back restores first-unit disabled boundary', await page.locator('.unit-pagination button:first-child:disabled').count() === 2)
    await page.goForward()
    await page.waitForFunction(() => location.hash === '#javascript-step-02')
    await page.locator('.app-shell>.unit-pagination button').first().click()
    await page.waitForFunction(() => location.hash === '#javascript-01')
    check('saved progress still completed after history', await page.locator('.learning-status button[aria-pressed="true"]').textContent() === (locale === 'ko' ? '완료' : 'Completed'))
  }
  for (const locale of ['ko', 'en']) {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(baseUrl + (locale === 'en' ? '/en/' : '/') + '#javascript-01')
    const catalog = await page.evaluate(async locale => {
      const { getCatalog } = await import('/src/app/curriculum.ts')
      const { series, units } = getCatalog(locale)
      return {
        series: series.map(item => ({ id: item.id, title: item.title, phases: [1,2,3,4].map(week => units.filter(unit => unit.seriesId === item.id && unit.week === week).map(unit => ({ id: unit.id, title: unit.title }))) })),
        samples: [units.find(unit => unit.source === undefined), units.find(unit => unit.exampleMode === 'external' && unit.source !== undefined), units.reduce((longest, unit) => unit.goal.length > longest.goal.length ? unit : longest)].filter(Boolean).map(unit => ({ id: unit.id, source: unit.source !== undefined }))
      }
    }, locale)
    await page.locator('.journey-outline summary').click()
    for (const [seriesIndex, series] of catalog.series.entries()) {
      await page.locator('.journey-actions button').first().click()
      check(locale + ' catalog has 23 series', await page.locator('.series-card').count() === 23)
      await page.locator('.series-card').nth(seriesIndex).click()
      check(locale + ' ' + series.id + ' outline remains open', await page.locator('.journey-outline').getAttribute('open') !== null)
      for (const [phaseIndex, ids] of series.phases.entries()) {
        await page.locator('.stage-rail button').nth(phaseIndex).click()
        await page.waitForFunction(id => location.hash === '#' + id, ids[0].id)
        check(locale + ' ' + series.id + ' phase ' + (phaseIndex + 1) + ' exposes seven correct units', JSON.stringify(await page.locator('.unit-grid strong').allTextContents()) === JSON.stringify(ids.map(unit => unit.title)) && await page.locator('.unit-grid button[aria-current="page"]').count() === 1)
      }
      await page.locator('.unit-grid button').last().click()
      await page.waitForFunction(id => location.hash === '#' + id, series.phases[3][6].id)
      check(locale + ' ' + series.id + ' last-unit boundary in both paginations', await page.locator('.unit-pagination button:last-child:disabled').count() === 2 && await page.locator('.unit-pagination button:first-child:disabled').count() === 0)
      check(locale + ' ' + series.id + ' progress retains 28-unit total', await page.locator('.journey-progress progress').getAttribute('max') === '28')
    }
    for (const sample of catalog.samples) for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
      await page.goto(baseUrl + (locale === 'en' ? '/en/' : '/') + '#' + sample.id)
      await assertEntry(locale + ' ' + width + ' special lesson ' + sample.id)
      await assertCodeFocus(locale + ' ' + width + ' special lesson ' + sample.id)
      if (!sample.source) check('document-based practice keeps separate-project guidance', (await page.locator('#panel-code .empty-state').textContent()).includes(locale === 'ko' ? '별도 프로젝트' : 'separate project'))
    }
    check('no framework overlay', await page.locator('vite-error-overlay').count() === 0)
  }
  return { checks, measurements }
}

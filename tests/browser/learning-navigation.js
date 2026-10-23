async (page, baseUrl = 'http://127.0.0.1:4187') => {
  const checks = []
  const check = (name, ok) => { checks.push({ name, ok }); if (!ok) throw new Error(name) }
  for (const locale of ['ko', 'en']) {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(baseUrl + (locale === 'en' ? '/en/' : '/') + '?l01=continuity#javascript-01')
    await page.waitForSelector('.monaco-editor', { state: 'attached' })
    await page.waitForSelector('.workspace iframe', { state: 'attached' })
    await page.locator('#tab-notes').click()
    await page.locator('.notes-editor').fill('# L01 한국어 필기\n\nPreserve notes.')
    await page.locator('.learning-status button').nth(1).click()
    await page.locator('#tab-code').click()
    await page.locator('.monaco-editor [role="textbox"]').focus()
    await page.keyboard.press('Control+Home')
    await page.keyboard.insertText('// L01 keep code\n')
    await page.waitForFunction(() => /검사 통과|checks passed/.test(document.querySelector('.code-check-status').textContent))
    await page.evaluate(async () => {
      const { monaco } = await import('/src/editor/monaco.ts')
      const editor = monaco.editor.getEditors()[0]
      window.l01 = { editor, model: editor.getModel(), version: editor.getModel().getVersionId(), selection: JSON.stringify(editor.getSelection()), scrollTop: editor.getScrollTop(), scrollLeft: editor.getScrollLeft(), iframe: document.querySelector('.workspace iframe'), iframeDocument: document.querySelector('.workspace iframe').contentDocument, notes: document.querySelector('.notes-editor'), storage: JSON.stringify({ ...localStorage }) }
    })
    await page.locator('#tab-code').focus()
    for (const [key, selected] of [['ArrowRight', 'notes'], ['ArrowRight', 'result'], ['ArrowLeft', 'notes'], ['Home', 'result'], ['End', 'notes'], ['ArrowLeft', 'code']]) {
      await page.keyboard.press(key)
      check(locale + ' ' + key + ' focus/selection/panel', await page.evaluate(value => {
        const tab = document.getElementById('tab-' + value)
        const panel = document.getElementById(tab.getAttribute('aria-controls'))
        return document.activeElement === tab && tab.getAttribute('aria-selected') === 'true' && tab.tabIndex === 0 && document.querySelectorAll('.mobile-tabs [tabindex="0"]').length === 1 && panel.getAttribute('aria-labelledby') === tab.id && panel.getAttribute('role') === 'tabpanel' && getComputedStyle(panel).display !== 'none'
      }, selected))
    }
    await page.keyboard.press('Tab')
    check(locale + ' Tab enters selected panel', await page.evaluate(() => document.activeElement.id === 'panel-code'))
    await page.locator('#tab-notes').click()
    await page.locator('#panel-notes').scrollIntoViewIfNeeded()
    check(locale + ' compact sticky header', await page.locator('.learning-header').evaluate(header => header.getBoundingClientRect().top === 0 && header.getBoundingClientRect().height < 70))
    const anchor = await page.locator('.workspace').evaluate(element => element.getBoundingClientRect().top)
    await page.locator('.interface-language button').click()
    check(locale + ' language keeps query/hash', page.url().endsWith('?l01=continuity#javascript-01'))
    await page.waitForFunction(() => document.querySelector('#practice-guide-body')?.getAttribute('aria-busy') === 'false')
    await page.waitForTimeout(1000)
    check(locale + ' language keeps practice scroll context', Math.abs(await page.locator('.workspace').evaluate(element => element.getBoundingClientRect().top) - anchor) < await page.locator('.learning-header').evaluate(element => element.getBoundingClientRect().height))
    check(locale + ' navigation preserves state and mounted instances', await page.evaluate(() => {
      const before = window.l01
      return before.editor.getModel() === before.model && before.model.getVersionId() === before.version && before.editor.getScrollTop() === before.scrollTop && before.editor.getScrollLeft() === before.scrollLeft && JSON.stringify(before.editor.getSelection()) === before.selection && document.querySelector('.workspace iframe') === before.iframe && before.iframe.contentDocument === before.iframeDocument && document.querySelector('.notes-editor') === before.notes && JSON.stringify({ ...localStorage }) === before.storage && document.querySelector('#tab-notes').getAttribute('aria-selected') === 'true'
    }))
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
      await page.mouse.move(0, 0)
      for (const id of ['result', 'code', 'notes']) {
        const name = await page.locator('#tab-' + id).textContent()
        check(locale + ' accessible panel name ' + id + ' at ' + width, await page.getByRole('tabpanel', { name, exact: true }).count() === (width === 390 && id !== 'notes' ? 0 : 1))
      }
      check(locale + ' no overflow at ' + width, await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      check(locale + ' shared navigation style at ' + width, await page.locator('.header-navigation').evaluate(nav => {
        const styles = [...nav.querySelectorAll('.header-action')].map(element => { const style = getComputedStyle(element); return [style.border, style.borderRadius, style.backgroundColor, style.fontSize, style.lineHeight, style.padding].join('|') })
        return new Set(styles).size === 1
      }))
      for (const [key, from, target] of [['Tab', 0, 1], ['Shift+Tab', 1, 0]]) {
        await page.locator('.learning-status button').nth(from).focus()
        await page.evaluate(index => {
          const button = document.querySelectorAll('.learning-status button')[index]
          window.scrollBy(0, button.getBoundingClientRect().top - 12)
        }, target)
        await page.keyboard.press(key)
        check(locale + ' ' + key + ' focus clears sticky header at ' + width, await page.evaluate(index => {
          const button = document.querySelectorAll('.learning-status button')[index]
          const rect = button.getBoundingClientRect()
          const header = document.querySelector('.learning-header').getBoundingClientRect()
          const center = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
          return document.activeElement === button && rect.top >= header.bottom && (center === button || button.contains(center))
        }, target))
      }
    }
    await page.locator('.header-navigation a').first().click()
    await page.waitForSelector('.home-hero')
    check(locale + ' home anchor preserves locale/query', page.url().includes('?l01=continuity') && !page.url().includes('#javascript'))
    check(locale + ' home not sticky', await page.locator('.learning-header').count() === 0)
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.mouse.move(0, 0)
      check(locale + ' home no overflow at ' + width, await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      check(locale + ' home shared navigation style at ' + width, await page.locator('.header-navigation').evaluate(nav => {
        const controls = [...nav.querySelectorAll('.header-action')].filter(element => getComputedStyle(element).display !== 'none')
        return new Set(controls.map(element => { const style = getComputedStyle(element); return [style.border, style.borderRadius, style.backgroundColor, style.fontSize, style.padding].join('|') })).size === 1
      }))
    }
    check(locale + ' no framework overlay', await page.locator('vite-error-overlay').count() === 0)
  }
  return checks
}

// Playwright MCP: fetch this file from 4185, then evaluate its async function.
// The entry suite additionally needs the normal built preview on 4186.
async page => {
  const suites = []
  for (const name of ['i18n-roundtrip', 'i18n-storage', 'i18n-entry', 'workspace', 'preview', 'reading-source']) {
    const context = await page.context().browser().newContext()
    try {
      const app = await context.newPage()
      const source = await (await page.request.get('http://127.0.0.1:4185/tests/browser/' + name + '.js')).text()
      const result = await eval('(' + source + '\n)')(app)
      suites.push({ name, ...result, results: result.results.map(({ name, ok }) => ({ name, ok })) })
    } catch(error) { throw Error(name + ': ' + error) } finally { await context.close() }
  }
  for (const path of ['i18n.html', 'representative-lessons.html', 'representative-lessons.html?locale=en', 'expansion-contracts.html', 'expansion-contracts.html?locale=en']) {
    const context = await page.context().browser().newContext()
    try {
      if (path === 'i18n.html') await context.addInitScript(() => {
        const key = 'web-gl-study:unit:v1:javascript-step-02'
        if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({ version: 1, code: 'export function mount(){return()=>{}}', notes: 'F17 existing progress fixture', progress: 'completed', updatedAt: '2026-10-01T00:00:00.000Z' }))
      })
      const app = await context.newPage()
      await app.goto('http://127.0.0.1:4185/tests/browser/' + path)
      await app.waitForFunction(() => ['PASS', 'FAIL'].includes(document.querySelector('#state').textContent))
      const state = await app.locator('#state').innerText()
      const report = JSON.parse(await app.locator('#results').innerText())
      const { results } = report
      if (state !== 'PASS') throw Error(path + ': ' + JSON.stringify(results))
      suites.push({ name: path, ...report, results: results.filter(result => 'ok' in result).map(result => path.startsWith('expansion-contracts') ? result : { name: result.name, ok: result.ok }) })
    } finally { await context.close() }
  }
  return { userAgent: await page.evaluate(() => navigator.userAgent), suites, passed: suites.reduce((total, suite) => total + suite.results.filter(result => result.ok).length, 0) }
}

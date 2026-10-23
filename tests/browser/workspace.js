async page => {
  const results = []
  const check = (name, actual, expected = true) => { results.push({ name, actual, expected, ok: actual === expected }); if (actual !== expected) throw Error(name + ': ' + JSON.stringify(actual)) }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('http://127.0.0.1:4185/en/#javascript-step-02')
  await page.reload()
  await page.waitForSelector('.monaco-editor')
  // Use the visible reset flow to establish a runnable scene on repeated runs.
  await page.locator('#panel-code .panel-header button').click()
  await page.locator('.reset-confirm button').first().click()
  await page.waitForSelector('.workspace iframe')
  check('Page identity', page.url().endsWith('/en/#javascript-step-02'))
  check('Meaningful English workspace', await page.locator('#panel-code h2').textContent(), 'Source code')
  await page.selectOption('#code-language', 'typescript')
  await page.waitForFunction(() => /checks passed|execution paused/.test(document.querySelector('.code-check-status').textContent))
  await page.waitForFunction(() => !!document.querySelector('.workspace iframe')?.srcdoc)
  const lastGood = await page.locator('.workspace iframe').evaluate(frame => frame.srcdoc)
  await page.locator('.monaco-editor [role="textbox"]').focus()
  await page.keyboard.press('Control+Home')
  await page.keyboard.insertText('const localeProof: number = "invalid";\n')
  await page.waitForFunction(() => document.querySelector('.code-issues'))
  check('Invalid TypeScript preserves last working srcdoc', await page.locator('.workspace iframe').evaluate(frame => frame.srcdoc) === lastGood)
  await page.keyboard.press('Control+Home')
  await page.keyboard.press('Shift+End')
  await page.locator('.notes-editor').fill('# F10 continuity\n\n한국어 and English notes')
  await page.locator('.learning-status button').nth(1).click()
  await page.locator('.notes-toolbar button').nth(1).click()
  await page.locator('#tab-notes').evaluate(element => element.click())
  await page.locator('#panel-code .panel-header button').click()
  await page.evaluate(() => { window.f10refs = { editor: document.querySelector('.monaco-editor'), input: document.querySelector('.monaco-editor [role="textbox"]'), preview: document.querySelector('.workspace iframe'), notes: document.querySelector('.notes-preview'), selection: document.querySelector('.monaco-editor .view-overlays').innerHTML, errors: document.querySelector('.code-issues').textContent, storage: JSON.stringify(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])) } })
  // Observe Monaco via public read-only APIs; edits above use actual keyboard input.
  await page.evaluate(async () => { const { monaco } = await import('/src/editor/monaco.ts'); const instance = monaco.editor.getEditors()[0]; Object.assign(window.f10refs, { model: instance.getModel(), version: instance.getModel().getVersionId(), selected: JSON.stringify(instance.getSelection()) }) })
  // Import through the real input; validation fails before any restore writes.
  await page.locator('.backup-disclosure summary').click()
  await page.locator('input[type="file"]').setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{"format":"invalid"}') })
  await page.waitForSelector('.backup-controls [role="alert"]')
  check('Backup warning starts in English', (await page.locator('.backup-controls [role="alert"]').textContent()).startsWith('Import stopped:'))
  await page.locator('.interface-language button').click()
  check('Selected tab remains', await page.locator('#tab-notes').getAttribute('aria-selected'), 'true')
  check('Code language stays TypeScript', await page.locator('#code-language').inputValue(), 'typescript')
  check('Notes preview text preserved', (await page.locator('.notes-preview').textContent()).replace(/\s+/g, ' ').trim(), 'F10 continuity 한국어 and English notes')
  check('Error status translated', /오류 \d+개/.test(await page.locator('.code-check-status').textContent()))
  check('Backup warning translated while open', (await page.locator('.backup-controls [role="alert"]').textContent()).startsWith('가져오기 중단:'))
  check('Reset warning translated while open', (await page.locator('.reset-confirm').textContent()).includes('코드만 되돌리기'))
  check('Monaco accessible name translated', await page.locator('.monaco-editor [role="textbox"]').getAttribute('aria-label'), '실행 코드')
  for (const [name, expression] of [
    ['Monaco instance DOM preserved', () => document.querySelector('.monaco-editor') === window.f10refs.editor],
    ['Monaco input and model DOM preserved', () => document.querySelector('.monaco-editor [role="textbox"]') === window.f10refs.input],
    ['Last working iframe preserved', () => document.querySelector('.workspace iframe') === window.f10refs.preview],
    ['Notes preview DOM preserved', () => document.querySelector('.notes-preview') === window.f10refs.notes],
    ['Compiler details unchanged', () => document.querySelector('.code-issues').textContent === window.f10refs.errors],
    ['Code notes progress and ISO timestamps unchanged', () => JSON.stringify(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])) === window.f10refs.storage],
  ]) check(name, await page.evaluate(expression))
  check('Monaco model identity version and selection preserved', await page.evaluate(async () => { const { monaco } = await import('/src/editor/monaco.ts'); const instance = monaco.editor.getEditors()[0]; return instance.getModel() === window.f10refs.model && instance.getModel().getVersionId() === window.f10refs.version && JSON.stringify(instance.getSelection()) === window.f10refs.selected }))
  await page.locator('.interface-language button').click()
  check('Open backup warning translates back', (await page.locator('.backup-controls [role="alert"]').textContent()).startsWith('Import stopped:'))
  check('Editor accessible name translates back', await page.locator('.monaco-editor [role="textbox"]').getAttribute('aria-label'), 'Source code')
  await page.locator('input[type="file"]').setInputFiles({ name: 'broken.json', mimeType: 'application/json', buffer: Buffer.from('{broken') })
  await page.waitForFunction(() => document.querySelector('.backup-controls [role="alert"]')?.textContent.includes('JSON'))
  const parseDetails = (await page.locator('.backup-controls [role="alert"]').textContent()).replace('Import stopped: ', '')
  await page.locator('.interface-language button').click()
  check('JSON parser details preserved under translated prefix', await page.locator('.backup-controls [role="alert"]').textContent(), '가져오기 중단: ' + parseDetails)
  await page.locator('.interface-language button').click()
  const downloading = page.waitForEvent('download')
  await page.locator('.backup-toolbar button').first().click()
  const downloaded = await downloading
  const chunks = []; for await (const chunk of await downloaded.createReadStream()) chunks.push(chunk)
  const backupBytes = Buffer.concat(chunks)
  const backup = JSON.parse(backupBytes.toString('utf8'))
  await page.locator('input[type="file"]').setInputFiles({ name: 'roundtrip.json', mimeType: 'application/json', buffer: backupBytes })
  await page.waitForSelector('.backup-confirm')
  check('Backup date uses English locale', await page.locator('.backup-confirm p').first().textContent(), 'Backup date: ' + new Date(backup.exportedAt).toLocaleString('en-US') + ' · 644 units')
  await page.locator('.interface-language button').click()
  check('Pending backup date uses Korean locale', await page.locator('.backup-confirm p').first().textContent(), '백업 날짜: ' + new Date(backup.exportedAt).toLocaleString('ko-KR') + ' · 644개 단위')
  check('Pending backup and language switches do not save', await page.evaluate(() => JSON.stringify(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])) === window.f10refs.storage))
  await page.locator('.backup-confirm button').last().click()
  await page.locator('.reset-confirm button').first().click()
  await page.waitForFunction(() => document.querySelector('.code-check-status').textContent.includes('검사 통과'))
  check('No Vite overlay', await page.locator('vite-error-overlay').count(), 0)
  return { url: page.url(), title: await page.title(), results }
}

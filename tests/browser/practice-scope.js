;async (page, baseUrl = 'http://127.0.0.1:4187') => {
  const checks = [],
    measurements = []
  const check = (name, ok) => {
    checks.push({ name, ok })
    if (!ok) throw Error(name)
  }
  const samples = [
    'javascript-step-02',
    'gaussian-splatting-01',
    'svelte-02',
    'webassembly-02',
    'playwright-01',
  ]
  for (const locale of ['ko', 'en'])
    for (const width of [390, 1440])
      for (const id of samples) {
        const label = locale + ' ' + width + ' ' + id
        await page.setViewportSize({
          width,
          height: width === 390 ? 844 : 1000,
        })
        await page.goto(
          baseUrl + (locale === 'en' ? '/en/' : '/') + '?scope=1#' + id,
          { waitUntil: 'domcontentloaded' },
        )
        await page.waitForFunction(() => document.readyState === 'complete')
        const expected = await page.evaluate(
          async ({ locale, id }) => {
            const { getLocalizedUnit } = await import('/src/app/curriculum.ts')
            const unit = getLocalizedUnit(locale, id)
            const { messages } = await import('/src/i18n/messages.ts')
            return {
              note: unit.exampleNote,
              mode: unit.exampleMode,
              files: unit.exampleFiles ?? [],
              reading: unit.exampleReadingSource,
              goal: unit.goal,
              prefix:
                unit.exampleMode === 'external'
                  ? messages[locale].externalExecutionScope
                  : messages[locale].browserExecutionScope,
              controls: messages[locale].controlsHint,
            }
          },
          { locale, id },
        )
        check(
          label + ' scope uses localized canonical note and mode',
          (await page.locator('.practice-guide-scope').textContent()) ===
            (locale === 'ko' ? '실행 범위' : 'Execution scope') +
              ' ' +
              expected.prefix +
              (expected.note ? ' ' + expected.note : ''),
        )
        check(
          label + ' goal remains in current unit without guide duplication',
          (await page
            .locator('.current-lesson>div:first-child>p')
            .textContent()) === expected.goal &&
            (await page.locator('.practice-guide-goal').count()) === 0,
        )
        await page.locator('.current-lesson-actions button').last().click()
        await page.waitForFunction(() =>
          /실행 중|Running/.test(
            document.querySelector('.preview-status')?.textContent ?? '',
          ),
        )
        await page.evaluate(async () => {
          const { monaco } = await import('/src/editor/monaco.ts')
          const editor = monaco.editor.getEditors()[0],
            frame = document.querySelector('.workspace iframe')
          window.l04 = {
            editor,
            model: editor.getModel(),
            version: editor.getModel().getVersionId(),
            selection: JSON.stringify(editor.getSelection()),
            frame,
            frameWindow: frame.contentWindow,
            srcdoc: frame.srcdoc,
            loads: 0,
            notes: document.querySelector('.notes-editor'),
            storage: JSON.stringify({ ...localStorage }),
          }
          frame.addEventListener('load', () => {
            window.l04.loads += 1
          })
        })
        await page.locator('.practice-guide-heading button').click()
        check(
          label + ' collapsed guide still exposes execution scope',
          (await page.locator('.practice-guide-scope').isVisible()) &&
            (await page.locator('#practice-guide-body').count()) === 0,
        )
        await page.locator('.practice-guide-heading button').click()
        check(
          label + ' resources sit after backup and before status',
          await page.evaluate(() => {
            const archive = document.querySelector('.backup-disclosure'),
              resources = document.querySelector('.learning-resources'),
              status = document.querySelector('.learning-status')
            return (
              !!resources &&
              !!(
                archive.compareDocumentPosition(resources) &
                Node.DOCUMENT_POSITION_FOLLOWING
              ) &&
              !!(
                resources.compareDocumentPosition(status) &
                Node.DOCUMENT_POSITION_FOLLOWING
              )
            )
          }),
        )
        check(
          label + ' English reading link preserved',
          (await page
            .locator('.learning-resources>p a')
            .getAttribute('href')) === expected.reading &&
            (await page
              .locator('.learning-resources>p a')
              .getAttribute('download')) !== null,
        )
        if (expected.files.length) {
          await page.locator('.learning-resources summary').click()
          const hrefs = await page
            .locator('.learning-resources details a')
            .evaluateAll((links) =>
              links.map((link) => link.getAttribute('href')),
            )
          check(
            label + ' companion download links match manifest',
            JSON.stringify(hrefs) ===
              JSON.stringify(
                expected.files.map(
                  (file) => '/examples/' + file.slice('src/labs/'.length),
                ),
              ),
          )
          for (const href of hrefs)
            check(
              label + ' companion download responds ' + href,
              (await page.request.get(baseUrl + href)).status() === 200,
            )
        }
        check(
          label + ' reading download responds',
          (await page.request.get(baseUrl + expected.reading)).status() === 200,
        )
        check(
          label + ' general controls guidance avoids unrelated OrbitControls',
          (await page
            .locator('.preview-content>.panel-hint')
            .last()
            .textContent()) === expected.controls &&
            !expected.controls.includes('OrbitControls'),
        )
        check(
          label + ' summary and resources preserve workspace and storage',
          await page.evaluate(() => {
            const before = window.l04
            return (
              before.editor.getModel() === before.model &&
              before.model.getVersionId() === before.version &&
              JSON.stringify(before.editor.getSelection()) ===
                before.selection &&
              document.querySelector('.workspace iframe') === before.frame &&
              before.frame.contentWindow === before.frameWindow &&
              before.frame.srcdoc === before.srcdoc &&
              before.loads === 0 &&
              document.querySelector('.notes-editor') === before.notes &&
              JSON.stringify({ ...localStorage }) === before.storage
            )
          }),
        )
        const bounds = await page
          .locator('.practice-guide-scope')
          .evaluate((scope) => ({
            width: innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            scopeWidth: scope.getBoundingClientRect().width,
            scopeHeight: scope.getBoundingClientRect().height,
          }))
        measurements.push({
          label,
          mode: expected.mode ?? 'browser',
          note: expected.note,
          files: expected.files,
          ...bounds,
        })
        check(
          label + ' guide and resources do not overflow',
          bounds.documentWidth <= width,
        )
      }
  return { checks, measurements }
}

// Playwright runs in Node. This browser lesson authors a complete runnable spec; it does not run tests.
export function mount({ locale = 'ko', container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<h3>JSON backup round trip</h3><p>Isolated context, download/filechooser waits armed before clicks, Korean and empty notes, invalid-file preservation, reload verification.</p><label>Test origin <input value="http://127.0.0.1:5174" style="width:260px"></label> <button>Regenerate spec</button><p>Use a disposable local test checkout. Start it on port 5174. In a separate test folder: npm init -y; npm install -D @playwright/test; npx playwright install chromium. Save the source below as lesson.spec.mjs. Run: npx playwright test lesson.spec.mjs --workers=1. For visual baselines add --update-snapshots once and inspect generated images. View failures with npx playwright show-trace &lt;trace.zip&gt;. No tests execute inside this iframe.</p><pre aria-live="polite"></pre><textarea aria-label="Complete Playwright spec" spellcheck="false" style="width:100%;height:380px;box-sizing:border-box;font-family:monospace"></textarea>',
          display002:
            'Spec ready to select and save. Test status: not run. The standalone lesson.spec.mjs is also provided in this lesson folder.',
        }
      : {
          display001:
            '<h3>JSON backup round trip</h3><p>Isolated context, download/filechooser waits armed before clicks, Korean and empty notes, invalid-file preservation, reload verification.</p><label>Test origin <input value="http://127.0.0.1:5174" style="width:260px"></label> <button>Regenerate spec</button><p>Use a disposable local test checkout. Start it on port 5174. In a separate test folder: npm init -y; npm install -D @playwright/test; npx playwright install chromium. Save the source below as lesson.spec.mjs. Run: npx playwright test lesson.spec.mjs --workers=1. For visual baselines add --update-snapshots once and inspect generated images. View failures with npx playwright show-trace &lt;trace.zip&gt;. No tests execute inside this iframe.</p><pre aria-live="polite"></pre><textarea aria-label="Complete Playwright spec" spellcheck="false" style="width:100%;height:380px;box-sizing:border-box;font-family:monospace"></textarea>',
          display002:
            'Spec ready to select and save. Test status: not run. The standalone lesson.spec.mjs is also provided in this lesson folder.',
        }
  const root = document.createElement('section')
  root.style.cssText = 'padding:16px'
  container.append(root)
  root.innerHTML =
    '<h3>JSON backup round trip</h3><p>Isolated context, download/filechooser waits armed before clicks, Korean and empty notes, invalid-file preservation, reload verification.</p><label>Test origin <input value="http://127.0.0.1:5174" style="width:260px"></label> <button>Regenerate spec</button><p>Use a disposable local test checkout. Start it on port 5174. In a separate test folder: npm init -y; npm install -D @playwright/test; npx playwright install chromium. Save the source below as lesson.spec.mjs. Run: npx playwright test lesson.spec.mjs --workers=1. For visual baselines add --update-snapshots once and inspect generated images. View failures with npx playwright show-trace &lt;trace.zip&gt;. No tests execute inside this iframe.</p><pre aria-live="polite"></pre><textarea aria-label="Complete Playwright spec" spellcheck="false" style="width:100%;height:380px;box-sizing:border-box;font-family:monospace"></textarea>'
  const original =
    "import { test, expect } from '@playwright/test';\nimport { readFile } from 'node:fs/promises';\n// A new Playwright context per test isolates cookies/storage from your everyday browser.\n// Serve a disposable checkout at this separate test origin. Do not connect to a personal browser profile.\nconst origin = process.env.FRONTORY_TEST_ORIGIN || 'http://127.0.0.1:5174';\ntest.use({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });\nfor (const memo of ['', '# \ud55c\uae00 \ud544\uae30\\n\ubc30\uc5f4\uacfc \ubcf5\uc6d0 \ud83e\uddea']) {\n  test(`JSON round trip ${memo ? 'Korean' : 'empty'}`, async ({ page }, testInfo) => {\n    await page.goto(origin + '/#javascript-01');\n    const notes = page.getByRole('textbox', { name: 'Markdown \ud544\uae30', exact: true });\n    await expect(notes).toBeVisible();\n    await notes.fill(memo);\n    await page.getByText('\ud559\uc2b5 \uc544\uce74\uc774\ube0c \u00b7 \uc804\uccb4 JSON \ub0b4\ubcf4\ub0b4\uae30 / \uac00\uc838\uc624\uae30', { exact: true }).click();\n    // Arm events before their triggering click.\n    const downloading = page.waitForEvent('download');\n    await page.getByRole('button', { name: 'JSON \ub0b4\ubcf4\ub0b4\uae30', exact: true }).click();\n    const download = await downloading;\n    expect(await download.failure()).toBeNull();\n    const path = testInfo.outputPath('round-trip.json');\n    await download.saveAs(path);\n    const backup = JSON.parse(await readFile(path, 'utf8'));\n    expect(backup.format).toBe('frontory');\n    expect(backup.units.find(unit => unit.id === 'javascript-01').draft.notes).toBe(memo);\n    await notes.fill('\uc218\uc815\ub41c \ub0b4\uc6a9');\n    const choosing = page.waitForEvent('filechooser');\n    await page.getByRole('button', { name: 'JSON \uac00\uc838\uc624\uae30', exact: true }).click();\n    await (await choosing).setFiles(path);\n    await page.getByRole('button', { name: '\uc804\uccb4 \uad50\uccb4\ud558\uc5ec \ubcf5\uc6d0', exact: true }).click();\n    await expect(notes).toHaveValue(memo);\n    await page.reload();\n    await expect(notes).toHaveValue(memo);\n    const disclosure = page.getByText('\ud559\uc2b5 \uc544\uce74\uc774\ube0c \u00b7 \uc804\uccb4 JSON \ub0b4\ubcf4\ub0b4\uae30 / \uac00\uc838\uc624\uae30', { exact: true });\n    await disclosure.click();\n    const invalidChoice = page.waitForEvent('filechooser');\n    await page.getByRole('button', { name: 'JSON \uac00\uc838\uc624\uae30', exact: true }).click();\n    await (await invalidChoice).setFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{invalid') });\n    await expect(page.getByRole('alert').filter({ hasText: '\uac00\uc838\uc624\uae30 \uc911\ub2e8' })).toBeVisible();\n    await expect(notes).toHaveValue(memo);\n    await page.reload();\n    await expect(notes).toHaveValue(memo);\n  });\n}\n"
  const input = root.querySelector('input'),
    output = root.querySelector('textarea'),
    status = root.querySelector('pre')
  const generate = () => {
    try {
      const url = new URL(input.value)
      if (!['http:', 'https:'].includes(url.protocol))
        throw Error('Use an HTTP(S) test origin')
      output.value = original.replace('http://127.0.0.1:5174', url.origin)
      status.textContent =
        'Spec ready to select and save. Test status: not run. The standalone lesson.spec.mjs is also provided in this lesson folder.'
    } catch (error) {
      status.textContent = String(error)
    }
  }
  root.querySelector('button').onclick = generate
  generate()
  return () => root.remove()
}

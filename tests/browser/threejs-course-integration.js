import assert from 'node:assert/strict'
import fs from 'node:fs'
import {
  ready,
  editorCode,
  editCode,
  loadSource,
} from './threejs-remaining-helper.js'
const units = JSON.parse(
  fs.readFileSync('src/app/catalog.json', 'utf8'),
).units.filter((u) => u.seriesId === 'threejs')
const englishUnits = JSON.parse(
  fs.readFileSync('src/app/catalog.en.json', 'utf8'),
).units
const lessons = JSON.parse(
  fs.readFileSync('content/learning/threejs.json', 'utf8'),
).lessons
export async function runGroup(page, base) {
  const checks = []
  for (const locale of ['ko', 'en']) {
    await page.setViewportSize({ width: 1440, height: 900 })
    const route = base + (locale === 'en' ? '/en/' : '/') + '?learning#'
    await page.goto(route + 'threejs-01')
    await ready(page)
    // A locale switch preserves drafts. Start this fixture from explicit empty storage.
    await page.evaluate(() => {
      for (const key of Object.keys(localStorage))
        if (
          key.startsWith('web-gl-study:unit:v1:') ||
          key === 'web-gl-study:all:v1'
        )
          localStorage.removeItem(key)
    })
    await page.reload()
    await ready(page)
    for (const unit of process.env.THREEJS_COURSE_FLOW_ONLY === '1'
      ? []
      : units) {
      await page.goto(route + unit.id)
      const title = (locale === 'en' ? englishUnits : units).find(
        (u) => u.id === unit.id,
      ).title
      await page.waitForFunction(
        (title) => document.title === title + ' · Frontory',
        title,
      )
      await ready(page)
      assert.match(
        await editorCode(page),
        new RegExp('lang="' + locale + '"'),
        unit.id + ' ' + locale,
      )
      console.log('COURSE_DOCUMENT', unit.id, locale)
      assert.equal(
        await page.locator('#learning-step option').count(),
        lessons.find((l) => l.unitId === unit.id).steps.length,
      )
      const expectedDocPath = (locale === 'en' ? englishUnits : units).find(
        (u) => u.id === unit.id,
      ).docPath
      const loadedDocument = page.waitForResponse(
        (response) => new URL(response.url()).pathname === expectedDocPath,
      )
      await page.locator('.current-lesson-actions button').first().click()
      const documentResponse = await loadedDocument
      assert.equal(documentResponse.status(), 200)
      assert.equal(new URL(documentResponse.url()).pathname, expectedDocPath)
      await page.waitForSelector('.document-reader .markdown h1')
      assert.equal(
        await page.locator('.document-reader .markdown h1').count(),
        1,
      )
      const expectedHeading = fs
        .readFileSync(expectedDocPath.slice(1), 'utf8')
        .split(String.fromCharCode(10))[0]
        .slice(2)
        .trim()
      assert.equal(
        await page.locator('.document-reader .markdown h1').innerText(),
        expectedHeading,
      )
      assert.equal(
        await page
          .locator('.document-reader .markdown > p code')
          .filter({ hasText: unit.id })
          .first()
          .innerText(),
        unit.id,
      )
      assert.equal(await page.evaluate(() => location.hash), '#' + unit.id)
      await page.locator('.document-reader .dialog-header button').click()
      checks.push({
        unit: unit.id,
        locale,
        htmlDefault: true,
        documentOpened: true,
        expectedDocPath,
        actualDocumentURL: documentResponse.url(),
        heading: expectedHeading,
        documentStorageId: unit.id,
      })
    }
    if (process.env.THREEJS_COURSE_FLOW_ONLY === '1') {
      await page.goto(route + 'threejs-03')
      await ready(page)
    }
    console.log('COURSE_FLOW', locale, 'edit-notes')
    const id = 'threejs-03',
      step = lessons.find((l) => l.unitId === id).steps[0].id
    const code =
      '<!doctype html><html lang="' +
      locale +
      '"><body><p>Task7 retained draft</p></body></html>'
    await editCode(page, code)
    await page.locator('.notes-toggle').click()
    const note = 'Task7 필기 😀 ' + locale
    await page.locator('.notes-editor').fill(note)
    await page.locator('.notes-toggle').click()
    await page.locator('.learning-status button').nth(2).click()
    console.log('COURSE_FLOW', locale, 'reload-start')
    await page.reload()
    console.log('COURSE_FLOW', locale, 'reload-done')
    await ready(page)
    console.log('COURSE_FLOW', locale, 'reload-editor-ready')
    assert.equal(await editorCode(page), code)
    assert.equal(await page.locator('.notes-editor').inputValue(), note)
    for (const language of [
      locale === 'ko' ? 'English' : '한국어',
      locale === 'ko' ? '한국어' : 'English',
    ]) {
      await page.getByRole('button', { name: language, exact: true }).click()
      await ready(page)
      assert.equal(await editorCode(page), code)
      assert.equal(await page.locator('.notes-editor').inputValue(), note)
    }
    console.log('COURSE_FLOW', locale, 'load-undo')
    await loadSource(page, step, false)
    assert.notEqual(await editorCode(page), code)
    await page.evaluate(async () => {
      const editor = (
        await import('/src/editor/monaco.ts')
      ).monaco.editor.getEditors()[0]
      editor.trigger('task7', 'undo', null)
    })
    assert.equal(await editorCode(page), code)
    await page.locator('.current-lesson-actions button').first().click()
    await page.waitForSelector('.document-reader .markdown')
    for (const index of [1, 2, 0]) {
      await page.locator('.document-nav button').nth(index).click()
      await page.waitForSelector('.document-reader .markdown h1')
      assert.ok(
        (await page.locator('.document-reader .markdown').innerText()).length >
          200,
      )
    }
    await page.locator('.document-reader .dialog-header button').click()
    assert.equal(await editorCode(page), code)
    const details = page
      .locator('details')
      .filter({ has: page.locator('.backup-controls') })
    await details.evaluate((d) => (d.open = true))
    console.log('COURSE_FLOW', locale, 'export')
    const pending = page.waitForEvent('download')
    await page
      .locator('.backup-controls')
      .getByRole('button', {
        name: locale === 'ko' ? 'JSON 내보내기' : 'Export JSON',
        exact: true,
      })
      .click()
    const stream = await (await pending).createReadStream(),
      chunks = []
    for await (const chunk of stream) chunks.push(chunk)
    const backup = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    assert.equal(backup.version, 3)
    const catalogs = await page.evaluate(async () => {
      const c = await import('/src/app/curriculum.ts')
      return { legacy: c.legacyUnitIds, v2: c.v2UnitIds }
    })
    for (const version of [1, 2, 3]) {
      console.log('COURSE_FLOW', locale, 'import', version)
      const archive = structuredClone(backup)
      archive.version = version
      archive.format = version === 1 ? 'web-gl-study' : 'frontory'
      const ids =
        version === 1
          ? catalogs.legacy
          : version === 2
            ? catalogs.v2
            : backup.units.map((u) => u.id)
      archive.units = archive.units.filter((u) => ids.includes(u.id))
      archive.selectedUnitId = ids.includes(id) ? id : ids[0]
      if (version < 3)
        for (const entry of archive.units) {
          entry.draft.code = ''
          delete entry.draft.language
        }
      await page.locator('.backup-controls input[type=file]').setInputFiles({
        name: 'task7-v' + version + '.json',
        mimeType: 'application/json',
        buffer: Buffer.from(JSON.stringify(archive)),
      })
      await page.locator('.backup-confirm').getByRole('button').first().click()
      await ready(page)
      console.log('COURSE_FLOW', locale, 'import-ready', version)
      const restored = await page.evaluate(
        async (id) => {
          const { draftStore } = await import('/src/shared/drafts.ts')
          return draftStore.load(id, '').draft
        },
        version === 1 ? ids[0] : id,
      )
      assert.equal(restored.code, version === 3 ? code : '')
      assert.equal(restored.language, version === 3 ? 'html' : 'javascript')
      if (version === 3) {
        assert.equal(await editorCode(page), code)
        assert.equal(await page.locator('.notes-editor').inputValue(), note)
      }
      checks.push({
        locale,
        backupVersion: version,
        blankLegacyCode: version < 3,
        restoredLanguage: restored.language,
      })
    }
    await page.screenshot({
      path: process.env.THREEJS_EVIDENCE.replace(
        /.json$/,
        '-integration-' + locale + '.png',
      ),
    })
    checks.push({
      unit: id,
      locale,
      undo: true,
      notes: true,
      draftReload: true,
      documentRoundTrip: true,
    })
    await page.evaluate(() => {
      for (const key of Object.keys(localStorage))
        if (key.startsWith('web-gl-study:')) localStorage.removeItem(key)
    })
  }
  return checks
}

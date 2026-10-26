import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
test('CI 실행과 산출물', async ({ page, browser }, testInfo) => {
  await page
    .getByRole('textbox', { name: 'Notes', exact: true })
    .fill('CI evidence')
  await page.getByRole('button', { name: 'Save notes', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Saved')
  await testInfo.attach('notes-state', {
    body: await page
      .getByRole('textbox', { name: 'Notes', exact: true })
      .inputValue(),
    contentType: 'text/plain',
  })
})

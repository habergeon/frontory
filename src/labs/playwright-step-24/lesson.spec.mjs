import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
test('Retries와 흔들림', async ({ page, browser }, testInfo) => {
  testInfo.annotations.push({
    type: 'retry',
    description: String(testInfo.retry),
  })
  await page
    .getByRole('textbox', { name: 'Notes', exact: true })
    .fill('eventual save')
  await expect(page.getByRole('status')).toHaveText('Saved')
})

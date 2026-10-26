import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
test('첫 흐름의 실패 진단', async ({ page, browser }, testInfo) => {
  await test.step('Write note', async () => {
    await page
      .getByRole('textbox', { name: 'Notes', exact: true })
      .fill('diagnostic')
  })
  await test.step('Observe persistence signal', async () => {
    await page.getByRole('button', { name: 'Save notes', exact: true }).click()
    await expect(page.getByRole('status'), 'save should complete').toHaveText(
      'Saved',
    )
  })
})

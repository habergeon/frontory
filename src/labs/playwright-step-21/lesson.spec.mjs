import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
test('Trace 읽기', async ({ page, browser }, testInfo) => {
  await test.step('Navigate to second lesson', async () => {
    await page.getByRole('button', { name: 'Lesson B', exact: true }).click()
  })
  await test.step('Assert heading in trace', async () => {
    await expect(page.getByRole('heading')).toHaveText('Lesson B')
  })
})

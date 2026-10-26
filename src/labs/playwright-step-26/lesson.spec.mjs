import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
test('허용 차이와 검토', async ({ page, browser }, testInfo) => {
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole('region', { name: 'Notes' })).toHaveScreenshot(
    'reviewed-notes.png',
    {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.001,
      threshold: 0.1,
    },
  )
})

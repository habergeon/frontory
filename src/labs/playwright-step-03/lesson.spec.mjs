import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
test('Role과 접근 가능한 이름', async ({ page, browser }, testInfo) => {
  await page.getByRole('button', { name: 'Lesson B', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lesson B')
})

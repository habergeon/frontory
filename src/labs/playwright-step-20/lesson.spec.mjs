import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
test('Console과 PageError', async ({ page, browser }, testInfo) => {
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  await page.getByRole('button', { name: 'Load document', exact: true }).click()
  await expect(page.getByRole('article', { name: 'Document' })).toHaveText(
    'Document old',
  )
  expect(errors).toEqual([])
})

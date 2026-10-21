import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
// A new Playwright context per test isolates cookies/storage from your everyday browser.
// Serve a disposable checkout at this separate test origin. Do not connect to a personal browser profile.
const origin = process.env.FRONTORY_TEST_ORIGIN || 'http://127.0.0.1:5174';
test.use({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
for (const memo of ['', '# 한글 필기\n배열과 복원 🧪']) {
  test(`JSON round trip ${memo ? 'Korean' : 'empty'}`, async ({ page }, testInfo) => {
    await page.goto(origin + '/#javascript-01');
    const notes = page.getByRole('textbox', { name: 'Markdown 필기', exact: true });
    await expect(notes).toBeVisible();
    await notes.fill(memo);
    await page.getByText('학습 아카이브 · 전체 JSON 내보내기 / 가져오기', { exact: true }).click();
    // Arm events before their triggering click.
    const downloading = page.waitForEvent('download');
    await page.getByRole('button', { name: 'JSON 내보내기', exact: true }).click();
    const download = await downloading;
    expect(await download.failure()).toBeNull();
    const path = testInfo.outputPath('round-trip.json');
    await download.saveAs(path);
    const backup = JSON.parse(await readFile(path, 'utf8'));
    expect(backup.format).toBe('frontory');
    expect(backup.units.find(unit => unit.id === 'javascript-01').draft.notes).toBe(memo);
    await notes.fill('수정된 내용');
    const choosing = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'JSON 가져오기', exact: true }).click();
    await (await choosing).setFiles(path);
    await page.getByRole('button', { name: '전체 교체하여 복원', exact: true }).click();
    await expect(notes).toHaveValue(memo);
    await page.reload();
    await expect(notes).toHaveValue(memo);
    const disclosure = page.getByText('학습 아카이브 · 전체 JSON 내보내기 / 가져오기', { exact: true });
    await disclosure.click();
    const invalidChoice = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'JSON 가져오기', exact: true }).click();
    await (await invalidChoice).setFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{invalid') });
    await expect(page.getByRole('alert').filter({ hasText: '가져오기 중단' })).toBeVisible();
    await expect(notes).toHaveValue(memo);
    await page.reload();
    await expect(notes).toHaveValue(memo);
  });
}

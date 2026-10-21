import { test, expect } from '@playwright/test';
const origin = process.env.FRONTORY_TEST_ORIGIN || 'http://127.0.0.1:5174';
test.use({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1,
  locale: 'ko-KR', timezoneId: 'UTC', colorScheme: 'light', reducedMotion: 'reduce', trace: 'retain-on-failure' });
test('Frontory deterministic UI, GPU region excluded', async ({ page }) => {
  await page.goto(origin + '/#javascript-01');
  const notes = page.getByRole('textbox', { name: 'Markdown 필기', exact: true });
  await expect(notes).toBeVisible();
  await notes.fill('# 고정된 시각 회귀 메모');
  await page.evaluate(() => document.fonts.ready);
  // Snapshot the stable notes panel. Canvas/iframe scene correctness needs separate semantic tests.
  await expect(page.getByRole('region', { name: 'Markdown 필기', exact: true })).toHaveScreenshot('notes-panel.png', {
    animations: 'disabled', caret: 'hide', maxDiffPixels: 0
  });
});
test('rotation fixture stops at an explicit deterministic frame', async ({ page }) => {
  await page.setContent(`<button id="stop">Stop rotation</button><output id="state">Running</output><canvas width="320" height="220"></canvas>
    <script>
    const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d');let frame=0,handle;
    function paint(angle){ctx.fillStyle='#102037';ctx.fillRect(0,0,320,220);ctx.save();ctx.translate(160,110);ctx.rotate(angle);ctx.fillStyle='#62d9e8';ctx.fillRect(-45,-45,90,90);ctx.restore()}
    function tick(){paint(frame++/50);handle=requestAnimationFrame(tick)}tick();
    document.querySelector('button').onclick=()=>{cancelAnimationFrame(handle);paint(Math.PI/4);document.querySelector('output').textContent='Stopped at π/4'};
    </script>`);
  await page.getByRole('button', { name: 'Stop rotation' }).click();
  await expect(page.locator('output')).toHaveText('Stopped at π/4');
  await expect(page.locator('canvas')).toHaveScreenshot('stopped-rotation.png', { maxDiffPixels: 0 });
});
// Keep browser version, OS, fonts, viewport, and DPR fixed in CI.
// Generate baselines once with --update-snapshots; inspect them before committing.
// Never increase tolerance merely to silence a failure. Use trace to inspect inputs/network/errors.
// Cross-GPU scenes: verify numeric state and rendering availability separately; avoid pixel-exact portability claims.

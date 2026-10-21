// Playwright는 Node에서 별도 브라우저를 제어합니다. 이 화면은 실제 실행할 테스트 소스를 제공합니다.
export function mount({ container }) {
  const source = `import { test, expect } from '@playwright/test';
test('Frontory 카메라 학습 단위 탐색', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#02-camera');
  await expect(page.getByRole('heading', { name: 'Scene·Camera·Renderer', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '학습 문서 열기', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});`
  const pre = document.createElement('pre'); pre.textContent = source
  pre.style.cssText = 'white-space:pre-wrap;font-size:12px'
  const hint = document.createElement('p'); hint.textContent = '별도 Node 환경에서 실행합니다. 화면의 코드를 바꾸면 아래 테스트 소스도 바뀝니다. 실행 방법은 학습 문서를 참고하세요.'
  container.append(hint,pre)
  return () => container.replaceChildren()
}

# playwright-03 companion execution

Use an isolated Playwright project with @playwright/test and Chromium installed. These manual specs use a separately running Frontory server; no companion HTTP fixture or generated config is supplied.

These specs target the Korean production UI and preserve Korean locators and memo fixtures. Run the repository’s development server separately. Copy the spec into an isolated @playwright/test project and configure testDir/use.baseURL for that server; set FRONTORY_TEST_ORIGIN if needed. Run `npx playwright test` in that project with a fresh context. English-route testing requires separate reviewed UI locators. Review newly captured screenshots before a normal rerun; the local 2D canvas fixture does not validate WebGL scene correctness.

- [lesson.spec.mjs](./lesson.spec.mjs) · preserved original

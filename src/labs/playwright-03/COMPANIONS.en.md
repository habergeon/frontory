# playwright-03 companion execution

Use an isolated Playwright project with @playwright/test and Chromium installed. These manual specs use a separately running Frontory server; no companion HTTP fixture or generated config is supplied.

These specs target the Korean production UI and preserve Korean locators and memo fixtures. Run the repository’s development server separately. Copy the spec into an isolated @playwright/test project and configure testDir for the copied spec. The specs navigate to absolute URLs using FRONTORY_TEST_ORIGIN, which defaults to http://127.0.0.1:5174. If the server uses another origin, set FRONTORY_TEST_ORIGIN when running the tests. For example, from the isolated test project in Git Bash, run `FRONTORY_TEST_ORIGIN=http://127.0.0.1:5173 npx playwright test` for a server on port 5173. Use a fresh browser context. English-route testing requires separate reviewed UI locators. Review newly captured screenshots before a normal rerun; the local 2D canvas fixture does not validate WebGL scene correctness.

- [lesson.spec.mjs](./lesson.spec.mjs) · preserved original

# playwright-step-12 companion execution

Run the supplied spec and fixture in an isolated Playwright project. The generated config starts its own HTTP fixture server. Run lessons sequentially on port 4179, pin the browser and environment, and review visual baselines before treating screenshot checks as verified.

Copy the complete folder into an empty test project. Run `npm init -y`, `npm install -D @playwright/test`, `npx playwright install chromium`, then `npx playwright test --config=playwright.config.mjs`. Pin the resolved package version and commit that project’s package-lock.json. Use a fresh browser context. Review captured visual baselines before a normal rerun. The Notes input uses the textbox role to distinguish it from the Notes region. ci.yml, when supplied, assumes this separate project root and its package-lock.json.

- [fixture.html](./fixture.html) · preserved original
- [lesson.spec.mjs](./lesson.spec.mjs) · [English reading](./lesson.spec.mjs.en.md)
- [playwright.config.mjs](./playwright.config.mjs) · preserved original
- [server.mjs](./server.mjs) · preserved original

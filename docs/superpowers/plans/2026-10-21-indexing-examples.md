# Indexable learning documents and complete example coverage

**Goal:** Make Frontory's learning content discoverable without JavaScript and provide a specific example for every one of its 644 learning units.

**Architecture:** Keep existing hash-based workspaces and local storage IDs. Generate static, human-readable `/learn/`, `/learn/<series>/`, and `/learn/<series>/<unit>/` documents after Vite builds. Each static document links to the existing editable workspace. Use the same Markdown as the app, with safe rendering and canonical URLs. Generate a sitemap and robots.txt, and preserve real HTTP 404 responses for unknown paths. New examples follow the existing sandbox mount/cleanup contract; external-runtime examples include companion files and clear execution limits.

**Constraints:** No DNS changes, no indexing guarantees, no weakening preview CSP, no large GS datasets, no replacement of the original 94 examples or saved notes. Google Analytics remains installed. Use habergeon for GitHub operations. Do not confuse a preview of external code with execution of that code.

## Tasks

- [x] Add failing tests for canonical static pages, safe Markdown, crawlable internal links, sitemap coverage, robots policy and missing-page behavior.
- [x] Implement `scripts/build-search.mjs` and `scripts/search-pages.mjs`; add build integration and visible document links in the home/workspace.
- [x] Add 550 unit-specific editable examples, with companion sources where compiler/Node/device capabilities require them. Independent authors own disjoint series directories and metadata files.
- [x] Integrate example metadata, download links and accurate generated learning documents. Update source coverage tests to 644 and validate metadata/file paths.
- [x] Run syntax/type/content/build/Pages checks. Inspect representative interactive examples in each domain, cleanup, responsive layout and console errors. Report unexecuted external environments.
- [x] Commit and push, verify deployed canonical pages and sitemap, then submit the sitemap through the verified URL-prefix Search Console property. Indexing remains Google's decision.

## Review focus

- Hash bookmarks and imported v1/v2/v3 archives keep their unit identities.
- Static Markdown links must resolve to published pages or repository source, never nonexistent `/docs` or `/src` URLs.
- No raw Markdown HTML execution or copied user notes in public output.
- Examples must show the concept named in their lesson, with actual controls/calculations and cleanup; generic title-only templates do not satisfy coverage.
- GPU/compiler/Node limitations are visible, and unavailable capabilities must not report a false successful experiment.

## Evidence

Initial working tree clean at dd2f599. Official Google guidance: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics and https://developers.google.com/search/docs/crawling-indexing/url-structure discourage fragment-based content routes. Static documents avoid changing the existing workspace storage and routing interfaces.

- 550 new example sources and22 metadata maps added.40 Node tests pass; 644sources syntax+checkJs pass.25 TypeScript companion checks and25 Svelte component compilations pass.25 WAT modules compiled and corresponding Node checks passed.
- Independent review found repeated Worker creation and stale Offscreen fallback state. Fixed pools, retired resources and authoritative input state; controlled mount checks confirm bounded resources and preserved pointer state.
- Browser initial run exposed existing React02 ResizeObserver loop after scrollable previews; resize now schedules outside observer delivery and fixes canvas CSS height.
- Production build and Pages size check passed; largest asset remains6,904,626bytes. Fullbrowser644run anddeployment continue.
- Browser mount/dispose coverage completed across split runs: the first 448 units passed before the long-running test tab stalled; a separate 196-unit run (WGSL through Playwright) passed without failures. The harness now disposes on the ready message rather than depending on a background-tab delay. This checks initial execution and cleanup, not every exercise interaction or external runtime.
- React snapshot/updater interaction produced 1 versus 3 as expected. Companion captions.vtt downloaded through the UI. Public React document rendered at desktop and mobile width with no horizontal overflow.
- External limitations: WebGPU adapter execution and the complete Playwright runner suite remain unverified in this environment. Svelte companions compile; WASM companion modules and Node assertions pass separately.
- Deployed dbd4e13 via habergeon. GitHub verify and Cloudflare Pages checks succeeded. Public sitemap responds 200 with valid XML and 669 URLs; canonical learning document responds 200; unknown learning path responds 404.
- Search Console accepted sitemap.xml on 2026-10-21. Google live URL test reports crawl allowed and page fetch successful, but the Sitemaps report still says "Couldn't fetch" with zero discovered pages after one resubmission. This is unresolved; do not report sitemap processing or indexing as complete.

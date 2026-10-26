# Frontory

**Learn · Experiment · Archive** — A web learning space for studying frontend technologies, experimenting with code, and recording your experience. The name combines Frontend + Story + Repository.

[한국어](README.md) · English

[User guide](docs/en/learning-workspace.md) · [Technology map](docs/en/labs/README.md) · [Learning roadmap](docs/en/roadmap.md) · [Deployment guide (Korean)](docs/deployment.md) · [Search indexing guide (Korean)](docs/search-indexing.md) · [Advertising operations checklist (Korean)](docs/adsense.md) · [Contributing](CONTRIBUTING.en.md)

## What can you do?

- Explore 23 technology series and 644 learning units by field and stage. Each series has 4 stages and 28 units.
- Read learning goals and exercises, mark your own progress, and take notes in Markdown.
- Edit JavaScript/TypeScript in Monaco Editor in the first WebGL scene and check the results.
- Export all learning records as a JSON file and import them in another browser.

The project currently provides **644 learning documents and examples linked to individual units**. Browser experiments are distinguished from example files that run in a separate environment. Change the code as you follow each unit's goals, exercise steps, comparison variables, and completion criteria. Providing an example does not mean the learning is complete. See the [example guide](docs/en/examples.md) for WebGPU support requirements, limits of the GS educational CPU viewer, Svelte components, and separate execution of WebAssembly and Playwright.

| Field        | Series                                                                                 |
| ------------ | -------------------------------------------------------------------------------------- |
| Fundamentals | JavaScript, TypeScript, HTML, CSS                                                      |
| Frameworks   | React, Vue, Svelte                                                                     |
| Graphics     | WebGL, Canvas 2D, SVG, Three.js, Gaussian Splatting, WebGPU, React Three Fiber, PixiJS |
| Shader       | GLSL, WGSL                                                                             |
| Animation    | GSAP, Motion                                                                           |
| Engineering  | Web Workers, OffscreenCanvas, WebAssembly                                              |
| Testing      | Playwright                                                                             |

## Storage and privacy

No login is required. Code, notes, and progress are stored in the current browser's localStorage and are not synchronized with an account or server. Clearing browser data can erase them, so back them up through **Learning archive → Export JSON**. JSON is an unencrypted file.

Storage differs between browsers, profiles, and addresses (protocol/host/port). When moving from a local development address to the public site or changing domains, export from the old address and import at the new one. [Storage and privacy guide](docs/en/privacy.md)

## Local development

Use Node.js 24 and pnpm 10.34.5. The validation environment uses Node 24.16.0.

```sh
git clone https://github.com/habergeon/frontory.git
cd frontory
pnpm install --frozen-lockfile
pnpm dev
```

The default address is http://127.0.0.1:5173. This command exposes the development server only on your local computer.

```sh
pnpm test
pnpm build
pnpm check:deploy
pnpm preview
```

The build includes type checking, preview runtime generation, and generation of searchable public learning documents and a sitemap. Static output is written to dist/. Monaco, the TypeScript worker, and Three.js may cause large-bundle warnings. See the [deployment guide (Korean)](docs/deployment.md) for Cloudflare Pages deployment.

## Project structure

- src/app: technology browsing, learning screens, progress, and JSON backups
- src/editor: Monaco JS/TS checks and transformation
- src/preview: sandbox previews and error handling
- src/shared: storage, backup validation, and safe Markdown rendering
- src/labs/01-scene: first runnable example
- docs/labs/분야/기술/학습단위/README.md: learning documents
- content/curricula/*.json: source learning content for each series of 28 units
- content/catalog-v2.json: compatibility baseline for the existing 94 unit IDs, paths, and backups
- src/app/catalog.json: browsing metadata generated from the content
- tests: regression checks for storage, backups, documents, and previews

Existing storage keys and WebGL unit IDs are retained for backup compatibility. Review the backup migration policy when adding new units.

Edit curricula in `content/curricula/*.json` and run `pnpm build:curricula` to update documents and indexes together. `pnpm check:curricula` checks that generated files match their sources. The existing `content/series.json` records the initial 3-unit design and is not a current generation input. WebGL documents are maintained directly at their existing paths.

## Public repository guidelines

Do not commit personal notes, secret keys, large GS datasets, or assets you are not authorized to use. Ordinary PLY is not always GS data, and GS picking may differ from mesh raycasting. renderer.info does not measure total GPU VRAM. Spark is a candidate for a future GS runtime and is not installed yet.

Dependency versions are pinned in pnpm-lock.yaml. The code uses the [ISC](LICENSE) license; external libraries and data have separate licenses.

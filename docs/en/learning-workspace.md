# Using the Frontory learning workspace and storage

All 28 units provide independent HTML practice and step examples in Korean and English. Implementation readiness `verified` means unit execution and content review are complete; learner progress is separate. The deployed production baseline is `0338dbe857265441d76d12b073170e24ac794cb5`. The subsequent 24-unit expansion is locally validated and has not been pushed or deployed. Chromium/SwiftShader validation does not establish behavior on real devices or every GPU, or learner assessment.

## Getting started

Open **Browse series** in Frontory and choose a technology to study. Select a stage, read the learning document, complete the exercises, and take notes. If you are new, try changing the cube color or camera position in the first WebGL scene. You can learn in the browser without installation or login.

See the [README](../../README.en.md) for local development and the [deployment guide (Korean)](../deployment.md) for web publishing. Use the same browser, profile, and address to restore the same saved records.

## Three areas and documents

Use **Browse series** to explore 23 series by field or technology name. Stage cards in the selected series show their order and completion counts. Expand a stage's index to choose a unit or use the previous and next buttons. In **My learning progress**, manually mark a unit as not started, in progress, or complete. Completion rates count only units you explicitly mark complete. Existing notes are not automatically marked complete.

- **Practice result**: Runs your edited code in a separate sandbox iframe. Use buttons, keyboard, and camera controls as described in the example comments. In OrbitControls scenes, drag or use the wheel to move the camera.
- **Code**: Edit JavaScript/TypeScript modules in Monaco Editor. After input pauses for 600ms, code is checked for syntax and types before being applied. Errors appear as underlines and a clickable error list; the last working scene is retained. Runtime errors appear in the result area.
- **Markdown notes**: Switch between editing and preview, and download .md files. Record goals, key concepts, changed variables and expectations, actual results, lessons learned, and remaining questions.

At 1100px and above, all three areas are shown together. Smaller screens use result/code/notes tabs. Open the current unit, full roadmap, and this guide from **Learning documents** at the top. Examples requiring a separate execution environment show their supported scope and downloadable files. A preview does not mean an external runner has also executed. Notes and progress for those units are saved in the same way.

Each series has 4 stages and 28 units. Outside WebGL, the existing 01, 02, and 03 examples are linked at positions 1, 14, and 28. Addresses and storage IDs are retained, preserving earlier bookmarks, notes, and edited code. Completion rates use the new 28-unit basis and may appear lower than before the expansion.

## Execution code contract

The original is `src/labs/<unitID>/example.js`. Check the [environments and limits for each example](examples.md). `export function mount({ THREE, OrbitControls, container })` creates the scene and returns a cleanup function. Libraries are supplied at lockfile versions; do not install npm packages or use external imports inside the editor. JavaScript/TypeScript syntax highlighting, completion, syntax checks, and type diagnostics are supported. TypeScript runs as actual JavaScript output transformed in a browser worker. JSX/TSX, multiple files, external packages, and GLSL-specific diagnostics are not yet supported.

Ctrl+Space opens completion, F8 moves to the next diagnostic, and Shift+Alt+F formats code. Clicking an error jumps to its line. To ease entry into learning, strict checks are off and JavaScript checkJs is on. DOM and explicitly declared basic types are checked, but injected THREE/OrbitControls are any, so full Three.js API type checking and completion are not guaranteed. You can annotate the mount argument with `: StudyContext`. Monaco's built-in TypeScript engine is separate from the project's pnpm typecheck.

During typing or checking, or when checks fail, the last working result remains visible. Code with errors is also saved. If saved code has errors on refresh, no scene appears until you fix them. **Run again** executes the last code that passed checks in a new frame. **Restore original code** changes code and language back to the original JavaScript after confirmation, keeping notes.

## Exporting and importing all learning records as JSON

Expand **Learning archive** and use **Export JSON** to download all 644 units as one actual `.json` file. It includes each unit's code text, Markdown notes, JavaScript/TypeScript selection, progress, save time, and the currently viewed unit. Even unedited units include current defaults. Files written in separate projects are not automatically included. Records previously saved with empty code in document-only units are preserved. Choose **Use original code** to load a new example while keeping notes.

Run the same project in another browser or computer and select the file with **Import JSON**. After validation, the backup date, units, and restoration scope are shown. **Replace all and restore** replaces content in that scope with the file contents and navigates to the saved unit. Canceling or failed file validation leaves existing content unchanged. Export any existing work you need first. Example code from the file passes through the existing Monaco checks and sandbox execution path.

The new format is `format: "frontory"`, `version: 3` and replaces all 644 units. Empty notes are restored as empty. Existing Frontory `version: 2` files replace only the original 94 units and preserve records for the 550 new units. Existing `format: "web-gl-study"`, `version: 1` files replace only the 28 WebGL units and preserve current content for the remaining units. All units for each version must be present. Missing, duplicate, or unknown units, invalid types or versions, and files over 10 MiB are rejected. Future catalog additions also require explicit compatibility handling. Browser storage capacity may be smaller than the file size limit.

A full import writes once to the `web-gl-study:all:v1` key to prevent partial replacement on failure. After success, this full snapshot takes priority over existing per-unit keys, and subsequent edits update it too. Existing per-unit storage remains readable. If an import fails because of storage capacity or permissions, existing content remains and an error appears.

Export uses data read by the current tab. If there are storage read/write warnings, a warning appears after download, so keep previous backups and check the file contents. Concurrent changes across tabs are not merged automatically. JSON is unencrypted text and is not uploaded to a server. Project learning documents, installed packages, GS files, and temporary camera manipulation state are excluded. It is for continuing work in the same learning project, not a standalone app.

## localStorage

localStorage was chosen over IndexedDB for its simplicity when saving small text. The key is `web-gl-study:unit:v1:<unitID>`; data contains version=1, code, notes, updatedAt, the selected JavaScript/TypeScript language as language, and learning status as progress. Storage keys and WebGL IDs are retained for compatibility. Missing language defaults to JavaScript; missing progress defaults to not started. Each edit event attempts to save. Records are restored after switching units or refreshing, and the save time and failure state are shown.

Even when saving fails, a copy remains in the current page's memory so you can return after switching units. **Refreshing or closing after a failure may lose your work: download your notes and copy your code.** Use the retry save button to try again. Corrupted JSON is not deleted automatically. A warning explains that saving a new edit in that unit may replace the existing corrupted value.

### Limits

- Storage is per browser, profile, and origin (protocol/host/port). localhost and 127.0.0.1, and development and preview ports, are separate.
- Clearing browser data, closing private browsing, capacity limits, or access denial may cause saving to fail or content to disappear. This is not a permanent backup.
- Browser storage does not automatically edit project source or docs. Manually merge downloaded Markdown into documents.
- There is no real-time synchronization across tabs or server synchronization. If multiple tabs edit the same unit, the last save may win.
- Large data, images, and GS files are not stored. Large text can also slow synchronous storage and rendering.

## Isolation and Markdown safety

The iframe uses only sandbox=allow-scripts and is not granted allow-same-origin. It isolates access to the parent DOM/localStorage, and CSP restricts external networks, forms, and nested frames except the required execution bootstrap and blob module. Existing browser security settings and Vite CORS are not relaxed.

react-markdown skips raw HTML and restricts dangerous URLs. It does not execute HTML scripts/event handlers or automatically request external images.

This structure separates ordinary syntax and runtime errors from the editing UI. It does not guarantee a malicious-code execution service or CPU/GPU usage limits. Infinite loops or excessive memory allocation can freeze the browser, so run only your own short learning code. You may need to close the tab if it freezes.

## Official references

- [Monaco Editor](https://github.com/microsoft/monaco-editor): Checks use local workers, without a CDN. The large language engine has an initial loading cost and bundle warnings.

- [iframe sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [esbuild API](https://esbuild.github.io/api/)

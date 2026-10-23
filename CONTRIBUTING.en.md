# Expanding Frontory content

[한국어](CONTRIBUTING.md) · English

1. Maintain WebGL documents at the existing `docs/labs/graphics/webgl/<단위>/README.md` paths. For other series, `content/curricula/<시리즈>.json` is the source. Write goals, prerequisites, concept explanations, exercises, variables, completion criteria, self-checks, and official references.
2. Run `pnpm build:curricula` to generate Markdown and `src/app/catalog.json` together. Editing only generated documents makes them inconsistent with the source and fails the build checks. Actual experiment results belong to the user's notes and are not included in content generation.
3. Do not change unit IDs: they identify browser storage and backups. Preserve `content/catalog-v2.json` as the compatibility baseline for the existing 94 units. When adding units, update the backup version and related tests together. `content/series.json` records the initial design history.
4. If no built-in runnable example exists, label the unit as a document-based implementation exercise. For a new runtime, design mount/dispose, errors, support checks, and isolation first, and add only packages needed for that technology. Vue/React/Svelte compilers are separate from the current WebGL JS module runtime.
5. Run `pnpm check:curricula`, `pnpm test`, and `pnpm build`. Document link checks cover all local Markdown links and required sections in 644 documents. Each series has 28 units in four stages, with 7 units per stage.
6. Verify stage navigation, document opening, note preservation, progress, JSON round trips, and resizing in the browser. Use a separate local preview port instead of an origin containing user data.

Record performance results after actual measurement. Do not commit large models, personal data, or secret values. Review code and document changes before committing; public pushes and deployment require separate authorization.

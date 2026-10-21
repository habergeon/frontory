# Series Curricula Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement and verify the integration. Independent curriculum authors follow dispatching-parallel-agents.

**Goal:** Give all 23 series a 28-unit learning path with explicit goals, concepts, exercises and evidence of completion.

**Architecture:** Retain WebGL's 28 units and every existing storage ID. Expand the other 22 series from 3 to 28 units using reviewed content JSON, then generate Markdown and the UI catalog together. Distinguish the existing 94 example sources from 550 document-guided exercises; do not fabricate executable examples or learning results.

**Tech Stack:** Markdown, JSON, Node, React/TypeScript, existing localStorage.

**Spec:** The user asks to deepen each series to at least the curriculum level of WebGL Journey, including learning objectives and practice content. This plan is the implementation specification.

## Global Constraints

- Four stages of seven units for each series; units are not fixed calendar days.
- Each new lesson includes prerequisites, explained concepts, observable outcomes, ordered practice, controlled variables, completion criteria, self-check questions and official references.
- Preserve all 94 IDs, source files, saved drafts and existing document paths. Place the three legacy units at positions 1, 14 and 28 within their series.
- No completed results, guaranteed time-to-mastery, downloaded large datasets, or weakened sandbox policies.
- Frontory v3 exports all 644 units. Frontory v2 imports exactly the original 94; WebGL v1 imports 28. Older imports preserve units outside their scope.

## Review Focus

- Old v2 archives must remain valid and must not erase new-unit notes.
- Missing or duplicate archive entries must still be rejected before mutation.
- Document-only units must not claim that the browser executes their tasks.
- Every stage must contain seven units and every document link must resolve.
- Existing bookmarks and example IDs must keep their meaning despite reordered curricula.

## Tasks

- [x] Author `content/curricula/*.json` for the 22 series; verify official references and topic progression by domain.
- [x] Add `scripts/build-curricula.mjs` to generate catalog and lesson documents from content, retaining original metadata in `content/catalog-v2.json`.
- [x] Add tests for 23×28 coverage, rich unit content, ID/path preservation and generator reproducibility; confirm the coverage test fails before generation.
- [x] Test v1/v2/v3 archive parsing and scoped restore preservation before changing `src/shared/backup.ts` and `src/app/BackupControls.tsx`.
- [x] Clarify document-guided practice in Workspace, PracticeGuide, series navigation and homepage; update roadmap and storage documentation.
- [x] Run `pnpm test`, `pnpm build`, `pnpm check:deploy`; inspect representative documents and UI routes, notes and archive compatibility in the browser.
- [x] Obtain an independent final review, fix material findings, commit and publish through the existing GitHub/Cloudflare flow.

## Progress and decisions

- Existing catalog: 23 series, 94 units; non-WebGL series each have three examples. Working tree was clean before this task.
- Content authors own disjoint JSON files. Root owns generation, catalog, backup migration and UI integration.
- Existing main checkout is retained under the established user-authorized local editing and deployment workflow; no parallel agent edits application files.
- Korean prose uses humanize-korean rulebook review for concrete instructions and preserves API names and technical facts.
- The vendor skill copy lacked its reference file; the complete rulebook was located and read under `C:/Users/johjh/.agents/skills/humanize-korean/references/quick-rules.md`.
- Archive tests first failed on unsupported v3 and rejected historical v2 size, then passed after scoped compatibility handling. Curriculum coverage correctly fails against the original 94-unit catalog until generation.

## Verification

- All 37 tests, production build, generated-content check and Pages asset check passed. Largest asset: 6,904,626 bytes.
- Independent review corrected GS projection/SH explanations, WebGPU usage flags, React deferred rendering, Motion grouping and Playwright fixture assumptions.
- Browser verified retained old notes, 28-unit navigation, document-guided lesson display, v2 import with preservation of new notes, reload persistence, and v3 JSON download containing all 644 entries.
- Mobile 390px viewport has no horizontal overflow; console error log empty.
- Existing 94 examples retained. New 550 exercises are documented implementation assignments, not executed or certified implementations.
- Commit/public deployment verification follows this local validation.

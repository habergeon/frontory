# Playwright · 11 File Upload

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Persistent Data and File Round Trips · External example · preview instructions · Storage ID: `playwright-step-11`

## Goals and learning outcomes

- Create a valid v3 backup that retains all 644 units while modifying only the notes of one or more units.
- Distinguish file selection, validation, restoration confirmation, and reloading, and verify that the edited notes are restored to the corresponding IDs.

## Prerequisites

Prepare the experiment results for Event order and File validation from Unit 10, “Download Events”.

## Key concepts and explanations

### File input

setInputFiles sets files on input[type=file]. When using a file chooser, register the wait before clicking.

### Restoration result

A current Frontory v3 backup must contain unique IDs and drafts for all 644 units. Actual storage is replaced only after file selection, validation, and explicit restoration confirmation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare a complete v3 backup by exporting JSON from a dedicated Frontory test origin. In tests/day-11.spec.ts, verify that the units array length is 644 and the unique ID count is 644, then create a file that changes only draft.notes for one unit while retaining every entry.
2. Use setInputFiles on the file input named “학습 백업 JSON” found with getByLabel. Check that existing notes remain unchanged even after the restoration confirmation screen appears. Explicitly click the “전체 교체하여 복원” button, check completion and the notes for the corresponding ID, then reload and check again.
3. In a second independent test, retain all 644 entries and modify only draft.notes for three different units. Repeat the same file-input and confirmation procedure, and record whether notes for the three IDs and values for an unmodified sample ID match the file contents. Do not use a v3 file containing only one entry as a valid backup.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| number of units whose notes are edited within the full backup | include all 644 entries and edit notes for only 1 unit | include all 644 entries and edit notes for only 3 units | Both files preserve the complete-entry contract, pass validation, and restore edited notes to the correct IDs after explicit confirmation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both files have a units length and unique ID count of 644, and the input files and restoration results are recorded for the 1-unit and 3-unit modification conditions.
- [ ] Existing values remain unchanged before clicking the restoration confirmation button. After clicking it and after reloading, each edited ID’s value matches the file. An unmodified sample ID also matches the file.

## Self-check

1. Why does the number of units with notes differ from the total number of entries in the units array of a v3 backup?
2. Which assertions distinguish the storage state immediately after file selection from the state after confirming “전체 교체하여 복원”?

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-11/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-11/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-11/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-11/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Download Events](../10/README.md) · [Next: Invalid Files and Preservation](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

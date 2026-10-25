# Playwright · 14 Saving, Downloading, and Restoring

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Persistent Data and File Round Trips · External example · preview instructions · Storage ID: `playwright-02`

## Goals and learning outcomes

- Learning outcome: explain the role of Round-trip contract. Input cases: empty notes, Korean text, and error files.
- Deliverable: notes after the round trip and error-preservation results. Explain the rationale for handling Isolation, linking it to the code.

## Prerequisites

Prepare the experiment results for Identifier and Round trip from Unit 13, “Per-Item Storage Isolation”.

## Key concepts and explanations

### Round-trip contract

A backup file must be importable to reproduce the same data. Check file creation and storage restoration together.

### Isolation

Do not target an origin used for everyday work. Separate files and storage for each test.

## Practice setup

Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-14.spec.ts in a separate practice project, use a dedicated Frontory test origin. Write the sequence: write notes → download v3 JSON for all 644 units → edit notes → import the same complete file → validation confirmation screen → click the “전체 교체하여 복원” button → reload.
2. Input conditions: empty notes, Korean text, and error files. Baseline: valid backup. Run under the baseline conditions, then record observations and errors in notes/day-14.md.
3. Variable: file; changed value: invalid JSON. Run again through the same input path. Deliverable to save: notes after the round trip and error-preservation results. Hypothesis to check: Restore a valid file and preserve existing values for an invalid file. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| file | valid backup | invalid JSON | Restore a valid file and preserve existing values for an invalid file. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: notes after the round trip and error-preservation results. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Round-trip contract and Isolation. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Round-trip contract affect in this exercise? Input cases: empty notes, Korean text, and error files.
2. Variable: file. Hypothesis to check: Restore a valid file and preserve existing values for an invalid file. Did the actual results agree with the hypothesis? Explain the evidence in terms of Isolation.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../src/labs/playwright-02/example.js) · [Runtime environments and limits](../../../../examples.md)

The screen generates Playwright test source for separate execution. Run it in a Node environment; displaying the preview does not mean the E2E tests passed.

- [lesson.spec.mjs](../../../../../../src/labs/playwright-02/lesson.spec.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Per-Item Storage Isolation](../units/13/README.md) · [Next: Keyboard Navigation](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

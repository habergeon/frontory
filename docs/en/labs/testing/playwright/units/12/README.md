# Playwright · 12 Invalid Files and Preservation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Persistent Data and File Round Trips · External example · preview instructions · Storage ID: `playwright-step-12`

## Goals and learning outcomes

- Learning outcome: explain the role of Validation failure. Input cases: existing notes and two error files.
- Deliverable: error guidance, existing values, and values after reloading. Explain the rationale for handling Negative path, linking it to the code.

## Prerequisites

Prepare the experiment results for File input and Restoration result from Unit 11, “File Upload”.

## Key concepts and explanations

### Validation failure

Invalid JSON must not erase existing data. Examine syntax errors and schema errors separately.

### Negative path

Error guidance is also part of the user contract. Check that normal work remains possible after a failure.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-12.spec.ts in a separate practice project, create existing notes, then upload malformed JSON and a file with an invalid schema. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: existing notes and two error files. Baseline: JSON syntax. Run under the baseline conditions, then record observations and errors in notes/day-12.md.
3. Variable: error; changed value: schema mismatch. Run again through the same input path. Deliverable to save: error guidance, existing values, and values after reloading. Hypothesis to check: Preserve existing data for both errors. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline    | Change          | Expected change / hypothesis            |
| -------- | ----------- | --------------- | --------------------------------------- |
| error    | JSON syntax | schema mismatch | Preserve existing data for both errors. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: error guidance, existing values, and values after reloading. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Validation failure and Negative path. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Validation failure affect in this exercise? Input cases: existing notes and two error files.
2. Variable: error. Hypothesis to check: Preserve existing data for both errors. Did the actual results agree with the hypothesis? Explain the evidence in terms of Negative path.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-12/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-12/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-12/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-12/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: File Upload](../11/README.md) · [Next: Per-Item Storage Isolation](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

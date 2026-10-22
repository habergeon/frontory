# Playwright · 13 Per-Item Storage Isolation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Persistent Data and File Round Trips · External example · preview instructions · Storage ID: `playwright-step-13`

## Goals and learning outcomes

- Learning outcome: explain the role of Identifier. Input cases: note A and note B.
- Deliverable: mapping table of input and restored values for each item. Explain the rationale for handling Round trip, linking it to the code.

## Prerequisites

Prepare the experiment results for Validation failure and Negative path from Unit 12, “Invalid Files and Preservation”.

## Key concepts and explanations

### Identifier

Notes are associated with learning unit IDs. Storing by title or array position may mix items.

### Round trip

Visit another item and return to check isolation. Testing only one item misses this check.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-13.spec.ts in a separate practice project, enter different notes in two learning units and alternate between them. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: note A and note B. Baseline: A→B. Run under the baseline conditions, then record observations and errors in notes/day-13.md.
3. Variable: navigation; changed value: A→B→A. Run again through the same input path. Deliverable to save: mapping table of input and restored values for each item. Hypothesis to check: Display each note only in its own unit. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| navigation | A→B | A→B→A | Display each note only in its own unit. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: mapping table of input and restored values for each item. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Identifier and Round trip. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Identifier affect in this exercise? Input cases: note A and note B.
2. Variable: navigation. Hypothesis to check: Display each note only in its own unit. Did the actual results agree with the hypothesis? Explain the evidence in terms of Round trip.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-13/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-13/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-13/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-13/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Invalid Files and Preservation](../12/README.md) · [Next: Saving, Downloading, and Restoring](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

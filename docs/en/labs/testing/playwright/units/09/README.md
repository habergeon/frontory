# Playwright · 09 Saving and Reloading

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Persistent Data and File Round Trips · External example · preview instructions · Storage ID: `playwright-step-09`

## Goals and learning outcomes

- Learning outcome: explain the role of Persistent state. Input cases: Korean and empty notes.
- Deliverable: note values before and after reloading. Explain the rationale for handling Completion signal, linking it to the code.

## Prerequisites

Prepare the experiment results for New context and Test data from Unit 8, “BrowserContext Isolation”.

## Key concepts and explanations

### Persistent state

An input’s DOM value may disappear after reloading. Check actual storage restoration through the user interface.

### Completion signal

Wait for the saved state before reloading. Calling reload without waiting creates a race.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-9.spec.ts in a separate practice project, write notes, check the save indicator, then check toHaveValue after page.reload. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Korean and empty notes. Baseline: two lines of Korean text. Run under the baseline conditions, then record observations and errors in notes/day-9.md.
3. Variable: note; changed value: empty string. Run again through the same input path. Deliverable to save: note values before and after reloading. Hypothesis to check: Restore both values according to the storage contract. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| note | two lines of Korean text | empty string | Restore both values according to the storage contract. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: note values before and after reloading. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Persistent state and Completion signal. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Persistent state affect in this exercise? Input cases: Korean and empty notes.
2. Variable: note. Hypothesis to check: Restore both values according to the storage contract. Did the actual results agree with the hypothesis? Explain the evidence in terms of Completion signal.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-09/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-09/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-09/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-09/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: BrowserContext Isolation](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

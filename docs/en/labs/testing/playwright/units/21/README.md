# Playwright · 21 Reading Traces

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Asynchrony, Isolation, and Diagnosis · External example · preview instructions · Storage ID: `playwright-step-21`

## Goals and learning outcomes

- Learning outcome: explain the role of Execution evidence. Input cases: an intentionally incorrect document expectation.
- Deliverable: diagnostic notes linking actions, DOM, and requests. Explain the rationale for handling Diagnosis, linking it to the code.

## Prerequisites

Prepare the experiment results for Signal collection and Filter rationale from Unit 20, “Console and PageError”.

## Key concepts and explanations

### Execution evidence

A trace provides actions and DOM·network clues. It shows events before and after a failure more fully than a single screenshot.

### Diagnosis

A trace does not automatically establish the cause. Compare the last successful condition and the first failed condition.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-21.spec.ts in a separate practice project, set trace:on-first-retry or retain-on-failure and open the failure file. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: an intentionally incorrect document expectation. Baseline: off. Run under the baseline conditions, then record observations and errors in notes/day-21.md.
3. Variable: recording; changed value: retain on failure. Run again through the same input path. Deliverable to save: diagnostic notes linking actions, DOM, and requests. Hypothesis to check: Inspect the state immediately before the failure. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable  | Baseline | Change            | Expected change / hypothesis                      |
| --------- | -------- | ----------------- | ------------------------------------------------- |
| recording | off      | retain on failure | Inspect the state immediately before the failure. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: diagnostic notes linking actions, DOM, and requests. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Execution evidence and Diagnosis. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Execution evidence affect in this exercise? Input cases: an intentionally incorrect document expectation.
2. Variable: recording. Hypothesis to check: Inspect the state immediately before the failure. Did the actual results agree with the hypothesis? Explain the evidence in terms of Diagnosis.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-21/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-21/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-21/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-21/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Console and PageError](../20/README.md) · [Next: Fixtures and Setup Responsibility](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Playwright · 26 Allowed Differences and Review

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visual Regression and Execution Strategy · External example · preview instructions · Storage ID: `playwright-step-26`

## Goals and learning outcomes

- Learning outcome: explain the role of Tolerance. Input cases: a 2px spacing change and the original.
- Deliverable: diff location and a decision on updating the baseline. Explain the rationale for handling Baseline update, linking it to the code.

## Prerequisites

Prepare the experiment results for Determinism and Scope from Unit 25, “Creating a Visual Baseline”.

## Key concepts and explanations

### Tolerance

A large tolerance may hide actual UI errors. Connect the reason for a tolerance to the cause of pixel differences.

### Baseline update

Overwriting a baseline with a new image must be an approved change. Read the diff and check that the change is intended.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-26.spec.ts in a separate practice project, introduce an intentional spacing change, review the diff, and document the rationale for the tolerance. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a 2px spacing change and the original. Baseline: original. Run under the baseline conditions, then record observations and errors in notes/day-26.md.
3. Variable: spacing; changed value: add 2px. Run again through the same input path. Deliverable to save: diff location and a decision on updating the baseline. Hypothesis to check: Reveal layout changes in the comparison. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change  | Expected change / hypothesis             |
| -------- | -------- | ------- | ---------------------------------------- |
| spacing  | original | add 2px | Reveal layout changes in the comparison. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: diff location and a decision on updating the baseline. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Tolerance and Baseline update. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Tolerance affect in this exercise? Input cases: a 2px spacing change and the original.
2. Variable: spacing. Hypothesis to check: Reveal layout changes in the comparison. Did the actual results agree with the hypothesis? Explain the evidence in terms of Baseline update.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-26/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-26/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-26/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-26/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Creating a Visual Baseline](../25/README.md) · [Next: CI Execution and Artifacts](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Playwright · 25 Creating a Visual Baseline

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visual Regression and Execution Strategy · External example · preview instructions · Storage ID: `playwright-step-25`

## Goals and learning outcomes

- Learning outcome: explain the role of Determinism. Input cases: fixed screen and font conditions.
- Deliverable: baseline image, environment, and change diff. Explain the rationale for handling Scope, linking it to the code.

## Prerequisites

Prepare the experiment results for Retry and Root cause from Unit 24, “Retries and Flakiness”.

## Key concepts and explanations

### Determinism

Fonts, viewport, DPR, and time affect pixel results. A baseline needs fixed conditions.

### Scope

Distinguish moving GPU scenes from static UI. If you exclude a scene, provide other functional verification.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-25.spec.ts in a separate practice project, stop rotation, wait for fonts to be ready, then save the UI with toHaveScreenshot. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: fixed screen and font conditions. Baseline: playing. Run under the baseline conditions, then record observations and errors in notes/day-25.md.
3. Variable: animation; changed value: stopped. Run again through the same input path. Deliverable to save: baseline image, environment, and change diff. Hypothesis to check: Repeated comparisons may become stable under stopped conditions. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable  | Baseline | Change  | Expected change / hypothesis                                     |
| --------- | -------- | ------- | ---------------------------------------------------------------- |
| animation | playing  | stopped | Repeated comparisons may become stable under stopped conditions. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: baseline image, environment, and change diff. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Determinism and Scope. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Determinism affect in this exercise? Input cases: fixed screen and font conditions.
2. Variable: animation. Hypothesis to check: Repeated comparisons may become stable under stopped conditions. Did the actual results agree with the hypothesis? Explain the evidence in terms of Scope.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-25/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-25/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-25/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-25/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Retries and Flakiness](../24/README.md) · [Next: Allowed Differences and Review](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Playwright · 24 Retries and Flakiness

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visual Regression and Execution Strategy · External example · preview instructions · Storage ID: `playwright-step-24`

## Goals and learning outcomes

- Learning outcome: explain the role of Retry. Input cases: 10 repetitions of the same test.
- Deliverable: first-attempt and retry results and the rationale for the fix. Explain the rationale for handling Root cause, linking it to the code.

## Prerequisites

Prepare the experiment results for Parallelism and Independence from Unit 23, “Parallel Execution and Collisions”.

## Key concepts and explanations

### Retry

A successful retry does not erase the initial failure. Treat flaky results separately.

### Root cause

Check waiting conditions, isolation, and resource contention first. Increasing the retry count alone is not a solution.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-24.spec.ts in a separate practice project, record the first-attempt failure rate through repeated runs and fix one cause. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 10 repetitions of the same test. Baseline: 0. Run under the baseline conditions, then record observations and errors in notes/day-24.md.
3. Variable: retries; changed value: 1. Run again through the same input path. Deliverable to save: first-attempt and retry results and the rationale for the fix. Hypothesis to check: Distinguish hidden initial failures in the report. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| retries | 0 | 1 | Distinguish hidden initial failures in the report. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: first-attempt and retry results and the rationale for the fix. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Retry and Root cause. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Retry affect in this exercise? Input cases: 10 repetitions of the same test.
2. Variable: retries. Hypothesis to check: Distinguish hidden initial failures in the report. Did the actual results agree with the hypothesis? Explain the evidence in terms of Root cause.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-24/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-24/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-24/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-24/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Parallel Execution and Collisions](../23/README.md) · [Next: Creating a Visual Baseline](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

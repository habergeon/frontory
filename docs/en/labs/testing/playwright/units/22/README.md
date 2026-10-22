# Playwright · 22 Fixtures and Setup Responsibility

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visual Regression and Execution Strategy · External example · preview instructions · Storage ID: `playwright-step-22`

## Goals and learning outcomes

- Learning outcome: explain the role of Fixture. Input cases: a successful test and a failure partway through.
- Deliverable: setup and cleanup logs and remaining files. Explain the rationale for handling Teardown, linking it to the code.

## Prerequisites

Prepare the experiment results for Execution evidence and Diagnosis from Unit 21, “Reading Traces”.

## Key concepts and explanations

### Fixture

A fixture combines repeated setup and cleanup. It must not create hidden global state.

### Teardown

Remove temporary files and contexts according to the test lifetime. The cleanup path must run even after failure.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-22.spec.ts in a separate practice project, create a fixture that provides test notes and a temporary backup directory. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a successful test and a failure partway through. Baseline: normal. Run under the baseline conditions, then record observations and errors in notes/day-22.md.
3. Variable: termination; changed value: assertion failure. Run again through the same input path. Deliverable to save: setup and cleanup logs and remaining files. Hypothesis to check: Clean up test resources even after failure. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| termination | normal | assertion failure | Clean up test resources even after failure. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: setup and cleanup logs and remaining files. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Fixture and Teardown. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Fixture affect in this exercise? Input cases: a successful test and a failure partway through.
2. Variable: termination. Hypothesis to check: Clean up test resources even after failure. Did the actual results agree with the hypothesis? Explain the evidence in terms of Teardown.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-22/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-22/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-22/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-22/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reading Traces](../21/README.md) · [Next: Parallel Execution and Collisions](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

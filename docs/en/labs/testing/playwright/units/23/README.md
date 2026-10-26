# Playwright · 23 Parallel Execution and Collisions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visual Regression and Execution Strategy · External example · preview instructions · Storage ID: `playwright-step-23`

## Goals and learning outcomes

- Learning outcome: explain the role of Parallelism. Input cases: two tests of the same backup flow.
- Deliverable: file paths and each test’s results. Explain the rationale for handling Independence, linking it to the code.

## Prerequisites

Prepare the experiment results for Fixture and Teardown from Unit 22, “Fixtures and Setup Responsibility”.

## Key concepts and explanations

### Parallelism

Concurrent execution can cause shared filenames to collide. Use output paths specific to the worker or test.

### Independence

A test must not depend on data created by a preceding test. It must produce the same result when run alone.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-23.spec.ts in a separate practice project, separate download paths with testInfo.outputPath and change workers. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: two tests of the same backup flow. Baseline: 1. Run under the baseline conditions, then record observations and errors in notes/day-23.md.
3. Variable: workers; changed value: 2. Run again through the same input path. Deliverable to save: file paths and each test’s results. Hypothesis to check: Keep files and storage from overwriting each other. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                        |
| -------- | -------- | ------ | --------------------------------------------------- |
| workers  | 1        | 2      | Keep files and storage from overwriting each other. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: file paths and each test’s results. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Parallelism and Independence. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Parallelism affect in this exercise? Input cases: two tests of the same backup flow.
2. Variable: workers. Hypothesis to check: Keep files and storage from overwriting each other. Did the actual results agree with the hypothesis? Explain the evidence in terms of Independence.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-23/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-23/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-23/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-23/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Fixtures and Setup Responsibility](../22/README.md) · [Next: Retries and Flakiness](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

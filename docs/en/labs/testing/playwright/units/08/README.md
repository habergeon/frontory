# Playwright · 08 BrowserContext Isolation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Persistent Data and File Round Trips · External example · preview instructions · Storage ID: `playwright-step-08`

## Goals and learning outcomes

- Learning outcome: explain the role of New context. Input cases: different notes for A and B.
- Deliverable: initial and final values for each test. Explain the rationale for handling Test data, linking it to the code.

## Prerequisites

Prepare the experiment results for Failure location and Steps from Unit 7, “Diagnosing Failures in the First Flow”.

## Key concepts and explanations

### New context

A new context separates cookies and storage. Sharing the same page across all tests creates order dependencies.

### Test data

Do not import a real user profile. Use a dedicated test origin and data.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-8.spec.ts in a separate practice project, create two tests with the default page fixture and enter different notes in each. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: different notes for A and B. Baseline: A→B. Run under the baseline conditions, then record observations and errors in notes/day-8.md.
3. Variable: execution order; changed value: B→A. Run again through the same input path. Deliverable to save: initial and final values for each test. Hypothesis to check: Keep each test’s notes out of the other test’s initial state. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable        | Baseline | Change | Expected change / hypothesis                                  |
| --------------- | -------- | ------ | ------------------------------------------------------------- |
| execution order | A→B      | B→A    | Keep each test’s notes out of the other test’s initial state. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: initial and final values for each test. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: New context and Test data. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does New context affect in this exercise? Input cases: different notes for A and B.
2. Variable: execution order. Hypothesis to check: Keep each test’s notes out of the other test’s initial state. Did the actual results agree with the hypothesis? Explain the evidence in terms of Test data.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-08/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-08/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-08/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-08/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Diagnosing Failures in the First Flow](../07/README.md) · [Next: Saving and Reloading](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

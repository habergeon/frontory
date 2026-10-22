# Playwright · 20 Console and PageError

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Asynchrony, Isolation, and Diagnosis · External example · preview instructions · Storage ID: `playwright-step-20`

## Goals and learning outcomes

- Learning outcome: explain the role of Signal collection. Input cases: normal navigation and an intentional exception.
- Deliverable: error type, message, and stage of occurrence. Explain the rationale for handling Filter rationale, linking it to the code.

## Prerequisites

Prepare the experiment results for Time control and Observation conditions from Unit 19, “Clock and Scheduled Saving”.

## Key concepts and explanations

### Signal collection

Console errors and pageerror are different events. Ignoring them unconditionally misses execution failures.

### Filter rationale

An allowlist needs reasons. Distinguish expected-error tests from unexpected errors.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-20.spec.ts in a separate practice project, collect pageerror·console events and check that there are no unexpected errors at the end. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: normal navigation and an intentional exception. Baseline: none. Run under the baseline conditions, then record observations and errors in notes/day-20.md.
3. Variable: error; changed value: injected exception. Run again through the same input path. Deliverable to save: error type, message, and stage of occurrence. Hypothesis to check: Expose unexpected exceptions as test failures. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| error | none | injected exception | Expose unexpected exceptions as test failures. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: error type, message, and stage of occurrence. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Signal collection and Filter rationale. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Signal collection affect in this exercise? Input cases: normal navigation and an intentional exception.
2. Variable: error. Hypothesis to check: Expose unexpected exceptions as test failures. Did the actual results agree with the hypothesis? Explain the evidence in terms of Filter rationale.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-20/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-20/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-20/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-20/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Clock and Scheduled Saving](../19/README.md) · [Next: Reading Traces](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

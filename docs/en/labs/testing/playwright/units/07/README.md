# Playwright · 07 Diagnosing Failures in the First Flow

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: User Flows and Locators · External example · preview instructions · Storage ID: `playwright-step-07`

## Goals and learning outcomes

- Learning outcome: explain the role of Failure location. Input cases: a correct title and an intentionally incorrect expectation.
- Deliverable: report showing the failed step. Explain the rationale for handling Steps, linking it to the code.

## Prerequisites

Prepare the experiment results for Waiting for state and Failure explanation from Unit 6, “Retrying Assertions”.

## Key concepts and explanations

### Failure location

Check navigation, selection, and document opening separately. Comparing only the final screen hides causes.

### Steps

test.step records the meaning of a flow in the report. There is no need to split every implementation detail into a separate step.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-7.spec.ts in a separate practice project, add test.step and meaningful assertions to the navigation test. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a correct title and an intentionally incorrect expectation. Baseline: correct. Run under the baseline conditions, then record observations and errors in notes/day-7.md.
3. Variable: expected title; changed value: incorrect title. Run again through the same input path. Deliverable to save: report showing the failed step. Hypothesis to check: Reveal which user condition was broken. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable       | Baseline | Change          | Expected change / hypothesis            |
| -------------- | -------- | --------------- | --------------------------------------- |
| expected title | correct  | incorrect title | Reveal which user condition was broken. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: report showing the failed step. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Failure location and Steps. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Failure location affect in this exercise? Input cases: a correct title and an intentionally incorrect expectation.
2. Variable: expected title. Hypothesis to check: Reveal which user condition was broken. Did the actual results agree with the hypothesis? Explain the evidence in terms of Steps.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-07/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-07/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-07/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-07/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Retrying Assertions](../06/README.md) · [Next: BrowserContext Isolation](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

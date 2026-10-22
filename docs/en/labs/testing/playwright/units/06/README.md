# Playwright · 06 Retrying Assertions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: User Flows and Locators · External example · preview instructions · Storage ID: `playwright-step-06`

## Goals and learning outcomes

- Learning outcome: explain the role of Waiting for state. Input cases: fast and delayed responses.
- Deliverable: assertion success and failure messages. Explain the rationale for handling Failure explanation, linking it to the code.

## Prerequisites

Prepare the experiment results for Narrowing scope and Strictness from Unit 5, “Locator Scope”.

## Key concepts and explanations

### Waiting for state

Assertions such as toBeVisible reevaluate the condition. Their waiting behavior differs from ordinary value comparisons.

### Failure explanation

A clear expected state makes timeout diagnosis easier. An unconditionally long timeout does not solve the root cause.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-6.spec.ts in a separate practice project, combine expect(dialog).toBeVisible and a title assertion after opening the document. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: fast and delayed responses. Baseline: none. Run under the baseline conditions, then record observations and errors in notes/day-6.md.
3. Variable: delay; changed value: controlled short delay. Run again through the same input path. Deliverable to save: assertion success and failure messages. Hypothesis to check: Wait for readiness without a fixed sleep. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| delay | none | controlled short delay | Wait for readiness without a fixed sleep. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: assertion success and failure messages. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Waiting for state and Failure explanation. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Waiting for state affect in this exercise? Input cases: fast and delayed responses.
2. Variable: delay. Hypothesis to check: Wait for readiness without a fixed sleep. Did the actual results agree with the hypothesis? Explain the evidence in terms of Failure explanation.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-06/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-06/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-06/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-06/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Locator Scope](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

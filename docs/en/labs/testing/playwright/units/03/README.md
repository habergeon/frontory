# Playwright · 03 Role and Accessible Name

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: User Flows and Locators · External example · preview instructions · Storage ID: `playwright-step-03`

## Goals and learning outcomes

- Learning outcome: explain the role of Role. Input cases: two buttons with similar names.
- Deliverable: locator count and state after clicking. Explain the rationale for handling Name, linking it to the code.

## Prerequisites

Prepare the experiment results for Runner and BaseURL from Unit 2, “Configuration and Execution Scope”.

## Key concepts and explanations

### Role

getByRole finds elements by meaningful roles. Distinguish multiple elements with the same role by name.

### Name

An accessible name may differ from visible text. Check the actual label and aria attributes.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-3.spec.ts in a separate practice project, add name and exact to getByRole and check the number of matches. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: two buttons with similar names. Baseline: partial match. Run under the baseline conditions, then record observations and errors in notes/day-3.md.
3. Variable: name condition; changed value: exact true. Run again through the same input path. Deliverable to save: locator count and state after clicking. Hypothesis to check: Select only the intended button. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| name condition | partial match | exact true | Select only the intended button. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: locator count and state after clicking. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Role and Name. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Role affect in this exercise? Input cases: two buttons with similar names.
2. Variable: name condition. Hypothesis to check: Select only the intended button. Did the actual results agree with the hypothesis? Explain the evidence in terms of Name.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-03/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-03/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-03/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-03/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Configuration and Execution Scope](../02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Playwright · 15 Keyboard Navigation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Asynchrony, Isolation, and Diagnosis · External example · preview instructions · Storage ID: `playwright-step-15`

## Goals and learning outcomes

- Learning outcome: explain the role of Keyboard path. Input cases: Tab·Enter·Escape.
- Deliverable: activeElement and dialog state at each step. Explain the rationale for handling Focus, linking it to the code.

## Prerequisites

Prepare the experiment results for Round-trip contract and Isolation from Unit 14, “Saving, Downloading, and Restoring”.

## Key concepts and explanations

### Keyboard path

Tab and Enter find different defects from pointer input. Clicking alone does not prove operability.

### Focus

After closing a dialog, focus must return to its invoking button so the flow can continue. Also check whether focus moves to obscured elements.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-15.spec.ts in a separate practice project, check the table of contents, document, and close path with keyboard.press and toBeFocused. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Tab·Enter·Escape. Baseline: click. Run under the baseline conditions, then record observations and errors in notes/day-15.md.
3. Variable: input; changed value: keyboard. Run again through the same input path. Deliverable to save: activeElement and dialog state at each step. Hypothesis to check: Complete the same function and restore focus. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| input | click | keyboard | Complete the same function and restore focus. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: activeElement and dialog state at each step. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Keyboard path and Focus. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Keyboard path affect in this exercise? Input cases: Tab·Enter·Escape.
2. Variable: input. Hypothesis to check: Complete the same function and restore focus. Did the actual results agree with the hypothesis? Explain the evidence in terms of Focus.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-15/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-15/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-15/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-15/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Saving, Downloading, and Restoring](../../02-experiments/README.md) · [Next: Viewport and Responsive Layout](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

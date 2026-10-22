# Playwright · 16 Viewport and Responsive Layout

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Asynchrony, Isolation, and Diagnosis · External example · preview instructions · Storage ID: `playwright-step-16`

## Goals and learning outcomes

- Learning outcome: explain the role of Explicit conditions. Input cases: 390×844 and 1280×800.
- Deliverable: button visibility, note input, and horizontal overflow results. Explain the rationale for handling Core actions, linking it to the code.

## Prerequisites

Prepare the experiment results for Keyboard path and Focus from Unit 15, “Keyboard Navigation”.

## Key concepts and explanations

### Explicit conditions

The viewport affects layout. Reducing screen width alone does not emulate an entire mobile device.

### Core actions

Navigation and input must remain possible on small screens. Include actual interactions as well as screenshots.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-16.spec.ts in a separate practice project, open the table of contents and enter notes in two viewport projects. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 390×844 and 1280×800. Baseline: 1280. Run under the baseline conditions, then record observations and errors in notes/day-16.md.
3. Variable: width; changed value: 390. Run again through the same input path. Deliverable to save: button visibility, note input, and horizontal overflow results. Hypothesis to check: Keep the main interactions available. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| width | 1280 | 390 | Keep the main interactions available. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: button visibility, note input, and horizontal overflow results. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Explicit conditions and Core actions. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Explicit conditions affect in this exercise? Input cases: 390×844 and 1280×800.
2. Variable: width. Hypothesis to check: Keep the main interactions available. Did the actual results agree with the hypothesis? Explain the evidence in terms of Core actions.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-16/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-16/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-16/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-16/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Keyboard Navigation](../15/README.md) · [Next: Network Route](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

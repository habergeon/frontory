# Playwright · 05 Locator Scope

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: User Flows and Locators · External example · preview instructions · Storage ID: `playwright-step-05`

## Goals and learning outcomes

- Learning outcome: explain the role of Narrowing scope. Input cases: three cards with the same button name.
- Deliverable: selected card ID and title. Explain the rationale for handling Strictness, linking it to the code.

## Prerequisites

Prepare the experiment results for Label and Value assertion from Unit 4, “Label and Input”.

## Key concepts and explanations

### Narrowing scope

Finding a button within a list item distinguishes duplicate names. Do not depend on the first button on the entire page.

### Strictness

An error caused by multiple matches reveals an ambiguous contract. Find the item’s meaning before hiding the issue with nth.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-5.spec.ts in a separate practice project, filter the card locator by title, then click its internal button. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: three cards with the same button name. Baseline: original order. Run under the baseline conditions, then record observations and errors in notes/day-5.md.
3. Variable: list order; changed value: reverse order. Run again through the same input path. Deliverable to save: selected card ID and title. Hypothesis to check: Operate on the same card even when the order changes. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable   | Baseline       | Change        | Expected change / hypothesis                          |
| ---------- | -------------- | ------------- | ----------------------------------------------------- |
| list order | original order | reverse order | Operate on the same card even when the order changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: selected card ID and title. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Narrowing scope and Strictness. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Narrowing scope affect in this exercise? Input cases: three cards with the same button name.
2. Variable: list order. Hypothesis to check: Operate on the same card even when the order changes. Did the actual results agree with the hypothesis? Explain the evidence in terms of Strictness.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-05/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-05/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-05/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-05/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Label and Input](../04/README.md) · [Next: Retrying Assertions](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

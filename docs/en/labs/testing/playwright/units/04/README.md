# Playwright · 04 Label and Input

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: User Flows and Locators · External example · preview instructions · Storage ID: `playwright-step-04`

## Goals and learning outcomes

- Learning outcome: explain the role of Label. Input cases: notes with Korean text and line breaks.
- Deliverable: input values and saved-state results. Explain the rationale for handling Value assertion, linking it to the code.

## Prerequisites

Prepare the experiment results for Role and Name from Unit 3, “Role and Accessible Name”.

## Key concepts and explanations

### Label

getByLabel uses the association between an input and its name. A placeholder alone does not replace that meaning.

### Value assertion

Successful fill and successful saving are different conditions. Check the input value, then check the saved state separately.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-4.spec.ts in a separate practice project, find the notes input with getByLabel, fill it, and use toHaveValue. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: notes with Korean text and line breaks. Baseline: short English text. Run under the baseline conditions, then record observations and errors in notes/day-4.md.
3. Variable: text; changed value: two lines of Korean text. Run again through the same input path. Deliverable to save: input values and saved-state results. Hypothesis to check: Enter the content without alteration. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline           | Change                   | Expected change / hypothesis          |
| -------- | ------------------ | ------------------------ | ------------------------------------- |
| text     | short English text | two lines of Korean text | Enter the content without alteration. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: input values and saved-state results. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Label and Value assertion. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Label affect in this exercise? Input cases: notes with Korean text and line breaks.
2. Variable: text. Hypothesis to check: Enter the content without alteration. Did the actual results agree with the hypothesis? Explain the evidence in terms of Value assertion.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-04/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-04/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-04/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-04/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Role and Accessible Name](../03/README.md) · [Next: Locator Scope](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

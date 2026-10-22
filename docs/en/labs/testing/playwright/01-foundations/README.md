# Playwright · 01 Testing from the User’s Perspective

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: User Flows and Locators · Editable example · Storage ID: `playwright-01`

## Goals and learning outcomes

- Learning outcome: explain the role of User contract. Input cases: table of contents selection and the open-document button.
- Deliverable: assertion results for the selected title and dialog visibility. Explain the rationale for handling Auto-waiting, linking it to the code.

## Prerequisites

Understand DOM roles, asynchronous behavior, and testing basics, and be able to read the inputs and outputs of the existing starting examples.

## Key concepts and explanations

### User contract

role and label follow UI meanings that users understand. They express the purpose of an action more clearly than internal class names.

### Auto-waiting

Locator actions and retrying assertions wait for state. Do not guess when the UI is ready with a fixed sleep.

## Practice setup

Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-1.spec.ts in a separate practice project, install @playwright/test in a separate Node project and write tests for Frontory’s table of contents and document opening. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: table of contents selection and the open-document button. Baseline: 1280×800. Run under the baseline conditions, then record observations and errors in notes/day-1.md.
3. Variable: viewport; changed value: 390×844. Run again through the same input path. Deliverable to save: assertion results for the selected title and dialog visibility. Hypothesis to check: Verify the same user flow at both sizes. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| viewport | 1280×800 | 390×844 | Verify the same user flow at both sizes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: assertion results for the selected title and dialog visibility. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: User contract and Auto-waiting. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does User contract affect in this exercise? Input cases: table of contents selection and the open-document button.
2. Variable: viewport. Hypothesis to check: Verify the same user flow at both sizes. Did the actual results agree with the hypothesis? Explain the evidence in terms of Auto-waiting.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../src/labs/playwright-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Configuration and Execution Scope](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

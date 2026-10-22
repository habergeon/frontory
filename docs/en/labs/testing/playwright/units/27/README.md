# Playwright · 27 CI Execution and Artifacts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visual Regression and Execution Strategy · External example · preview instructions · Storage ID: `playwright-step-27`

## Goals and learning outcomes

- Learning outcome: explain the role of Reproducible environment. Input cases: a clean run and an intentional failure.
- Deliverable: installed versions, exit code, and report path. Explain the rationale for handling Failure artifacts, linking it to the code.

## Prerequisites

Prepare the experiment results for Tolerance and Baseline update from Unit 26, “Allowed Differences and Review”.

## Key concepts and explanations

### Reproducible environment

Different browser versions and dependencies may change results. Fix the installation and execution conditions.

### Failure artifacts

A CI failure is easier to investigate with traces and reports. Do not include secrets or user data in artifacts.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-27.spec.ts in a separate practice project, write procedures for npm ci, browser installation, testing, and report retention in a separate project. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a clean run and an intentional failure. Baseline: local. Run under the baseline conditions, then record observations and errors in notes/day-27.md.
3. Variable: execution; changed value: clean CI environment. Run again through the same input path. Deliverable to save: installed versions, exit code, and report path. Hypothesis to check: Run under the same conditions and be able to locate failure artifacts. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| execution | local | clean CI environment | Run under the same conditions and be able to locate failure artifacts. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: installed versions, exit code, and report path. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Reproducible environment and Failure artifacts. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Reproducible environment affect in this exercise? Input cases: a clean run and an intentional failure.
2. Variable: execution. Hypothesis to check: Run under the same conditions and be able to locate failure artifacts. Did the actual results agree with the hypothesis? Explain the evidence in terms of Failure artifacts.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-27/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-27/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-27/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-27/playwright.config.mjs)
- [ci.yml](../../../../../../../src/labs/playwright-step-27/ci.yml)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Allowed Differences and Review](../26/README.md) · [Next: Visual Regression and Flakiness](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

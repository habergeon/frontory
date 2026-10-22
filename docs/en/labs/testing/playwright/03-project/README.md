# Playwright · 28 Visual Regression and Flakiness

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Visual Regression and Execution Strategy · Editable example · Storage ID: `playwright-03`

## Goals and learning outcomes

- Learning outcome: explain the role of Environment differences. Input cases: fixed viewport, stopped rotation, and font readiness.
- Deliverable: baseline image, functional report, failure trace, and limitations document. Explain the rationale for handling Combined verification, linking it to the code.

## Prerequisites

Prepare the experiment results for Reproducible environment and Failure artifacts from Unit 27, “CI Execution and Artifacts”.

## Key concepts and explanations

### Environment differences

GPU scenes, time, and fonts may make image comparisons unstable. Record fixed conditions and the reasons for allowed differences.

### Combined verification

Pixel comparison cannot prove every function. Combine user flows, state assertions, and traces.

## Practice setup

Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-28.spec.ts in a separate practice project, refer to the intent of the existing playwright-03 and combine static UI baselines with separate checks of nondeterministic scenes. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: fixed viewport, stopped rotation, and font readiness. Baseline: continuously rotating. Run under the baseline conditions, then record observations and errors in notes/day-28.md.
3. Variable: scene; changed value: stopped or verified through separate state checks. Run again through the same input path. Deliverable to save: baseline image, functional report, failure trace, and limitations document. Hypothesis to check: Distinguish reproducible UI baselines from the scope of scene verification. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| scene | continuously rotating | stopped or verified through separate state checks | Distinguish reproducible UI baselines from the scope of scene verification. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: baseline image, functional report, failure trace, and limitations document. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Environment differences and Combined verification. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Environment differences affect in this exercise? Input cases: fixed viewport, stopped rotation, and font readiness.
2. Variable: scene. Hypothesis to check: Distinguish reproducible UI baselines from the scope of scene verification. Did the actual results agree with the hypothesis? Explain the evidence in terms of Combined verification.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../src/labs/playwright-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: CI Execution and Artifacts](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

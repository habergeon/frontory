# Playwright · 02 Configuration and Execution Scope

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: User Flows and Locators · External example · preview instructions · Storage ID: `playwright-step-02`

## Goals and learning outcomes

- Learning outcome: explain the role of Runner. Input cases: a separate local test origin.
- Deliverable: execution command, target URL, and report. Explain the rationale for handling BaseURL, linking it to the code.

## Prerequisites

Prepare the experiment results for User contract and Auto-waiting from Unit 1, “Testing from the User’s Perspective”.

## Key concepts and explanations

### Runner

Playwright Test controls a browser from Node. Displaying an example in an iframe does not mean that tests are running.

### BaseURL

Specifying a test origin makes it easier to separate tests from real user data. The app server and test runner have different roles.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Write and run all tests in a separate Node project using @playwright/test and a dedicated local test origin. The existing playwright-01·02·03 previews only display test source; they do not run Playwright in the iframe. Write new test files yourself for the assignments and judge whether they pass only from actual runner output. Do not use a user profile or storage used for everyday work; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/day-2.spec.ts in a separate practice project, set baseURL·testDir in playwright.config.ts and run npx playwright test. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a separate local test origin. Baseline: running server. Run under the baseline conditions, then record observations and errors in notes/day-2.md.
3. Variable: URL; changed value: stopped server. Run again through the same input path. Deliverable to save: execution command, target URL, and report. Hypothesis to check: Distinguish server failure as a cause of test failure. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| URL | running server | stopped server | Distinguish server failure as a cause of test failure. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: execution command, target URL, and report. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Runner and BaseURL. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Runner affect in this exercise? Input cases: a separate local test origin.
2. Variable: URL. Hypothesis to check: Distinguish server failure as a cause of test failure. Did the actual results agree with the hypothesis? Explain the evidence in terms of BaseURL.

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-02/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-02/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-02/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-02/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Testing from the User’s Perspective](../../01-foundations/README.md) · [Next: Role and Accessible Name](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

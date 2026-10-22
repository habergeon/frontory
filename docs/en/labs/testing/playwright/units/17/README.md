# Playwright · 17 Network Route

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Asynchrony, Isolation, and Diagnosis · External example · preview instructions · Storage ID: `playwright-step-17`

## Goals and learning outcomes

- Prepare a fetch-based document-loading fixture app and a separate origin.
- Return 200 and 500 responses for the same /docs/a request and verify loading, completion, and error states.

## Prerequisites

Prepare the experiment results for Explicit conditions and Core actions from Unit 16, “Viewport and Responsive Layout”.

## Key concepts and explanations

### Dependency control

page.route controls responses to network requests that actually occur. Frontory imports documents eagerly into the bundle, so do not assume that selecting a document triggers a fetch request.

### Scope

This unit tests fetch requests in a separate fixture app that you create. Separate Frontory’s bundled-document opening tests from fixture tests with network dependencies.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. In a separate Node Playwright project, test a dedicated local origin for a fixture app that you create yourself. The fixture and test files are deliverables to write for this assignment, not files already provided. Frontory documents are eagerly bundled in src/app/curriculum.ts, so do not assume a fetch on document selection. Do not change user data, CSP, or isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In a separate fixture-app/src/main.ts, create A·B document buttons, a document area, a role=status loading message, and a role=alert error message. Implement selection to call fetch(`/docs/${id}`) and check response.ok yourself. Do not change Frontory’s source or document loader.
2. Run the fixture app on a dedicated local origin. In tests/day-17.spec.ts, register page.route to intercept only **/docs/a before navigating to the fixture origin. Click the A button, confirm that the request actually occurs, then return a 200 JSON response and check the title, body, and completed state.
3. In an independent test, return a 500 response for the same request. Check that loading ends, a role=alert error message appears, and the successful document is not displayed. Record the request URL, response code, and UI results for both conditions in notes/day-17.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| response | 200 | 500 | Show failures through user guidance. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The /docs/a request actually occurs on the fixture origin, and the requests and UI results are recorded for both 200·500 conditions.
- [ ] The expected title and body appear for 200; error guidance appears and loading ends for 500. Do not claim to have intercepted a document fetch that does not exist in Frontory.

## Self-check

1. How do Frontory’s eager document bundle and the fixture app’s fetch-based document loading differ as test targets?
2. Why must handling a 500 response distinguish successful fetch completion from checking response.ok?

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Network interception](https://playwright.dev/docs/network)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-17/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-17/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-17/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-17/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Viewport and Responsive Layout](../16/README.md) · [Next: Delays and Races](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

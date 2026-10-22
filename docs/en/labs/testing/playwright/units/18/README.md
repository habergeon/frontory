# Playwright · 18 Delays and Races

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Asynchrony, Isolation, and Diagnosis · External example · preview instructions · Storage ID: `playwright-step-18`

## Goals and learning outcomes

- Implement a latestRequestId guard in the Unit 17 fixture app to discard stale responses.
- Verify that the final selected ID, title, and body all correspond to B for both A→B and B→A completion orders.

## Prerequisites

Prepare the experiment results for Dependency control and Scope from Unit 17, “Network Route”.

## Key concepts and explanations

### Latest state

In a fetch-based fixture app, an earlier request may finish after the selected document’s request. Give each request an increasing ID and apply only the response with the latest ID to the screen.

### Response order

Holding the A and B responses in routes lets you control completion order. After releasing a response, update loading and error states as well as the body according to the latest request.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. In a separate Node Playwright project, test a dedicated local origin for a fixture app that you create yourself. The fixture and test files are deliverables to write for this assignment, not files already provided. Frontory documents are eagerly bundled in src/app/curriculum.ts, so do not assume a fetch on document selection. Do not change user data, CSP, or isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Extend fixture-app/src/main.ts from Unit 17. Increment requestId on each document selection; in the fetch response, catch, and finally paths, check that it is the current ID before updating the body, error, and loading states. Set baseURL in tests/day-18.spec.ts to the same fixture origin rather than Frontory.
2. Hold the A·B requests separately with page.route and confirm that both requests have arrived. Select A and immediately select B, then return the A response followed by the B response. Check that the final selected ID, title, and body correspond to B and that loading has ended.
3. In an independent test, keep the same selection order but return the B response first and the A response afterward. Check that the late A response does not overwrite B’s body or state. Record both completion orders and the locations of the guards in notes/day-18.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| response order | A→B | B→A | Prevent a late A response from overwriting the B screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both requests actually occur in the fixture, and there is a record of explicitly releasing them in both A→B and B→A response orders.
- [ ] In both conditions, the final selected ID, title, and body correspond to B and loading has ended. An assertion checks that B’s state remains after the late A response.

## Self-check

1. What problem could occur if the latestRequestId check guards only the body update and is absent from finally?
2. How did you confirm that response order was not manipulated before both requests had actually arrived?

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Network interception](https://playwright.dev/docs/network)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-18/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-18/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-18/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-18/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Network Route](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

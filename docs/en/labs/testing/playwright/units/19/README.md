# Playwright · 19 Clock and Scheduled Saving

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Asynchrony, Isolation, and Diagnosis · External example · preview instructions · Storage ID: `playwright-step-19`

## Goals and learning outcomes

- Create an independent fixture page with 500ms debounce saving and a save-count display.
- At input intervals of 600ms and 100ms, verify save counts of 3 and 1 and the same final saved value.

## Prerequisites

Prepare the experiment results for Latest state and Response order from Unit 18, “Delays and Races”.

## Key concepts and explanations

### Time control

Use the Clock API to control a debounce timer that you implement in a separate fixture page. Frontory Workspace saves notes synchronously in onChange; do not assume that it has scheduled saving.

### Observation conditions

Timer execution and the display of saved values in the fixture are separate observations. Expose the save count and last saved string on screen to check the results after controlling the clock.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. Use a separate Node Playwright runner and a debounce fixture page that you implement yourself. Notes in Frontory Workspace.tsx synchronously call draftStore.save on every onChange, unlike this exercise’s 500ms timer. Do not confuse the editor’s 600ms code-checking and application delay with a note-saving delay. Preserve user data, CSP, and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In fixture-app/src/debounce.ts, create a labeled notes input, a save-count display, and a last-saved-value display. Implement a function that clears the existing timeout on each input event and saves the current string after 500ms. Document that this page does not reproduce Frontory’s actual note-saving behavior.
2. In tests/day-19.spec.ts, call page.clock.install before navigating to the fixture page. On the debounce page of the dedicated fixture origin, enter A·AB·ABC in sequence, advancing time with runFor(600) after each input. Assert a save count of 3 and a final value of ABC.
3. In the same fixture in a new context, run runFor(100) between the three inputs and runFor(500) after the final input. Check a save count of 1 and a final value of ABC. Record clock advancement and save results for both input intervals in notes/day-19.md without real sleep.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| input interval in the 500ms debounce fixture | advance 600ms after each input | advance 100ms between inputs and 500ms after the final input | At 600ms intervals, save 3 times; at 100ms intervals, save the last value 1 time. The last string is ABC in both cases. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The independent fixture’s debounce implementation and dedicated origin are specified, with clock-advancement records for both 600ms·100ms conditions.
- [ ] The long interval produces 3 saves and the short interval 1 save; the final value is ABC in both conditions. Do not describe Frontory’s note saving as debounced.

## Self-check

1. How does Frontory’s synchronous onChange saving differ from the fixture’s 500ms scheduled saving?
2. Why install Clock before page initialization, and why advance 500ms after the last input?

## Official references

- [Playwright Installation and Execution](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Clock](https://playwright.dev/docs/clock)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/playwright-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

The supplied spec installs Clock after the beforeEach goto and checks the fixture’s 500ms debounced save. Installing Clock before navigation is a separate assignment. Frontory notes save synchronously onChange.

- [lesson.spec.mjs](../../../../../../../src/labs/playwright-step-19/lesson.spec.mjs)
- [fixture.html](../../../../../../../src/labs/playwright-step-19/fixture.html)
- [server.mjs](../../../../../../../src/labs/playwright-step-19/server.mjs)
- [playwright.config.mjs](../../../../../../../src/labs/playwright-step-19/playwright.config.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Delays and Races](../18/README.md) · [Next: Console and PageError](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

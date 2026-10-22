# PixiJS · 09 Starting, Stopping, and Callback Cleanup

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ticker, Assets, and Pointer Input · Editable example · Storage ID: `pixijs-step-09`

## Goals and learning outcomes

- Do not update the simulation while paused.
- Leave no callbacks from a removed scene.

## Prerequisites

Prerequisite concepts: Callback Argument, Converting Milliseconds. Prepare the output files and observation records from Unit 8.

## Key concepts and explanations

### Ticker Ownership

An Application can use its own ticker or a shared ticker. Stopping a shared ticker used by other screens can affect them.

### Function References

ticker.remove needs the callback reference used for registration. Passing a new function with the same body does not remove the existing registration.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-09.js and index.html in the external practice project. Register a named update function with the ticker and implement pause/resume buttons.
2. Repeat scene creation and removal, recording add/remove counts and update calls per frame.
3. Save the output with the input condition 1 run, then run again with Recreate 5 times. Expected: With correct cleanup, the number of update calls per frame does not increase. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-09-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Registration count | 1 run | Recreate 5 times | With correct cleanup, the number of update calls per frame does not increase |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Do not update the simulation while paused.
- [ ] Leave no callbacks from a removed scene.

## Self-check

1. What does a scene using sharedTicker own?
2. Why does rewriting an anonymous function for remove not work?

## Official references

- [PixiJS 8 ticker](https://pixijs.com/8.x/guides/components/ticker)
- [PixiJS 8 app](https://pixijs.com/8.x/guides/components/application)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-09/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Ticker and Time Units](../08/README.md) · [Next: Asynchronous Asset Loading](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

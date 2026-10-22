# Canvas 2D · 09 Stopping and Resuming

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Time, Coordinates, and Input · Editable example · Storage ID: `canvas-2d-step-09`

## Goals and learning outcomes

- Only one loop runs even after repeated start clicks.
- There is no large position jump on resume.

## Prerequisites

Prerequisite concepts: Time Units, Separating Simulation. Prepare the result files and observation records from Unit 8.

## Key concepts and explanations

### Loop Ownership

An animation request ID is used to cancel a scheduled callback. Scheduling duplicates when resuming updates the same state twice.

### Long Time Gaps

Callbacks may be delayed while a tab is hidden. Decide whether to reset the clock on resume or catch up with elapsed time.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-09.js and index.html in the external practice project. Manage requestAnimationFrame and cancelAnimationFrame from start and stop buttons.
2. Detect hidden state with visibilitychange and reset dt to 0 immediately after resuming.
3. Save the output with the input condition keep the previous time, then run again with reset the previous time. Expected: The ball is prevented from jumping after a long pause. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-09-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Resume Policy | keep the previous time | reset the previous time | The ball is prevented from jumping after a long pause |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Only one loop runs even after repeated start clicks.
- [ ] There is no large position jump on resume.

## Self-check

1. Should the stop button erase the last frame?
2. Which apps need to account for time spent in a hidden tab?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-09/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: The Animation Clock](../08/README.md) · [Next: Boundary Collisions and Integration](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

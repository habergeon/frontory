# Canvas 2D · 27 Integrated Editor and Regression Checks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Particles, and Performance Verification · Editable example · Storage ID: `canvas-2d-step-27`

## Goals and learning outcomes

- After replay, shape ids and coordinates match the expected state.
- No duplicate loops or events remain after reinitialization.

## Prerequisites

Prerequisite concepts: Time Distribution, Measuring Sections. Prepare the result files and observation records from Unit 26.

## Key concepts and explanations

### Reproducing Input

Reapplying the same command list makes feature regressions easier to find. Checking data state before comparing screens helps narrow down causes.

### Lifetime Cleanup

Observers, events, and animation requests are resources outside the scene. Clean them up before reinitializing to prevent duplicate behavior.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-27.js and index.html in the external practice project. Combine the grid, shape editing, and particle preview into one state model.
2. Replay create→drag→undo→resize→JSON restore commands, and release the observer, events, and loop in dispose.
3. Save the output with the input condition 1 time, then run again with 5 times. Expected: With correct cleanup, the command count per input does not increase. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-27-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Reinitialization Count | 1 time | 5 times | With correct cleanup, the command count per input does not increase |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After replay, shape ids and coordinates match the expected state.
- [ ] No duplicate loops or events remain after reinitialization.

## Self-check

1. How do user data and render resources differ?
2. What does regression testing with screenshots alone miss?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is a reduced editor for checking command replay, undo, and JSON state. It does not replace every tool in the full capstone.

- [example.js](../../../../../../../src/labs/canvas-2d-step-27/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Frame Measurement and Bottlenecks](../26/README.md) · [Next: Particles and Cost](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

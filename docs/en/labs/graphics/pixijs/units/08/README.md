# PixiJS · 08 Ticker and Time Units

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ticker, Assets, and Pointer Input · Editable example · Storage ID: `pixijs-step-08`

## Goals and learning outcomes

- Distinguish the ticker object from numeric time.
- State time units explicitly in the formula.

## Prerequisites

Prerequisite concepts: Logical Size, CSS Density. Prepare the output files and observation records from Unit 7.

## Key concepts and explanations

### Callback Argument

A PixiJS 8 ticker callback receives a Ticker object. Assuming the argument is a numeric delta produces incorrect movement calculations.

### Converting Milliseconds

deltaMS can be used for time-based movement. Divide it by 1000 to convert to seconds when multiplying by a speed in px/s.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-08.js and index.html in the external practice project. Move a Sprite using deltaMS/1000 inside app.ticker.add(ticker=>...).
2. Add a speed input and distance output, and compare accumulated movement at two frame intervals.
3. Save the output with the input condition 50px/s, then run again with 100px/s. Expected: Distance doubles for the same accumulated time. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-08-notes.md.

## Variables to observe

| Variable | Baseline | Change  | Expected change / hypothesis                   |
| -------- | -------- | ------- | ---------------------------------------------- |
| Speed    | 50px/s   | 100px/s | Distance doubles for the same accumulated time |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish the ticker object from numeric time.
- [ ] State time units explicitly in the formula.

## Self-check

1. What is the difference between deltaTime and deltaMS?
2. Should you record elapsedMS or the adjusted deltaMS?

## Official references

- [PixiJS 8 ticker](https://pixijs.com/8.x/guides/components/ticker)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-08/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Responsive Screens and Resolution](../07/README.md) · [Next: Starting, Stopping, and Callback Cleanup](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

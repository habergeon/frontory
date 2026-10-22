# Canvas 2D · 14 Time and Input

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Time, Coordinates, and Input · Editable example · Storage ID: `canvas-2d-02`

## Goals and learning outcomes

- Movement per unit time remains similar when frame intervals change.
- Input coordinates remain correct after pausing, resuming, and resizing.

## Prerequisites

Prerequisite concepts: Pointer Capture, Grab Position. Prepare the result files and observation records from Unit 13.

## Key concepts and explanations

### Input Snapshots

Events can store target state, with movement calculated in each frame. Separating input and render loop responsibilities also handles paused state consistently.

### State Transitions

Running and paused are separate states. Separating click markers from motion state lets you inspect positions even while paused.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all extended requirements. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-14.js and index.html in the external practice project. Read the existing canvas-2d-02 starter code and move time-based ball motion and logical click coordinate output into the external project.
2. Combine pause/resume buttons with boundary reflection, and display positions clicked while paused too.
3. Save the output with the input condition 60px/s, then run again with 120px/s. Expected: Travel distance over the same time doubles, while click positions remain unchanged. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-14-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Speed | 60px/s | 120px/s | Travel distance over the same time doubles, while click positions remain unchanged |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Movement per unit time remains similar when frame intervals change.
- [ ] Input coordinates remain correct after pausing, resuming, and resizing.

## Self-check

1. Which state does a click while paused change?
2. How do you recover if resizing leaves the ball outside a wall?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [MDN devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

## Linked example and execution scope

[Example source](../../../../../../src/labs/canvas-2d-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Dragging and Pointer Lifetimes](../units/13/README.md) · [Next: Scene Data and Redrawing](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

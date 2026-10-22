# Canvas 2D · 13 Dragging and Pointer Lifetimes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Time, Coordinates, and Input · Editable example · Storage ID: `canvas-2d-step-13`

## Goals and learning outcomes

- Dragging ends even when the pointer is released outside the canvas.
- The relative position is preserved when grabbing an edge.

## Prerequisites

Prerequisite concepts: Reusing Paths, Selection Order. Prepare the result files and observation records from Unit 12.

## Key concepts and explanations

### Pointer Capture

setPointerCapture allows events to be received even when the pointer leaves the element. Include pointercancel in termination handling so state does not linger.

### Grab Position

Storing the difference between the center and click position prevents the shape from jumping. Subtracting that offset during movement preserves the grabbed point.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-13.js and index.html in the external practice project. Store the selected id and dragOffset in pointerdown, and capture the pointer.
2. Change the position in pointermove, and end dragging in pointerup and pointercancel.
3. Save the output with the input condition shape center, then run again with shape edge. Expected: With offset correction, the center does not jump when dragging starts. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-13-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Grab Position | shape center | shape edge | With offset correction, the center does not jump when dragging starts |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Dragging ends even when the pointer is released outside the canvas.
- [ ] The relative position is preserved when grabbing an edge.

## Self-check

1. Which pointerId should you store for multitouch?
2. How do pointer capture and shape hit testing differ in purpose?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-13/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shape Selection and Hit Testing](../12/README.md) · [Next: Time and Input](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

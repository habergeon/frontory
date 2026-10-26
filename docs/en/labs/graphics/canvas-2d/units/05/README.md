# Canvas 2D · 05 Colors and Gradients

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Pixels and Drawing State · Editable example · Storage ID: `canvas-2d-step-05`

## Goals and learning outcomes

- Explain the relationship between stop positions and color bands.
- Restore globalAlpha before drawing the next shape.

## Prerequisites

Prerequisite concepts: Transform Order, Local Coordinates. Prepare the result files and observation records from Unit 4.

## Key concepts and explanations

### Color Interpolation

createLinearGradient connects color stops between coordinates. Changing stop spacing changes how quickly the same two colors transition.

### Compositing Alpha

globalAlpha multiplies the opacity of subsequent drawing operations. Applying it to an already transparent color can make the result fainter than expected.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-05.js and index.html in the external practice project. Draw a horizontal color bar with createLinearGradient and addColorStop.
2. Draw overlapping translucent circles and visually compare the central pixel color before and after applying globalAlpha.
3. Save the output with the input condition 0.5, then run again with 0.2. Expected: The interval leading to the middle color narrows toward the left. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-05-notes.md.

## Variables to observe

| Variable          | Baseline | Change | Expected change / hypothesis                                     |
| ----------------- | -------- | ------ | ---------------------------------------------------------------- |
| Middle Color Stop | 0.5      | 0.2    | The interval leading to the middle color narrows toward the left |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Explain the relationship between stop positions and color bands.
- [ ] Restore globalAlpha before drawing the next shape.

## Self-check

1. Do gradient coordinates automatically fit the shape?
2. When is alpha multiplied twice?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-05/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Matrices and Rotation Centers](../04/README.md) · [Next: Loading and Cropping Images](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

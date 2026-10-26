# Canvas 2D · 11 Converting Pointer Coordinates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Time, Coordinates, and Input · Editable example · Storage ID: `canvas-2d-step-11`

## Goals and learning outcomes

- Click markers remain accurate after scrolling the page.
- Apply DPR in only one place.

## Prerequisites

Prerequisite concepts: Radius-Aware Boundaries, Overshoot. Prepare the result files and observation records from Unit 10.

## Key concepts and explanations

### Separating Coordinate Systems

clientX is relative to the viewport. Subtract the canvas bounding rectangle and apply the logical size ratio to obtain drawing coordinates.

### Buffer and Input

DPR affects output resolution. When drawing in CSS logical coordinates, multiplying pointer coordinates by DPR again misaligns selection.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-11.js and index.html in the external practice project. Calculate logical x,y with getBoundingClientRect in pointerdown.
2. Add space around the canvas, halve its CSS dimensions, and draw a crosshair at the click position.
3. Save the output with the input condition 400px, then run again with 200px. Expected: Clicking the same position in the drawing preserves the logical coordinates. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-11-notes.md.

## Variables to observe

| Variable          | Baseline | Change | Expected change / hypothesis                                                |
| ----------------- | -------- | ------ | --------------------------------------------------------------------------- |
| CSS Display Width | 400px    | 200px  | Clicking the same position in the drawing preserves the logical coordinates |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Click markers remain accurate after scrolling the page.
- [ ] Apply DPR in only one place.

## Self-check

1. When is offsetX alone insufficient?
2. How does the calculation change with borders or CSS rotation?

## Official references

- [MDN devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-11/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Boundary Collisions and Integration](../10/README.md) · [Next: Shape Selection and Hit Testing](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

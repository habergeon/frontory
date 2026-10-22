# Canvas 2D · 12 Shape Selection and Hit Testing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Time, Coordinates, and Input · Editable example · Storage ID: `canvas-2d-step-12`

## Goals and learning outcomes

- Clicking an empty area clears selection.
- Drawing and selection use the same path.

## Prerequisites

Prerequisite concepts: Separating Coordinate Systems, Buffer and Input. Prepare the result files and observation records from Unit 11.

## Key concepts and explanations

### Reusing Paths

Path2D stores shape paths. You can test selection with the same path without reading screen pixel colors.

### Selection Order

Overlapping shapes obscure one another according to drawing order. Testing from back to front lets you select the topmost visible item first.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-12.js and index.html in the external practice project. Store a Path2D and id for each shape, and test clicks with isPointInPath.
2. Iterate over overlapping circles and rectangles in reverse order, and output the selected id and outline.
3. Save the output with the input condition front to back, then run again with back to front. Expected: The topmost shape is selected in an overlapping area. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-12-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Test Order | front to back | back to front | The topmost shape is selected in an overlapping area |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Clicking an empty area clears selection.
- [ ] Drawing and selection use the same path.

## Self-check

1. Which coordinate space should transformed paths and input coordinates share?
2. Which API is needed for shapes with strokes only?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-12/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Converting Pointer Coordinates](../11/README.md) · [Next: Dragging and Pointer Lifetimes](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

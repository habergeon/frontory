# Canvas 2D · 15 Scene Data and Redrawing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Editing and Compositing · Editable example · Storage ID: `canvas-2d-step-15`

## Goals and learning outcomes

- No ghost image remains after deletion.
- Drawing the same data twice produces matching results.

## Prerequisites

Prerequisite concepts: Input Snapshots, State Transitions. Prepare the result files and observation records from Unit 14.

## Key concepts and explanations

### Source Data

Canvas does not retain individual shape objects. Store positions and colors in an array so you can rebuild the screen after changes and deletions.

### Pure Drawing

If draw modifies data, redrawing changes the result. Separate rendering and mutation functions to make results reproducible.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-15.js and index.html in the external practice project. Write renderScene(ctx,items) to accept an array of shapes.
2. Delete one id from an HTML list, call clearRect, and redraw the entire scene.
3. Save the output with the input condition last shape, then run again with middle shape. Expected: Only the corresponding drawing disappears, while array order is preserved. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-15-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Deletion Target | last shape | middle shape | Only the corresponding drawing disappears, while array order is preserved |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] No ghost image remains after deletion.
- [ ] Drawing the same data twice produces matching results.

## Self-check

1. Does erasing pixels alone delete an object?
2. What problems arise if you store array indices instead of ids?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-15/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Time and Input](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

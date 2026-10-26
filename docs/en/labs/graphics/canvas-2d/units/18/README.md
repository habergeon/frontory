# Canvas 2D · 18 Clipping and Masks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Editing and Compositing · Editable example · Storage ID: `canvas-2d-step-18`

## Goals and learning outcomes

- The image does not leak outside the circle.
- The following label is not cut off by clipping.

## Prerequisites

Prerequisite concepts: Compositing Operations, Separate Layers. Prepare the result files and observation records from Unit 17.

## Key concepts and explanations

### Clipping Region

clip restricts the visible region for subsequent drawing. Without save and restore around it, later operations remain confined to the same region.

### Drawing Order

Set the mask path before drawing. Calling clip afterward does not retroactively crop pixels already drawn.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-18.js and index.html in the external practice project. Use a circular path to clip, then fill it with a local image using drawImage.
2. Draw the label outside the mask after restore to compose a circular avatar and description.
3. Save the output with the input condition 60, then run again with 30. Expected: The image position stays the same, and only the exposed area shrinks. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-18-notes.md.

## Variables to observe

| Variable    | Baseline | Change | Expected change / hypothesis                                         |
| ----------- | -------- | ------ | -------------------------------------------------------------------- |
| Mask Radius | 60       | 30     | The image position stays the same, and only the exposed area shrinks |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The image does not leak outside the circle.
- [ ] The following label is not cut off by clipping.

## Self-check

1. How does clip differ from destination-in?
2. What must be restored to expand a nested clip?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-18/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Making an Eraser with Compositing](../17/README.md) · [Next: Reading Pixels and Applying Filters](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# SVG · 17 Dragging and Capture

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility and Data Maps · Editable example · Storage ID: `svg-step-17`

## Goals and learning outcomes

- Dragging ends even when released outside the region.
- Movement has the correct ratio even while zoomed in.

## Prerequisites

Prerequisite concepts: Paint and input, Bubbling. Prepare the result files and observation records from Unit 16.

## Key concepts and explanations

### Drag offset

Saving the difference between the pointer and node center prevents a jump at the start. Calculate coordinates in the same user space.

### Cancellation path

pointercancel may differ from normal completion. Group capture release and temporary state cleanup in a shared function.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-17.js and index.html in an external practice project. On pointerdown, save the difference between inverse-matrix coordinates and the node position, and capture the pointer.
2. Update transform on pointermove and finish on pointerup and pointercancel.
3. Save the output under the input condition Node center, then run again with Node edge. Compare the hypothesis, "Keeping the offset prevents the node from jumping," against the display and logs, and record the actual result and the causes of any differences in day-17-notes.md.

## Variables to observe

| Variable          | Baseline    | Change    | Expected change / hypothesis                      |
| ----------------- | ----------- | --------- | ------------------------------------------------- |
| Starting position | Node center | Node edge | Keeping the offset prevents the node from jumping |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Dragging ends even when released outside the region.
- [ ] Movement has the correct ratio even while zoomed in.

## Self-check

1. How do you handle drag state when pointerId changes?
2. Where do you store the cancellation policy for restoring the original position?

## Official references

- [MDN getScreenCTM Coordinate Transformation](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getScreenCTM)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-17/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Pointer Event Regions](../16/README.md) · [Next: Zooming and Panning](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# SVG · 18 Zooming and Panning

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility and Data Maps · Editable example · Storage ID: `svg-step-18`

## Goals and learning outcomes

- The node of interest does not jump during zooming.
- Provide minimum and maximum scales and a reset button.

## Prerequisites

Prerequisite concepts: Drag offset, Cancellation path. Prepare the result files and observation records from Unit 17.

## Key concepts and explanations

### Camera group

Transforming the content group moves the entire map. Keep on-screen controls outside the group to preserve their size.

### Pointer-centered zoom

For natural zooming, the same local point must stay at the same screen position before and after zooming. Changing only scale makes the graphic jump toward the origin.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-18.js and index.html in an external practice project. Manage translate and scale of the content g as state.
2. For zoom buttons and wheel input, calculate the local point under the pointer and compensate for translation.
3. Save the output under the input condition Origin, then run again with Pointer position. Compare the hypothesis, "The node under the pointer stays at the same screen point after zooming," against the display and logs, and record the actual result and the causes of any differences in day-18-notes.md.

## Variables to observe

| Variable    | Baseline | Change           | Expected change / hypothesis                                            |
| ----------- | -------- | ---------------- | ----------------------------------------------------------------------- |
| Zoom center | Origin   | Pointer position | The node under the pointer stays at the same screen point after zooming |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The node of interest does not jump during zooming.
- [ ] Provide minimum and maximum scales and a reset button.

## Self-check

1. What happens if you put on-screen controls in the content group?
2. How do you distinguish wheel page scrolling from zooming?

## Official references

- [MDN getScreenCTM Coordinate Transformation](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getScreenCTM)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-18/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Dragging and Capture](../17/README.md) · [Next: Data and DOM Updates](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

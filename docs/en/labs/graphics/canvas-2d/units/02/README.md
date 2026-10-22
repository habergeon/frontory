# Canvas 2D · 02 Paths and Line State

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Pixels and Drawing State · Editable example · Storage ID: `canvas-2d-step-02`

## Goals and learning outcomes

- Colors do not spill between separate lines.
- Explain the effect of resetting the path with drawings.

## Prerequisites

Prerequisite concepts: CSS and the Buffer, Resetting State. Prepare the result files and observation records from Unit 1.

## Key concepts and explanations

### Path Lifetime

beginPath clears the current path. If an earlier path remains, stroke for a new shape redraws the earlier lines too.

### Line Boundaries

lineCap and lineJoin determine the shapes of endpoints and joins. Lines of equal thickness can occupy different areas at corners.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-02.js and index.html in the external practice project. Draw three bent lines with beginPath,moveTo,lineTo.
2. Connect lineCap and lineJoin to input select controls and show a comparison drawing without path resets alongside them.
3. Save the output with the input condition miter, then run again with round. Expected: Sharp outer corners become rounded. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-02-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| lineJoin | miter | round | Sharp outer corners become rounded |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Colors do not spill between separate lines.
- [ ] Explain the effect of resetting the path with drawings.

## Self-check

1. How does closePath differ from beginPath?
2. Which corners need miterLimit?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-02/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Coordinates and Pixels](../../01-foundations/README.md) · [Next: Shape Functions and State Isolation](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

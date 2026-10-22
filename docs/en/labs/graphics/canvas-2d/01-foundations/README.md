# Canvas 2D · 01 Coordinates and Pixels

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Pixels and Drawing State · Editable example · Storage ID: `canvas-2d-01`

## Goals and learning outcomes

- Output the CSS dimensions and buffer dimensions separately.
- The circle's center and radius remain unchanged after resizing.

## Prerequisites

You should be able to work with JavaScript functions and arrays, DOM events, and coordinates.

## Key concepts and explanations

### CSS and the Buffer

CSS dimensions control layout, while width and height specify the pixel buffer dimensions. Increase the buffer by DPR and transform logical coordinates to draw at the same size with greater sharpness.

### Resetting State

Assigning canvas.width resets the image and drawing state. Setting the scale again with setTransform on resize avoids repeated scaling.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all extended requirements. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-01.js and index.html in the external practice project. Set the canvas CSS size to 400×240 and draw a grid and circle with getContext('2d').
2. Set the buffer to CSS size×DPR, apply setTransform(DPR,0,0,DPR,0,0), and show the actual buffer dimensions in output.
3. Save the output with the input condition 1, then run again with 2. Expected: Logical shape sizes stay the same, and the number of buffer pixels becomes four times larger. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-01-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| DPR | 1 | 2 | Logical shape sizes stay the same, and the number of buffer pixels becomes four times larger |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Output the CSS dimensions and buffer dimensions separately.
- [ ] The circle's center and radius remain unchanged after resizing.

## Self-check

1. Why do shapes become smaller if you only double the buffer dimensions?
2. What goes wrong if scale accumulates on every resize?

## Official references

- [MDN devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../src/labs/canvas-2d-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Paths and Line State](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

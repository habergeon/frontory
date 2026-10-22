# Canvas 2D · 19 Reading Pixels and Applying Filters

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Editing and Compositing · Editable example · Storage ID: `canvas-2d-step-19`

## Goals and learning outcomes

- Colors do not shift at row boundaries.
- The alpha of transparent pixels is preserved.

## Prerequisites

Prerequisite concepts: Clipping Region, Drawing Order. Prepare the result files and observation records from Unit 18.

## Key concepts and explanations

### Pixel Arrays

getImageData returns an array of RGBA values. Pixel indices must account for both row width and channel count.

### Direct Writes

putImageData writes pixel data. It is not positioned like a shape under the current transform, so specify buffer coordinates explicitly.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-19.js and index.html in the external practice project. Read a small local image and calculate the RGB average for each pixel with getImageData.
2. Display the original and grayscale versions on separate canvases with putImageData, preserving alpha.
3. Save the output with the input condition entire image, then run again with left half. Expected: Only half becomes grayscale, while transparency stays the same. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-19-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Processing Region | entire image | left half | Only half becomes grayscale, while transparency stays the same |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Colors do not shift at row boundaries.
- [ ] The alpha of transparent pixels is preserved.

## Self-check

1. How does the pixel array length change when DPR is 2?
2. Why try to avoid readback on every frame?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-19/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Clipping and Masks](../18/README.md) · [Next: Static Layers and Caching](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

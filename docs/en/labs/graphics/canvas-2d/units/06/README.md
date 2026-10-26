# Canvas 2D · 06 Loading and Cropping Images

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Pixels and Drawing State · Editable example · Storage ID: `canvas-2d-step-06`

## Goals and learning outcomes

- Distinguish drawing before loading from drawing after decoding.
- Show an error message even for an invalid URL.

## Prerequisites

Prerequisite concepts: Color Interpolation, Compositing Alpha. Prepare the result files and observation records from Unit 5.

## Key concepts and explanations

### Asynchronous Images

An image can only be drawn after downloading and decoding finish. Without decode failure handling, the cause of a blank screen is hard to identify.

### Source Rectangle

The nine arguments of drawImage separate source cropping from the destination area. Different aspect ratios stretch the image.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-06.js and index.html in the external practice project. Load a local sprite.png with Image and display it with drawImage after decode.
2. Change the source x coordinate with a slider to crop frames, and output an HTML error message on the failure path.
3. Save the output with the input condition 64, then run again with 32. Expected: The cropped area is magnified twice as much at the same output width. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-06-notes.md.

## Variables to observe

| Variable     | Baseline | Change | Expected change / hypothesis                                         |
| ------------ | -------- | ------ | -------------------------------------------------------------------- |
| Source Width | 64       | 32     | The cropped area is magnified twice as much at the same output width |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish drawing before loading from drawing after decoding.
- [ ] Show an error message even for an invalid URL.

## Self-check

1. What changes when the source and destination aspect ratios differ?
2. What restrictions apply when loading an image without CORS permission?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

The browser example decodes a self-generated PNG before cropping it. Check external image URLs and CORS failures in a separate HTTP environment.

- [example.js](../../../../../../../src/labs/canvas-2d-step-06/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Colors and Gradients](../05/README.md) · [Next: Text and Badge Composition](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

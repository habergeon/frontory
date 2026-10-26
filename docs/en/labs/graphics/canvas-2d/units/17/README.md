# Canvas 2D · 17 Making an Eraser with Compositing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Editing and Compositing · Editable example · Storage ID: `canvas-2d-step-17`

## Goals and learning outcomes

- The normal pen works correctly after using the eraser.
- Explain which layers own the background and ink.

## Prerequisites

Prerequisite concepts: Snapshots, Command Boundaries. Prepare the result files and observation records from Unit 16.

## Key concepts and explanations

### Compositing Operations

globalCompositeOperation sets the rule for combining new and existing pixels. destination-out erases existing areas using the new shape's alpha.

### Separate Layers

An eraser acts only on pixels in its target canvas. If the background was drawn there too, it may also be erased.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-17.js and index.html in the external practice project. Draw lines on a separate ink canvas and apply destination-out in eraser mode.
2. Restore source-over afterward and check whether the HTML background shows through transparent areas.
3. Save the output with the input condition 1, then run again with 0.3. Expected: Repeated passes gradually fade the area instead of erasing it completely. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-17-notes.md.

## Variables to observe

| Variable     | Baseline | Change | Expected change / hypothesis                                             |
| ------------ | -------- | ------ | ------------------------------------------------------------------------ |
| Eraser Alpha | 1        | 0.3    | Repeated passes gradually fade the area instead of erasing it completely |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The normal pen works correctly after using the eraser.
- [ ] Explain which layers own the background and ink.

## Self-check

1. How does this differ from painting over an area in white?
2. What happens when a translucent eraser repeatedly passes over the same spot?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-17/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Undo and History](../16/README.md) · [Next: Clipping and Masks](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Canvas 2D · 20 Static Layers and Caching

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Editing and Compositing · Editable example · Storage ID: `canvas-2d-step-20`

## Goals and learning outcomes

- Background resolution is correct after resizing.
- Record cache builds separately from frame counts.

## Prerequisites

Prerequisite concepts: Pixel Arrays, Direct Writes. Prepare the result files and observation records from Unit 19.

## Key concepts and explanations

### Prerendering

You can draw an unchanging complex image once on a separate canvas. Copy it with drawImage instead of constructing paths on every frame.

### Invalidation

A cache becomes stale when dimensions or colors change. Specify when it must be rebuilt to preserve sharpness and content.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-20.js and index.html in the external practice project. Create rebuildBackground to draw the grid background on an auxiliary canvas.
2. Use the cache on the moving shapes and rebuild the background only when resizing.
3. Save the output with the input condition every frame, then run again with only on resize. Expected: The number of static path constructions decreases. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-20-notes.md.

## Variables to observe

| Variable      | Baseline    | Change         | Expected change / hypothesis                      |
| ------------- | ----------- | -------------- | ------------------------------------------------- |
| Cache Updates | every frame | only on resize | The number of static path constructions decreases |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Background resolution is correct after resizing.
- [ ] Record cache builds separately from frame counts.

## Self-check

1. Which drawings can become more expensive with caching?
2. What do you invalidate when theme colors change?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-20/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reading Pixels and Applying Filters](../19/README.md) · [Next: High Resolution and Responsive Layout](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

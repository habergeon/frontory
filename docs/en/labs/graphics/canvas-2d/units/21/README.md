# Canvas 2D · 21 High Resolution and Responsive Layout

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Editing and Compositing · Editable example · Storage ID: `canvas-2d-step-21`

## Goals and learning outcomes

- Handle hidden containers with width 0 safely.
- Coordinates and display remain aligned after size changes.

## Prerequisites

Prerequisite concepts: Prerendering, Invalidation. Prepare the result files and observation records from Unit 20.

## Key concepts and explanations

### Observation Target

ResizeObserver detects element size changes. Even when window dimensions stay the same, a change in panel width requires adjusting the canvas buffer.

### Resolution Budget

Increasing DPR increases pixel count by area. Compare quality and cost to choose a cap, and record that choice.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-21.js and index.html in the external practice project. Observe the container with ResizeObserver and recalculate CSS dimensions and buffer dimensions.
2. Add a DPR cap select and redraw while preserving existing shape coordinates.
3. In an environment where actual devicePixelRatio is at least 2, compare DPR caps of 1 and 2. Expected: with the same CSS dimensions, the number of buffer pixels becomes four times larger. Record sharpness and frame measurements in day-21-notes.md, and record environments with actual DPR of 1 as a separate condition.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| DPR Cap | In an environment where actual devicePixelRatio is at least 2, DPR cap 1 | 2 | Lines may become sharper, but the number of processed pixels becomes four times larger |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Handle hidden containers with width 0 safely.
- [ ] Coordinates and display remain aligned after size changes.

## Self-check

1. When might devicePixelRatio change during execution?
2. Why does state disappear if you only resize the buffer?

## Official references

- [MDN devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-21/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Static Layers and Caching](../20/README.md) · [Next: Accessible Canvas Controls](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

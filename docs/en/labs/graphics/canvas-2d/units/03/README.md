# Canvas 2D · 03 Shape Functions and State Isolation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Pixels and Drawing State · Editable example · Storage ID: `canvas-2d-step-03`

## Goals and learning outcomes

- Styles are preserved after a shape function call.
- Keep logs that reproduce a missing restore.

## Prerequisites

Prerequisite concepts: Path Lifetime, Line Boundaries. Prepare the result files and observation records from Unit 2.

## Key concepts and explanations

### State Stack

save stores style and transform state. restore returns to the saved state but does not erase pixels already drawn.

### Function Contract

A shape function should produce the same result from its input coordinates and size. Silently changing a caller's color setting affects subsequent drawings too.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-03.js and index.html in the external practice project. Create drawBadge(ctx,x,y,color) and draw a circle and text between save and restore.
2. Output getTransform and fillStyle before and after the function, and call it for three badges at different positions.
3. Save the output with the input condition restore present, then run again with restore removed. Expected: The last badge's color or transform remains in subsequent drawings. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-03-notes.md.

## Variables to observe

| Variable          | Baseline        | Change          | Expected change / hypothesis                                       |
| ----------------- | --------------- | --------------- | ------------------------------------------------------------------ |
| State Restoration | restore present | restore removed | The last badge's color or transform remains in subsequent drawings |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Styles are preserved after a shape function call.
- [ ] Keep logs that reproduce a missing restore.

## Self-check

1. How can you check that save does not store pixels?
2. How can you ensure restore runs even after an early return?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-03/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Paths and Line State](../02/README.md) · [Next: Matrices and Rotation Centers](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

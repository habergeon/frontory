# Canvas 2D · 04 Matrices and Rotation Centers

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Pixels and Drawing State · Editable example · Storage ID: `canvas-2d-step-04`

## Goals and learning outcomes

- Distinguish the trajectories produced by the two transform orders.
- Restore state after rotation so the grid does not tilt.

## Prerequisites

Prerequisite concepts: State Stack, Function Contract. Prepare the result files and observation records from Unit 3.

## Key concepts and explanations

### Transform Order

The order of translate and rotate affects the result. Rotating after moving the origin makes the translated point the shape's rotation center.

### Local Coordinates

Placing the shape's center at the origin simplifies rotation calculations. Comparing this with drawing directly in screen coordinates reveals the role of transforms.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-04.js and index.html in the external practice project. Draw a needle with translate(cx,cy),rotate(angle),fillRect(-w/2,-h/2,w,h).
2. Connect a slider to angle and display the tip coordinates of a second needle with the call order reversed.
3. Save the output with the input condition translate then rotate, then run again with rotate then translate. Expected: The shape orbits the screen origin instead of rotating around its own center. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-04-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Transform Order | translate then rotate | rotate then translate | The shape orbits the screen origin instead of rotating around its own center |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish the trajectories produced by the two transform orders.
- [ ] Restore state after rotation so the grid does not tilt.

## Self-check

1. What unit is the rotation angle measured in?
2. What error occurs if you add the center coordinates twice?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-04/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shape Functions and State Isolation](../03/README.md) · [Next: Colors and Gradients](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

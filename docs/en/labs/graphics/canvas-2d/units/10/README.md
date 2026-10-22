# Canvas 2D · 10 Boundary Collisions and Integration

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Time, Coordinates, and Input · Editable example · Storage ID: `canvas-2d-step-10`

## Goals and learning outcomes

- The ball does not remain outside the walls.
- Record remaining errors at high speed.

## Prerequisites

Prerequisite concepts: Loop Ownership, Long Time Gaps. Prepare the result files and observation records from Unit 9.

## Key concepts and explanations

### Radius-Aware Boundaries

Checking only the ball's center lets it pass through a wall by its radius. Constrain the center between the radius and width minus radius.

### Overshoot

A long dt can carry a ball far beyond a boundary. Correct its position as well as reversing velocity to avoid sticking to a wall.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-10.js and index.html in the external practice project. Update the ball's x,y and vx,vy, then reflect it at all four walls while accounting for its radius.
2. Create a single-step button that takes dt as input to inspect collisions with large time intervals.
3. Save the output with the input condition 0.016 seconds, then run again with 0.2 seconds. Expected: Larger overshoot in discrete collisions reveals the need for correction. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-10-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| dt | 0.016 seconds | 0.2 seconds | Larger overshoot in discrete collisions reveals the need for correction |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The ball does not remain outside the walls.
- [ ] Record remaining errors at high speed.

## Self-check

1. Why does simply reversing velocity cause jitter?
2. How would you handle crossing several walls in one step?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-10/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Stopping and Resuming](../09/README.md) · [Next: Converting Pointer Coordinates](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

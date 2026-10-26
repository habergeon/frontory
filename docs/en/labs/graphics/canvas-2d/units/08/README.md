# Canvas 2D · 08 The Animation Clock

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Time, Coordinates, and Input · Editable example · Storage ID: `canvas-2d-step-08`

## Goals and learning outcomes

- Specify speed units as px/s.
- Obtain similar positions for the same accumulated time.

## Prerequisites

Prerequisite concepts: Measuring Text, Text Baseline. Prepare the result files and observation records from Unit 7.

## Key concepts and explanations

### Time Units

The requestAnimationFrame callback time is in milliseconds. Convert the difference from the previous time to seconds when using a speed per second.

### Separating Simulation

update changes positions, and draw only draws the current state. Separating them lets you reproduce movement with the same input times.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-08.js and index.html in the external practice project. Calculate x+=velocity*dt in update(dt) and draw the ball in draw.
2. Display requestAnimationFrame time differences and accumulated travel distance in output.
3. Save the output with the input condition 1/60 seconds, then run again with 1/30 seconds. Expected: Movement per step doubles, but the distance over the same total time stays the same. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-08-notes.md.

## Variables to observe

| Variable      | Baseline     | Change       | Expected change / hypothesis                                                        |
| ------------- | ------------ | ------------ | ----------------------------------------------------------------------------------- |
| Time Interval | 1/60 seconds | 1/30 seconds | Movement per step doubles, but the distance over the same total time stays the same |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Specify speed units as px/s.
- [ ] Obtain similar positions for the same accumulated time.

## Self-check

1. What changes if you add 1 on every frame?
2. How do you initialize the previous time for the first callback?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-08/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Text and Badge Composition](../07/README.md) · [Next: Stopping and Resuming](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

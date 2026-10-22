# Three.js · 02 Renderer and Display Size

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-02`

## Goals and learning outcomes

- Preserve shape proportions after resizing.
- Handle a hidden container with a size of 0.

## Prerequisites

Prerequisite concepts: Parent Transforms, View Direction and Position. Prepare the result files and observation notes from unit 1.

## Key concepts and explanations

### Buffer Size

The renderer’s drawing buffer differs from its CSS display size. Increasing pixelRatio processes more pixels for the same display area.

### Aspect Ratio

A PerspectiveCamera aspect is the viewport ratio. After resizing, call updateProjectionMatrix to apply the new projection.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-02.js and index.html in the external exercise project. Read the container size with ResizeObserver and call renderer.setSize(w,h,false).
2. Update camera.aspect and the projection, and compare CSS size with buffer size in an output.
3. Save the output under the 1:1 input condition, then run again under the 2:1 condition. Expected: Updating aspect prevents the sphere from stretching into an ellipse. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-02-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| viewport ratio | 1:1 | 2:1 | Updating aspect prevents the sphere from stretching into an ellipse. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Preserve shape proportions after resizing.
- [ ] Handle a hidden container with a size of 0.

## Self-check

1. What does the third argument of setSize control?
2. How does the cost of the screen area change as DPR increases?

## Official references

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-02/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scene Graphs and Cameras](../../01-foundations/README.md) · [Next: Perspective and Orthographic Projection](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Three.js · 03 Perspective and Orthographic Projection

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-03`

## Goals and learning outcomes

- Display the same scene with both projections.
- Reproduce clipping of an object outside near.

## Prerequisites

Prerequisite concepts: Buffer Size, Aspect Ratio. Prepare the result files and observation notes from unit 2.

## Key concepts and explanations

### Perspective Projection

PerspectiveCamera makes distant objects appear smaller. near and far limit the visible depth range.

### Orthographic Projection

With OrthographicCamera, distance does not change size. This is useful for CAD-style layouts and comparison diagrams.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-03.js and index.html in the external exercise project. Place two equally sized cubes at different depths.
2. Create a button to switch between perspective and orthographic cameras, and compare the screen widths of the two cubes.
3. Save the output under the PerspectiveCamera input condition, then run again under the OrthographicCamera condition. Expected: Cubes at different depths appear the same size on screen. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-03-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Camera | PerspectiveCamera | OrthographicCamera | Cubes at different depths appear the same size on screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Display the same scene with both projections.
- [ ] Reproduce clipping of an object outside near.

## Self-check

1. How does an orthographic camera determine zoom without FOV?
2. What problems might an excessively small near cause?

## Official references

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-03/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Renderer and Display Size](../02/README.md) · [Next: Rotation and Pivots](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

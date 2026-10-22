# Three.js · 04 Rotation and Pivots

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-04`

## Goals and learning outcomes

- Implement a pivot without modifying geometry.
- Distinguish parent axes from child axes.

## Prerequisites

Prerequisite concepts: Perspective Projection, Orthographic Projection. Prepare the result files and observation notes from unit 3.

## Key concepts and explanations

### Pivot Groups

To change the center of rotation, you can separate the parent group from the child offset. You do not need to modify the geometry itself every time.

### Euler Order

Rotations about multiple axes produce different results depending on their order. For complex orientations, also consider a quaternion representation.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-04.js and index.html in the external exercise project. Create a Group at the door hinge and offset the door Mesh by half its width.
2. Open the door with a rotation slider, and compare the results of changing the order of rotations about two axes.
3. Save the output under the Door center input condition, then run again under the Door edge condition. Expected: The door moves around its hinge instead of rotating around its center. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-04-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Pivot position | Door center | Door edge | The door moves around its hinge instead of rotating around its center. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Implement a pivot without modifying geometry.
- [ ] Distinguish parent axes from child axes.

## Self-check

1. Along which axes does translate apply after rotation?
2. Why are two rotations with different Euler orders unequal?

## Official references

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-04/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Perspective and Orthographic Projection](../03/README.md) · [Next: Buffer Geometry](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

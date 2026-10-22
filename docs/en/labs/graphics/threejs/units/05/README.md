# Three.js · 05 Buffer Geometry

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-05`

## Goals and learning outcomes

- Distinguish the vertex count from the triangle count.
- Avoid indices outside the valid range.

## Prerequisites

Prerequisite concepts: Pivot Groups, Euler Order. Prepare the result files and observation notes from unit 4.

## Key concepts and explanations

### Vertex Attributes

BufferGeometry groups arrays such as position and normal. itemSize is the number of components in one vertex.

### Index Sharing

Indices reuse vertices to connect triangles. Even at the same position, different UV or normal values may require separate vertices.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-05.js and index.html in the external exercise project. Define the vertices of a rectangle with Float32Array and BufferAttribute.
2. Connect two triangles with setIndex and inspect winding and face orientation with a wireframe material.
3. Save the output under the Counterclockwise input condition, then run again under the Clockwise condition. Expected: The default front-face classification changes, so the face may disappear. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-05-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Index order | Counterclockwise | Clockwise | The default front-face classification changes, so the face may disappear. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish the vertex count from the triangle count.
- [ ] Avoid indices outside the valid range.

## Self-check

1. Why can vertices with the same coordinates not always be merged?
2. What changes if itemSize is mistakenly set to 2?

## Official references

- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-05/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Rotation and Pivots](../04/README.md) · [Next: Normals and Surface Orientation](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

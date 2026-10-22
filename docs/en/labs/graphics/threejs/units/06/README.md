# Three.js · 06 Normals and Surface Orientation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-06`

## Goals and learning outcomes

- Compare geometry with and without normals.
- Create flat and smooth boundaries as intended.

## Prerequisites

Prerequisite concepts: Vertex Attributes, Index Sharing. Prepare the result files and observation notes from unit 5.

## Key concepts and explanations

### The Role of Normals

Normals are used to calculate the direction in which light meets a surface. Different normals can make an edge look different even when positions are identical.

### Smoothing

Averaging normals at shared vertices makes the transition between faces look smooth. To preserve sharp edges, separate the attributes.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-06.js and index.html in the external exercise project. Apply computeVertexNormals to your custom geometry.
2. Alternate between MeshNormalMaterial and a lit material, and compare shared and separate vertices.
3. Save the output under the Separate per face input condition, then run again under the Shared at edges condition. Expected: Averaged normals may make edges look smooth. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-06-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Vertex sharing | Separate per face | Shared at edges | Averaged normals may make edges look smooth. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Compare geometry with and without normals.
- [ ] Create flat and smooth boundaries as intended.

## Self-check

1. Are normal colors the actual material colors?
2. Why does nonuniform scale affect normal handling?

## Official references

- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-06/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Buffer Geometry](../05/README.md) · [Next: Shared Geometry and Cloning](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

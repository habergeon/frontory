# Three.js · 21 Offscreen Objects and Level of Detail

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-21`

## Goals and learning outcomes

- Record quality differences at different distances.
- Distinguish a culling problem from actual deletion.

## Prerequisites

Prerequisite concepts: Instance Identification, Bounds Updates. Prepare the result files and observation notes from unit 20.

## Key concepts and explanations

### Frustum Culling

The renderer may skip objects whose bounds are outside the camera view. Incorrect bounds can make visible objects disappear.

### Level of Detail

Distant objects may look similar with fewer vertices. Compare both transition popping and the reduction in triangles.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-21.js and index.html in the external exercise project. Use different segment counts for a nearby sphere and a distant sphere.
2. Change camera distance and record visual quality and renderer.info.render.triangles.
3. Save the output under the 64 input condition, then run again under the 12 condition. Expected: The triangle count decreases, but silhouette quality varies with distance. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-21-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Distant sphere segments | 64 | 12 | The triangle count decreases, but silhouette quality varies with distance. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record quality differences at different distances.
- [ ] Distinguish a culling problem from actual deletion.

## Self-check

1. Are a small screen size and world distance always proportional?
2. When should you update bounds for an object enlarged by animation?

## Official references

- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-21/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Instance Selection and Updates](../20/README.md) · [Next: Render Targets and Minimap](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

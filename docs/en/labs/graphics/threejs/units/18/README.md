# Three.js · 18 Transparency and Depth

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-18`

## Goals and learning outcomes

- Distinguish opaque depth handling from transparent compositing.
- Explain remaining sorting limitations with screenshots.

## Prerequisites

Prerequisite concepts: Mixer Time, Clips and Actions. Prepare the result files and observation notes from unit 17.

## Key concepts and explanations

### Depth Writes

depthWrite controls whether the depth buffer is written. A translucent object may incorrectly hide objects behind it.

### Sorting Limits

Transparent objects are sensitive to order. Sorting whole objects alone cannot easily handle every intersecting surface perfectly.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-18.js and index.html in the external exercise project. Arrange two translucent planes and an opaque cube so they intersect.
2. Change transparent,opacity,depthWrite and orbit the camera fully around them to record errors.
3. Save the output under the true input condition, then run again under the false condition. Expected: Occlusion changes, but not every transparency-sorting problem is solved. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-18-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| depthWrite | true | false | Occlusion changes, but not every transparency-sorting problem is solved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish opaque depth handling from transparent compositing.
- [ ] Explain remaining sorting limitations with screenshots.

## Self-check

1. Can renderOrder alone solve every intersection?
2. Why might alphaTest be useful for a cutout leaf image?

## Official references

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-18/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Clip Animation](../17/README.md) · [Next: Instancing Basics](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

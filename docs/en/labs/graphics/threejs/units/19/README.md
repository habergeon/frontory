# Three.js · 19 Instancing Basics

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-19`

## Goals and learning outcomes

- Keep the screen layout and count identical in both approaches.
- Reproduce a missing upload flag.

## Prerequisites

Prerequisite concepts: Depth Writes, Sorting Limits. Prepare the result files and observation notes from unit 18.

## Key concepts and explanations

### Shared Drawing

InstancedMesh draws the same geometry and material with multiple transforms. It can reduce draw calls compared with creating a Mesh for every object.

### Instance Buffers

setMatrixAt changes instance data on the CPU. Set instanceMatrix.needsUpdate to upload the changes.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-19.js and index.html in the external exercise project. Create 500 identical cubes as a Mesh list and as an InstancedMesh.
2. Fill setMatrixAt from the same coordinate array and compare renderer.info.render.calls.
3. Save the output under the Individual Mesh objects input condition, then run again under the InstancedMesh condition. Expected: Under the same material conditions, draw calls decrease. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-19-notes.md.

## Variables to observe

| Variable       | Baseline                | Change        | Expected change / hypothesis                             |
| -------------- | ----------------------- | ------------- | -------------------------------------------------------- |
| Representation | Individual Mesh objects | InstancedMesh | Under the same material conditions, draw calls decrease. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep the screen layout and count identical in both approaches.
- [ ] Reproduce a missing upload flag.

## Self-check

1. Can the call count decrease without reducing the triangle count?
2. Can each instance use different geometry?

## Official references

- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-19/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Transparency and Depth](../18/README.md) · [Next: Instance Selection and Updates](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

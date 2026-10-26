# Three.js · 20 Instance Selection and Updates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-20`

## Goals and learning outcomes

- Preserve other instances’ colors after selection.
- Select moved instances at their new positions.

## Prerequisites

Prerequisite concepts: Shared Drawing, Instance Buffers. Prepare the result files and observation notes from unit 19.

## Key concepts and explanations

### Instance Identification

Raycaster results may contain instanceId. Map it to a data id to preserve individual selection.

### Bounds Updates

Review bounds when instance positions change. Stale bounds may affect culling or selection.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-20.js and index.html in the external exercise project. Convert instanceId to a data id and apply setColorAt to the selected instance.
2. After moving positions, upload instanceMatrix and instanceColor and recalculate bounds.
3. Save the output under the First instance input condition, then run again under the Last instance condition. Expected: Only that item is highlighted and its data id matches. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-20-notes.md.

## Variables to observe

| Variable         | Baseline       | Change        | Expected change / hypothesis                           |
| ---------------- | -------------- | ------------- | ------------------------------------------------------ |
| Selection target | First instance | Last instance | Only that item is highlighted and its data id matches. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Preserve other instances’ colors after selection.
- [ ] Select moved instances at their new positions.

## Self-check

1. Is it safe to use instanceId as a permanent data id?
2. Where do you set needsUpdate after setColorAt?

## Official references

- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-20/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Instancing Basics](../19/README.md) · [Next: Offscreen Objects and Level of Detail](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

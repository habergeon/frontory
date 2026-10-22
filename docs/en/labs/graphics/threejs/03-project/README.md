# Three.js · 28 Rendering Resources and Measurement

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-03`

## Goals and learning outcomes

- Record metrics under identical conditions and the resource cleanup process.
- Explain performance changes together with whether quality and selection features are preserved.

## Prerequisites

Prerequisite concepts: Feature Contracts, Repeated-Run Verification. Prepare the result files and observation notes from unit 27.

## Key concepts and explanations

### Separating Bottlenecks

Reducing draw calls and reducing pixel cost are different improvements. Change one variable at a time in the same scene to interpret the effect.

### Repeated Cleanup

At shutdown, release the loop, controls, observers, and owned resources together. A stable renderer.info trend is supporting evidence, not proof that all VRAM has been freed.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all expanded requirements. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-28.js and index.html in the external exercise project. Connect scene creation and deletion and switching between individual Mesh objects and InstancedMesh to the existing threejs-03 starting code.
2. With the same camera, count, and DPR, record before-and-after calls and frame distributions, and submit a cleanup ledger for geometry,material,texture,render target.
3. Save the output under the Individual Mesh objects input condition, then run again under the InstancedMesh condition. Expected: With identical geometry and material, calls can be reduced, but the effect on the whole frame must be measured. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-28-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Repeated-object representation | Individual Mesh objects | InstancedMesh | With identical geometry and material, calls can be reduced, but the effect on the whole frame must be measured. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record metrics under identical conditions and the resource cleanup process.
- [ ] Explain performance changes together with whether quality and selection features are preserved.

## Self-check

1. What should you suspect if draw calls decrease but frame timing stays the same?
2. What memory information is unavailable from renderer.info?

## Official references

- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/threejs-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Integrating the Scene Inspector](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

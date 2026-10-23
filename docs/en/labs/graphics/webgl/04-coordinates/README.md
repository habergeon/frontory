# 04 · Coordinate systems·Vector3·Matrix4

Week 1 / original Day 4 · Document provided / runnable example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Predict local/world coordinates and the order of transformations.

## Prerequisites

02~03, vector components, and radians.

## Key concepts and explanations

Object3D position·rotation·scale are local transforms relative to the parent. A child of a translated Group can have a different world position from an object directly under the scene, even with the same position.

Vector3 represents positions, directions, and displacements, but the code must define their meaning and units. Matrix4 composes translation, rotation, and scale, and their order affects the result. Check matrixWorld, which combines parent and child matrices, using diagrams and numbers.

## Skills you will develop

- Predict local/world coordinates and the order of transformations.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Put a cube under a Group and fix child.position.x=2.
2. Change the parent's x from 0 → 3 and compare the results using getWorldPosition.
3. Before changing the parent's y rotation to Math.PI/2, predict the child's orbit, and compare with scale=2 as well.

You can edit this unit's runnable code in the workspace. If an empty code record was previously saved, restore the original code. Your notes are preserved.

## Variables to observe

Parent position/rotation/scale, child position. Keep the camera and geometry fixed.

## Completion criteria

- [ ] Recorded local/world position pairs under three conditions.
- [ ] Can explain the center of the parent's rotation.
- [ ] Can distinguish the roles of Vector3 and Matrix4.

## Self-check questions

1. Can world positions differ even when position is the same?
2. How does geometry.translate differ from changing mesh.position?

## Official references

- [Object3D](https://threejs.org/docs/pages/Object3D.html)
- [Vector3](https://threejs.org/docs/pages/Vector3.html)
- [Matrix4](https://threejs.org/docs/pages/Matrix4.html)

## Experiment notes — fill these in yourself

### Goal
<!-- The question you want to answer in this experiment -->

### Key concepts
<!-- Explain in your own words -->

### Changed variables and predictions
<!-- Baseline → changed value / fixed conditions / prediction before running -->

### Actual results
<!-- Actual observations, screenshots, and measurements. Leave blank before running. -->

### What I learned
<!-- Differences between predictions and actual results, and why -->

### Remaining questions
<!-- What to check in the next experiment -->

[Previous: Geometry·Material·Mesh](../03-mesh/README.md) · [Next: Light·Shadow·Texture](../05-light/README.md)

## Linked example

[Example source](../../../../../../src/labs/04-coordinates/example.js) is displayed in the workspace editor and actually runs. Change the variables or exercises in the first comment one at a time and record your predictions and results. Restoring the original code resets only the code and does not erase your notes.

See [Runtime environments and limitations](../../../../examples.md).

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/04-coordinates/example.js) · Workspace unit ID: `04-coordinates`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.

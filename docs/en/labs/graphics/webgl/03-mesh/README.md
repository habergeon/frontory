# 03 · Geometry·Material·Mesh

Week 1 / original Day 3 · Document provided / runnable example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Experiment with shape and surface appearance separately.

## Prerequisites

01~02, object references, and constructors.

## Key concepts and explanations

Geometry holds structures such as vertices, faces, and UVs, while Material defines how the surface appears. Mesh combines the two objects. The same geometry can be used with different materials.

MeshStandardMaterial is affected by lights, whereas MeshBasicMaterial displays color without lighting calculations. Distinguish whether a black appearance should be investigated in geometry or in lights and materials. Modifying or disposing of shared geometry can affect other meshes.

## Skills you will develop

- Experiment with shape and surface appearance separately.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. In a local experiment copied from the 01 source, change only the width of BoxGeometry.
2. Attach MeshBasicMaterial and MeshStandardMaterial to the same geometry in turn, and compare with and without lights.
3. Write down ownership for two cubes that share geometry and for cubes that each have their own geometry.

You can edit this unit's runnable code in the workspace. If an empty code record was previously saved, restore the original code. Your notes are preserved.

## Variables to observe

geometry size, material type, color, roughness. Keep the camera fixed.

## Completion criteria

- [ ] Can distinguish changes in shape from changes in surface appearance.
- [ ] Compared materials that are visible without lights with those that are not.
- [ ] Explained responsibility for disposing of shared resources.

## Self-check questions

1. Does changing only the material change the vertex count?
2. Is it safe to dispose of shared geometry when removing one mesh?

## Official references

- [Mesh](https://threejs.org/docs/pages/Mesh.html)
- [BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)

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

[Previous: Scene·Camera·Renderer](../02-camera/README.md) · [Next: Coordinate systems·Vector3·Matrix4](../04-coordinates/README.md)

## Linked example

[Example source](../../../../../../src/labs/03-mesh/example.js) is displayed in the workspace editor and actually runs. Change the variables or exercises in the first comment one at a time and record your predictions and results. Restoring the original code resets only the code and does not erase your notes.

See [Runtime environments and limitations](../../../../examples.md).

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/03-mesh/example.js) · Workspace unit ID: `03-mesh`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.

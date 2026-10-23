# 20 · Three.js+GS camera and interaction

Week 3 / original Day 20 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Connect the meaning of GS coordinates, scale, and selection to scene controls.

## Prerequisites

06 and data loading from 19.

## Key concepts and explanations

GS objects can also be transformed in a scene hierarchy, but supported scale and selection APIs may vary by library. Check the data's up axis, units, and center, and align camera near/far and target.

GS picking may differ from raycasting ordinary mesh triangles. Gaussian center approximations, opacity conditions, and library-specific raycasting can differ, so define what counts as a selection. Visible boundaries may differ from selection boundaries.

## Skills you will develop

- Connect the meaning of GS coordinates, scale, and selection to scene controls.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Record the center, up axis, and scale of a small GS dataset and set the initial camera.
2. Set minimum/maximum distances for rotation, movement, and zoom, and add reset.
3. Investigate the criteria of the GS picking API you will use and write expected results for three points along the visible boundary.


## Variables to observe

camera target/position/near/far, data transform, picking conditions.

## Completion criteria

- [ ] Explained the initial viewpoint and control limits.
- [ ] Specified GS selection criteria and limitations.
- [ ] Recorded cases that differ from mesh selection.

## Self-check questions

1. Are the frontmost visible color and the nearest Gaussian center always the same?
2. Can ordinary mesh raycast code be applied unchanged?

## Official references

- [Spark SplatMesh raycast](https://sparkjs.dev/docs/splat-mesh/)
- [OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)

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

[Previous: .ply·.splat loading](../19-gs-loading/README.md) · [Next: GS viewer review and candidate comparison](../21-gs-review/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/20-gs-interaction/example.js) · Workspace unit ID: `20-gs-interaction`

An educational CPU Canvas viewer that reads small .splat and ASCII GS PLY files. The limits are 1 MiB·512 splats; binary PLY and general mesh PLY are not supported. Spark, GPU tile rendering, higher-order SH, and GS picking are outside the implementation scope. The default scene uses data created here, and measurements apply only to this CPU example.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.

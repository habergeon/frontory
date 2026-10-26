# 25 · Markers and Raycasting

Week 4 / original Day 25 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Define what selected coordinates mean and place markers.

## Prerequisites

06, 20, 24.

## Key concepts and explanations

Markers need both a world position and a display position on screen. When the camera moves, you can project world coordinates again to update a DOM marker's position. Judge occlusion behind objects separately from being outside the screen.

Do not assume a mesh intersection and the result of GS-specific picking represent the same kind of surface. Specify whether the selection is a center approximation or a visible surface, and explain what the marker indicates in the UI and document.

## Skills you will develop

- Define what selected coordinates mean and place markers.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Place a small marker at a mesh raycast intersection.
2. Check that the marker position is correct during camera movement, zoom, and resizing.
3. For GS, check the selection API's criteria and define how to display unavailable/uncertain selections.

## Variables to observe

Intersection position, camera transform, occlusion, picking criteria.

## Completion criteria

- [ ] Can explain the marker coordinate system and update path.
- [ ] Handled off-screen/occluded states.
- [ ] Specified GS selection limitations.

## Self-check questions

1. Can world coordinates be used directly for CSS left/top?
2. How would you explain a mismatch between a visible GS boundary and selection criteria?

## Official references

- [Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Vector3 project](https://threejs.org/docs/pages/Vector3.html)
- [Spark raycast](https://sparkjs.dev/docs/splat-mesh/)

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

[Previous: Camera movement·rotation·zoom](../24-camera-controls/README.md) · [Next: FPS·Draw Calls·memory analysis](../26-performance/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/25-markers/example.js) · Workspace unit ID: `25-markers`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.

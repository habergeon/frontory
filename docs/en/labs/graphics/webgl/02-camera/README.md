# 02 · Scene·Camera·Renderer

Week 1 / original Day 2 · Document provided / runnable example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Distinguish the effects of camera position and field of view.

## Prerequisites

01, x/y/z positions, and the concept of radians.

## Key concepts and explanations

Scene holds the relationships between objects and lights. Camera determines which part of space to view, and Renderer draws using both. PerspectiveCamera FOV is the vertical field of view, aspect is the width/height ratio, and near/far define the visible depth range.

position is the camera location, and OrbitControls.target is the center it looks toward. A position change affects both the angle and the distance to the target, so the apparent size may change. Placing the camera at the origin can put it inside the cube at the origin.

## Skills you will develop

- Distinguish the effects of camera position and field of view.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. In the runnable example from 01, stop rotation and change CAMERA_POSITION through [3,2,5] → [0,0,5] → [5,0,0] → [3,5,3], one at a time.
2. Restore the default position and change only FOV through 50 → 30 → 75.
3. Create a predicted/actual table that distinguishes changes in distance from changes in angle.

You can edit this unit's runnable code in the workspace. If an empty code record was previously saved, restore the original code. Your notes are preserved.

## Variables to observe

CAMERA_POSITION, FOV, target, near/far. Change only one at a time.

## Completion criteria

- [ ] Predicted and compared the visible faces at three positions.
- [ ] Can explain the difference between changing FOV and moving the camera.
- [ ] Recorded the camera position and distance to the target.

## Self-check questions

1. What problems occur when position and target are the same?
2. Why update the projection matrix after changing aspect?

## Official references

- [PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html)
- [Camera](https://threejs.org/docs/pages/Camera.html)

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

[Previous: WebGL·GPU and the first image](../01-scene/README.md) · [Next: Geometry·Material·Mesh](../03-mesh/README.md)

## Linked example

[Example source](../../../../../../src/labs/02-camera/example.js) is displayed in the workspace editor and actually runs. Change the variables or exercises in the first comment one at a time and record your predictions and results. Restoring the original code resets only the code and does not erase your notes.

See [Runtime environments and limitations](../../../../examples.md).

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/02-camera/example.js) · Workspace unit ID: `02-camera`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.

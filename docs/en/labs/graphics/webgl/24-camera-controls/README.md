# 24 · Camera movement·rotation·zoom

Week 4 / original Day 24 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Make control limits and reset behavior consistent.

## Prerequisites

02, 06, 20.

## Key concepts and explanations

OrbitControls target is the center around which the camera orbits. Pan moves the camera and center relationship, while dolly/zoom behave differently depending on the camera type. Distance and angle limits can reduce movement inside objects or into unnecessary areas.

When damping is enabled, changes continue after input ends. Check whether remaining damping pushes the camera away from the initial position again after reset. Provide pointer/touch instructions and a reset button accessible by keyboard.

## Skills you will develop

- Make control limits and reset behavior consistent.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Save the representative scene's starting position and target.
2. Set min/max distance and angle ranges and operate at their extremes.
3. Compare reset immediately after dragging, after zooming, and after resizing.


## Variables to observe

position, target, min/max distance·angle, damping.

## Completion criteria

- [ ] Reliably returns to the starting viewpoint.
- [ ] Can explain the reasons for control limits.
- [ ] Noted which other input devices remain unverified.

## Self-check questions

1. What changes if you move only the camera and leave target unchanged?
2. Can the camera keep moving after reset during damping?

## Official references

- [OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html)

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

[Previous: Loading UI and progress](../23-loading-ui/README.md) · [Next: Markers and Raycasting](../25-markers/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/24-camera-controls/example.js) · Workspace unit ID: `24-camera-controls`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.

# 07 · Interactive scene review

Week 1 / original Day 7 · Document provided / runnable example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Integrate the camera, selection, resizing, and cleanup into one small scene.

## Prerequisites

01~06.

## Key concepts and explanations

The canvas CSS size and drawing buffer pixel count differ. With 2 times the DPR, both width and height have 2 times as many pixels, producing 4 times as many pixels overall. Update camera.aspect and the renderer size together.

ResizeObserver observes container size as well as window size. Update the render loop using elapsed time, and limit large delta values when returning to the tab. Removing the DOM alone does not clean up all geometry/material resources, events, and observers.

## Skills you will develop

- Integrate the camera, selection, resizing, and cleanup into one small scene.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Combine camera controls, selection highlighting, and reset in the scene.
2. Record the CSS and buffer sizes in landscape and portrait panels, and check for distortion.
3. Repeat transitions 10 times, check that canvases/loops/observers do not accumulate, and explain the main code flow.

You can edit this unit's runnable code in the workspace. If an empty code record was previously saved, restore the original code. Your notes are preserved.

## Variables to observe

viewport, DPR cap, delta, transition count. Keep the scene composition fixed.

## Completion criteria

- [ ] Selection, controls, and resizing work together.
- [ ] Paired created resources with their cleanup.
- [ ] Summarized the week 1 concepts in my own words.

## Self-check questions

1. What changes can be missed by observing only window resize?
2. Where would you look if React StrictMode re-execution creates duplicate canvases?

## Official references

- [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
- [React useEffect](https://react.dev/reference/react/useEffect)

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

[Previous: Raycaster·OrbitControls](../06-interaction/README.md) · [Next: Vertex·Fragment shader](../08-shader-stages/README.md)

## Linked example

[Example source](../../../../../../src/labs/07-scene-review/example.js) is displayed in the workspace editor and actually runs. Change the variables or exercises in the first comment one at a time and record your predictions and results. Restoring the original code resets only the code and does not erase your notes.

See [Runtime environments and limitations](../../../../examples.md).

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/07-scene-review/example.js) · Workspace unit ID: `07-scene-review`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.

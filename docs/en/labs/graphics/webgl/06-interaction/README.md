# 06 · Raycaster·OrbitControls

Week 1 / original Day 6 · Document provided / runnable example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Turn a pointer position into a spatial ray and distinguish camera controls from selection.

## Prerequisites

02~04, DOM pointer events.

## Key concepts and explanations

clientX/clientY are viewport coordinates. Subtract the canvas left/top and normalize by width/height to obtain positions within the panel. NDC has x=-1~1 and positive y pointing upward at +1, so invert the y direction.

Raycaster.setFromCamera creates a ray from the camera and a screen point and provides intersections in distance order. OrbitControls moves the camera. Distinguish the end of a drag from click selection, and clear the selection when empty space is clicked.

## Skills you will develop

- Turn a pointer position into a spatial ray and distinguish camera controls from selection.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Place two cubes and calculate x=((clientX-left)/width)*2-1, y=-((clientY-top)/height)*2+1.
2. Change the color of the nearest intersected object and restore it when clicking empty space.
3. Change the canvas margins and size, select again, and remove events during cleanup.

You can edit this unit's runnable code in the workspace. If an empty code record was previously saved, restore the original code. Your notes are preserved.

## Variables to observe

pointer coordinates, canvas size·position, object distance. Also record a baseline with camera rotation stopped.

## Completion criteria

- [ ] Implemented selection of two objects and clearing the selection.
- [ ] Coordinates stay correct when the panel size changes.
- [ ] Can distinguish selection from dragging the camera.

## Self-check questions

1. Why does using window.innerWidth for NDC fail in a 3-panel layout?
2. Which of several overlapping objects should be selected?

## Official references

- [Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

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

[Previous: Light·Shadow·Texture](../05-light/README.md) · [Next: Interactive scene review](../07-scene-review/README.md)

## Linked example

[Example source](../../../../../../src/labs/06-interaction/example.js) is displayed in the workspace editor and actually runs. Change the variables or exercises in the first comment one at a time and record your predictions and results. Restoring the original code resets only the code and does not erase your notes.

See [Runtime environments and limitations](../../../../examples.md).

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/06-interaction/example.js) · Workspace unit ID: `06-interaction`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.

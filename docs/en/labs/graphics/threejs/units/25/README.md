# Three.js · 25 HTML Controls and Accessibility

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-25`

## Goals and learning outcomes

- Use the main features without a mouse.
- Convey errors and selection with text as well as color.

## Prerequisites

Prerequisite concepts: Stale Results, Discarded Resources. Prepare the result files and observation notes from unit 24.

## Key concepts and explanations

### Alternative Controls

3D pixels alone do not convey the meaning of individual objects. An HTML object list and buttons can provide selection and camera movement.

### Status Announcements

Convey selection names and loading errors as text. Announcing coordinates every frame may drown out important messages.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-25.js and index.html in the external exercise project. Create HTML buttons for each object and a selection-description area, and call the same selectObject function used by raycasting.
2. Use the keyboard to select objects, fit the camera, and pause, and check that focus returns.
3. Save the output under the Pointer input condition, then run again under the Keyboard only condition. Expected: The same objects and camera targets can be selected. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-25-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input | Pointer | Keyboard only | The same objects and camera targets can be selected. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Use the main features without a mouse.
- [ ] Convey errors and selection with text as well as color.

## Self-check

1. Does a canvas aria-label alone provide an object list?
2. Where should focus move when a button disappears after a scene replacement?

## Official references

- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-25/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Asynchronous Scene Replacement](../24/README.md) · [Next: Render Statistics and Profiling](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

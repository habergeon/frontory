# Three.js · 16 Orbit Controls and On-Demand Rendering

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-16`

## Goals and learning outcomes

- Update the screen after input and resizing.
- Keep frames running during damping.

## Prerequisites

Prerequisite concepts: Bounding Boxes, Camera Framing. Prepare the result files and observation notes from unit 15.

## Key concepts and explanations

### Control State

OrbitControls updates the camera and target together. Synchronize them with update after changing the camera manually.

### Static Scenes

A scene without motion does not always need rendering. With damping or animation, frames are needed until it settles.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-16.js and index.html in the external exercise project. Write a function that requests render on the OrbitControls change event.
2. Switch between a static mode with damping off and continuous updates with damping on, and display the render count.
3. Save the output under the Continuous loop input condition, then run again under the Request on change condition. Expected: Unnecessary render calls decrease in a static scene. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-16-notes.md.

## Variables to observe

| Variable         | Baseline        | Change            | Expected change / hypothesis                         |
| ---------------- | --------------- | ----------------- | ---------------------------------------------------- |
| Rendering policy | Continuous loop | Request on change | Unnecessary render calls decrease in a static scene. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Update the screen after input and resizing.
- [ ] Keep frames running during damping.

## Self-check

1. How do you coalesce multiple render requests for one event?
2. Why is controls.dispose necessary?

## Official references

- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-16/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Model Size and Camera Fitting](../15/README.md) · [Next: Clip Animation](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

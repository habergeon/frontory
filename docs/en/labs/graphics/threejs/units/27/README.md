# Three.js · 27 Integrating the Scene Inspector

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-27`

## Goals and learning outcomes

- Keep the camera and UI responsive after errors.
- Stop the render loop after shutdown.

## Prerequisites

Prerequisite concepts: Statistics Scope, Multiple Passes. Prepare the result files and observation notes from unit 26.

## Key concepts and explanations

### Feature Contracts

Connect loading, selection, camera, and animation through one state model. Separate their error paths so one failure does not stop other features.

### Repeated-Run Verification

Missing cleanup may not appear on the first run. Repeat creation and shutdown, and check trends in event and resource counts.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-27.js and index.html in the external exercise project. Combine local loading, fallback, a selection list, minimap, and statistics panel in the model inspector.
2. Repeat create→select→replace model→error→shutdown 5 times, and record cleanup of the loop, controls, and observer.
3. Save the output under the 1 run input condition, then run again under the 5 runs condition. Expected: With correct lifetime management, events and active loops do not accumulate. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-27-notes.md.

## Variables to observe

| Variable  | Baseline | Change | Expected change / hypothesis                                                 |
| --------- | -------- | ------ | ---------------------------------------------------------------------------- |
| Run count | 1 run    | 5 runs | With correct lifetime management, events and active loops do not accumulate. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep the camera and UI responsive after errors.
- [ ] Stop the render loop after shutdown.

## Self-check

1. Does an increased resource count always indicate a leak?
2. Where should user settings and GPU resources each be stored?

## Official references

- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs selection, rebuilding, JSON, and rotation lifetimes in a basic-shape inspector. glTF loading and minimap integration are external capstone extensions.

- [example.js](../../../../../../../src/labs/threejs-step-27/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Render Statistics and Profiling](../26/README.md) · [Next: Rendering Resources and Measurement](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

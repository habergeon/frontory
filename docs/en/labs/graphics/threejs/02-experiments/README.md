# Three.js · 14 Materials, Loading, and Selection

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-02`

## Goals and learning outcomes

- Keep the UI usable after failure and highlight only the selected object.
- Leave other objects with a shared material unchanged.

## Prerequisites

Prerequisite concepts: NDC Input, Intersection Results. Prepare the result files and observation notes from unit 13.

## Key concepts and explanations

### Loading States

Asynchronous GLTFLoader results may arrive in a different order from requests. Distinguish loading, success, and error states in the UI.

### Selection Highlighting

Directly changing a shared material may highlight multiple objects together. Isolate the selected target with a separate outline or a cloned material.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all expanded requirements. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-14.js and index.html in the external exercise project. Read the existing threejs-02 and implement a local glb or a basic-shape fallback and error UI.
2. Configure the selection layer for raycasting, restore the previous target’s highlight, and highlight only the new target.
3. Save the output under the Valid local glb input condition, then run again under the Missing path condition. Expected: Basic shapes and the UI remain available even when an error is displayed. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-14-notes.md.

## Variables to observe

| Variable  | Baseline        | Change       | Expected change / hypothesis                                              |
| --------- | --------------- | ------------ | ------------------------------------------------------------------------- |
| Model URL | Valid local glb | Missing path | Basic shapes and the UI remain available even when an error is displayed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep the UI usable after failure and highlight only the selected object.
- [ ] Leave other objects with a shared material unchanged.

## Self-check

1. How do you discard a previous loading request that arrives late?
2. How do selection layers differ from render-camera layers?

## Official references

- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/threejs-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Normalized Coordinates and Selection](../units/13/README.md) · [Next: Model Size and Camera Fitting](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

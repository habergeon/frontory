# Three.js · 23 Resource Ownership Ledger

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-23`

## Goals and learning outcomes

- Distinguish removing an object from releasing resources.
- Avoid duplicate dispose calls for the same resource.

## Prerequisites

Prerequisite concepts: Offscreen Output, Restoring State. Prepare the result files and observation notes from unit 22.

## Key concepts and explanations

### Explicit Release

scene.remove only detaches an object from the scene. GPU-related resources of geometry,material,texture need separate dispose calls.

### Shared Lifetimes

Multiple objects can use one resource. Record owners and reference scope so it is not released before its last user finishes.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-23.js and index.html in the external exercise project. Write a resourceTracker that tracks created geometry,material,texture in a Set.
2. Remove only one of two Mesh objects sharing a material, keep the other rendering, and release each resource once at final shutdown.
3. Save the output under the One user only input condition, then run again under the All users condition. Expected: Shared resources must be released after the last user finishes. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-23-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Removal scope | One user only | All users | Shared resources must be released after the last user finishes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish removing an object from releasing resources.
- [ ] Avoid duplicate dispose calls for the same resource.

## Self-check

1. Does material.dispose automatically release textures too?
2. What else should you check about the lifetime of glTF ImageBitmap objects?

## Official references

- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-23/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Render Targets and Minimap](../22/README.md) · [Next: Asynchronous Scene Replacement](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

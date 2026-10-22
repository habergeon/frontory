# React Three Fiber · 16 Cloning and Sharing Cached Models

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Models, Shared Resources, and Instancing · Editable example · Storage ID: `react-three-fiber-step-16`

## Goals and learning outcomes

- Two instances appear simultaneously at different positions.
- Record whether objects and geometry/material are shared.

## Prerequisites

Unit 16 continues using the deliverables and experiment records from Unit 15.

## Key concepts and explanations

### Scene Objects

The same Object3D cannot be attached to two parents simultaneously. Distinguish cloning strategies from shared resources when multiple instances are needed.

### Clone Scope

Even when scene.clone copies the object hierarchy, geometry and material may remain shared. Check an appropriate separate cloning method for skeletal models.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a control using the same non-skeletal GLB scene twice in src/ModelPair.jsx.
2. Create scene.clone() once for each instance, and place them at different positions.
3. Compare object, geometry, and material uuid values, and record the shared effects of color changes.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Cloning Method | Same scene reference | Clone the object hierarchy | Models appear at two positions, but some resources may remain shared. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Two instances appear simultaneously at different positions.
- [ ] Record whether objects and geometry/material are shared.

## Self-check

1. Why can changing the material color of one cloned model change the other model too?
2. What should you check before applying a simple clone to a skinned model?

## Official references

- [R3F Model Loading](https://r3f.docs.pmnd.rs/tutorials/loading-models)
- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Model Loading and Suspense](../15/README.md) · [Next: Texture Inputs and Updates](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

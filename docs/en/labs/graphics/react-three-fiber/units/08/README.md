# React Three Fiber · 08 useThree Scope and Selection

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: 3D Input and UI State · Editable example · Storage ID: `react-three-fiber-step-08`

## Goals and learning outcomes

- The useThree call is inside a Canvas child.
- Record size and viewport in their different units.

## Prerequisites

Unit 8 continues using the deliverables and experiment records from Unit 7.

## Key concepts and explanations

### Canvas Context

useThree is available only in components inside Canvas. A parent returning Canvas does not yet have that Context.

### Selective Subscription

A selector makes dependencies clear by reading only the required state. Do not assume every imperative change to camera internals is automatically subscribed to.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create src/SceneInfo.jsx as a Canvas child, and read size and viewport.
2. Display measurements in a DOM panel through a low-frequency reporting callback.
3. Change the parent width from 400 to 800, and compare pixel size with the world viewport.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Parent Width | 400px | 800px | Pixel size and the camera-based world extent each update. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The useThree call is inside a Canvas child.
- [ ] Record size and viewport in their different units.

## Self-check

1. Are size.width and viewport.width the same value?
2. Does a selector automatically track changes to camera.position.x?

## Official references

- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: useFrame and Time-based Rotation](../07/README.md) · [Next: Camera Control and projection Updates](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

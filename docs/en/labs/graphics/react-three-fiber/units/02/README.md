# React Three Fiber · 02 Canvas Size and Camera

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Declarative Scenes and Frame Coordinates · Editable example · Storage ID: `react-three-fiber-step-02`

## Goals and learning outcomes

- The Canvas area updates when the parent size changes.
- Record the screen coverage at two fov values in the same viewport.

## Prerequisites

Unit 2 continues using the deliverables and experiment records from Unit 1.

## Key concepts and explanations

### Canvas Area

Canvas determines its rendering area from the size of its parent element. Without a parent height, the scene may not be visible.

### Field of View

Camera position and fov determine what fits on screen. Changing object size and camera settings together makes it difficult to identify the cause.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Give the Canvas parent a height of 400px in src/App.jsx.
2. Set camera position [0,0,5] and fov 50 to view the cube.
3. Change the parent width, and separately record the screen with only fov changed to 75.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| fov | 50 | 75 | At the same distance, the cube appears smaller on screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The Canvas area updates when the parent size changes.
- [ ] Record the screen coverage at two fov values in the same viewport.

## Self-check

1. How do you distinguish a parent height of 0 from an object behind the camera?
2. Do changing fov and changing camera distance always have the same effect?

## Official references

- [R3F Canvas Configuration](https://r3f.docs.pmnd.rs/api/canvas)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Declarative Scenes](../../01-foundations/README.md) · [Next: args and Object Recreation](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

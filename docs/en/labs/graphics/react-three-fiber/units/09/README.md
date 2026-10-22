# React Three Fiber · 09 Camera Control and projection Updates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: 3D Input and UI State · Editable example · Storage ID: `react-three-fiber-step-09`

## Goals and learning outcomes

- The input fov matches camera.fov.
- Record the results before and after updating the matrix separately.

## Prerequisites

Unit 9 continues using the deliverables and experiment records from Unit 8.

## Key concepts and explanations

### Projection Settings

Camera fov, near, and far affect the projection matrix. Imperative changes may require an updateProjectionMatrix call.

### Observation Conditions

Moving the camera changes the screen positions of all objects. Record this separately from object movement to interpret coordinate changes.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Read camera with useThree in src/CameraRig.jsx.
2. Assign fov and call updateProjectionMatrix in an Effect responding to the UI fov value.
3. Change fov between 40 and 70 and camera z between 5 and 8 one at a time, and record the screen.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| fov | 40 | 70 | After the projection update, the same cube appears smaller. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The input fov matches camera.fov.
- [ ] Record the results before and after updating the matrix separately.

## Self-check

1. How do the update paths differ between changing the camera prop and assigning directly?
2. What gets clipped if near is too large?

## Official references

- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)
- [R3F Canvas Configuration](https://r3f.docs.pmnd.rs/api/canvas)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: useThree Scope and Selection](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

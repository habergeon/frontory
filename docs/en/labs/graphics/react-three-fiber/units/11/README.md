# React Three Fiber · 11 Event Propagation and Occlusion

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: 3D Input and UI State · Editable example · Storage ID: `react-three-fiber-step-11`

## Goals and learning outcomes

- The back cube is not selected in blocking mode.
- Record the event order with propagation allowed and blocked.

## Prerequisites

Unit 11 continues using the deliverables and experiment records from Unit 10.

## Key concepts and explanations

### Intersection Propagation

Events reach the nearest intersected object and its ancestors, and may also reach objects behind it. Do not assume this is identical to the DOM overlap model.

### Stopping Propagation

stopPropagation also affects delivery to intersected objects behind the target. Choose whether selection should be exclusive or pass through according to the requirements.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create two cubes overlapping along the camera direction in src/OverlapScene.jsx.
2. Record click logs for each mesh and their parent group.
3. Add stopPropagation to the front cube, and compare clicks at the same position.

## Variables to observe

| Variable           | Baseline | Change                    | Expected change / hypothesis                                          |
| ------------------ | -------- | ------------------------- | --------------------------------------------------------------------- |
| Propagation Policy | Allow    | Block at the front object | The delivery scope of logs for the back object and ancestors changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The back cube is not selected in blocking mode.
- [ ] Record the event order with propagation allowed and blocked.

## Self-check

1. Does a transparent material automatically allow events through?
2. How do object and eventObject differ in a handler on the parent group?

## Official references

- [R3F Pointer Events](https://r3f.docs.pmnd.rs/api/events)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Pointer Intersections and Selection](../10/README.md) · [Next: Dragging and Pointer Capture](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

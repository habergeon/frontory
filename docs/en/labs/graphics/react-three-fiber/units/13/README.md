# React Three Fiber · 13 UI State and Frame Targets

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: 3D Input and UI State · Editable example · Storage ID: `react-three-fiber-step-13`

## Goals and learning outcomes

- Angle error decreases when the target is fixed.
- There is no setState in the frame path.

## Prerequisites

Unit 13 continues using the deliverables and experiment records from Unit 12.

## Key concepts and explanations

### Target State

A slider's target angle can be represented in React state. Keep the actual frame interpolation value in the ref object's property.

### Interpolation

Gradually moving the current value toward the target creates a smooth transition. Use a time-dependent coefficient to reduce differences caused by frame count.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Pass the targetAngle prop to src/SmoothBox.jsx.
2. In useFrame, approach the target angle using the coefficient 1-exp(-k*delta).
3. Change the target from 0→1 and k from 2→8 separately, and record the resulting error.

## Variables to observe

| Variable        | Baseline | Change | Expected change / hypothesis                                      |
| --------------- | -------- | ------ | ----------------------------------------------------------------- |
| Interpolation k | 2        | 8      | The error from the target is smaller after the same elapsed time. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Angle error decreases when the target is fixed.
- [ ] There is no setState in the frame path.

## Self-check

1. What becomes complicated if the target and current angle share the same state?
2. Does interpolation with a fixed coefficient of 0.1 take the same time on every device?

## Official references

- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)
- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Dragging and Pointer Capture](../12/README.md) · [Next: Frames and Events](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

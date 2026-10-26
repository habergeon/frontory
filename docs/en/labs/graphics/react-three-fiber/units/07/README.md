# React Three Fiber · 07 useFrame and Time-based Rotation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Declarative Scenes and Frame Coordinates · Editable example · Storage ID: `react-three-fiber-step-07`

## Goals and learning outcomes

- Rotation matches speed × accumulated delta within the allowed tolerance.
- There is no React setState in the frame callback.

## Prerequisites

Unit 7 continues using the deliverables and experiment records from Unit 6.

## Key concepts and explanations

### Frame Callback

useFrame participates in the Canvas render loop. Its subscription is removed when the component is removed, so avoid adding a separate overlapping RAF loop.

### delta

delta is the time since the previous frame. Multiplying speed by delta reduces differences in rotation speed caused by frame count.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Update the ref rotation with useFrame((_state,delta) => ...) in src/RotatingBox.jsx.
2. Pass speed prop values of 0, 1, and 2, and do not use React setState inside the frame.
3. Record accumulated delta and rotation over 5-second intervals.

## Variables to observe

| Variable | Baseline | Change  | Expected change / hypothesis                     |
| -------- | -------- | ------- | ------------------------------------------------ |
| speed    | 1 rad/s  | 2 rad/s | Rotation doubles for the same accumulated delta. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Rotation matches speed × accumulated delta within the allowed tolerance.
- [ ] There is no React setState in the frame callback.

## Self-check

1. What device differences arise if you add 0.01 every frame?
2. How does limiting a large delta after returning to a tab change its meaning?

## Official references

- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)
- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reading Three.js Objects through ref](../06/README.md) · [Next: useThree Scope and Selection](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

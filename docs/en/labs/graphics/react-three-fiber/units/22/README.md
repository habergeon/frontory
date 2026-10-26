# React Three Fiber · 22 demand Rendering

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: demand Policy and Performance Verification · Editable example · Storage ID: `react-three-fiber-step-22`

## Goals and learning outcomes

- No unnecessary continuous frames occur during stationary demand periods.
- The angle change appears on screen after a button click.

## Prerequisites

Unit 22 continues using the deliverables and experiment records from Unit 21.

## Key concepts and explanations

### Render on Demand

frameloop='demand' requests frames when changes occur. It can avoid continuous rendering in a stationary scene.

### Manual Invalidation

React may not know when you change an object directly through a ref. Request the next frame with invalidate to reflect the change on screen.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Set Canvas frameloop to demand in src/DemandScene.jsx.
2. Change group.rotation.y and call invalidate in the button Effect.
3. Record frame counts for 5 stationary seconds and 5 button interactions in always and demand.

## Variables to observe

| Variable  | Baseline | Change | Expected change / hypothesis                                            |
| --------- | -------- | ------ | ----------------------------------------------------------------------- |
| frameloop | always   | demand | Stationary frames decrease, while button changes should remain visible. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] No unnecessary continuous frames occur during stationary demand periods.
- [ ] The angle change appears on screen after a button click.

## Self-check

1. Is invalidate an immediate synchronous render command?
2. Do multiple invalidate calls guarantee the same number of frames?

## Official references

- [R3F Scaling Performance and demand Rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Instance Selection and Bounds](../21/README.md) · [Next: demand and Ending Motion](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

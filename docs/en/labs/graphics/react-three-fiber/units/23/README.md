# React Three Fiber · 23 demand and Ending Motion

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: demand Policy and Performance Verification · Editable example · Storage ID: `react-three-fiber-step-23`

## Goals and learning outcomes

- The final angle error is at most 0.001.
- Continuous frames do not accumulate for 3 seconds after convergence.

## Prerequisites

Unit 23 continues using the deliverables and experiment records from Unit 22.

## Key concepts and explanations

### Continuous Motion

Even in demand mode, animation needs a next frame. Keep requesting invalidate until the target is reached, then stop.

### Convergence Condition

Interpolation may not reach its target exactly. Snap to the target within a tolerance and end the loop.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Calculate the error between target and current angles in src/DemandMotion.jsx.
2. After interpolation in useFrame, call invalidate if the error is at least 0.001.
3. Give a new target through a button, and record frame counts before and after motion ends.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Stopping Tolerance | 0 | 0.001 | At a small error, snap exactly to the target and stop requesting frames. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The final angle error is at most 0.001.
- [ ] Continuous frames do not accumulate for 3 seconds after convergence.

## Self-check

1. Who requests the first frame in demand mode?
2. Which benefit disappears if invalidate continues after the animation ends?

## Official references

- [R3F Scaling Performance and demand Rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: demand Rendering](../22/README.md) · [Next: DPR and Shadow Cost](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

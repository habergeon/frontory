# React Three Fiber · 28 Resource Sharing and Frame Policy

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: demand Policy and Performance Verification · Editable example · Storage ID: `react-three-fiber-03`

## Goals and learning outcomes

- Stationary display, clicks, and animation completion all work in demand mode.
- Explain the final policy with draw call, frame, and disposal records under the same conditions.

## Prerequisites

Unit 28 continues using the deliverables and experiment records from Unit 27.

## Key concepts and explanations

### Shared Lifetime

Multiple objects use shared geometry and material. Align ownership and automatic dispose policies so resources are disposed when the last consumer finishes.

### Frame Policy

A stationary scene can reduce frames with demand. Direct changes and animation need invalidate at their start, during progress, and at completion.

## Practice setup

Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref. The existing react-three-fiber-03 preview is a starting point. Implement the extended deliverables described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare a shared grid and an instanced control with the same layout in src/StudyScene.jsx.
2. Compare stationary display and interaction in always and demand, and record resource trends after 10 scene switches.
3. Submit selection, note preservation, frame policy, resource ownership, and measurement limitations together in notes/final.md.

## Variables to observe

| Variable             | Baseline                                      | Change        | Expected change / hypothesis                                               |
| -------------------- | --------------------------------------------- | ------------- | -------------------------------------------------------------------------- |
| Scene Representation | Individual mesh objects with shared resources | instancedMesh | Use measurements to distinguish resource sharing from draw call reduction. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Stationary display, clicks, and animation completion all work in demand mode.
- [ ] Explain the final policy with draw call, frame, and disposal records under the same conditions.

## Self-check

1. What do shared geometry and instancing each reduce?
2. Which change paths should you check if the display freezes after switching to demand?

## Official references

- [R3F Scaling Performance and demand Rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)

## Linked example and execution scope

[Example source](../../../../../../src/labs/react-three-fiber-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Performance Experiments for the Integrated Scene](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

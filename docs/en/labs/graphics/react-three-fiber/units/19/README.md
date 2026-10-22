# React Three Fiber · 19 Reducing Allocations during Frames

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Models, Shared Resources, and Instancing · Editable example · Storage ID: `react-three-fiber-step-19`

## Goals and learning outcomes

- There are 0 new Vector3 calls inside frames on the reuse path.
- Record averages and long frames in both performance records under the same conditions.

## Prerequisites

Unit 19 continues using the deliverables and experiment records from Unit 18.

## Key concepts and explanations

### Allocation Cost

Creating objects such as Vector3 every frame may increase garbage collection pressure. Prepare reusable temporary objects outside the frame.

### Measurement

Short frame delays may not stand out in average FPS. Observe frame-time distributions and allocations together in the same scene.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a control in src/MovingCloud.jsx that allocates Vector3 every frame.
2. Keep a reusable Vector3 in a ref or stable initialization path, and update it with set and copy.
3. Using the same 500 objects, compare 10-second performance records of both methods.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Temporary Objects | new every frame | Reuse | Allocations may decrease, but measure the actual timing change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There are 0 new Vector3 calls inside frames on the reuse path.
- [ ] Record averages and long frames in both performance records under the same conditions.

## Self-check

1. When can object reuse unintentionally share values?
2. Does reduced memory allocation always increase FPS?

## Official references

- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shared geometry and material](../18/README.md) · [Next: Drawing Repeated Objects with instancedMesh](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

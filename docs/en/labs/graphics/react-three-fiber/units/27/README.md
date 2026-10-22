# React Three Fiber · 27 Performance Experiments for the Integrated Scene

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: demand Policy and Performance Verification · Editable example · Storage ID: `react-three-fiber-step-27`

## Goals and learning outcomes

- Provide 10-second stationary and interaction records for each condition.
- Check draft preservation and selection accuracy under every condition.

## Prerequisites

Unit 27 continues using the deliverables and experiment records from Unit 26.

## Key concepts and explanations

### Separate Metrics

React commits, draw calls, frame times, and resource counts describe different costs. Do not judge overall performance from a single number.

### One Variable

Changing object count, DPR, and frameloop together obscures the cause. Fix a baseline scene and compare one condition at a time.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Integrate selection, a model, an instanced grid, and DOM notes in src/StudyScene.jsx.
2. Run the same interactions with 100 and 1000 objects separately in always and demand.
3. Record conditions, frame times, draw calls, resource counts, and failures in notes/bench.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Object Count | 100 objects | 1000 objects | Measure how CPU, GPU, and selection costs change at the same quality. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Provide 10-second stationary and interaction records for each condition.
- [ ] Check draft preservation and selection accuracy under every condition.

## Self-check

1. Can fewer React renders alone support a claim of lower GPU cost?
2. What else should you record when experiment results differ between devices?

## Official references

- [R3F Scaling Performance and demand Rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Alternative Controls and Errors in 3D UI](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

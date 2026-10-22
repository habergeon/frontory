# React Three Fiber · 24 DPR and Shadow Cost

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: demand Policy and Performance Verification · Editable example · Storage ID: `react-three-fiber-step-24`

## Goals and learning outcomes

- Record buffer dimensions with a fixed CSS size.
- Compare DPR and shadow variables separately.

## Prerequisites

Unit 24 continues using the deliverables and experiment records from Unit 23.

## Key concepts and explanations

### Pixel Count

A larger DPR increases rendered pixels in the same CSS area. Compare image quality and GPU cost with the same camera.

### Shadow Passes

Shadows may require additional render work and a shadow map. Define where they are needed rather than enabling them on every object and light.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add dpr choices of 1 and 2 in src/QualityScene.jsx.
2. Specify one shadow-casting light and the castShadow and receiveShadow targets.
3. Record separate 10-second experiments changing only DPR and only shadows.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| DPR | 1 | 2 | The buffer pixel count becomes approximately four times larger, so cost and quality may change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record buffer dimensions with a fixed CSS size.
- [ ] Compare DPR and shadow variables separately.

## Self-check

1. Does doubling DPR necessarily halve FPS?
2. Are shadow map resolution and Canvas DPR the same setting?

## Official references

- [R3F Canvas Configuration](https://r3f.docs.pmnd.rs/api/canvas)
- [R3F Scaling Performance and demand Rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: demand and Ending Motion](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

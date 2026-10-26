# React Three Fiber · 18 Shared geometry and material

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Models, Shared Resources, and Instancing · Editable example · Storage ID: `react-three-fiber-step-18`

## Goals and learning outcomes

- All 36 mesh objects have the same geometry uuid.
- At final shutdown, the owner disposes each resource once.

## Prerequisites

Unit 18 continues using the deliverables and experiment records from Unit 17.

## Key concepts and explanations

### Resource Sharing

Passing the same geometry and material to multiple mesh objects can reduce duplicate creation. Each mesh retains its independent transform.

### Disposal Responsibility

If one child disposes a shared resource, other consumers are affected. When using dispose={null}, the final owner must explicitly dispose it.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create geometry and material once in the owning component in src/SharedGrid.jsx.
2. Pass the same references to 36 mesh objects, and specify the child automatic disposal policy.
3. Remove one mesh and the entire grid separately, and record uuid and dispose logs.

## Variables to observe

| Variable          | Baseline        | Change                     | Expected change / hypothesis                                      |
| ----------------- | --------------- | -------------------------- | ----------------------------------------------------------------- |
| Resource Creation | Create per mesh | Share once from the parent | All 36 mesh objects reference the same 1 geometry and 1 material. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] All 36 mesh objects have the same geometry uuid.
- [ ] At final shutdown, the owner disposes each resource once.

## Self-check

1. Is useMemo guaranteed to be a permanent lifetime store?
2. What remains if you set dispose=null and omit cleanup?

## Official references

- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)
- [R3F Scaling Performance and demand Rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Texture Inputs and Updates](../17/README.md) · [Next: Reducing Allocations during Frames](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# React Three Fiber · 21 Instance Selection and Bounds

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Models, Shared Resources, and Instancing · Editable example · Storage ID: `react-three-fiber-step-21`

## Goals and learning outcomes

- The clicked id matches the DOM selection panel.
- Check selection and display at the new position too.

## Prerequisites

Unit 21 continues using the deliverables and experiment records from Unit 20.

## Key concepts and explanations

### Instance id

The intersection event's instanceId identifies an item within the group. Keep a mapping between array indices and actual domain ids.

### Updating Bounds

Changing instance matrices may also affect bounds calculations. Check bounding information if picking or culling is incorrect after movement.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Convert instanceId to a domain id in onClick in src/InstancedGrid.jsx.
2. Change selection colors with setColorAt and instanceColor.needsUpdate.
3. Move an instance far away, and compare bounds recalculation and click results.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Instance Position | Initial grid | Move outside the grid | Update bounding information to assess picking and culling at the new position. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The clicked id matches the DOM selection panel.
- [ ] Check selection and display at the new position too.

## Self-check

1. Can instanceId serve as a permanent data id?
2. Are needsUpdate for matrix and color buffers the same property?

## Official references

- [R3F Pointer Events](https://r3f.docs.pmnd.rs/api/events)
- [R3F Scaling Performance and demand Rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Drawing Repeated Objects with instancedMesh](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

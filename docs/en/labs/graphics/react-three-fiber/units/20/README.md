# React Three Fiber · 20 Drawing Repeated Objects with instancedMesh

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Models, Shared Resources, and Instancing · Editable example · Storage ID: `react-three-fiber-step-20`

## Goals and learning outcomes

- 100 objects appear in the same layout.
- Record draw calls for both representations under the same pass conditions.

## Prerequisites

Unit 20 continues using the deliverables and experiment records from Unit 19.

## Key concepts and explanations

### Instancing

InstancedMesh combines many transforms using the same geometry and material into one object. Its event and update methods differ from individual mesh objects.

### Matrix Upload

After setMatrixAt, signal changes with instanceMatrix.needsUpdate. Distinguish CPU array changes from GPU updates.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create an instancedMesh and 100 positions in src/InstancedGrid.jsx.
2. Compute matrices with a temporary Object3D, call setMatrixAt, then set needsUpdate.
3. Compare renderer.info.render.calls with the same 100 individual mesh objects.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Representation | 100 individual mesh objects | 100 objects in instancedMesh | The draw call count may decrease under the same resource conditions. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] 100 objects appear in the same layout.
- [ ] Record draw calls for both representations under the same pass conditions.

## Self-check

1. Is it easy to combine objects with different materials into one instancedMesh?
2. If needsUpdate is omitted, do CPU changes appear on screen?

## Official references

- [R3F Scaling Performance and demand Rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reducing Allocations during Frames](../19/README.md) · [Next: Instance Selection and Bounds](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

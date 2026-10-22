# React Three Fiber · 01 Declarative Scenes

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Declarative Scenes and Frame Coordinates · Editable example · Storage ID: `react-three-fiber-01`

## Goals and learning outcomes

- The corresponding code for the cube, camera, and lights is recorded.
- Changing scale changes the cube size.

## Prerequisites

React state, ref, Effect and cleanup; Three.js geometry, material, and cameras; vectors and delta.

## Key concepts and explanations

### React renderer

R3F represents Three.js objects as a React tree. A mesh inside Canvas is not a DOM element; a separate renderer manages it.

### Object Ownership

The geometry and material declared in JSX are attached to the scene tree. When passing objects created externally, check who is responsible for their lifetime.

## Practice setup

Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref. The existing react-three-fiber-01 preview is a starting point. Implement the extended deliverables described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Install compatible React, Three.js, and @react-three/fiber versions in an external React Vite project, and record them.
2. Declare a mesh, boxGeometry, meshStandardMaterial, and lights inside Canvas in src/Scene.jsx.
3. In notes/day01.md, map the existing imperative cube creation, addition, and removal code to JSX.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| scale prop | 1 | 1.5 | The displayed cube becomes larger while using the same geometry. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The corresponding code for the cube, camera, and lights is recorded.
- [ ] Changing scale changes the cube size.

## Self-check

1. Why does putting an ordinary div inside Canvas cause problems?
2. What objects do a mesh declaration and geometry creation produce?

## Official references

- [R3F Getting Started and React Version Compatibility](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)

## Linked example and execution scope

[Example source](../../../../../../src/labs/react-three-fiber-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Canvas Size and Camera](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# React Three Fiber · 14 Frames and Events

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: 3D Input and UI State · Editable example · Storage ID: `react-three-fiber-02`

## Goals and learning outcomes

- 10 clicks produce only the intended 10 selection changes.
- React state is not updated every frame during rotation.

## Prerequisites

Unit 14 continues using the deliverables and experiment records from Unit 13.

## Key concepts and explanations

### Separate Responsibilities

useFrame updates frequent coordinate and rotation changes through refs. Update React state only when UI meaning changes, such as hover or click selection.

### Propagation Policy

Pointer propagation rules determine selection for overlapping objects. Use event logs to check actual intersection order and duplicate selection.

## Practice setup

Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref. The existing react-three-fiber-02 preview is a starting point. Implement the extended deliverables described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Integrate hover color, click selection, and delta rotation in src/InteractiveScene.jsx.
2. Implement a stopPropagation policy for overlapping cubes and selection clearing with onPointerMissed.
3. Record 10 clicks and 5 seconds of rotation, and check that there is no frame setState.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Propagation | Allow | Block at the front mesh | One click does not also change the selection of an object behind it. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] 10 clicks produce only the intended 10 selection changes.
- [ ] React state is not updated every frame during rotation.

## Self-check

1. Are hover and actual selection the same state?
2. How can you distinguish a click in empty space from a click at the end of a drag?

## Official references

- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)
- [R3F Pointer Events](https://r3f.docs.pmnd.rs/api/events)
- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)

## Linked example and execution scope

[Example source](../../../../../../src/labs/react-three-fiber-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: UI State and Frame Targets](../units/13/README.md) · [Next: Model Loading and Suspense](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

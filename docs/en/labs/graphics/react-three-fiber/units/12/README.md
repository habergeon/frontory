# React Three Fiber · 12 Dragging and Pointer Capture

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: 3D Input and UI State · Editable example · Storage ID: `react-three-fiber-step-12`

## Goals and learning outcomes

- The dragging state is false even when released outside the object.
- React setState is not used on every event during dragging.

## Prerequisites

Unit 12 continues using the deliverables and experiment records from Unit 11.

## Key concepts and explanations

### Pointer Capture

Capture keeps a drag going when the pointer moves outside the object. R3F capture works alongside intersection-list processing, so check how it differs from the DOM.

### Coordinate Plane

Adding screen displacement directly to a world position makes movement speed depend on the camera. Find movement coordinates by intersecting the ray with a chosen plane.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Capture pointerId on pointerdown in src/DraggableBox.jsx.
2. On pointermove, apply the intersection of the ray and the z=0 plane to the ref position.
3. Release capture on pointerup and cancellation, and test movement outside the object.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Capture | Absent | Present | Drag completion can be handled even outside the object boundary. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The dragging state is false even when released outside the object.
- [ ] React setState is not used on every event during dragging.

## Self-check

1. What changes if the drag plane is perpendicular to the camera?
2. Does capture alone block every event on other objects?

## Official references

- [R3F Pointer Events](https://r3f.docs.pmnd.rs/api/events)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Event Propagation and Occlusion](../11/README.md) · [Next: UI State and Frame Targets](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

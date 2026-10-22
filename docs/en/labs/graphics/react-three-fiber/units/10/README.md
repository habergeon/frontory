# React Three Fiber · 10 Pointer Intersections and Selection

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: 3D Input and UI State · Editable example · Storage ID: `react-three-fiber-step-10`

## Goals and learning outcomes

- Exactly 1 object is highlighted as selected.
- The DOM detail id matches the clicked mesh id.

## Prerequisites

Unit 10 continues using the deliverables and experiment records from Unit 9.

## Key concepts and explanations

### raycast Events

R3F pointer events are delivered based on intersections with 3D objects. event.point contains the world position of the intersection.

### Selection State

A selected id is low-frequency state shared with the UI. Moving coordinates do not need to be copied into React state on every pointer movement.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Pass the id to the parent from onClick in src/SelectableBox.jsx.
2. Derive the selection color and DOM detail panel from the same selectedId.
3. Click the three cubes in sequence, and record id and event.point.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Selection Target | Left cube | Right cube | The color and detail panel change to the same id. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Exactly 1 object is highlighted as selected.
- [ ] The DOM detail id matches the clicked mesh id.

## Self-check

1. Is event.point in local or world coordinates?
2. Why separate the state update frequencies of pointermove and click?

## Official references

- [R3F Pointer Events](https://r3f.docs.pmnd.rs/api/events)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Camera Control and projection Updates](../09/README.md) · [Next: Event Propagation and Occlusion](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

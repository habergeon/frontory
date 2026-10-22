# React Three Fiber · 04 group and Local Coordinates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Declarative Scenes and Frame Coordinates · Editable example · Storage ID: `react-three-fiber-step-04`

## Goals and learning outcomes

- The child's position.x remains 2.
- Record how the world position corresponds to the direction of movement on screen.

## Prerequisites

Unit 4 continues using the deliverables and experiment records from Unit 3.

## Key concepts and explanations

### Scene Hierarchy

A group creates a reference coordinate system for its children's transforms. A child's position is local to its parent.

### Transform Order

Parent rotation affects both a child's position and orientation. World coordinates reveal the difference between assigned numbers and the actual position.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a group and a child cube at x=2 in src/OrbitGroup.jsx.
2. Change the group's rotation-y from 0 to Math.PI/2.
3. Log the getWorldPosition result and compare it with movement on screen.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Parent Rotation | 0 | Math.PI/2 | The child's local x stays unchanged, but its world position moves. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The child's position.x remains 2.
- [ ] Record how the world position corresponds to the direction of movement on screen.

## Self-check

1. When should you distinguish parent movement from child movement?
2. How does changing the rotation axis change the orbit?

## Official references

- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: args and Object Recreation](../03/README.md) · [Next: Materials and Lighting](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

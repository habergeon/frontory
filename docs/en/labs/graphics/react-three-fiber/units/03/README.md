# React Three Fiber · 03 args and Object Recreation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Declarative Scenes and Frame Coordinates · Editable example · Storage ID: `react-three-fiber-step-03`

## Goals and learning outcomes

- Changing only scale does not change the geometry uuid.
- Record the uuid before and after changing args.

## Prerequisites

Unit 3 continues using the deliverables and experiment records from Unit 2.

## Key concepts and explanations

### Constructor Arguments

args passes arguments to a Three.js constructor. Changing args may recreate the object, so distinguish this from a simple transform.

### Property Updates

position, rotation, and scale are transform properties of an existing object. Recreating geometry dimensions and changing scale have different costs.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Box.jsx, accept boxGeometry args and mesh scale as separate props.
2. Record the geometry uuid in an Effect log.
3. Change the width args and scale separately, and compare the uuid and screen.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Resizing Method | mesh scale | geometry args | Changing args changes the geometry identity. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Changing only scale does not change the geometry uuid.
- [ ] Record the uuid before and after changing args.

## Self-check

1. What happens if you keep calling new BoxGeometry inside render?
2. Which geometry changes should not be represented with scale?

## Official references

- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Canvas Size and Camera](../02/README.md) · [Next: group and Local Coordinates](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

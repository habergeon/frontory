# React Three Fiber · 06 Reading Three.js Objects through ref

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Declarative Scenes and Frame Coordinates · Editable example · Storage ID: `react-three-fiber-step-06`

## Goals and learning outcomes

- Record the object type and uuid of ref.current.
- The final implementation updates rotation through only one path.

## Prerequisites

Unit 6 continues using the deliverables and experiment records from Unit 5.

## Key concepts and explanations

### Object ref

A mesh ref points to a Three.js Mesh rather than a DOM node. After commit, you can read the current object's position, rotation, and uuid.

### Consistent Ownership

If props and imperative code write the same property, their updates may conflict. Decide which path owns that property.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Attach useRef to the mesh in src/InspectableBox.jsx.
2. In an Effect triggered by button input, change rotation.y and record the uuid.
3. Compare the result with a control that also passes the same rotation through props.

## Variables to observe

| Variable       | Baseline     | Change                   | Expected change / hypothesis                             |
| -------------- | ------------ | ------------------------ | -------------------------------------------------------- |
| Rotation Owner | One ref path | Both ref and props paths | The two paths may overwrite the value during a rerender. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the object type and uuid of ref.current.
- [ ] The final implementation updates rotation through only one path.

## Self-check

1. When can ref be null?
2. Do you need to store both React state and Three.js object properties?

## Official references

- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)
- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Materials and Lighting](../05/README.md) · [Next: useFrame and Time-based Rotation](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

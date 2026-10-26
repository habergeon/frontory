# React Three Fiber · 26 Alternative Controls and Errors in 3D UI

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: demand Policy and Performance Verification · Editable example · Storage ID: `react-three-fiber-step-26`

## Goals and learning outcomes

- Select every object using only the keyboard.
- Distinguish unsupported-environment guidance from model failure guidance.

## Prerequisites

Unit 26 continues using the deliverables and experiment records from Unit 25.

## Key concepts and explanations

### DOM Control Path

Providing every function only through 3D clicks makes keyboard access difficult. Include a DOM list that changes the same selection state.

### Unsupported Environments

Canvas fallback guides users in unsupported GL environments. Runtime loading failures need a separate error boundary.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add DOM selection buttons connected to mesh ids in src/App.jsx.
2. Implement distinct Canvas fallback and model error messages.
3. Select and clear using only the keyboard, and review the unsupported-environment fallback description.

## Variables to observe

| Variable     | Baseline | Change               | Expected change / hypothesis                        |
| ------------ | -------- | -------------------- | --------------------------------------------------- |
| Input Method | 3D click | DOM keyboard buttons | Both produce the same selectedId and detail result. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Select every object using only the keyboard.
- [ ] Distinguish unsupported-environment guidance from model failure guidance.

## Self-check

1. Does adding only an HTML label to a mesh inside Canvas solve accessibility?
2. Which note-taking functions should remain available on the fallback screen?

## Official references

- [R3F Canvas Configuration](https://r3f.docs.pmnd.rs/api/canvas)
- [R3F Pointer Events](https://r3f.docs.pmnd.rs/api/events)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scene Switching and Resource Audits](../25/README.md) · [Next: Performance Experiments for the Integrated Scene](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

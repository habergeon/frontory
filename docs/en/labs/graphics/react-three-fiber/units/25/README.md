# React Three Fiber · 25 Scene Switching and Resource Audits

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: demand Policy and Performance Verification · Editable example · Storage ID: `react-three-fiber-step-25`

## Goals and learning outcomes

- Record resource-count trends over 10 switches.
- Specify who disposes shared resources, external primitive resources, and declarative resources.

## Prerequisites

Unit 25 continues using the deliverables and experiment records from Unit 24.

## Key concepts and explanations

### Visibility and Removal

visible=false leaves objects in the scene. unmount removes them from the tree, changing recreation costs and disposal policies.

### Resource Tracking

Memory counts in renderer.info may not immediately reach 0 because of internal caches. Examine growth trends across repeated switches alongside dispose logs for each owner.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create two scenes and visible and unmount switching policies in src/SceneSwitcher.jsx.
2. Alternate the same scenes 10 times, collecting geometry and texture counts and dispose logs.
3. Create an ownership table for shared and primitive resources.

## Variables to observe

| Variable         | Baseline          | Change  | Expected change / hypothesis                                          |
| ---------------- | ----------------- | ------- | --------------------------------------------------------------------- |
| Switching Policy | Hide with visible | unmount | Recreation and disposal counts, and retained resource counts, differ. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record resource-count trends over 10 switches.
- [ ] Specify who disposes shared resources, external primitive resources, and declarative resources.

## Self-check

1. Does a geometry count above 0 always indicate a leak?
2. Does useFrame in a hidden scene stop automatically?

## Official references

- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)
- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: DPR and Shadow Cost](../24/README.md) · [Next: Alternative Controls and Errors in 3D UI](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

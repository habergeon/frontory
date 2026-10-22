# React Three Fiber · 05 Materials and Lighting

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Declarative Scenes and Frame Coordinates · Editable example · Storage ID: `react-three-fiber-step-05`

## Goals and learning outcomes

- Record how the two materials respond differently to lighting.
- Also distinguish two roughness settings with the same camera.

## Prerequisites

Unit 5 continues using the deliverables and experiment records from Unit 4.

## Key concepts and explanations

### Lighting Dependence

MeshStandardMaterial responds to lighting. MeshBasicMaterial displays its base color even without lighting.

### Surface Inputs

roughness and metalness change the surface response. Keep lighting and the camera fixed to compare material variables.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Place two mesh objects with the same geometry in src/MaterialStudy.jsx.
2. Use a basic material on one and a standard material on the other.
3. Change directionalLight intensity between 0 and 3, and compare the two surfaces.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Light intensity | 0 | 3 | The standard surface changes, while the basic color does not directly depend on lighting. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record how the two materials respond differently to lighting.
- [ ] Also distinguish two roughness settings with the same camera.

## Self-check

1. If standard appears black, should you only change the material color?
2. What should you check if increasing metalness does not reveal reflections?

## Official references

- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: group and Local Coordinates](../04/README.md) · [Next: Reading Three.js Objects through ref](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

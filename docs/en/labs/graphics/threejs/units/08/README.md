# Three.js · 08 Light Types and Placement

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-08`

## Goals and learning outcomes

- Distinguish the light position from its target.
- Explain the material response when lights are off.

## Prerequisites

Prerequisite concepts: Shared References, Ownership. Prepare the result files and observation notes from unit 7.

## Key concepts and explanations

### Directional Light

DirectionalLight represents light coming from a constant direction. Its target affects the light direction as well as its position.

### Point Light

PointLight emits light in multiple directions from one point. Observe changes with distance from objects too.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-08.js and index.html in the external exercise project. Create a floor and a sphere, and switch between directional and point lights.
2. Move the light with sliders and record changes in highlights and brightness.
3. Save the output under the DirectionalLight input condition, then run again under the PointLight condition. Expected: The surface response to distance and position changes differs. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-08-notes.md.

## Variables to observe

| Variable   | Baseline         | Change     | Expected change / hypothesis                                   |
| ---------- | ---------------- | ---------- | -------------------------------------------------------------- |
| Light type | DirectionalLight | PointLight | The surface response to distance and position changes differs. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish the light position from its target.
- [ ] Explain the material response when lights are off.

## Self-check

1. Why is MeshBasicMaterial visible even with the lights off?
2. Why does ambient light alone make forms look flat?

## Official references

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
- [Three.js Shadows](https://threejs.org/manual/pages/shadows.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-08/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shared Geometry and Cloning](../07/README.md) · [Next: Roughness and Metalness](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Three.js · 12 Shadow Maps

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-12`

## Goals and learning outcomes

- Distinguish caster and receiver settings.
- Distinguish clipped shadows from reduced resolution.

## Prerequisites

Prerequisite concepts: Color Data, Output Conversion. Prepare the result files and observation notes from unit 11.

## Key concepts and explanations

### Additional Rendering

Shadows require depth rendering from the light’s viewpoint. The number of lights and casters adds cost.

### Shadow Coverage

The shadow camera range defines the area where shadows are calculated. An excessively wide range spreads the resolution of a fixed map size over more area.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-12.js and index.html in the external exercise project. Configure renderer.shadowMap.enabled, castShadow, and receiveShadow.
2. Display a shadow camera helper for DirectionalLight and compare before and after narrowing its range.
3. Save the output under the Wide area input condition, then run again under the Small area around the target condition. Expected: With the same mapSize, shadows near the target may become more detailed. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-12-notes.md.

## Variables to observe

| Variable        | Baseline  | Change                       | Expected change / hypothesis                                             |
| --------------- | --------- | ---------------------------- | ------------------------------------------------------------------------ |
| shadow coverage | Wide area | Small area around the target | With the same mapSize, shadows near the target may become more detailed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish caster and receiver settings.
- [ ] Distinguish clipped shadows from reduced resolution.

## Self-check

1. What is the cost of increasing mapSize alone?
2. Why can a large bias make shadows appear detached?

## Official references

- [Three.js Shadows](https://threejs.org/manual/pages/shadows.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-12/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Color Spaces and Output](../11/README.md) · [Next: Normalized Coordinates and Selection](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

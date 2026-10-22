# Three.js · 09 Roughness and Metalness

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-09`

## Goals and learning outcomes

- Compare the two material variables independently.
- Record the lighting conditions.

## Prerequisites

Prerequisite concepts: Directional Light, Point Light. Prepare the result files and observation notes from unit 8.

## Key concepts and explanations

### Roughness

roughness controls the spread of reflections caused by microscopic surface detail. Low values tend to produce sharp highlights.

### Metalness

metalness distinguishes the responses of metals and nonmetals. With insufficient environment reflections, metal may appear darker than expected.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-09.js and index.html in the external exercise project. Arrange MeshStandardMaterial spheres in a grid of roughness and metalness values.
2. Fix the light and camera, change only one of the two values, and take screenshots.
3. Save the output under the 0.1 input condition, then run again under the 0.8 condition. Expected: Reflected highlights become wider and blurrier. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-09-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| roughness | 0.1 | 0.8 | Reflected highlights become wider and blurrier. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Compare the two material variables independently.
- [ ] Record the lighting conditions.

## Self-check

1. Does metalness 1 simply mean shinier?
2. How should you interpret a metal without an environment map?

## Official references

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-09/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Light Types and Placement](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Three.js · 10 Textures and UVs

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-10`

## Goals and learning outcomes

- Distinguish UVs from world coordinates.
- Report a failed texture URL through an error UI.

## Prerequisites

Prerequisite concepts: Roughness, Metalness. Prepare the result files and observation notes from unit 9.

## Key concepts and explanations

### UV Mapping

UVs connect vertices to image positions. Stretching geometry may stretch its texture too.

### Repeat Settings

Changing repeat alone does not repeat a texture if wrapping is configured incorrectly. Consider the source texture dimensions together with the surface proportions.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-10.js and index.html in the external exercise project. Load a local checker image with TextureLoader and assign it to a plane’s map.
2. Set wrapS and wrapT to RepeatWrapping and accept values for repeat.set.
3. Save the output under the 1,1 input condition, then run again under the 4,2 condition. Expected: The checker pattern repeats four times horizontally and twice vertically across the surface. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-10-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| repeat | 1,1 | 4,2 | The checker pattern repeats four times horizontally and twice vertically across the surface. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish UVs from world coordinates.
- [ ] Report a failed texture URL through an error UI.

## Self-check

1. Why do only edge colors stretch even after changing repeat settings?
2. How do the roles of a normal map and a color image differ?

## Official references

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
- [Three.js Color Management](https://threejs.org/manual/pages/color-management.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Checks UV repeat with a generated checker DataTexture instead of an external image. Extend network TextureLoader error handling in an external project.

- [example.js](../../../../../../../src/labs/threejs-step-10/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Roughness and Metalness](../09/README.md) · [Next: Color Spaces and Output](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

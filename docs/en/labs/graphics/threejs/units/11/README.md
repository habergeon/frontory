# Three.js · 11 Color Spaces and Output

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-11`

## Goals and learning outcomes

- Distinguish color maps from normal and roughness maps.
- Explain input, working, and output color spaces.

## Prerequisites

Prerequisite concepts: UV Mapping, Repeat Settings. Prepare the result files and observation notes from unit 10.

## Key concepts and explanations

### Color Data

Color textures and numerical data textures have different meanings. Color images need an appropriate colorSpace for correct lighting calculations.

### Output Conversion

The renderer’s output color space belongs to the display stage. Confusing input and output and converting twice changes colors.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-11.js and index.html in the external exercise project. Assign SRGBColorSpace to a colored checker texture and display it under neutral lighting.
2. Create a comparison with an incorrect input color space on the same material, and record the settings in a table.
3. Save the output under the SRGBColorSpace input condition, then run again under the NoColorSpace condition. Expected: The interpretation of brightness in the same image may change. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-11-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Color texture colorSpace | SRGBColorSpace | NoColorSpace | The interpretation of brightness in the same image may change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish color maps from normal and roughness maps.
- [ ] Explain input, working, and output color spaces.

## Self-check

1. Why should you not assign sRGB to every texture?
2. What conditions are needed to compare CSS colors with rendered output?

## Official references

- [Three.js Color Management](https://threejs.org/manual/pages/color-management.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-11/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Textures and UVs](../10/README.md) · [Next: Shadow Maps](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

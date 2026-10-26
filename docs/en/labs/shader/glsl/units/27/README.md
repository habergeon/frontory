# GLSL · 27 Quality Criteria and Regression Records

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Interaction, Postprocessing, and Cost Evaluation · Editable example · Storage ID: `glsl-step-27`

## Goals and learning outcomes

- Create reproducible visual references.
- Record local quality losses.

## Prerequisites

Continue using the output and records from Unit 26. Before experimenting with Quality Criteria and Regression Records, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Fixed Inputs

Fixing time and pointer inputs makes image comparisons reproducible. Different rendering environments can produce pixel differences, so record tolerances.

### Regions of Interest

A whole-image average difference can hide lost small highlights or thin boundaries. Compare both the full screen and selected regions.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Save time, pointer, resolution, and effect variables in presets.json.
2. Capture reference and half-resolution images for three presets.
3. Record boundary, blur, and highlight ROI differences and the environment in report.md.

## Variables to observe

| Variable        | Baseline                      | Change                                    | Expected change / hypothesis                                                      |
| --------------- | ----------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| Quality setting | full resolution and 4 octaves | half resolution and the same octave count | Expect lower pixel cost but greater loss of boundaries and high-frequency detail. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Save input values and environment details for all three presets.
- [ ] Describe losses in three ROIs using numbers or pixel locations.

## Self-check

1. Should every pixel difference on another GPU count as a regression?
2. When should reference images be updated?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use 640×360/320×180 sizes; frame intervals are different from GPU time. The provided selections change both full/half resolution and the noise interpolation expression while retaining 4 octaves. This is not a controlled comparison of resolution alone. Comparing with fixed interpolation is a separate assignment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Editing Failures and Context Recovery](../26/README.md) · [Next: Interaction and Cost](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

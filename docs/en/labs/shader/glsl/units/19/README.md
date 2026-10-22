# GLSL · 19 Specular Lighting and View Vectors

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting and Procedural Surfaces · Editable example · Storage ID: `glsl-step-19`

## Goals and learning outcomes

- Implement view-dependent specular lighting.
- Explain the limits of an educational lighting model.

## Prerequisites

Continue using the output and records from Unit 18. Before experimenting with Specular Lighting and View Vectors, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### View Direction

Specular lighting depends on camera direction as well as the light. If highlights stay fixed when the camera moves, check spaces and direction signs.

### Model Limitations

A simple Blinn-Phong term is an educational reflection model. Do not call it a complete energy-conserving PBR implementation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write normalize(L+V) and pow(max(dot(N,H),0),shininess) in specular.glsl.
2. Keep the light fixed and move the camera to two positions.
3. Compare highlight width at the same time point with shininess 8 and 64.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| shininess | 8 | 64 | Expect narrower highlights, while recognizing that this does not describe every physical property of the material. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check highlight movement at both camera positions.
- [ ] Record highlight widths in pixels for both shininess values.

## Self-check

1. What happens to the normalize input when L and V are nearly opposite?
2. Can roughness and shininess be treated as the same value?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Normals and Diffuse Lighting](../18/README.md) · [Next: Normals on Deformed Surfaces](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

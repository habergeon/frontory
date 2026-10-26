# GLSL · 18 Normals and Diffuse Lighting

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting and Procedural Surfaces · Editable example · Storage ID: `glsl-step-18`

## Goals and learning outcomes

- Transform normals into the correct space.
- Calculate diffuse lighting.

## Prerequisites

Continue using the output and records from Unit 17. Before experimenting with Normals and Diffuse Lighting, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Normal Space

Normals and light directions must share a coordinate space. For nonuniform scale, use an appropriate inverse-transpose transform instead of a plain model matrix.

### Diffuse Term

The dot of normalized normals and light directions represents their angular relationship. Remove negative values to prevent negative colors on back-facing surfaces.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Transform normals with the normal matrix in lighting.glsl and normalize them in the fragment shader.
2. Calculate the diffuse term for a solid-color surface with max(dot(N,L),0).
3. Apply nonuniform scale and compare the correct normal matrix with a plain transform.

## Variables to observe

| Variable | Baseline | Change    | Expected change / hypothesis                                                               |
| -------- | -------- | --------- | ------------------------------------------------------------------------------------------ |
| scale    | [1,1,1]  | [2,1,0.5] | Expect the direction of the bright region to be incorrect with the wrong normal transform. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] State the space of normals and light directions in comments.
- [ ] Record lighting differences between the two transforms under nonuniform scale.

## Self-check

1. Why normalize interpolated normals again in the fragment shader?
2. Should a negative dot value add light?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Octaves and Band Limiting](../17/README.md) · [Next: Specular Lighting and View Vectors](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

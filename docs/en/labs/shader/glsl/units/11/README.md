# GLSL · 11 Texture Sampling

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Coordinates, Textures, and Time · Editable example · Storage ID: `glsl-step-11`

## Goals and learning outcomes

- Connect a texture to a shader.
- Compare the effects of sampling state.

## Prerequisites

Continue using the output and records from Unit 10. Before experimenting with Texture Sampling, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Sampling Coordinates

texture reads stored colors at UV positions. Use the texture function in WebGL2 GLSL ES 3.00.

### Boundaries and Filtering

wrap and filter are texture object state. Even a change only to shader UV calculations combines with existing sampler settings to produce different results.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Upload a self-generated 4×4 checker pattern in texture.js.
2. Connect a texture unit to a sampler2D uniform and call texture in the fragment shader.
3. Expand UVs to 0..2 and compare CLAMP_TO_EDGE with REPEAT and NEAREST with LINEAR.

## Variables to observe

| Variable | Baseline      | Change | Expected change / hypothesis                                             |
| -------- | ------------- | ------ | ------------------------------------------------------------------------ |
| wrap     | CLAMP_TO_EDGE | REPEAT | Expect pattern repetition instead of edge extension at out-of-range UVs. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the texture-unit and sampler-uniform connection values.
- [ ] Save results for both wrap modes and both filters separately.

## Self-check

1. Can you pass a texture object to uniform1i?
2. When a pattern is flipped, what should you check in the shader and the upload?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Tiling and Repeating Coordinates](../10/README.md) · [Next: Derivatives and Edge Smoothing](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

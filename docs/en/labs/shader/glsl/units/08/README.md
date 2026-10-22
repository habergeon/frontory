# GLSL · 08 UVs and Aspect Ratio

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Coordinates, Textures, and Time · Editable example · Storage ID: `glsl-step-08`

## Goals and learning outcomes

- Distinguish UVs from screen coordinates.
- Correct for aspect ratio.

## Prerequisites

Continue using the output and records from Unit 7. Before experimenting with UVs and Aspect Ratio, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Parametric Coordinates

UVs describe coordinates in 2 dimensions on a surface, distinct from screen pixel coordinates. Screen effects require separate consideration of resolution and aspect ratio.

### Circular Distance

On a non-square screen, equal UV distances correspond to different pixel distances. Apply aspect to the x-axis to preserve a circle's shape.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Output UVs as RGB in uv.glsl to check their directions.
2. Create a circular mask using length((uv-0.5)*vec2(aspect,1)).
3. Compare the same radius in 600×300 and 300×600 drawing buffers.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| aspect correction | none | apply width/height | Expect equal horizontal and vertical pixel diameters even on a wide or tall screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The circle's diameters differ by no more than 2 pixels at both screen aspect ratios.
- [ ] Record the UV origin and Y direction.

## Self-check

1. How do you choose between surface UVs and gl_FragCoord?
2. Why use the drawing buffer size instead of the CSS size?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Debug Output and Minimal Reproductions](../07/README.md) · [Next: Step and Smoothstep Masks](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

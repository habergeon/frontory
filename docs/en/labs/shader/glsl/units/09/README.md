# GLSL · 09 Step and Smoothstep Masks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Coordinates, Textures, and Time · Editable example · Storage ID: `glsl-step-09`

## Goals and learning outcomes

- Build interval masks.
- Set safe boundary conditions.

## Prerequisites

Continue using the output and records from Unit 8. Before experimenting with Step and Smoothstep Masks, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Selecting Intervals

step creates a mask that changes abruptly at a boundary. smoothstep provides a smooth transition between two boundaries.

### Boundary Conditions

smoothstep requires edge0 to be less than edge1. Express inversion by subtracting the result from 1 rather than reversing the edges.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write a circle distance and a step-based interior mask in mask.glsl.
2. Implement inversion with 1.0-smoothstep(r-w,r+w,d).
3. Vary w and compare boundary pixels and the overall circle size.

## Variables to observe

| Variable       | Baseline | Change | Expected change / hypothesis                                                  |
| -------------- | -------- | ------ | ----------------------------------------------------------------------------- |
| Boundary width | 0.001    | 0.03   | Expect a wider transition region while retaining the center and outer radius. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Maintain edge0<edge1 for every input.
- [ ] Compare boundary cross-section colors at five points for both widths.

## Self-check

1. How does increasing smoothstep width differ from increasing the circle radius?
2. What jitter appears when a step boundary moves?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: UVs and Aspect Ratio](../08/README.md) · [Next: Tiling and Repeating Coordinates](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

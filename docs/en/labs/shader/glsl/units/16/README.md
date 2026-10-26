# GLSL · 16 Building Value Noise

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting and Procedural Surfaces · Editable example · Storage ID: `glsl-step-16`

## Goals and learning outcomes

- Implement the grid and interpolation of noise.
- Check determinism and boundary continuity.

## Prerequisites

Continue using the output and records from Unit 15. Before experimenting with Building Value Noise, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Grid Values

Value noise interpolates cell-corner values to create continuous variation. Separate pseudorandom values for cell ids from interpolation inside a cell.

### Interpolation Curves

Linear and smooth interpolation have different derivative behavior at cell boundaries. Zoom in to check for rough boundaries.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write a deterministic hash and a four-corner interpolation function in noise.glsl.
2. Display linear and smooth-curve interpolation side by side using the same seed constant.
3. Record zoomed views of cell boundaries and values at 5 fixed coordinates.

## Variables to observe

| Variable      | Baseline | Change                  | Expected change / hypothesis                                         |
| ------------- | -------- | ----------------------- | -------------------------------------------------------------------- |
| Interpolation | linear   | smooth polynomial curve | Expect changes in slope at cell boundaries to become less prominent. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Repeated inputs of the same coordinates produce the same values.
- [ ] Keep zoomed boundary images for both interpolation methods.

## Self-check

1. Can a display hash be used as a cryptographic random source?
2. What flickering can occur when time is used directly as the seed?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: 2D Distance-Field Shapes](../15/README.md) · [Next: Octaves and Band Limiting](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

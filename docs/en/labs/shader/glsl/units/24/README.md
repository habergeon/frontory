# GLSL · 24 Pointer Coordinates and Input Smoothing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Interaction, Postprocessing, and Cost Evaluation · Editable example · Storage ID: `glsl-step-24`

## Goals and learning outcomes

- Convert input to shader coordinates.
- Control response based on time.

## Prerequisites

Continue using the output and records from Unit 23. Before experimenting with Pointer Coordinates and Input Smoothing, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Coordinate Conversion

Pointer client coordinates differ from canvas-local UVs. Account for the bounding rect and Y direction when converting them to shader inputs.

### Time-Based Smoothing

Interpolation that smoothly follows input must account for delta time. Fixed-ratio interpolation can change response speed with frame rate.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Convert pointer coordinates to rect-relative 0..1 UVs in input.js.
2. Separate current and target values, and smooth them with the ratio 1-exp(-lambda*dt).
3. Display waves around uPointer and check resize, DPR changes, and keyboard alternatives.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Smoothing coefficient | lambda=4 | lambda=16 | Expect the same final position with a faster response toward the target. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Inputs at all four canvas corners correspond to the expected UVs.
- [ ] After a DPR change, the effect center stays at the same CSS location.

## Self-check

1. Why do unconverted client coordinates misalign on a scrolled page?
2. What alternative response do you provide for reduced-motion settings?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Texel Size and Filters](../23/README.md) · [Next: The Cost of Branches and Loops](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

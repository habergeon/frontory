# GLSL · 03 Precision and Numeric Range

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shader Language and Data Flow · Editable example · Storage ID: `glsl-step-03`

## Goals and learning outcomes

- Inspect precision information.
- Explore numeric problems with large coordinates.

## Prerequisites

Continue using the output and records from Unit 2. Before experimenting with Precision and Numeric Range, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Precision

A precision qualifier relates to the representable range and accuracy. In particular, do not omit the default float precision declaration in the fragment shader.

### Large Coordinates

Adding a small change to a large number may fail to represent that change. Compare moving coordinates to a local reference frame to reduce the range of calculations.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Record getShaderPrecisionFormat results in precision.js.
2. Declare highp float in fragment.glsl and add a small sin variation to a large offset.
3. Compare the patterns before and after removing the offset at the same screen size.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Coordinate offset | 0 | 100000 | Expect possible jitter or clumping in the pattern because small differences may be difficult to represent. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the device's highp and mediump ranges and precision.
- [ ] Save images of both offsets at the same time point.

## Self-check

1. Does highp eliminate every numeric problem?
2. What improves when large world coordinates are moved to a camera-relative frame?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scalar and Vector Types](../02/README.md) · [Next: Attributes and Interpolation](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

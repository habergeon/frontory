# GLSL · 02 Scalar and Vector Types

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shader Language and Data Flow · Editable example · Storage ID: `glsl-step-02`

## Goals and learning outcomes

- Use types and constructors.
- Predict the results of vector operations.

## Prerequisites

Continue using the output and records from Unit 1. Before experimenting with Scalar and Vector Types, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Explicit Types

float, int, and bool serve different purposes, and relying on implicit conversions can easily cause errors. Use constructors to express the intended types and component counts.

### Vector Operations

Vector multiplication is component-wise, while dot produces one scalar. Check the result type and meaning even when the notation looks similar.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write vec2, vec3, and vec4 constructor and swizzle examples in types.glsl.
2. Apply component-wise multiplication and dot separately to the input color, and display them in two screen regions.
3. Supply an incorrect component count, locate the line in the compile log, and fix it.

## Variables to observe

| Variable           | Baseline    | Change                 | Expected change / hypothesis                                                           |
| ------------------ | ----------- | ---------------------- | -------------------------------------------------------------------------------------- |
| Calculation method | color*color | vec3(dot(color,color)) | Expect per-channel values from the former and identical gray channels from the latter. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Compare CPU predictions with shader output for both calculations.
- [ ] Record one invalid-constructor error and its correction.

## Self-check

1. Can you assign to a swizzle that repeats the same component?
2. What types do length and normalization return?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Vertex and Fragment](../../01-foundations/README.md) · [Next: Precision and Numeric Range](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

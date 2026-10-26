# GLSL · 04 Attributes and Interpolation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shader Language and Data Flow · Editable example · Storage ID: `glsl-step-04`

## Goals and learning outcomes

- Connect vertex data to shaders.
- Explain values produced by interpolation.

## Prerequisites

Continue using the output and records from Unit 3. Before experimenting with Attributes and Interpolation, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Vertex Inputs

Attributes supply per-vertex values from buffers. Shader locations must match the size, stride, and offset in vertexAttribPointer.

### Interpolation

Vertex outputs are interpolated across fragments inside a triangle. This data flow explains why intermediate colors absent from the vertices can appear.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write three vertices with interleaved position and RGB data in attributes.js.
2. Connect layout(location=0/1) in with stride 20 and offsets 0/8.
3. Receive vertex out color as fragment in color, and observe the three corners and the center.

## Variables to observe

| Variable      | Baseline | Change               | Expected change / hypothesis             |
| ------------- | -------- | -------------------- | ---------------------------------------- |
| Vertex colors | all red  | red, green, and blue | Expect mixed colors inside the triangle. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Create a byte-offset table for vertex attributes.
- [ ] Explain the expected colors at the three corners and the center.

## Self-check

1. How does flat interpolation change the center color?
2. Can varying types differ if their names match?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Precision and Numeric Range](../03/README.md) · [Next: Tracking Coordinate Spaces](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

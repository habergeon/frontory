# GLSL · 05 Tracking Coordinate Spaces

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shader Language and Data Flow · Editable example · Storage ID: `glsl-step-05`

## Goals and learning outcomes

- Distinguish coordinate spaces.
- Trace the roles of transformation matrices.

## Prerequisites

Continue using the output and records from Unit 4. Before experimenting with Tracking Coordinate Spaces, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Distinguishing Spaces

Model, world, view, and clip coordinates express the same point relative to different frames. Operations on vectors from different spaces can produce plausible but incorrect results.

### Division

gl_Position contains clip coordinates; perspective division happens at a later stage. Avoid incorrectly handling w when dividing early in the shader.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Apply model, view, and projection matrices in order in spaces.glsl.
2. Print CPU coordinates in each space for the origin, an X-axis marker, and a point in front of the camera.
3. Disable one matrix at a time and relate screen movement to the table values.

## Variables to observe

| Variable          | Baseline | Change | Expected change / hypothesis                                                                |
| ----------------- | -------- | ------ | ------------------------------------------------------------------------------------------- |
| model translation | x=0      | x=1    | Expect world and clip positions to change while the original vertex data remains unchanged. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record coordinates in four spaces for the three markers.
- [ ] Change positions through uniform matrices without modifying the vertex array.

## Self-check

1. Why do direction and position vectors have different w values?
2. What problems arise when w approaches 0 in clip coordinates?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Attributes and Interpolation](../04/README.md) · [Next: Looking Up and Updating Uniforms](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

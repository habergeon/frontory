# GLSL · 07 Debug Output and Minimal Reproductions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shader Language and Data Flow · Editable example · Storage ID: `glsl-step-07`

## Goals and learning outcomes

- Visualize intermediate values.
- Narrow down errors with a minimal reproduction.

## Prerequisites

Continue using the output and records from Unit 6. Before experimenting with Debug Output and Minimal Reproductions, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Visual Debugging

Outputting UVs, normals, or masks directly instead of complex colors reveals faulty stages. Map numeric ranges to the displayable 0..1 range for inspection.

### Minimal Cases

Fixing several effects at once can obscure the cause of an error. Reduce the case to fixed inputs and a solid-color output, then restore one stage at a time.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add a mode uniform in debug.glsl to select solid-color, UV, or intermediate-value output.
2. Deliberately swap UV components and record which mode reveals the error.
3. Restore the working source and save a minimal reproduction containing only one triangle.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| debug mode | final color | direct UV output | Expect coordinate errors hidden by lighting or color compositing to become visible. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Three debug modes each show a different intermediate value.
- [ ] Keep both the minimal input that reproduces the error and the restored source.

## Self-check

1. What do you miss when outputting negative normals directly as colors?
2. Which variable would you eliminate first when the screen is black?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time. The provided final-color expression smoothstep(.5,.1,...) has edge0 >= edge1, so its result is undefined. Do not interpret it as a valid baseline display. A browser failure has not been observed by running this example. Inspect direct UV output and the diagnostic assignment separately.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Looking Up and Updating Uniforms](../06/README.md) · [Next: UVs and Aspect Ratio](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

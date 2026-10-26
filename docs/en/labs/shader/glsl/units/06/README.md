# GLSL · 06 Looking Up and Updating Uniforms

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shader Language and Data Flow · Editable example · Storage ID: `glsl-step-06`

## Goals and learning outcomes

- Update inputs shared by a draw.
- Manage the lifetime of uniform locations.

## Prerequisites

Continue using the output and records from Unit 5. Before experimenting with Looking Up and Updating Uniforms, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Shared Inputs

A uniform is an input shared throughout one draw. Per-vertex values require another route, such as an attribute.

### Program Ownership

A uniform location belongs to a specific linked program. Look up locations again after relinking the program.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Group getUniformLocation, uniform1f, and uniform3fv calls in uniforms.js.
2. Connect sliders for uGain and uColor, and upload values before drawing.
3. Check the path that refreshes the location cache after relinking the program.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                              |
| -------- | -------- | ------ | ------------------------------------------------------------------------- |
| uGain    | 0.5      | 1.0    | Expect linear color output to double when other conditions stay the same. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both uniforms independently affect the display.
- [ ] Look up locations again after relinking and keep the inputs working.

## Self-check

1. Why is the location of an unused uniform null?
2. Why check which program is active before updating uniforms?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Tracking Coordinate Spaces](../05/README.md) · [Next: Debug Output and Minimal Reproductions](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# GLSL · 01 Vertex and Fragment

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Shader Language and Data Flow · Editable example · Storage ID: `glsl-01`

## Goals and learning outcomes

- Explain the responsibilities of shader stages.
- Distinguish version-specific syntax and errors.

## Prerequisites

Vector operations and creating WebGL programs

## Key concepts and explanations

### Stage Roles

The vertex shader computes the clip position and values to pass to the next stage. The fragment shader produces output for a pixel candidate from interpolated inputs.

### Version Contract

Distinguish WebGL1 GLSL ES 1.00 syntax from WebGL2 3.00 syntax. In 3.00, use #version 300 es on the first line, in/out, and an explicit fragment output.

## Practice setup

The existing glsl-01 preview is a starting point. It does not replace implementation or verification of the full subsequent assignment. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a webgl2 context in main.js and separate the vertex.glsl and fragment.glsl sources.
2. Connect a vertex shader that only returns positions and a fixed-color fragment shader using compileShader and linkProgram.
3. Introduce a syntax error in one source and an interface error between the two stages separately, and compare the logs.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| fragment color | red | green | Expect only the output color to change, while vertex positions remain unchanged. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Print compile and link logs separately.
- [ ] Do not mix attribute, varying, or gl_FragColor into GLSL ES 3.00 sources.

## Self-check

1. When can one fragment differ from one screen pixel?
2. Why can linking fail even when both shaders compile individually?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../src/labs/glsl-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Scalar and Vector Types](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

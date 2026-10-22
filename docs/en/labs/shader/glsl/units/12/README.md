# GLSL · 12 Derivatives and Edge Smoothing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Coordinates, Textures, and Time · Editable example · Storage ID: `glsl-step-12`

## Goals and learning outcomes

- Use screen-space rates of change.
- Respect the execution conditions for derivatives.

## Prerequisites

Continue using the output and records from Unit 11. Before experimenting with Derivatives and Edge Smoothing, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Screen-Space Rate of Change

dFdx, dFdy, and fwidth estimate rates of change around a fragment. They help choose an appropriate transition width for a given distance function at different resolutions.

### Control Flow

Using derivatives inside nonuniform branches can yield undefined results. Compute the necessary values first in consistent control flow.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Compute fwidth for the circle distance d in aa.glsl.
2. Display a fixed-width mask alongside a mask using max(fwidth(d),a small positive value).
3. Compare edges at two resolutions and while moving, and comment on where derivatives are computed.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Transition width | fixed 0.01 | based on fwidth(d) | Expect boundaries to remain roughly matched to pixel size as resolution changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Derivative functions are outside nonuniform conditionals.
- [ ] Keep edge-comparison images at both resolutions.

## Self-check

1. Is fwidth an exact geometric pixel area?
2. Can derivatives be used in the same way in a vertex shader?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Texture Sampling](../11/README.md) · [Next: Time and Periods](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

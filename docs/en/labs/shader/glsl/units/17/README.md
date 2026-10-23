# GLSL · 17 Octaves and Band Limiting

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting and Procedural Surfaces · Editable example · Storage ID: `glsl-step-17`

## Goals and learning outcomes

- Build noise with multiple frequencies.
- Assess the cost and limits of added detail.

## Prerequisites

Continue using the output and records from Unit 16. Before experimenting with Octaves and Band Limiting, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Multiple Frequencies

Adding noise frequencies with decreasing amplitude can produce broad shapes and fine detail together. More iterations also increase computation.

### Excess Detail

Changes smaller than screen pixels are difficult to display consistently. Adding high frequencies indiscriminately may increase aliasing instead of quality.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Separate the fixed maximum iteration count from the octave-count input in fbm.glsl.
2. Combine 1, 3, and 5 octaves using a rule that doubles frequency and halves amplitude.
3. Compare detail, flickering, and frame intervals on small and large screens.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Octave count | 1 | 5 | Expect more detail and computation, with possible aliasing on a small screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Save images at the same time point for all three iteration counts.
- [ ] Distinguish useful detail from noise added by extra octaves on a small screen.

## Self-check

1. How does brightness change without normalizing the amplitude sum?
2. Can you relate the frequency limit to resolution?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time. The provided selections change both the octave count 1/5 and the noise interpolation expression. This comparison alone cannot isolate the effect of octave count. Comparing with fixed interpolation is a separate assignment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Building Value Noise](../16/README.md) · [Next: Normals and Diffuse Lighting](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

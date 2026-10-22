# GLSL · 14 UVs, Uniforms, and Waves

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Coordinates, Textures, and Time · Editable example · Storage ID: `glsl-02`

## Goals and learning outcomes

- Control wave variables independently.
- Distinguish color distortion from geometry deformation.

## Prerequisites

Continue using the output and records from Unit 13. Before experimenting with UVs, Uniforms, and Waves, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Variable Roles

Amplitude sets displacement size, while frequency sets repetition spacing. Time speed affects the rate of change rather than the static shape.

### Where Deformation Happens

UV distortion in a fragment shader changes surface colors but not the actual silhouette. Vertex deformation changes the silhouette according to vertex count and distribution.

## Practice setup

The existing glsl-02 preview is a starting point. It does not replace implementation or verification of the full subsequent assignment. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. First output uv as color, then add uTime and connect a sin waveform.
2. Add amplitude*sin(x*frequency-time*speed) to y in vertex.glsl.
3. Change amplitude, frequency, and speed one at a time, recording still images and the duration of one period.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Amplitude | 0.05 | 0.2 | Expect wavelength and period to stay the same while maximum displacement increases fourfold. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record predictions and actual observations for each of the three variables.
- [ ] Calculate the ratio of maximum y displacement before and after changing amplitude.

## Self-check

1. Why does a wave look coarse on a plane with only three vertices?
2. In what scenes can you distinguish UV distortion from geometry deformation?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../src/labs/glsl-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Time and Periods](../units/13/README.md) · [Next: 2D Distance-Field Shapes](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

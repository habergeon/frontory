# GLSL · 13 Time and Periods

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Coordinates, Textures, and Time · Editable example · Storage ID: `glsl-step-13`

## Goals and learning outcomes

- Pass time consistently.
- Separate spatial periods from time speed.

## Prerequisites

Continue using the output and records from Unit 12. Before experimenting with Time and Periods, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Time Units

Converting requestAnimationFrame timestamps to seconds separates the roles of frame count and time. Using accumulated frames as time makes speed depend on refresh rate.

### Frequency

The input phase of sin can combine spatial frequency and time speed. Separate these inputs to control wavelength and movement speed independently.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Pass (timestamp-start)/1000 as uTime in time.js.
2. Output sin(uv.x*frequency-time*speed) as color in wave.glsl.
3. Add play, pause, and fixed-time inputs, and save results at t=0 and t=1.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                                                          |
| ---------- | -------- | ------ | ------------------------------------------------------------------------------------- |
| Time speed | 1        | 2      | Expect the same spatial wavelength with twice the phase shift over the same duration. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] uTime and the image remain unchanged while paused.
- [ ] Re-entering the same t input produces the same waveform.

## Self-check

1. Does doubling frequency also change the interpretation of movement speed?
2. How do large time values from long runs affect precision?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Derivatives and Edge Smoothing](../12/README.md) · [Next: UVs, Uniforms, and Waves](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# GLSL · 10 Tiling and Repeating Coordinates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Coordinates, Textures, and Time · Editable example · Storage ID: `glsl-step-10`

## Goals and learning outcomes

- Build repeating coordinates.
- Separate per-cell information from local patterns.

## Prerequisites

Continue using the output and records from Unit 9. Before experimenting with Tiling and Repeating Coordinates, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Repetition

fract creates repeating tiles from the fractional part of coordinates. Changing the tile count also changes the coordinate rate of change and boundary frequency.

### Identification

Cell numbers obtained with floor can determine different values for each tile. Separating local cell coordinates from cell ids makes patterns easier to combine.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Separate floor(uv*count) and fract(uv*count) in tiles.glsl.
2. Output a circle inside each cell and alternating colors based on the cell id.
3. Record boundary continuity and flickering when the display shrinks at count=4 and 16.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                                           |
| ---------- | -------- | ------ | ---------------------------------------------------------------------- |
| Tile count | 4        | 16     | Expect denser repetition that may increase aliasing on a small screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Output cell ids and local coordinates in separate debug modes.
- [ ] Compare both tile counts at the same screen size.

## Self-check

1. Are fract and integer truncation equivalent for negative coordinates?
2. How should distortion connect across tile boundaries?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Step and Smoothstep Masks](../09/README.md) · [Next: Texture Sampling](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

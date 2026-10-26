# GLSL · 15 2D Distance-Field Shapes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting and Procedural Surfaces · Editable example · Storage ID: `glsl-step-15`

## Goals and learning outcomes

- Write basic distance functions.
- Combine distance-based shapes.

## Prerequisites

Continue using the output and records from Unit 14. Before experimenting with 2D Distance-Field Shapes, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Signed Distance

An SDF expresses distance to a boundary and the sign for inside or outside. Converting distance values to masks lets you fill and outline the same shape.

### Composition

min and max can form unions and intersections. Separately examine whether the combined result is an exact distance everywhere.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write distance functions for a circle and an axis-aligned box in sdf.glsl.
2. Output union, intersection, and difference with min, max, and max(a,-b).
3. Overlay the distance 0 contour and an abs(d)-based outline for inspection.

## Variables to observe

| Variable     | Baseline      | Change           | Expected change / hypothesis                                              |
| ------------ | ------------- | ---------------- | ------------------------------------------------------------------------- |
| Box position | circle center | move 0.2 along x | Expect the overlap region and the cut boundary of the difference to move. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Show all three combinations using the same two shapes.
- [ ] Check distance signs at three points: the circle center, boundary, and exterior.

## Self-check

1. How does combining masks differ from combining distances?
2. Are distances still exact after nonuniform scale?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: UVs, Uniforms, and Waves](../../02-experiments/README.md) · [Next: Building Value Noise](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

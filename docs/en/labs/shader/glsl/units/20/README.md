# GLSL · 20 Normals on Deformed Surfaces

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting and Procedural Surfaces · Editable example · Storage ID: `glsl-step-20`

## Goals and learning outcomes

- Calculate normals that match deformation.
- Validate derivatives against a numeric reference.

## Prerequisites

Continue using the output and records from Unit 19. Before experimenting with Normals on Deformed Surfaces, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Shape and Lighting

Changing vertex positions does not automatically update existing normals. Calculate new normals from the wave surface's slope so lighting follows its shape.

### Analytic Derivatives

The derivative of a sin displacement can be computed using cos. Comparison with finite differences helps locate sign and axis errors.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Calculate the x derivative of y=A*sin(k*x-t) in surface.glsl.
2. Construct and normalize tangents and normals, then compare with the original-normal mode.
3. Verify slopes at three x positions using CPU central differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Normals | original plane normals | wave-slope normals | Expect the same silhouette, with light and dark lighting bands following the wave. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The difference between analytic and numeric derivatives is at most 1e-3 at all three points.
- [ ] Compare lighting in both normal modes with the shape fixed.

## Self-check

1. Does increasing amplitude also increase the normal change?
2. How do screen-space derivative normals differ from analytic normals?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Specular Lighting and View Vectors](../19/README.md) · [Next: Alpha and Compositing State](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

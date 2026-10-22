# GLSL · 21 Alpha and Compositing State

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting and Procedural Surfaces · Editable example · Storage ID: `glsl-step-21`

## Goals and learning outcomes

- Match alpha output to compositing state.
- Diagnose transparent occlusion problems.

## Prerequisites

Continue using the output and records from Unit 20. Before experimenting with Alpha and Compositing State, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Output Alpha

The fragment's alpha output and WebGL blend state jointly determine the result. Lowering alpha alone may not produce the expected transparent composition.

### Depth Writes

Semitransparent surfaces may need different sorting and depth-write policies from opaque surfaces. If objects behind them disappear, check depth state as well as the color equation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Set up two semitransparent planes and an explicit blendFunc in alpha.js.
2. Maintain straight alpha output and matching compositing state.
3. Change draw order and depthMask separately, recording colors in the overlapping area.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Draw order | front plane first | back plane first | Expect colors in the overlapping semitransparent region to differ. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Document the blend equation and output-alpha convention.
- [ ] Record distinct results for both orders and both depthMask settings.

## Self-check

1. What happens when premultiplied alpha uses the same blendFunc?
2. Can transparency errors be fixed by changing the shader alone?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Normals on Deformed Surfaces](../20/README.md) · [Next: Framebuffers and Screen Passes](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# GLSL · 23 Texel Size and Filters

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Interaction, Postprocessing, and Cost Evaluation · Editable example · Storage ID: `glsl-step-23`

## Goals and learning outcomes

- Write texel-based filters.
- Verify brightness preservation by the kernel.

## Prerequisites

Continue using the output and records from Unit 22. Before experimenting with Texel Size and Filters, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Neighbor Samples

A one-pixel step in a screen filter is expressed as the reciprocal of the input texture size. Calculating offsets from the output resolution may change the filter radius.

### Kernel Sum

Blur weights summing to 1 can preserve brightness for constant inputs. Boundary wrap modes also affect the final result.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Use uTexel=1.0/inputSize in blur.glsl to write a 3-tap horizontal filter.
2. Apply weights [0.25,0.5,0.25] to a constant gray texture input.
3. Add a vertical pass and compare the separable blur with the original.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Sample spacing | 1 texel | 3 texel | Expect a wider blur radius and more mixing of fine patterns. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Average brightness of the constant gray input is preserved within 1/255.
- [ ] The 1 texel offset calculation remains correct when input texture size changes.

## Self-check

1. What happens if the weights sum to more than 1?
2. What conditions allow a kernel to be used as a separable filter?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Framebuffers and Screen Passes](../22/README.md) · [Next: Pointer Coordinates and Input Smoothing](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Gaussian Splatting · 07 Gaussian Kernels and Alpha

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Foundations of Representation and Projection · Editable example · Storage ID: `gaussian-splatting-step-07`

## Goals and learning outcomes

- Calculate pixel alpha.
- Distinguish the kernel from opacity.

## Prerequisites

Continue using the output and records from Unit 6. Before the Gaussian Kernels and Alpha experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Kernel

A Gaussian's weight decreases with distance from its center. Use covariance-normalized distance rather than pixel distance to preserve the ellipse.

### Opacity

Opacity combines with the kernel weight to produce pixel alpha. Even when the apparent total is similar, changing size and changing opacity have different effects.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In kernel.js, write a function that calculates exp(-0.5*r²).
2. Tabulate the weights at r=0,1,2,3 and multiply them by opacity.
3. Draw one ellipse into Canvas ImageData and read the alpha at its center and edge.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                                     |
| -------- | -------- | ------ | ------------------------------------------------------------------------------------------------ |
| opacity  | 0.5      | 1.0    | Expect center alpha to double while the ellipse's normalized distance structure stays unchanged. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The center weight is 1, and the four values decrease as distance increases.
- [ ] Record the center-alpha ratio before and after changing opacity.

## Self-check

1. What artifacts appear if the kernel is cut off at a finite radius?
2. Why is causal analysis harder when scale and opacity change together?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Camera Projection and Screen Ellipses](../06/README.md) · [Next: Alpha Compositing and Order](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

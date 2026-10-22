# Gaussian Splatting · 12 Spherical Harmonic Color

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: File Validation and Viewer Integration · Editable example · Storage ID: `gaussian-splatting-step-12`

## Goals and learning outcomes

- Explain the view dependence of SH.
- Distinguish degree from claims about quality.

## Prerequisites

Continue using the output and records from Unit 11. Before the Spherical Harmonic Color experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### View dependence

SH coefficients represent color that varies with direction. Using only the constant term removes view-dependent changes.

### Degree and evidence

Increasing the degree does not improve quality if the source lacks valid coefficients. Compare memory, computation, and actually observed quality together.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In sh.js, write a function that calculates only the constant term and a synthetic directional term of order 1.
2. Write the coefficient normalization and direction conventions in notes.md and supply the six axis directions.
3. Move the camera around a fixed Gaussian and tabulate colors for directions from the Gaussian toward the camera. Also compare a control that only rotates camera orientation at the same position, and label the data as synthetic.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| SH terms used | Constant term only | Include synthetic terms of order 1 | Expect colors to vary by direction, while recognizing that this is not evidence of improved training quality. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Save RGB for the six directions.
- [ ] In constant-term mode, color differences across directions are at most 1e-6.

## Self-check

1. Can the degree be increased without source coefficients?
2. How does reversing the sign of the camera direction change the color?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Value Decoding and Validation](../11/README.md) · [Next: Loader States and Cancellation](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

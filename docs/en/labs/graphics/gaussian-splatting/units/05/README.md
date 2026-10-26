# Gaussian Splatting · 05 Reading Shape from Covariance

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Foundations of Representation and Projection · Editable example · Storage ID: `gaussian-splatting-step-05`

## Goals and learning outcomes

- Construct a covariance matrix.
- Validate shape inputs.

## Prerequisites

Continue using the output and records from Unit 4. Before the Reading Shape from Covariance experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Covariance

Combining rotation with per-axis variances represents an ellipsoid in space. When scale is interpreted as standard deviation, variance uses its square.

### Symmetry

Covariance must be symmetric, and valid variances cannot be negative. Projecting invalid inputs directly makes numerical calculations unstable.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In covariance.js, calculate R·diag(scale²)·Rᵀ.
2. Save the 3×3 results for axis-aligned scale and rotated scale as JSON.
3. Print the symmetry error and the rejection result for negative scale inputs.

## Variables to observe

| Variable        | Baseline | Change | Expected change / hypothesis                           |
| --------------- | -------- | ------ | ------------------------------------------------------ |
| Long-axis scale | 0.1      | 0.2    | Expect the variance on that axis to increase fourfold. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The maximum difference between symmetric elements is at most 1e-6.
- [ ] Numerically confirm that doubling scale quadruples variance.

## Self-check

1. What changes if scale is confused with variance?
2. If covariance is stored, is separate rotation information needed?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Quaternions and Anisotropy](../04/README.md) · [Next: Camera Projection and Screen Ellipses](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

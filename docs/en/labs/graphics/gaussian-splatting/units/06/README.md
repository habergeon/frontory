# Gaussian Splatting · 06 Camera Projection and Screen Ellipses

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Foundations of Representation and Projection · Editable example · Storage ID: `gaussian-splatting-step-06`

## Goals and learning outcomes

- Distinguish world-space size from screen-space size.
- Handle projection boundary cases.

## Prerequisites

Continue using the output and records from Unit 5. Before the Camera Projection and Screen Ellipses experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Perspective projection

A nearby Gaussian appears larger even at the same world-space size. Screen covariance must reflect the local rate of change of the projection.

### Near plane

Points behind the camera or near the near plane cannot be handled safely through simple division. Check visibility limits and finite values before projection.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In project.js, separate the view-space transformation from the perspective divide.
2. Project identical Gaussians at depths 2 and 4 and print their screen centers and radii.
3. Supply inputs on either side of the near plane and behind the camera, and record whether they are excluded.

## Variables to observe

| Variable        | Baseline | Change | Expected change / hypothesis                                            |
| --------------- | -------- | ------ | ----------------------------------------------------------------------- |
| Camera distance | 2        | 4      | Expect the screen width of a small Gaussian to be approximately halved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Calculate the screen-width ratio at the two depths.
- [ ] No NaN or Infinity remains in screen coordinates for the three boundary inputs.

## Self-check

1. Is the linear approximation accurate for large Gaussians too?
2. If the center is off screen, is the entire Gaussian invisible?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reading Shape from Covariance](../05/README.md) · [Next: Gaussian Kernels and Alpha](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

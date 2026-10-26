# Gaussian Splatting · 09 Limits of Depth Sorting

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: File Validation and Viewer Integration · Editable example · Storage ID: `gaussian-splatting-step-09`

## Goals and learning outcomes

- Implement depth sorting.
- Observe the limits of the sorting approximation.

## Prerequisites

Continue using the output and records from Unit 8. Before the Limits of Depth Sorting experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Center sorting

Sorting by center depth is simple, but it does not guarantee the correct per-pixel order for large, overlapping ellipsoids. Observe the moments when order changes as the camera rotates.

### Stability

A stable secondary key for items at the same depth can reduce unnecessary order jitter. It does not solve geometric sorting errors.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In sort.js, write a comparison function using view-space depth and the original id.
2. Change the camera angle around three overlapping elongated Gaussians in 10-degree increments.
3. Record the id order and composited image at each angle.

## Variables to observe

| Variable     | Baseline  | Change     | Expected change / hypothesis                                                      |
| ------------ | --------- | ---------- | --------------------------------------------------------------------------------- |
| Camera angle | 0 degrees | 90 degrees | Expect center-depth order to change, altering colors in some overlapping regions. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Save the sorting order for ten viewpoints.
- [ ] Sort equal-depth inputs five times and confirm that the id order is identical.

## Self-check

1. Does stable sorting alone eliminate occlusion errors?
2. How would you compare center sorting with per-tile sorting?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Alpha Compositing and Order](../08/README.md) · [Next: Checking PLY Headers](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

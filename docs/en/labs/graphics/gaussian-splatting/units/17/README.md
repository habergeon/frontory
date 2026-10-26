# Gaussian Splatting · 17 Sorting Update Intervals

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visibility and Quality Experiments · Editable example · Storage ID: `gaussian-splatting-step-17`

## Goals and learning outcomes

- Reuse sorting results.
- Visually evaluate update delay.

## Prerequisites

Continue using the output and records from Unit 16. Before the Sorting Update Intervals experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Reuse

Depth order can be reused when the camera is stationary. Using stale order while the camera moves can increase compositing errors.

### Observing delay

Sorting less frequently reduces CPU work but can delay the visual response. Average time alone does not reveal these changes.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In scheduler.js, create sorting modes for every frame and every 4 frames.
2. Play the same camera-path.json in both modes.
3. Record sort counts, CPU time, and image differences at order-update moments.

## Variables to observe

| Variable         | Baseline | Change   | Expected change / hypothesis                                                    |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------- |
| Sorting interval | 1 frame  | 4 frames | Expect fewer sorting calls and more traces of stale order during fast rotation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Compare sorting call counts over playback of the same duration.
- [ ] Keep images from two intervals where order changes.

## Self-check

1. What does an update policy based on camera movement improve?
2. Can reduced sorting time be treated directly as an improvement to the whole frame?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Visibility Bounds and Conservative Culling](../16/README.md) · [Next: Resolution and Pixel Workload](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Gaussian Splatting · 18 Resolution and Pixel Workload

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visibility and Quality Experiments · Editable example · Storage ID: `gaussian-splatting-step-18`

## Goals and learning outcomes

- Isolate the cost of resolution.
- Compare quality loss at identical viewpoints.

## Prerequisites

Continue using the output and records from Unit 17. Before the Resolution and Pixel Workload experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Pixel cost

Reducing screen resolution lowers the number of pixels evaluated even with the same Gaussian count. It also changes silhouettes and thin structures.

### Comparison conditions

Record CSS dimensions separately from actual drawing buffer dimensions. Mixing cameras or DPR values makes it hard to judge the effect of resolution.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In quality.js, add fixed CSS dimensions and a render scale input.
2. Fix camera-path.json and the data id, and play at scales 1.0 and 0.5.
3. Save actual buffer dimensions, median frame interval, and images of thin structures.

## Variables to observe

| Variable     | Baseline | Change | Expected change / hypothesis                             |
| ------------ | -------- | ------ | -------------------------------------------------------- |
| render scale | 1.0      | 0.5    | Expect approximately 1/4 as many pixels but less detail. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record width×height for both modes.
- [ ] Annotate detail loss in three images from identical times.

## Self-check

1. Why is frame time not directly proportional to pixel count?
2. How do DPR and render scale combine?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Sorting Update Intervals](../17/README.md) · [Next: Reducing Gaussian Count](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

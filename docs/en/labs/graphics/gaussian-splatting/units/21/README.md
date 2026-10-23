# Gaussian Splatting · 21 Defining Quality Evaluation Criteria

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visibility and Quality Experiments · Editable example · Storage ID: `gaussian-splatting-step-21`

## Goals and learning outcomes

- Fix the comparison reference.
- Interpret numerical and visual evidence together.

## Prerequisites

Continue using the output and records from Unit 20. Before the Defining Quality Evaluation Criteria experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Reference image

Interpretation depends on whether the reference is synthetic or an actual observed photograph. Do not call image differences calculated without ground-truth photographs reconstruction accuracy.

### Multiple observations

A single average error can hide thin structures or flicker. Evaluate specified regions together with a camera path.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In evaluation.json, define three viewpoints, two regions of interest, and a background.
2. Save identically sized ImageData for baseline and reduction modes.
3. In report.md, write the mean absolute channel difference and describe losses in the regions of interest.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Evaluation region | Full screen | Thin-structure ROI | Expect local losses to stand out more than in the overall average. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Use the same ROI coordinates at the three viewpoints.
- [ ] Write at least two items each for numerical differences and visual descriptions.

## Self-check

1. What does a difference metric mean if the reference image is wrong?
2. Which errors does still-image evaluation miss?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance. The provided example calculates byte-RGB mean squared error (byteRGB_MSE) between 256/128 synthetic splat images from the same camera. The assignment’s mean absolute error and multiple-view comparison require separate implementation.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Color Space and Background](../20/README.md) · [Next: Separating Profiling Intervals](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Gaussian Splatting · 26 Reproducible Camera Benchmarks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: A Measurable GS Exhibition Viewer · Editable example · Storage ID: `gaussian-splatting-step-26`

## Goals and learning outcomes

- Build a benchmark with a fixed path.
- Interpret frame distributions.

## Prerequisites

Continue using the output and records from Unit 25. Before the Reproducible Camera Benchmarks experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Fixed path

Different input paths produce different costs even at the same quality settings. Fix camera transforms over time and the data id for comparisons.

### Frame distribution

Recording only an average hides occasional long frames. Also retain the median and the high-latency tail.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In benchmark.js, write a function that plays camera-path.json based on time.
2. Run the baseline and reduced-resolution settings three times each for the same duration.
3. Save the median and 95th percentile of frame intervals and images at times of interest in the result JSON.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Setting | Resolution 1.0 | Resolution 0.5 | Expect shorter frame intervals for a pixel bottleneck and little change for a CPU sorting bottleneck. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both settings record the same path hash and data id.
- [ ] Keep distributions and quality images for the three repetitions.

## Self-check

1. Can requestAnimationFrame intervals be called GPU time?
2. What distortion occurs if results from background tabs are mixed in?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance. The provided example collects 61 frame-index camera ticks and 60 rAF intervals once. The assignment’s time-based path and 3 runs per configuration require separate implementation; this does not measure GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Integrated Failure-State Tests](../25/README.md) · [Next: Describing the Deliverable and Acceptance Conditions](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

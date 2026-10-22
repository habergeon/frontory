# Gaussian Splatting · 22 Separating Profiling Intervals

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: A Measurable GS Exhibition Viewer · Editable example · Storage ID: `gaussian-splatting-step-22`

## Goals and learning outcomes

- Measure costs by processing stage.
- Distinguish CPU and GPU timing claims.

## Prerequisites

Continue using the output and records from Unit 21. Before the Separating Profiling Intervals experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Stage costs

Reading, parsing, sorting, projection, and compositing can have different bottlenecks. Total loading time alone makes it hard to identify what needs improvement.

### Measurement range

performance.now measures elapsed time for CPU intervals. When using a GPU renderer, do not call this value GPU execution time.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In metrics.js, add start and end markers for each stage.
2. After warm-up, process the same fixture five times and create a table by stage.
3. Keep CPU teaching viewer results and separate Spark experiment results in different files.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Data count | 64 | 512 | Expect sorting and projection intervals to increase, while compositing is also affected by screen area. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Save stage times and environment information for the five runs.
- [ ] Label unmeasured GPU execution time as unmeasured.

## Self-check

1. Why can total time differ from the sum of stage times?
2. Can a CPU viewer bottleneck be applied directly to Spark?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Defining Quality Evaluation Criteria](../21/README.md) · [Next: Resource Lifetimes and Repeated Loading](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

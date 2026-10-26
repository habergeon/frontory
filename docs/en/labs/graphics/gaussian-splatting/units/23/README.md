# Gaussian Splatting · 23 Resource Lifetimes and Repeated Loading

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: A Measurable GS Exhibition Viewer · Editable example · Storage ID: `gaussian-splatting-step-23`

## Goals and learning outcomes

- Manage resource ownership.
- Verify cleanup after repeated replacement.

## Prerequisites

Continue using the output and records from Unit 22. Before the Resource Lifetimes and Repeated Loading experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Ownership

Removing scene objects and releasing their associated resources are separate operations. Keep a list of who created each buffer, texture, and listener.

### Repeated use

A viewer that works once may reveal leaks after repeated replacement and shutdown. Check renderer-specific cleanup APIs in the documentation for that version.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In lifecycle.js, register created resources and their cleanup functions.
2. Replace small fixtures A/B ten times, then call dispose twice.
3. Record active listener, animation loop, and object counts, and clear references.

## Variables to observe

| Variable          | Baseline | Change   | Expected change / hypothesis                                                               |
| ----------------- | -------- | -------- | ------------------------------------------------------------------------------------------ |
| Replacement count | 1 time   | 10 times | Expect active loops and current data references not to accumulate when cleanup is correct. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There is at most one active render loop after replacement.
- [ ] Repeated dispose completes without exceptions and leaves a cleanup list.

## Self-check

1. Why is scene.remove alone insufficient?
2. How do library caches differ from actual leaks?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Separating Profiling Intervals](../22/README.md) · [Next: Keyboard Controls and Camera Recovery](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

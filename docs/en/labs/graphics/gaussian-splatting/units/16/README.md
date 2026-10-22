# Gaussian Splatting · 16 Visibility Bounds and Conservative Culling

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visibility and Quality Experiments · Editable example · Storage ID: `gaussian-splatting-step-16`

## Goals and learning outcomes

- Cull safely using screen bounds.
- Compare both workload and omissions.

## Prerequisites

Continue using the output and records from Unit 15. Before the Visibility Bounds and Conservative Culling experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Using bounds

Culling off-screen items by center alone makes splats crossing an edge disappear. Cull conservatively using the bounds of the screen ellipse.

### Numerical safety

A Gaussian that is too close can have a large screen radius. Separate clipping from workload limits to avoid iterating over an unbounded area.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In cull.js, add an intersection test between the screen bounding box and viewport.
2. Create a fixture whose center is off screen while part of its ellipse remains visible.
3. Log culled counts and pixel evaluation counts, and compare output images.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Culling criterion | Center only | Ellipse bounding box | Expect fewer omissions at the edges and more processed items. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The edge fixture survives the conservative test.
- [ ] A completely off-screen fixture is culled before pixel evaluation.

## Self-check

1. Why does a conservative test allow over-inclusion?
2. What problems arise if near-plane handling and screen-boundary handling are combined?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Screen-Space Selection Approximation](../15/README.md) · [Next: Sorting Update Intervals](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

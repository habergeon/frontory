# Gaussian Splatting · 15 Screen-Space Selection Approximation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visibility and Quality Experiments · Editable example · Storage ID: `gaussian-splatting-step-15`

## Goals and learning outcomes

- Implement a selection approximation.
- Show selection ambiguity to users.

## Prerequisites

Continue using the output and records from Unit 14. Before the Screen-Space Selection Approximation experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Distance criterion

Selecting the item nearest its projected center is simple to implement. It does not accurately reflect the visible boundary of a large splat or transparent occlusion.

### Ambiguous selection

User intent may be ambiguous when Gaussians overlap. Displaying candidates and selection criteria makes the approximation's limits visible.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In pick.js, convert the pointer to canvas-local pixels.
2. Filter candidates by distance to the projected center and screen radius, and display their ids.
3. Record candidate lists while changing the threshold radius in a scene with two overlapping Gaussians.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Selection radius | 8px | 24px | Expect more candidates and greater ambiguity. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The selected id at the same CSS position is identical at DPR 1 and 2.
- [ ] Print the candidate count and the reason for the final selection for overlapping inputs.

## Self-check

1. Can a splat with a distant center but a large visible footprint be selected?
2. Can this result be called an actual surface intersection point?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Integrating Loading and Camera State](../../02-experiments/README.md) · [Next: Visibility Bounds and Conservative Culling](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

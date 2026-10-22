# Gaussian Splatting · 03 Coordinate Systems and Units

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Foundations of Representation and Projection · Editable example · Storage ID: `gaussian-splatting-step-03`

## Goals and learning outcomes

- Specify the data coordinate system.
- Verify axis conversion numerically.

## Prerequisites

Continue using the output and records from Unit 2. Before the Coordinate Systems and Units experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Reference axes

If the camera and data use different up axes, the scene appears tilted. Specify the axis conversion as a data transformation matrix rather than hiding it through camera manipulation.

### Scale reference

The length units of a reconstruction may not correspond to actual meters. Use a reference object or explicitly defined virtual units.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In coordinates.js, create an origin and three X/Y/Z markers.
2. Apply an axis-swapping matrix to the input points and tabulate their coordinates before and after transformation.
3. Store eye, target, and up in camera.json and reproject the same markers.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| up axis | Y-up | Supply Z-up data without conversion | Expect the vertical marker to point in the wrong direction. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the transformed coordinates of the origin and the three axis markers.
- [ ] After the inverse transformation, the maximum error relative to the original points is at most 1e-6.

## Self-check

1. How does swapping axes differ from reflection?
2. Why does camera reset need unit information?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Provenance and File Contracts](../02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

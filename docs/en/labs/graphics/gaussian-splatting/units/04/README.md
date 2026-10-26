# Gaussian Splatting · 04 Quaternions and Anisotropy

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Foundations of Representation and Projection · Editable example · Storage ID: `gaussian-splatting-step-04`

## Goals and learning outcomes

- Interpret rotation components safely.
- Explain how scale and rotation combine.

## Prerequisites

Continue using the output and records from Unit 3. Before the Quaternions and Anisotropy experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Representing rotation

A quaternion must maintain unit length to represent a rotation. The component order in a file may differ from the library constructor's order.

### Anisotropy

If the three scale values differ, width varies with direction. For an isotropic Gaussian, changing the rotation leaves the shape unchanged.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In shape.js, write normalization and component-order conversion functions.
2. Supply scale [0.3,0.1,0.1] and a 90-degree rotation to the CPU projection input.
3. Apply the same rotation to the isotropic [0.1,0.1,0.1] input and compare bounding boxes.

## Variables to observe

| Variable       | Baseline  | Change                      | Expected change / hypothesis                                                                    |
| -------------- | --------- | --------------------------- | ----------------------------------------------------------------------------------------------- |
| Rotation angle | 0 degrees | 90 degrees about the Z axis | Expect the anisotropic ellipse's long axis to change while the isotropic shape stays unchanged. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The normalized quaternion's length differs from 1 by at most 1e-6.
- [ ] Record the rotation results for both isotropic and anisotropic inputs.

## Self-check

1. How should a quaternion of length 0 be handled?
2. What shape can a component-order error produce?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Coordinate Systems and Units](../03/README.md) · [Next: Reading Shape from Covariance](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

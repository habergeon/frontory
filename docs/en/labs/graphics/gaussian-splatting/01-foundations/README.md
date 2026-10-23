# Gaussian Splatting · 01 3DGS Representations and Data

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Foundations of Representation and Projection · Editable example · Storage ID: `gaussian-splatting-01`

## Goals and learning outcomes

- Explain the differences between the three scene representations.
- Classify the roles of Gaussian attributes.

## Prerequisites

Three.js cameras and projection, and alpha blending

## Key concepts and explanations

### Representation primitives

A mesh stores surface connectivity, while a Gaussian stores a distribution in space. Their storage and rendering paths also differ from NeRF neural network queries.

### Parameters

Position alone cannot reconstruct a Gaussian's shape and color. Examine the meaning of scale, rotation, opacity, and the color representation together.

## Practice setup

The existing gaussian-splatting-01 preview is a starting point. It does not replace implementation or verification of the full subsequent assignment. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. gaussian-splatting-01 visualizes the radial-gradient principle of a 2D elliptical Gaussian; it is not a file loader or a 3DGS model viewer. The CPU teaching viewers for .splat/ASCII GS PLY files up to 1 MiB and 512 splats are gaussian-splatting-02/03. No Spark GPU renderer is provided.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In representation.md, tabulate the inputs and rendered outputs of mesh, NeRF, and 3DGS.
2. In data.js, define two Gaussians with position, scale, quaternion, opacity, and color.
3. Trace how scale and opacity in the existing gaussian-splatting-01 CPU example produce the 2D radial gradient output. Examine the 3D projection implementation separately in the gaussian-splatting-02 viewer.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| scale | 0.1 on both axes | 0.3 on just one axis | Expect only the width along the ellipse's axis to increase, with the center unchanged. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Write at least one line each describing the storage primitives and rendering paths of the three representations.
- [ ] List all required attributes and units for the two Gaussians.

## Self-check

1. Which attributes are missing from an ordinary point cloud?
2. Which inputs must be recalculated when the camera moves?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../src/labs/gaussian-splatting-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Provenance and File Contracts](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

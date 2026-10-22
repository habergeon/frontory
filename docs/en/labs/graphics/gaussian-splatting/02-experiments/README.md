# Gaussian Splatting · 14 Integrating Loading and Camera State

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: File Validation and Viewer Integration · Editable example · Storage ID: `gaussian-splatting-02`

## Goals and learning outcomes

- Integrate loader and camera state.
- Specify the meaning of GS picking.

## Prerequisites

Continue using the output and records from Unit 13. Before the Integrating Loading and Camera State experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Integration boundary

Check Spark's supported formats and APIs in the documentation for the installed version. Do not infer successful Spark execution from the existing CPU teaching viewer.

### Selection contract

GS selection requires the chosen renderer's picking method or a separate approximation. An ordinary mesh raycaster does not directly return a Gaussian's pixel contribution.

## Practice setup

The existing gaussian-splatting-02 preview is a starting point. It does not replace implementation or verification of the full subsequent assignment. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In integration.md, summarize the candidate installation version and the supported formats, dispose, and picking entries in the official documentation.
2. In a separate viewer.js, connect a Three.js camera to loading state and verify axes using a small fixture you create.
3. Apply the camera.json reset and check the error screen and selection policy for an unsupported input format.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Camera up | Verified Y-up | A fixture with different axes | Expect misalignment before correction and reproducible reset after correction. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record one supported-format path and one unsupported-format path.
- [ ] The maximum difference between view matrices before and after reset is at most 1e-6, and the picking policy is documented.

## Self-check

1. Can CPU viewer results support claims about Spark performance?
2. Will selection use center distance or pixel contribution as its criterion?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../src/labs/gaussian-splatting-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Loader States and Cancellation](../units/13/README.md) · [Next: Screen-Space Selection Approximation](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

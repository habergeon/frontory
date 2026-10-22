# Gaussian Splatting · 08 Alpha Compositing and Order

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: File Validation and Viewer Integration · Editable example · Storage ID: `gaussian-splatting-step-08`

## Goals and learning outcomes

- Trace transparent compositing numerically.
- Apply a consistent alpha convention.

## Prerequisites

Continue using the output and records from Unit 7. Before the Alpha Compositing and Order experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Compositing

Translucent splats of different colors produce different colors depending on draw order. Simply adding colors cannot reproduce occlusion.

### Consistent representations

Whether alpha is premultiplied determines both color storage and the compositing equation. Mixing conventions makes boundaries too dark or too bright.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In blend.js, write an explicit source-over compositing function.
2. Composite two red and blue pixels with alpha 0.5 in both orders.
3. Add conversion to premultiplied inputs and compare whether the results match.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Draw order | Red, then blue | Blue, then red | Expect RGB to differ even when alpha is the same. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record RGB and alpha numerically for both orders.
- [ ] The results from the two consistently applied alpha representations differ by at most 1e-6 per channel.

## Self-check

1. Do two splats of the same color also show an order difference?
2. How can sorting errors be distinguished from alpha representation errors?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Gaussian Kernels and Alpha](../07/README.md) · [Next: Limits of Depth Sorting](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

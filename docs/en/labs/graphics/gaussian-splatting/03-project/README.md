# Gaussian Splatting · 28 Sorting, Quality, and Performance

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: A Measurable GS Exhibition Viewer · Editable example · Storage ID: `gaussian-splatting-03`

## Goals and learning outcomes

- Compare quality and cost together.
- Complete a GS viewer deliverable with supporting evidence.

## Prerequisites

Continue using the output and records from Unit 27. Before the Sorting, Quality, and Performance experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Joint evaluation

Resolution and Gaussian count change both cost and visual quality. First record changes to one variable at a time, then evaluate combinations.

### Choosing a configuration

The fastest setting may not be the best fit for the purpose. Explain the choice using data provenance, feature limitations, and observed quality.

## Practice setup

The existing gaussian-splatting-03 preview is a starting point. It does not replace implementation or verification of the full subsequent assignment. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In the final viewer.js, run baseline, reduced-resolution, and reduced-item settings along the same path.
2. In report.md, collect frame distributions, sorting time, ROI images, and the provenance manifest link.
3. Choose the adopted setting and unacceptable quality losses, and recheck error recovery and dispose.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Gaussian count | 512 | 256 | Measure with the expectation that sorting work may decrease while some structures may be lost. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Present same-path results and quality evidence for the three settings.
- [ ] Provide provenance and reproduction steps without large data, and give two reasons for the choice.

## Self-check

1. Would a different measured bottleneck change the selected setting?
2. Which claims are beyond the scope of these results?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../src/labs/gaussian-splatting-03/example.js) · [Runtime environments and limits](../../../../examples.md)

An educational CPU Canvas viewer for small .splat files and ASCII GS PLY files. The limits are 1 MiB and 512 splats; binary PLY and general mesh PLY are unsupported. Spark, GPU tile rendering, higher-order SH, and GS picking are outside the scope. The default scene uses generated data, and measurements apply only to this CPU example.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Describing the Deliverable and Acceptance Conditions](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

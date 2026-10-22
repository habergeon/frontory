# Gaussian Splatting · 27 Describing the Deliverable and Acceptance Conditions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: A Measurable GS Exhibition Viewer · Editable example · Storage ID: `gaussian-splatting-step-27`

## Goals and learning outcomes

- Document the actual delivered scope.
- Create a reproducible acceptance procedure.

## Prerequisites

Continue using the output and records from Unit 26. Before the Describing the Deliverable and Acceptance Conditions experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Delivered scope

Distinguish implemented features from candidates reviewed only in documentation so the deliverable can be reproduced. Do not present CPU principle experiments as a large-scale GPU product.

### Distribution basis

Link source-data permissions and conversion history in the results report. You can provide small reproducible fixtures instead of large data.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In README.md, record the runtime environment, CPU or Spark path, supported formats, and limitations.
2. Link the manifest and fixtures generation procedure, and check that large original files are outside the repository's tracked scope.
3. In a fresh execution session, record acceptance checks in this order: loading, reset, error recovery, selection, and benchmarking.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Initial verification state | Current session | A fresh reset session | Expect hidden state dependencies to reveal differences in a fresh session. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] All five acceptance items have either an actual observation or a not-run label.
- [ ] The deliverable includes provenance, permission, conversion, and size information.

## Self-check

1. Which environment details does another person need to reproduce the results?
2. How should features that were only reviewed be labeled?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reproducible Camera Benchmarks](../26/README.md) · [Next: Sorting, Quality, and Performance](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Gaussian Splatting · 02 Provenance and File Contracts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Foundations of Representation and Projection · Editable example · Storage ID: `gaussian-splatting-step-02`

## Goals and learning outcomes

- Record the basis for using the data.
- Verify the input size contract.

## Prerequisites

Continue using the output and records from Unit 1. Before the Provenance and File Contracts experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Data provenance

Being able to open a file does not imply permission to redistribute it. Record the original URL, author, license, and conversion history separately.

### Scope limits

Small synthetic data can verify parsing and compositing. Do not interpret the teaching viewer's capacity limits as production processing capacity.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In assets-manifest.json, record the provenance and permitted uses of your own fixture.
2. In validateFile.js, write a function that checks the file.size limit of 1 MiB and the limit of 512 Gaussians.
3. Supply an empty file and metadata exceeding the limits, and display rejection messages before loading.

## Variables to observe

| Variable  | Baseline | Change     | Expected change / hypothesis                             |
| --------- | -------- | ---------- | -------------------------------------------------------- |
| File size | 1 KiB    | Over 1 MiB | Expect a size error before the contents are interpreted. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The manifest contains three fields: provenance, license, and whether conversion occurred.
- [ ] Empty files and inputs exceeding the limits are rejected for different reasons.

## Self-check

1. What information can you share in the repository instead of the data?
2. What problems remain if you limit only the compressed size?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: 3DGS Representations and Data](../../01-foundations/README.md) · [Next: Coordinate Systems and Units](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

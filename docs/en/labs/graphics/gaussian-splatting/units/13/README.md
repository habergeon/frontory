# Gaussian Splatting · 13 Loader States and Cancellation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: File Validation and Viewer Integration · Editable example · Storage ID: `gaussian-splatting-step-13`

## Goals and learning outcomes

- Model loading states.
- Block results that arrive late.

## Prerequisites

Continue using the output and records from Unit 12. Before the Loader States and Cancellation experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Asynchronous states

Finishing a read and finishing data validation are different stages. Distinguish states to tell users where a failure occurred.

### Latest request

A delayed read of an earlier file can overwrite the new scene. Use request ids to apply only the latest result and discard canceled results.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In loader.js, define idle, reading, validating, ready, and error states.
2. Select two fixtures with injected delays consecutively and include the request id in the results.
3. Prevent earlier results from being applied on a new selection or dispose, and print the state-transition log.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Completion order | A, then B | B, then A | Expect only B, the last selection, to remain on screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] B's id is retained even when completion order is reversed.
- [ ] Selecting a valid file after an invalid one restores ready.

## Self-check

1. How does canceling a File read differ from discarding its result?
2. How do you decide whether to keep or clear the previous scene when validation fails?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Spherical Harmonic Color](../12/README.md) · [Next: Integrating Loading and Camera State](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

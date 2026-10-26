# Gaussian Splatting · 25 Integrated Failure-State Tests

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: A Measurable GS Exhibition Viewer · Editable example · Storage ID: `gaussian-splatting-step-25`

## Goals and learning outcomes

- Classify failure causes.
- Verify recovery after errors.

## Prerequisites

Continue using the output and records from Unit 24. Before the Integrated Failure-State Tests experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Error classification

Format, value, capacity, and environment-support errors require different responses. Combining them into one failure message prevents users from correcting the issue.

### Recovery paths

It must be possible to open a valid file again after a failure. Design failure states so they do not permanently block the render loop or input handling.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In cases.json, list empty files, missing attributes, abnormal values, excessive sizes, and valid inputs.
2. Inject each case into loader.js in order and save states and error codes.
3. After each error, open a valid fixture and check camera and selection functions.

## Variables to observe

| Variable    | Baseline          | Change                     | Expected change / hypothesis                                     |
| ----------- | ----------------- | -------------------------- | ---------------------------------------------------------------- |
| Input order | Valid inputs only | Valid input after an error | Expect the error to be shown and a new request to restore ready. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The four errors are classified with their assigned codes.
- [ ] All four recovery paths output a valid data id and the ready state.

## Self-check

1. What indication is needed when the previous scene is retained in an error state?
2. Which errors cannot be resolved by retrying?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Keyboard Controls and Camera Recovery](../24/README.md) · [Next: Reproducible Camera Benchmarks](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# OffscreenCanvas · 09 Resize Sequence Numbers

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Synchronizing Size and Input · Editable example · Storage ID: `offscreen-canvas-step-09`

## Goals and learning outcomes

- Learning outcome: explain the role of Latest size. Input cases: Input in seq 1·3·2 order.
- Deliverable: The applied seq and final size. Explain the rationale for handling Acknowledgment, linking it to the code.

## Prerequisites

Prepare the experiment results for Measurement and Cost of changes from Unit 8, “Resize Messages”.

## Key concepts and explanations

### Latest size

Rapid resizing generates multiple messages. Attach a seq so that only the latest size remains valid.

### Acknowledgment

Returning the applied seq lets you match it to the main-thread request. Do not interpret an old acknowledgment as completion of the latest request.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-9.js in a separate practice project, implement resize seq and lastApplied checks. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Input in seq 1·3·2 order. Baseline: 1·2·3. Run under the baseline conditions, then record observations and errors in notes/day-9.md.
3. Variable: Delivery order; changed value: 1·3·2. Run again through the same input path. Deliverable to save: The applied seq and final size. Hypothesis to check: seq 2 does not overwrite the latest size. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable       | Baseline | Change | Expected change / hypothesis              |
| -------------- | -------- | ------ | ----------------------------------------- |
| Delivery order | 1·2·3    | 1·3·2  | seq 2 does not overwrite the latest size. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: The applied seq and final size. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Latest size and Acknowledgment. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Latest size affect in this exercise? Input cases: Input in seq 1·3·2 order.
2. Variable: Delivery order. Hypothesis to check: seq 2 does not overwrite the latest size. Did the actual results agree with the hypothesis? Explain the evidence in terms of Acknowledgment.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Resize Sequence Numbers experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Resize Messages](../08/README.md) · [Next: Detecting DPR Changes](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

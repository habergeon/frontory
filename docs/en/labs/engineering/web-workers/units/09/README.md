# Web Workers · 09 Transferring a Partial View

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ownership and Cancellation · Editable example · Storage ID: `web-workers-step-09`

## Goals and learning outcomes

- Learning outcome: explain the role of Storage granularity. Input cases: the middle 8 elements of a large array.
- Deliverable: transferred storage size and the states of other views. Explain the rationale for handling Minimizing the boundary, linking it to the code.

## Prerequisites

Prepare the experiment results for Transfer and No further access from Unit 8, “Transfer Ownership”.

## Key concepts and explanations

### Storage granularity

The transfer target is the ArrayBuffer, not the view. Sending a partial view may transfer the entire underlying storage.

### Minimizing the boundary

You can copy only the needed portion into new storage. This trades copying cost against the scope of shared access.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-9.js in a separate practice project, compare directly transferring subarray.buffer with transferring after slice. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the middle 8 elements of a large array. Baseline: Original buffer. Run under the baseline conditions, then record observations and errors in notes/day-9.md.
3. Variable: Transfer range; changed value: Buffer containing a partial copy. Run again through the same input path. Deliverable to save: transferred storage size and the states of other views. Hypothesis to check: The small-copy path does not detach other views. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Transfer range | Original buffer | Buffer containing a partial copy | The small-copy path does not detach other views. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: transferred storage size and the states of other views. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Storage granularity and Minimizing the boundary. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Storage granularity affect in this exercise? Input cases: the middle 8 elements of a large array.
2. Variable: Transfer range. Hypothesis to check: The small-copy path does not detach other views. Did the actual results agree with the hypothesis? Explain the evidence in terms of Minimizing the boundary.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Transferring a Partial View experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Transfer Ownership](../08/README.md) · [Next: Returning Buffers](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

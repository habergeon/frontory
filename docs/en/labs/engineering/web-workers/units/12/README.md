# Web Workers · 12 Cooperative Cancellation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ownership and Cancellation · Editable example · Storage ID: `web-workers-step-12`

## Goals and learning outcomes

- Learning outcome: explain the role of Event loop. Input cases: a cancel request during computation.
- Deliverable: the point when cancellation is acknowledged and the number of elements processed. Explain the rationale for handling Cancellation points, linking it to the code.

## Prerequisites

Prepare the experiment results for Latest request and Distinguishing computation cancellation from Unit 11, “Rejecting Stale Results”.

## Key concepts and explanations

### Event loop

A long synchronous loop cannot process cancel messages. Split the work and yield control to the event loop.

### Cancellation points

Check the cancellation flag between chunks. Repeated Promise microtasks alone do not guarantee message processing.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-12.js in a separate practice project, compute the array in chunks, schedule the next chunk with setTimeout, and handle cancel. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a cancel request during computation. Baseline: 1000 elements. Run under the baseline conditions, then record observations and errors in notes/day-12.md.
3. Variable: Chunk size; changed value: 100000 elements. Run again through the same input path. Deliverable to save: the point when cancellation is acknowledged and the number of elements processed. Hypothesis to check: Larger chunks may delay the response to cancellation. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable   | Baseline      | Change          | Expected change / hypothesis                          |
| ---------- | ------------- | --------------- | ----------------------------------------------------- |
| Chunk size | 1000 elements | 100000 elements | Larger chunks may delay the response to cancellation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: the point when cancellation is acknowledged and the number of elements processed. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Event loop and Cancellation points. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Event loop affect in this exercise? Input cases: a cancel request during computation.
2. Variable: Chunk size. Hypothesis to check: Larger chunks may delay the response to cancellation. Did the actual results agree with the hypothesis? Explain the evidence in terms of Cancellation points.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Cooperative Cancellation experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Rejecting Stale Results](../11/README.md) · [Next: Termination and Recreation](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

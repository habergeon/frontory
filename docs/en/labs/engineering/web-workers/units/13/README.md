# Web Workers · 13 Termination and Recreation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ownership and Cancellation · Editable example · Storage ID: `web-workers-step-13`

## Goals and learning outcomes

- Learning outcome: explain the role of Terminate. Input cases: stopping a long task and then submitting a new request.
- Deliverable: pending entries before and after termination, and the new result. Explain the rationale for handling Recovery, linking it to the code.

## Prerequisites

Prepare the experiment results for Event loop and Cancellation points from Unit 12, “Cooperative Cancellation”.

## Key concepts and explanations

### Terminate

terminate ends Worker execution immediately. A completion message may never arrive.

### Recovery

The main side must explicitly fail pending requests. Start the next task with a new Worker.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-13.js in a separate practice project, implement a stop-button path that calls terminate, cleans up pending requests, and recreates the Worker. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: stopping a long task and then submitting a new request. Baseline: Ignore responses. Run under the baseline conditions, then record observations and errors in notes/day-13.md.
3. Variable: Stopping method; changed value: terminate. Run again through the same input path. Deliverable to save: pending entries before and after termination, and the new result. Hypothesis to check: The old computation ends and a new Worker handles the next request. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Stopping method | Ignore responses | terminate | The old computation ends and a new Worker handles the next request. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: pending entries before and after termination, and the new result. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Terminate and Recovery. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Terminate affect in this exercise? Input cases: stopping a long task and then submitting a new request.
2. Variable: Stopping method. Hypothesis to check: The old computation ends and a new Worker handles the next request. Did the actual results agree with the hypothesis? Explain the evidence in terms of Recovery.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Termination and Recreation experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Cooperative Cancellation](../12/README.md) · [Next: Transfer and Cancellation](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

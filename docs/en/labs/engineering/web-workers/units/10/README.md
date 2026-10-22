# Web Workers · 10 Returning Buffers

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ownership and Cancellation · Editable example · Storage ID: `web-workers-step-10`

## Goals and learning outcomes

- Learning outcome: explain the role of Round-trip ownership. Input cases: 2 buffers and consecutive requests.
- Deliverable: a table of owners and value changes for each request. Explain the rationale for handling Pool states, linking it to the code.

## Prerequisites

Prepare the experiment results for Storage granularity and Minimizing the boundary from Unit 9, “Transferring a Partial View”.

## Key concepts and explanations

### Round-trip ownership

A Worker can transfer a received buffer back. Make explicit who owns it at each point.

### Pool states

Distinguishing available and inFlight prevents duplicate use. The UI must not read the original view before the buffer returns.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-10.js in a separate practice project, have the Worker update the array and return the buffer using transfer. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 2 buffers and consecutive requests. Baseline: 1 buffer. Run under the baseline conditions, then record observations and errors in notes/day-10.md.
3. Variable: Buffer count; changed value: 2 buffers. Run again through the same input path. Deliverable to save: a table of owners and value changes for each request. Hypothesis to check: The number of buffers available for simultaneous use is limited. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Buffer count | 1 buffer | 2 buffers | The number of buffers available for simultaneous use is limited. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of owners and value changes for each request. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Round-trip ownership and Pool states. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Round-trip ownership affect in this exercise? Input cases: 2 buffers and consecutive requests.
2. Variable: Buffer count. Hypothesis to check: The number of buffers available for simultaneous use is limited. Did the actual results agree with the hypothesis? Explain the evidence in terms of Pool states.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Returning Buffers experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Transferring a Partial View](../09/README.md) · [Next: Rejecting Stale Results](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

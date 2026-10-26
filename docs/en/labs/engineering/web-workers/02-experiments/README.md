# Web Workers · 14 Transfer and Cancellation

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Ownership and Cancellation · Editable example · Storage ID: `web-workers-02`

## Goals and learning outcomes

- Learning outcome: explain the role of Ownership tracking. Input cases: overlapping requests and cancellation.
- Deliverable: a table of buffer states, cancellation responses, and the final UI. Explain the rationale for handling Cancellation policy, linking it to the code.

## Prerequisites

Prepare the experiment results for Terminate and Recovery from Unit 13, “Termination and Recreation”.

## Key concepts and explanations

### Ownership tracking

Copy and transfer leave the sender's buffer in different states. Cancellation cannot revive a detached buffer.

### Cancellation policy

Cooperative cancellation and forced termination have different recovery costs. Distinguish errors, ignored results, and cancellation in the UI.

## Practice setup

The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-14.js in a separate practice project, read the existing web-workers-02 and integrate copying, transfer, latest-result checks, and cancellation paths. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: overlapping requests and cancellation. Baseline: Copy. Run under the baseline conditions, then record observations and errors in notes/day-14.md.
3. Variable: Sending policy; changed value: transfer. Run again through the same input path. Deliverable to save: a table of buffer states, cancellation responses, and the final UI. Hypothesis to check: Recovery respects ownership, and stale results are excluded. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable       | Baseline | Change   | Expected change / hypothesis                                 |
| -------------- | -------- | -------- | ------------------------------------------------------------ |
| Sending policy | Copy     | transfer | Recovery respects ownership, and stale results are excluded. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of buffer states, cancellation responses, and the final UI. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Ownership tracking and Cancellation policy. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Ownership tracking affect in this exercise? Input cases: overlapping requests and cancellation.
2. Variable: Sending policy. Hypothesis to check: Recovery respects ownership, and stale results are excluded. Did the actual results agree with the hypothesis? Explain the evidence in terms of Cancellation policy.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../src/labs/web-workers-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Termination and Recreation](../units/13/README.md) · [Next: Progress Reporting](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

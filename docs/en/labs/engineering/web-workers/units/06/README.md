# Web Workers · 06 Error Response Contracts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Messages and Execution Contexts · Editable example · Storage ID: `web-workers-step-06`

## Goals and learning outcomes

- Learning outcome: explain the role of Task errors. Input cases: 0, negative sizes, and sizes above the allowed limit.
- Deliverable: per-request states and pending size. Explain the rationale for handling Cleanup, linking it to the code.

## Prerequisites

Prepare the experiment results for View and Offset from Unit 5, “TypedArray and Buffer”.

## Key concepts and explanations

### Task errors

A computation exception is a failure of an individual request. Distinguish it from a Worker loading or runtime error.

### Cleanup

Remove failed requests from the pending list as well. Other valid requests can continue to be processed.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-6.js in a separate practice project, create an error response containing requestId in try/catch and clean up the main-side pending list. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 0, negative sizes, and sizes above the allowed limit. Baseline: Within the allowed range. Run under the baseline conditions, then record observations and errors in notes/day-6.md.
3. Variable: Size; changed value: Above the upper limit. Run again through the same input path. Deliverable to save: per-request states and pending size. Hypothesis to check: No pending entry remains after failure. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Size | Within the allowed range | Above the upper limit | No pending entry remains after failure. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: per-request states and pending size. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Task errors and Cleanup. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Task errors affect in this exercise? Input cases: 0, negative sizes, and sizes above the allowed limit.
2. Variable: Size. Hypothesis to check: No pending entry remains after failure. Did the actual results agree with the hypothesis? Explain the evidence in terms of Cleanup.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Error Response Contracts experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: TypedArray and Buffer](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

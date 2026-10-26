# Web Workers · 27 Disposal and Restart

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating Throughput and Responsiveness · Editable example · Storage ID: `web-workers-step-27`

## Goals and learning outcomes

- Learning outcome: explain the role of Lifetime management. Input cases: 5 cycles of running, disposing, and restarting.
- Deliverable: completed IDs by generation and remaining resource counts. Explain the rationale for handling Repeated execution, linking it to the code.

## Prerequisites

Prepare the experiment results for Peak usage and Limits from Unit 26, “Memory and Pool Limits”.

## Key concepts and explanations

### Lifetime management

Clean up Workers, timers, and ports when the page feature ends. Remove requests that have already ended from pending as well.

### Repeated execution

A new generation ID distinguishes it from earlier responses. Calling dispose twice must be safe.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-27.js in a separate practice project, call terminate, clearTimeout, and port.close in dispose, then restart. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 5 cycles of running, disposing, and restarting. Baseline: After completion. Run under the baseline conditions, then record observations and errors in notes/day-27.md.
3. Variable: Disposal timing; changed value: During computation. Run again through the same input path. Deliverable to save: completed IDs by generation and remaining resource counts. Hypothesis to check: No interrupted task remains, and new tasks complete normally. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable        | Baseline         | Change             | Expected change / hypothesis                                  |
| --------------- | ---------------- | ------------------ | ------------------------------------------------------------- |
| Disposal timing | After completion | During computation | No interrupted task remains, and new tasks complete normally. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: completed IDs by generation and remaining resource counts. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Lifetime management and Repeated execution. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Lifetime management affect in this exercise? Input cases: 5 cycles of running, disposing, and restarting.
2. Variable: Disposal timing. Hypothesis to check: No interrupted task remains, and new tasks complete normally. Did the actual results agree with the hypothesis? Explain the evidence in terms of Repeated execution.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Disposal and Restart experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Memory and Pool Limits](../26/README.md) · [Next: Task Queues and Measurement](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

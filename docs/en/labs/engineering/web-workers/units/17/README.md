# Web Workers · 17 Worker Pool

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Queues and Error Recovery · Editable example · Storage ID: `web-workers-step-17`

## Goals and learning outcomes

- Learning outcome: explain the role of Parallelism. Input cases: 6 tasks of different sizes.
- Deliverable: per-worker task intervals and total completion time. Explain the rationale for handling Idle assignment, linking it to the code.

## Prerequisites

Prepare the experiment results for Backpressure and State transitions from Unit 16, “A Bounded Task Queue”.

## Key concepts and explanations

### Parallelism

Multiple Workers can divide independent tasks. CPU contention and creation costs also increase.

### Idle assignment

Assign tasks only to idle Workers. Do not confuse completion order with submission order.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-17.js in a separate practice project, create an idle list and task dispatcher for each pool size. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 6 tasks of different sizes. Baseline: 1 Worker. Run under the baseline conditions, then record observations and errors in notes/day-17.md.
3. Variable: Pool size; changed value: 2 Workers. Run again through the same input path. Deliverable to save: per-worker task intervals and total completion time. Hypothesis to check: Concurrency increases, but measurements determine whether speed improves. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable  | Baseline | Change    | Expected change / hypothesis                                              |
| --------- | -------- | --------- | ------------------------------------------------------------------------- |
| Pool size | 1 Worker | 2 Workers | Concurrency increases, but measurements determine whether speed improves. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: per-worker task intervals and total completion time. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Parallelism and Idle assignment. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Parallelism affect in this exercise? Input cases: 6 tasks of different sizes.
2. Variable: Pool size. Hypothesis to check: Concurrency increases, but measurements determine whether speed improves. Did the actual results agree with the hypothesis? Explain the evidence in terms of Idle assignment.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Worker Pool experiment with resource cleanup.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: A Bounded Task Queue](../16/README.md) · [Next: Restoring Result Order](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

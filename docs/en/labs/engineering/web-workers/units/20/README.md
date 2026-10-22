# Web Workers · 20 Failure Recovery

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Queues and Error Recovery · Editable example · Storage ID: `web-workers-step-20`

## Goals and learning outcomes

- Learning outcome: explain the role of Worker failure. Input cases: a normal task and a failing task.
- Deliverable: replacement count, final error, and completed IDs. Explain the rationale for handling Retry, linking it to the code.

## Prerequisites

Prepare the experiment results for Time limit and Single settlement from Unit 19, “Timeouts and Duplicate Responses”.

## Key concepts and explanations

### Worker failure

An error event may affect multiple in-progress tasks. Find the requests assigned to that Worker.

### Retry

Retry side-effect-free tasks with care. Without an attempt limit, failures can form a loop.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-20.js in a separate practice project, trigger an error for a specific input and implement pool replacement and one retry. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a normal task and a failing task. Baseline: 0 retries. Run under the baseline conditions, then record observations and errors in notes/day-20.md.
3. Variable: Retry limit; changed value: 1 retry. Run again through the same input path. Deliverable to save: replacement count, final error, and completed IDs. Hypothesis to check: Processing ends with a result or error without endless recreation. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Retry limit | 0 retries | 1 retry | Processing ends with a result or error without endless recreation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: replacement count, final error, and completed IDs. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Worker failure and Retry. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Worker failure affect in this exercise? Input cases: a normal task and a failing task.
2. Variable: Retry limit. Hypothesis to check: Processing ends with a result or error without endless recreation. Did the actual results agree with the hypothesis? Explain the evidence in terms of Retry.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Failure Recovery experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Timeouts and Duplicate Responses](../19/README.md) · [Next: Separating MessageChannels](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

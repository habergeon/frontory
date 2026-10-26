# Web Workers · 18 Restoring Result Order

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Queues and Error Recovery · Editable example · Storage ID: `web-workers-step-18`

## Goals and learning outcomes

- Learning outcome: explain the role of Completion order. Input cases: 4 arrays of different sizes.
- Deliverable: a table of submission, completion, and display order. Explain the rationale for handling Index, linking it to the code.

## Prerequisites

Prepare the experiment results for Parallelism and Idle assignment from Unit 17, “Worker Pool”.

## Key concepts and explanations

### Completion order

Short tasks may finish first. A screen that requires submission order needs a separate assembly step.

### Index

Use the task index to choose a result slot. Choosing positions by completion count mixes up results.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-18.js in a separate practice project, include an index in every request and collect Promise results into their slots. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 4 arrays of different sizes. Baseline: Arrival order. Run under the baseline conditions, then record observations and errors in notes/day-18.md.
3. Variable: Display policy; changed value: Submission order. Run again through the same input path. Deliverable to save: a table of submission, completion, and display order. Hypothesis to check: The output array stays in a stable order even when computations finish out of order. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable       | Baseline      | Change           | Expected change / hypothesis                                                         |
| -------------- | ------------- | ---------------- | ------------------------------------------------------------------------------------ |
| Display policy | Arrival order | Submission order | The output array stays in a stable order even when computations finish out of order. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of submission, completion, and display order. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Completion order and Index. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Completion order affect in this exercise? Input cases: 4 arrays of different sizes.
2. Variable: Display policy. Hypothesis to check: The output array stays in a stable order even when computations finish out of order. Did the actual results agree with the hypothesis? Explain the evidence in terms of Index.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Restoring Result Order experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Worker Pool](../17/README.md) · [Next: Timeouts and Duplicate Responses](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

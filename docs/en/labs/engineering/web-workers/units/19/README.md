# Web Workers · 19 Timeouts and Duplicate Responses

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Queues and Error Recovery · Editable example · Storage ID: `web-workers-step-19`

## Goals and learning outcomes

- Learning outcome: explain the role of Time limit. Input cases: normal, delayed, and duplicate responses.
- Deliverable: per-request settlement counts and pending size. Explain the rationale for handling Single settlement, linking it to the code.

## Prerequisites

Prepare the experiment results for Completion order and Index from Unit 18, “Restoring Result Order”.

## Key concepts and explanations

### Time limit

A timeout judges that a response is late. It does not automatically stop Worker computation.

### Single settlement

Each request must settle only once. Discard late responses after a timeout.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-19.js in a separate practice project, create per-request timers and settled checks, and inject late responses. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: normal, delayed, and duplicate responses. Baseline: Long enough. Run under the baseline conditions, then record observations and errors in notes/day-19.md.
3. Variable: Time limit; changed value: Shorter than the delay. Run again through the same input path. Deliverable to save: per-request settlement counts and pending size. Hypothesis to check: Failure is recorded once, and late responses are ignored. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Time limit | Long enough | Shorter than the delay | Failure is recorded once, and late responses are ignored. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: per-request settlement counts and pending size. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Time limit and Single settlement. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Time limit affect in this exercise? Input cases: normal, delayed, and duplicate responses.
2. Variable: Time limit. Hypothesis to check: Failure is recorded once, and late responses are ignored. Did the actual results agree with the hypothesis? Explain the evidence in terms of Single settlement.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Timeouts and Duplicate Responses experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Restoring Result Order](../18/README.md) · [Next: Failure Recovery](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Web Workers · 11 Rejecting Stale Results

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ownership and Cancellation · Editable example · Storage ID: `web-workers-step-11`

## Goals and learning outcomes

- Learning outcome: explain the role of Latest request. Input cases: a large task followed by a small task.
- Deliverable: response order and the ID accepted for display. Explain the rationale for handling Distinguishing computation cancellation, linking it to the code.

## Prerequisites

Prepare the experiment results for Round-trip ownership and Pool states from Unit 10, “Returning Buffers”.

## Key concepts and explanations

### Latest request

A UI such as search only needs the result for the latest input. A task started earlier may finish later.

### Distinguishing computation cancellation

Ignoring a stale result may leave its computation running. Distinguish reducing cost from keeping the screen consistent.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-11.js in a separate practice project, compare latestRequestId with response IDs and count discarded responses. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a large task followed by a small task. Baseline: After completion. Run under the baseline conditions, then record observations and errors in notes/day-11.md.
3. Variable: Request interval; changed value: Rapid succession. Run again through the same input path. Deliverable to save: response order and the ID accepted for display. Hypothesis to check: A stale result does not overwrite the latest screen state. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable         | Baseline         | Change           | Expected change / hypothesis                               |
| ---------------- | ---------------- | ---------------- | ---------------------------------------------------------- |
| Request interval | After completion | Rapid succession | A stale result does not overwrite the latest screen state. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: response order and the ID accepted for display. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Latest request and Distinguishing computation cancellation. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Latest request affect in this exercise? Input cases: a large task followed by a small task.
2. Variable: Request interval. Hypothesis to check: A stale result does not overwrite the latest screen state. Did the actual results agree with the hypothesis? Explain the evidence in terms of Distinguishing computation cancellation.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Rejecting Stale Results experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Returning Buffers](../10/README.md) · [Next: Cooperative Cancellation](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Web Workers · 21 Separating MessageChannels

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Queues and Error Recovery · Editable example · Storage ID: `web-workers-step-21`

## Goals and learning outcomes

- Learning outcome: explain the role of Ports. Input cases: two simultaneous tasks.
- Deliverable: messages for each channel and close records. Explain the rationale for handling Disposal, linking it to the code.

## Prerequisites

Prepare the experiment results for Worker failure and Retry from Unit 20, “Failure Recovery”.

## Key concepts and explanations

### Ports

MessageChannel creates an independent messaging path. A port can be passed in the transfer list.

### Disposal

Close a port that is no longer used. Request completion and channel lifetime are separate.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-21.js in a separate practice project, pass a port to the Worker to separate progress and result channels. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: two simultaneous tasks. Baseline: Single Worker channel. Run under the baseline conditions, then record observations and errors in notes/day-21.md.
3. Variable: Channel; changed value: Per-request port. Run again through the same input path. Deliverable to save: messages for each channel and close records. Hypothesis to check: Messages from different tasks are distinguished. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline              | Change           | Expected change / hypothesis                     |
| -------- | --------------------- | ---------------- | ------------------------------------------------ |
| Channel  | Single Worker channel | Per-request port | Messages from different tasks are distinguished. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: messages for each channel and close records. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Ports and Disposal. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Ports affect in this exercise? Input cases: two simultaneous tasks.
2. Variable: Channel. Hypothesis to check: Messages from different tasks are distinguished. Did the actual results agree with the hypothesis? Explain the evidence in terms of Disposal.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Separating MessageChannels experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Failure Recovery](../20/README.md) · [Next: Splitting and Merging Data](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

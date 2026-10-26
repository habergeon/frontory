# Web Workers · 08 Transfer Ownership

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ownership and Cancellation · Editable example · Storage ID: `web-workers-step-08`

## Goals and learning outcomes

- Learning outcome: explain the role of Transfer. Input cases: an Int32Array of length 16.
- Deliverable: byteLength before and after sending, and the received sum. Explain the rationale for handling No further access, linking it to the code.

## Prerequisites

Prepare the experiment results for Separation and Baseline experiment from Unit 7, “Observing Main-Thread Responsiveness”.

## Key concepts and explanations

### Transfer

Putting an ArrayBuffer in the transfer list transfers ownership. The sender's buffer becomes detached.

### No further access

Do not reuse the old view after transfer. Copy data you need to reuse or establish a return protocol.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-8.js in a separate practice project, record byteLength before and after postMessage({buffer},[buffer]) and the received values. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: an Int32Array of length 16. Baseline: Copy. Run under the baseline conditions, then record observations and errors in notes/day-8.md.
3. Variable: Sending method; changed value: transfer. Run again through the same input path. Deliverable to save: byteLength before and after sending, and the received sum. Hypothesis to check: The sender's byteLength becomes 0 while the received data remains intact. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable       | Baseline | Change   | Expected change / hypothesis                                              |
| -------------- | -------- | -------- | ------------------------------------------------------------------------- |
| Sending method | Copy     | transfer | The sender's byteLength becomes 0 while the received data remains intact. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: byteLength before and after sending, and the received sum. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Transfer and No further access. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Transfer affect in this exercise? Input cases: an Int32Array of length 16.
2. Variable: Sending method. Hypothesis to check: The sender's byteLength becomes 0 while the received data remains intact. Did the actual results agree with the hypothesis? Explain the evidence in terms of No further access.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Transfer Ownership experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Observing Main-Thread Responsiveness](../07/README.md) · [Next: Transferring a Partial View](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

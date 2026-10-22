# Web Workers · 23 Shared Memory Requirements

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating Throughput and Responsiveness · Editable example · Storage ID: `web-workers-step-23`

## Goals and learning outcomes

- Learning outcome: explain the role of Isolation. Input cases: isolated and non-isolated environments.
- Deliverable: a table of headers, crossOriginIsolated, and the selected path. Explain the rationale for handling Fallback, linking it to the code.

## Prerequisites

Prepare the experiment results for Partitioning and Combining from Unit 22, “Splitting and Merging Data”.

## Key concepts and explanations

### Isolation

SharedArrayBuffer depends on browser security requirements. Check COOP, COEP, and crossOriginIsolated in an external project you control.

### Fallback

Use the transfer path in an environment without isolation. Do not weaken the existing iframe CSP or isolation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-23.js in a separate practice project, display support requirements in an external project and implement a transfer fallback branch. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: isolated and non-isolated environments. Baseline: Non-isolated. Run under the baseline conditions, then record observations and errors in notes/day-23.md.
3. Variable: Environment; changed value: Controlled isolated server. Run again through the same input path. Deliverable to save: a table of headers, crossOriginIsolated, and the selected path. Hypothesis to check: Shared memory is used only when the requirements are met. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Environment | Non-isolated | Controlled isolated server | Shared memory is used only when the requirements are met. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of headers, crossOriginIsolated, and the selected path. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Isolation and Fallback. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Isolation affect in this exercise? Input cases: isolated and non-isolated environments.
2. Variable: Environment. Hypothesis to check: Shared memory is used only when the requirements are met. Did the actual results agree with the hypothesis? Explain the evidence in terms of Fallback.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Shared Memory Requirements experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Splitting and Merging Data](../22/README.md) · [Next: Atomics and Synchronization](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

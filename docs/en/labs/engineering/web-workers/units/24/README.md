# Web Workers · 24 Atomics and Synchronization

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating Throughput and Responsiveness · Editable example · Storage ID: `web-workers-step-24`

## Goals and learning outcomes

- Learning outcome: explain the role of Races. Input cases: 10000 increments per Worker.
- Deliverable: the final counter and the expected value 20000. Explain the rationale for handling Atomics, linking it to the code.

## Prerequisites

Prepare the experiment results for Isolation and Fallback from Unit 23, “Shared Memory Requirements”.

## Key concepts and explanations

### Races

Shared memory accesses the same storage without copying. Concurrent updates create race conditions.

### Atomics

Atomics synchronizes access to shared integers. Avoid waiting methods that block the main thread.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-24.js in a separate practice project, compare Atomics.add counters in two Workers in an isolated external project. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 10000 increments per Worker. Baseline: Ordinary reads and writes. Run under the baseline conditions, then record observations and errors in notes/day-24.md.
3. Variable: Update; changed value: Atomics.add. Run again through the same input path. Deliverable to save: the final counter and the expected value 20000. Hypothesis to check: The atomic path does not lose increments. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Update | Ordinary reads and writes | Atomics.add | The atomic path does not lose increments. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: the final counter and the expected value 20000. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Races and Atomics. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Races affect in this exercise? Input cases: 10000 increments per Worker.
2. Variable: Update. Hypothesis to check: The atomic path does not lose increments. Did the actual results agree with the hypothesis? Explain the evidence in terms of Atomics.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Atomics and Synchronization experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shared Memory Requirements](../23/README.md) · [Next: Measuring End-to-End Latency](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

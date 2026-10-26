# Web Workers · 25 Measuring End-to-End Latency

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating Throughput and Responsiveness · Editable example · Storage ID: `web-workers-step-25`

## Goals and learning outcomes

- Learning outcome: explain the role of Round-trip cost. Input cases: three array sizes.
- Deliverable: a table of round-trip, computation, and remaining intervals. Explain the rationale for handling Clock references, linking it to the code.

## Prerequisites

Prepare the experiment results for Races and Atomics from Unit 24, “Atomics and Synchronization”.

## Key concepts and explanations

### Round-trip cost

Measuring only computation inside the Worker misses serialization and waiting costs. Measure from sending the request through updating the UI.

### Clock references

Distinguish the time origins of different contexts. Record main-thread round-trip time and Worker-internal duration separately.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-25.js in a separate practice project, include main-side performance.now measurements and Worker computation duration in the response. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: three array sizes. Baseline: Small array. Run under the baseline conditions, then record observations and errors in notes/day-25.md.
3. Variable: Data size; changed value: Large array. Run again through the same input path. Deliverable to save: a table of round-trip, computation, and remaining intervals. Hypothesis to check: The proportions spent on communication and computation may change. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable  | Baseline    | Change      | Expected change / hypothesis                                       |
| --------- | ----------- | ----------- | ------------------------------------------------------------------ |
| Data size | Small array | Large array | The proportions spent on communication and computation may change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of round-trip, computation, and remaining intervals. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Round-trip cost and Clock references. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Round-trip cost affect in this exercise? Input cases: three array sizes.
2. Variable: Data size. Hypothesis to check: The proportions spent on communication and computation may change. Did the actual results agree with the hypothesis? Explain the evidence in terms of Clock references.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Measuring End-to-End Latency experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Atomics and Synchronization](../24/README.md) · [Next: Memory and Pool Limits](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

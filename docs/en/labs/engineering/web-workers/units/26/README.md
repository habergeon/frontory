# Web Workers · 26 Memory and Pool Limits

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating Throughput and Responsiveness · Editable example · Storage ID: `web-workers-step-26`

## Goals and learning outcomes

- Learning outcome: explain the role of Peak usage. Input cases: 20 identical tasks.
- Deliverable: maximum concurrent buffer bytes and the remaining reference count. Explain the rationale for handling Limits, linking it to the code.

## Prerequisites

Prepare the experiment results for Round-trip cost and Clock references from Unit 25, “Measuring End-to-End Latency”.

## Key concepts and explanations

### Peak usage

Concurrent buffers increase peak memory. Keeping references after completion delays reclamation.

### Limits

Limit both pool size and queue length. Check ownership state before reusing a buffer.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-26.js in a separate practice project, record buffer sizes and the inFlight count, and remove large references from the completed list. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 20 identical tasks. Baseline: 1 task. Run under the baseline conditions, then record observations and errors in notes/day-26.md.
3. Variable: Concurrent tasks; changed value: 4 tasks. Run again through the same input path. Deliverable to save: maximum concurrent buffer bytes and the remaining reference count. Hypothesis to check: Peak buffer usage may increase. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Concurrent tasks | 1 task | 4 tasks | Peak buffer usage may increase. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: maximum concurrent buffer bytes and the remaining reference count. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Peak usage and Limits. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Peak usage affect in this exercise? Input cases: 20 identical tasks.
2. Variable: Concurrent tasks. Hypothesis to check: Peak buffer usage may increase. Did the actual results agree with the hypothesis? Explain the evidence in terms of Limits.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Memory and Pool Limits experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Measuring End-to-End Latency](../25/README.md) · [Next: Disposal and Restart](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

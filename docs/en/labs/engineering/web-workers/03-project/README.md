# Web Workers · 28 Task Queues and Measurement

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Validating Throughput and Responsiveness · Editable example · Storage ID: `web-workers-03`

## Goals and learning outcomes

- Learning outcome: explain the role of Total cost. Input cases: the same task on the main thread, 1 Worker, and 2 Workers.
- Deliverable: a report on correctness, end-to-end latency, input delay, and peak buffers. Explain the rationale for handling Decision-making, linking it to the code.

## Prerequisites

Prepare the experiment results for Lifetime management and Repeated execution from Unit 27, “Disposal and Restart”.

## Key concepts and explanations

### Total cost

More Workers are not always faster. Evaluate transfer, waiting, and memory costs together.

### Decision-making

Input responsiveness and total throughput may differ. Base adoption decisions on correctness and measured evidence.

## Practice setup

The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-28.js in a separate practice project, use the existing web-workers-03 as a reference, integrate a bounded queue, cancellation, and recovery, and prepare a report. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the same task on the main thread, 1 Worker, and 2 Workers. Baseline: 1 Worker. Run under the baseline conditions, then record observations and errors in notes/day-28.md.
3. Variable: Worker count; changed value: 2 Workers. Run again through the same input path. Deliverable to save: a report on correctness, end-to-end latency, input delay, and peak buffers. Hypothesis to check: The tradeoff between throughput and UI responsiveness becomes apparent. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Worker count | 1 Worker | 2 Workers | The tradeoff between throughput and UI responsiveness becomes apparent. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a report on correctness, end-to-end latency, input delay, and peak buffers. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Total cost and Decision-making. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Total cost affect in this exercise? Input cases: the same task on the main thread, 1 Worker, and 2 Workers.
2. Variable: Worker count. Hypothesis to check: The tradeoff between throughput and UI responsiveness becomes apparent. Did the actual results agree with the hypothesis? Explain the evidence in terms of Decision-making.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../src/labs/web-workers-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Disposal and Restart](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

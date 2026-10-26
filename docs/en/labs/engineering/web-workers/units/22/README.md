# Web Workers · 22 Splitting and Merging Data

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating Throughput and Responsiveness · Editable example · Storage ID: `web-workers-step-22`

## Goals and learning outcomes

- Learning outcome: explain the role of Partitioning. Input cases: an integer array of length 1003.
- Deliverable: chunk ranges and the CPU baseline sum. Explain the rationale for handling Combining, linking it to the code.

## Prerequisites

Prepare the experiment results for Ports and Disposal from Unit 21, “Separating MessageChannels”.

## Key concepts and explanations

### Partitioning

An array sum can be divided into partial sums. Do not miss the boundary of the last chunk.

### Combining

The properties of the combining operation affect the result. Floating-point sums may have different errors depending on order.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-22.js in a separate practice project, partition an array whose length is not evenly divisible and merge the partial sums. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: an integer array of length 1003. Baseline: 2 chunks. Run under the baseline conditions, then record observations and errors in notes/day-22.md.
3. Variable: Chunk count; changed value: 4 chunks. Run again through the same input path. Deliverable to save: chunk ranges and the CPU baseline sum. Hypothesis to check: Every element is processed exactly once, producing the same integer sum. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable    | Baseline | Change   | Expected change / hypothesis                                             |
| ----------- | -------- | -------- | ------------------------------------------------------------------------ |
| Chunk count | 2 chunks | 4 chunks | Every element is processed exactly once, producing the same integer sum. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: chunk ranges and the CPU baseline sum. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Partitioning and Combining. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Partitioning affect in this exercise? Input cases: an integer array of length 1003.
2. Variable: Chunk count. Hypothesis to check: Every element is processed exactly once, producing the same integer sum. Did the actual results agree with the hypothesis? Explain the evidence in terms of Combining.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Splitting and Merging Data experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Separating MessageChannels](../21/README.md) · [Next: Shared Memory Requirements](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

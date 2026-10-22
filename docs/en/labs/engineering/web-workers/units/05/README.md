# Web Workers · 05 TypedArray and Buffer

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Messages and Execution Contexts · Editable example · Storage ID: `web-workers-step-05`

## Goals and learning outcomes

- Learning outcome: explain the role of View. Input cases: the middle two values of [10,20,30,40].
- Deliverable: a table of sent and received ranges and sums. Explain the rationale for handling Offset, linking it to the code.

## Prerequisites

Prepare the experiment results for Copying and Cloning limitations from Unit 4, “Structured Clone”.

## Key concepts and explanations

### View

A TypedArray is a view interpreting an ArrayBuffer. The view and the underlying storage may cover different ranges.

### Offset

subarray points to part of the same storage. Preserve offset and length on the receiving side as well.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-5.js in a separate practice project, send the full array and a subarray, and print byteOffset, length, and values. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the middle two values of [10,20,30,40]. Baseline: Full array. Run under the baseline conditions, then record observations and errors in notes/day-5.md.
3. Variable: Range; changed value: Middle subarray. Run again through the same input path. Deliverable to save: a table of sent and received ranges and sums. Hypothesis to check: Only the partial range contributes to the computed sum. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Range | Full array | Middle subarray | Only the partial range contributes to the computed sum. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of sent and received ranges and sums. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: View and Offset. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does View affect in this exercise? Input cases: the middle two values of [10,20,30,40].
2. Variable: Range. Hypothesis to check: Only the partial range contributes to the computed sum. Did the actual results agree with the hypothesis? Explain the evidence in terms of Offset.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive TypedArray and Buffer experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Structured Clone](../04/README.md) · [Next: Error Response Contracts](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

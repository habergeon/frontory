# Web Workers · 01 Messages and Execution Boundaries

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Messages and Execution Contexts · Editable example · Storage ID: `web-workers-01`

## Goals and learning outcomes

- Learning outcome: explain the role of Worker context. Input cases: IDs and 3 integer arrays.
- Deliverable: per-request sums and a record of UI input responsiveness. Explain the rationale for handling Request identification, linking it to the code.

## Prerequisites

Understand JavaScript asynchronous behavior and TypedArray, and be able to read the inputs and outputs of the existing starting examples.

## Key concepts and explanations

### Worker context

A Worker runs in a context separate from the main thread. The main side updates the DOM after receiving messages.

### Request identification

Completion order may differ from request order. Keep requestId in inputs, results, and errors.

## Practice setup

The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-1.js in a separate practice project, create main.js and worker.js and request sums using new Worker and postMessage. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: IDs and 3 integer arrays. Baseline: 100 elements. Run under the baseline conditions, then record observations and errors in notes/day-1.md.
3. Variable: Array length; changed value: 100000 elements. Run again through the same input path. Deliverable to save: per-request sums and a record of UI input responsiveness. Hypothesis to check: Main-thread input handling should remain possible during computation. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable     | Baseline     | Change          | Expected change / hypothesis                                          |
| ------------ | ------------ | --------------- | --------------------------------------------------------------------- |
| Array length | 100 elements | 100000 elements | Main-thread input handling should remain possible during computation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: per-request sums and a record of UI input responsiveness. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Worker context and Request identification. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Worker context affect in this exercise? Input cases: IDs and 3 integer arrays.
2. Variable: Array length. Hypothesis to check: Main-thread input handling should remain possible during computation. Did the actual results agree with the hypothesis? Explain the evidence in terms of Request identification.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../src/labs/web-workers-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Module Worker Loading](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Web Workers · 04 Structured Clone

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Messages and Execution Contexts · Editable example · Storage ID: `web-workers-step-04`

## Goals and learning outcomes

- Learning outcome: explain the role of Copying. Input cases: an object and a function field.
- Deliverable: sent and received values and a DataCloneError record. Explain the rationale for handling Cloning limitations, linking it to the code.

## Prerequisites

Prepare the experiment results for Tags and Validation from Unit 3, “Message Contracts”.

## Key concepts and explanations

### Copying

Ordinary objects sent with postMessage are structured-cloned. Changing the object after sending it does not change the separate received object.

### Cloning limitations

Functions and DOM nodes cannot be cloned in ordinary messages. Handle failures at the sending stage.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-4.js in a separate practice project, send a nested object, modify the original afterward, and also try a message containing a function. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: an object and a function field. Baseline: Number. Run under the baseline conditions, then record observations and errors in notes/day-4.md.
3. Variable: Field; changed value: Function. Run again through the same input path. Deliverable to save: sent and received values and a DataCloneError record. Hypothesis to check: Values that cannot be cloned are handled separately as sending errors. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change   | Expected change / hypothesis                                           |
| -------- | -------- | -------- | ---------------------------------------------------------------------- |
| Field    | Number   | Function | Values that cannot be cloned are handled separately as sending errors. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: sent and received values and a DataCloneError record. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Copying and Cloning limitations. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Copying affect in this exercise? Input cases: an object and a function field.
2. Variable: Field. Hypothesis to check: Values that cannot be cloned are handled separately as sending errors. Did the actual results agree with the hypothesis? Explain the evidence in terms of Cloning limitations.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Structured Clone experiment with resource cleanup.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Message Contracts](../03/README.md) · [Next: TypedArray and Buffer](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

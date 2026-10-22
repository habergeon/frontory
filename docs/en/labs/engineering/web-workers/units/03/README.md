# Web Workers · 03 Message Contracts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Messages and Execution Contexts · Editable example · Storage ID: `web-workers-step-03`

## Goals and learning outcomes

- Learning outcome: explain the role of Tags. Input cases: valid input, a missing ID, and an array of strings.
- Deliverable: an acceptance/rejection table for each input. Explain the rationale for handling Validation, linking it to the code.

## Prerequisites

Prepare the experiment results for Module Worker and Loading failure from Unit 2, “Module Worker Loading”.

## Key concepts and explanations

### Tags

type distinguishes message meanings. Interpreting every message as the same data shape causes errors.

### Validation

Values received by a Worker also require validation. Check requestId and the array type before computing.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-3.js in a separate practice project, create run, result, and error message structures and an incoming-message validation function. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: valid input, a missing ID, and an array of strings. Baseline: Integer array. Run under the baseline conditions, then record observations and errors in notes/day-3.md.
3. Variable: Input; changed value: Invalid object. Run again through the same input path. Deliverable to save: an acceptance/rejection table for each input. Hypothesis to check: Only the invalid request is rejected, and the next request is processed. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input | Integer array | Invalid object | Only the invalid request is rejected, and the next request is processed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: an acceptance/rejection table for each input. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Tags and Validation. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Tags affect in this exercise? Input cases: valid input, a missing ID, and an array of strings.
2. Variable: Input. Hypothesis to check: Only the invalid request is rejected, and the next request is processed. Did the actual results agree with the hypothesis? Explain the evidence in terms of Validation.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Message Contracts experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Module Worker Loading](../02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

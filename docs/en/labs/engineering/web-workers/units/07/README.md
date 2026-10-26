# Web Workers · 07 Observing Main-Thread Responsiveness

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Messages and Execution Contexts · Editable example · Storage ID: `web-workers-step-07`

## Goals and learning outcomes

- Learning outcome: explain the role of Separation. Input cases: the same array and clicks during computation.
- Deliverable: sums and input delays for both modes. Explain the rationale for handling Baseline experiment, linking it to the code.

## Prerequisites

Prepare the experiment results for Task errors and Cleanup from Unit 6, “Error Response Contracts”.

## Key concepts and explanations

### Separation

A Worker moves CPU work off the main event loop. It does not guarantee a shorter total computation time.

### Baseline experiment

Use the same input and computation on the main thread and Worker. Record UI input responsiveness together with result correctness.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing web-workers-01·02·03 are starting examples. Implement the new assignments in main.js and worker.js in a separate local HTTP project. Preserve CSP and iframe isolation. For SharedArrayBuffer, check COOP and COEP requirements on an external server you control; use the transfer path if they are not met. Measure performance yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-7.js in a separate practice project, share the computation function and create an execution-mode control and a click counter. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the same array and clicks during computation. Baseline: Main thread. Run under the baseline conditions, then record observations and errors in notes/day-7.md.
3. Variable: Mode; changed value: Worker. Run again through the same input path. Deliverable to save: sums and input delays for both modes. Hypothesis to check: Correctness is the same, while the pattern of input delays may differ. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline    | Change | Expected change / hypothesis                                           |
| -------- | ----------- | ------ | ---------------------------------------------------------------------- |
| Mode     | Main thread | Worker | Correctness is the same, while the pattern of input delays may differ. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: sums and input delays for both modes. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Separation and Baseline experiment. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Separation affect in this exercise? Input cases: the same array and clicks during computation.
2. Variable: Mode. Hypothesis to check: Correctness is the same, while the pattern of input delays may differ. Did the actual results agree with the hypothesis? Explain the evidence in terms of Baseline experiment.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/web-workers-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Observing Main-Thread Responsiveness experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Error Response Contracts](../06/README.md) · [Next: Transfer Ownership](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

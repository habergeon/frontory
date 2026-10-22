# OffscreenCanvas · 13 Pointer Capture and Cancellation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Synchronizing Size and Input · Editable example · Storage ID: `offscreen-canvas-step-13`

## Goals and learning outcomes

- Learning outcome: explain the role of Capture. Input cases: Dragging inside, moving outside, and cancellation.
- Deliverable: The dragging value after input ends. Explain the rationale for handling Cancel, linking it to the code.

## Prerequisites

Prepare the experiment results for Latest value and Event semantics from Unit 12, “Coalescing Input”.

## Key concepts and explanations

### Capture

A pointer can leave the Canvas during a drag. Use capture to maintain the input lifecycle.

### Cancel

pointercancel differs from a normal up. The Worker's dragging state must also end.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-13.js in a separate practice project, connect main-thread setPointerCapture with pointercancel messages. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Dragging inside, moving outside, and cancellation. Baseline: pointerup. Run under the baseline conditions, then record observations and errors in notes/day-13.md.
3. Variable: End event; changed value: pointercancel. Run again through the same input path. Deliverable to save: The dragging value after input ends. Hypothesis to check: Both paths clear the drag state. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| End event | pointerup | pointercancel | Both paths clear the drag state. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: The dragging value after input ends. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Capture and Cancel. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Capture affect in this exercise? Input cases: Dragging inside, moving outside, and cancellation.
2. Variable: End event. Hypothesis to check: Both paths clear the drag state. Did the actual results agree with the hypothesis? Explain the evidence in terms of Cancel.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Pointer Capture and Cancellation experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Coalescing Input](../12/README.md) · [Next: Resize and Input Protocol](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

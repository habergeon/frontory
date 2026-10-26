# OffscreenCanvas · 19 Cleanup Protocol

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Rendering Lifecycle and Recovery · Editable example · Storage ID: `offscreen-canvas-step-19`

## Goals and learning outcomes

- Learning outcome: explain the role of Dispose. Input cases: dispose during rendering.
- Deliverable: Counts of remaining frames, messages, and observers. Explain the rationale for handling Acknowledgment and termination, linking it to the code.

## Prerequisites

Prepare the experiment results for Visibility and Synchronization from Unit 18, “Page Visibility Policy”.

## Key concepts and explanations

### Dispose

Frames, events, observers, and the Worker must each be stopped or cleaned up. Removing the DOM alone does not clean up every task.

### Acknowledgment and termination

Wait for the cleanup acknowledgment, but avoid waiting indefinitely. Terminate from the main thread with terminate if needed.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-19.js in a separate practice project, implement dispose messages·ack, observer.disconnect, and a terminate path. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: dispose during rendering. Baseline: Remove only the DOM. Run under the baseline conditions, then record observations and errors in notes/day-19.md.
3. Variable: Shutdown; changed value: Full dispose. Run again through the same input path. Deliverable to save: Counts of remaining frames, messages, and observers. Hypothesis to check: No recurring tasks remain after removal. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline            | Change       | Expected change / hypothesis             |
| -------- | ------------------- | ------------ | ---------------------------------------- |
| Shutdown | Remove only the DOM | Full dispose | No recurring tasks remain after removal. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Counts of remaining frames, messages, and observers. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Dispose and Acknowledgment and termination. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Dispose affect in this exercise? Input cases: dispose during rendering.
2. Variable: Shutdown. Hypothesis to check: No recurring tasks remain after removal. Did the actual results agree with the hypothesis? Explain the evidence in terms of Acknowledgment and termination.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Cleanup Protocol experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Page Visibility Policy](../18/README.md) · [Next: Restarting with a New Canvas](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# OffscreenCanvas · 17 Pausing and Resuming

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Rendering Lifecycle and Recovery · Editable example · Storage ID: `offscreen-canvas-step-17`

## Goals and learning outcomes

- Learning outcome: explain the role of Pause. Input cases: Resume after pausing for 2 seconds.
- Deliverable: Frame count during the pause and position on resume. Explain the rationale for handling Time baseline, linking it to the code.

## Prerequisites

Prepare the experiment results for TypedArray and Ownership from Unit 16, “Batching Particle Data”.

## Key concepts and explanations

### Pause

Pausing stops frame scheduling while preserving state. Canvas ownership is retained, unlike termination.

### Time baseline

Reset the previous timestamp when resuming. Including paused time in movement time causes a jump.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-17.js in a separate practice project, implement pause/resume messages and reset the last timestamp. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Resume after pausing for 2 seconds. Baseline: Retain the previous value. Run under the baseline conditions, then record observations and errors in notes/day-17.md.
3. Variable: Resume timestamp; changed value: Reset. Run again through the same input path. Deliverable to save: Frame count during the pause and position on resume. Hypothesis to check: The large jump on the first resumed frame is reduced. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable         | Baseline                  | Change | Expected change / hypothesis                          |
| ---------------- | ------------------------- | ------ | ----------------------------------------------------- |
| Resume timestamp | Retain the previous value | Reset  | The large jump on the first resumed frame is reduced. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Frame count during the pause and position on resume. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Pause and Time baseline. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Pause affect in this exercise? Input cases: Resume after pausing for 2 seconds.
2. Variable: Resume timestamp. Hypothesis to check: The large jump on the first resumed frame is reduced. Did the actual results agree with the hypothesis? Explain the evidence in terms of Time baseline.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Pause suppresses drawing and resets the time baseline. It does not cancel every scheduled frame or interval.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Batching Particle Data](../16/README.md) · [Next: Page Visibility Policy](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

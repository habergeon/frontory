# OffscreenCanvas · 22 Transferring ImageBitmap Frames

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Responsiveness Comparison Project · Editable example · Storage ID: `offscreen-canvas-step-22`

## Goals and learning outcomes

- Learning outcome: explain the role of Frame transfer. Input cases: 30 consecutive frames.
- Deliverable: Counts of displayed·discarded bitmaps and close calls. Explain the rationale for handling Resource lifetime, linking it to the code.

## Prerequisites

Prepare the experiment results for Distinguishing errors and Fallback from Unit 21, “Recovering from Worker Failure”.

## Key concepts and explanations

### Frame transfer

OffscreenCanvas results can be passed as an ImageBitmap. This is a different output method from transferring control directly.

### Resource lifetime

Close a bitmap after displaying it if it is no longer needed. Bound the queue if production outpaces display.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-22.js in a separate practice project, implement Worker transferToImageBitmap and a main-thread bitmap display path. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 30 consecutive frames. Baseline: Immediate. Run under the baseline conditions, then record observations and errors in notes/day-22.md.
3. Variable: Consumption speed; changed value: Slow. Run again through the same input path. Deliverable to save: Counts of displayed·discarded bitmaps and close calls. Hypothesis to check: The number of pending bitmaps stays bounded even with slow consumption. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable          | Baseline  | Change | Expected change / hypothesis                                            |
| ----------------- | --------- | ------ | ----------------------------------------------------------------------- |
| Consumption speed | Immediate | Slow   | The number of pending bitmaps stays bounded even with slow consumption. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Counts of displayed·discarded bitmaps and close calls. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Frame transfer and Resource lifetime. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Frame transfer affect in this exercise? Input cases: 30 consecutive frames.
2. Variable: Consumption speed. Hypothesis to check: The number of pending bitmaps stays bounded even with slow consumption. Did the actual results agree with the hypothesis? Explain the evidence in terms of Resource lifetime.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

The button requests one ImageBitmap. The main thread draws it into a new preview Canvas and calls close. A continuous frame stream and bounded queue are not implemented.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Recovering from Worker Failure](../21/README.md) · [Next: Canvas Context Loss](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

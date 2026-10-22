# OffscreenCanvas · 23 Canvas Context Loss

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Responsiveness Comparison Project · Editable example · Storage ID: `offscreen-canvas-step-23`

## Goals and learning outcomes

- Learning outcome: explain the role of Loss. Input cases: Loss in a supported environment or explicit failure injection.
- Deliverable: Interruption guidance and a record of scene recreation. Explain the rationale for handling Recovery data, linking it to the code.

## Prerequisites

Prepare the experiment results for Frame transfer and Resource lifetime from Unit 22, “Transferring ImageBitmap Frames”.

## Key concepts and explanations

### Loss

A rendering context can be lost depending on the environment. Distinguish event support from the actual loss path.

### Recovery data

Retain scene state and resource-creation information to redraw. Canvas pixels alone make it difficult to recover the original state.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-23.js in a separate practice project, write contextlost/contextrestored handlers and a path that calls the initialization function again. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Loss in a supported environment or explicit failure injection. Baseline: No saved state. Run under the baseline conditions, then record observations and errors in notes/day-23.md.
3. Variable: Recovery state; changed value: Save state. Run again through the same input path. Deliverable to save: Interruption guidance and a record of scene recreation. Hypothesis to check: The same scene data can be drawn after recreation. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Recovery state | No saved state | Save state | The same scene data can be drawn after recreation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Interruption guidance and a record of scene recreation. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Loss and Recovery data. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Loss affect in this exercise? Input cases: Loss in a supported environment or explicit failure injection.
2. Variable: Recovery state. Hypothesis to check: The same scene data can be drawn after recreation. Did the actual results agree with the hypothesis? Explain the evidence in terms of Recovery data.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Canvas Context Loss experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Transferring ImageBitmap Frames](../22/README.md) · [Next: Request and Display Latency](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

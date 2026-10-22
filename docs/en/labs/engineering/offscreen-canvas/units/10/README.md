# OffscreenCanvas · 10 Detecting DPR Changes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Synchronizing Size and Input · Editable example · Storage ID: `offscreen-canvas-step-10`

## Goals and learning outcomes

- Learning outcome: explain the role of Environment changes. Input cases: DPR 1·2·3 conditions.
- Deliverable: Actual·applied DPR and buffer pixel count. Explain the rationale for handling Resolution cap, linking it to the code.

## Prerequisites

Prepare the experiment results for Latest size and Acknowledgment from Unit 9, “Resize Sequence Numbers”.

## Key concepts and explanations

### Environment changes

Moving between monitors and zooming can change DPR. Recalculate the backing-store size even when the CSS size stays the same.

### Resolution cap

A DPR cap trades quality for memory. Record the applied value separately from the device's actual value.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-10.js in a separate practice project, read DPR again on resize and create the backing store with the chosen cap. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: DPR 1·2·3 conditions. Baseline: 3. Run under the baseline conditions, then record observations and errors in notes/day-10.md.
3. Variable: Cap; changed value: 2. Run again through the same input path. Deliverable to save: Actual·applied DPR and buffer pixel count. Hypothesis to check: The backing-store size decreases in high-DPR environments. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Cap | 3 | 2 | The backing-store size decreases in high-DPR environments. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Actual·applied DPR and buffer pixel count. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Environment changes and Resolution cap. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage do environment changes affect in this exercise? Input cases: DPR 1·2·3 conditions.
2. Variable: Cap. Hypothesis to check: The backing-store size decreases in high-DPR environments. Did the actual results agree with the hypothesis? Explain the evidence in terms of Resolution cap.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Detecting DPR Changes experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Resize Sequence Numbers](../09/README.md) · [Next: Transforming Pointer Coordinates](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

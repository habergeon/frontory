# OffscreenCanvas · 05 Coordinate Units

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Control and the First Render · Editable example · Storage ID: `offscreen-canvas-step-05`

## Goals and learning outcomes

- Learning outcome: explain the role of CSS size. Input cases: A 100 CSS px square.
- Deliverable: CSS·buffer sizes and shape width. Explain the rationale for handling DPR, linking it to the code.

## Prerequisites

Prepare the experiment results for Context and Replacement Canvas from Unit 4, “Context Creation Failure”.

## Key concepts and explanations

### CSS size

CSS size determines the layout on screen. It differs from the size of the pixel backing store.

### DPR

DPR is the ratio of backing-store pixels to CSS pixels. Rendering and input must use the same units.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-5.js in a separate practice project, set the buffer size from the CSS size and DPR, and apply setTransform. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: A 100 CSS px square. Baseline: 1. Run under the baseline conditions, then record observations and errors in notes/day-5.md.
3. Variable: DPR; changed value: 2. Run again through the same input path. Deliverable to save: CSS·buffer sizes and shape width. Hypothesis to check: The shape keeps the same size on screen while the backing-store resolution increases. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                          |
| -------- | -------- | ------ | ------------------------------------------------------------------------------------- |
| DPR      | 1        | 2      | The shape keeps the same size on screen while the backing-store resolution increases. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: CSS·buffer sizes and shape width. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: CSS size and DPR. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does CSS size affect in this exercise? Input cases: A 100 CSS px square.
2. Variable: DPR. Hypothesis to check: The shape keeps the same size on screen while the backing-store resolution increases. Did the actual results agree with the hypothesis? Explain the evidence in terms of DPR.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Coordinate Units experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Context Creation Failure](../04/README.md) · [Next: Frame Timing](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

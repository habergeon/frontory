# OffscreenCanvas · 11 Transforming Pointer Coordinates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Synchronizing Size and Input · Editable example · Storage ID: `offscreen-canvas-step-11`

## Goals and learning outcomes

- Learning outcome: explain the role of Local coordinates. Input cases: Clicks at the center and all four corners.
- Deliverable: Input coordinates and the selected particle ID. Explain the rationale for handling Matching scales, linking it to the code.

## Prerequisites

Prepare the experiment results for Environment changes and Resolution cap from Unit 10, “Detecting DPR Changes”.

## Key concepts and explanations

### Local coordinates

clientX/Y are relative to the viewport. Subtract the Canvas rect position to obtain local CSS coordinates.

### Matching scales

If rendering uses CSS units, do not multiply pointer coordinates by DPR again. Applying the scale twice offsets the selection.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-11.js in a separate practice project, transform coordinates with getBoundingClientRect and send pointer messages to the Worker. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Clicks at the center and all four corners. Baseline: 1. Run under the baseline conditions, then record observations and errors in notes/day-11.md.
3. Variable: DPR; changed value: 2. Run again through the same input path. Deliverable to save: Input coordinates and the selected particle ID. Hypothesis to check: The same screen position selects the same particle. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                        |
| -------- | -------- | ------ | --------------------------------------------------- |
| DPR      | 1        | 2      | The same screen position selects the same particle. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Input coordinates and the selected particle ID. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Local coordinates and Matching scales. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Local coordinates affect in this exercise? Input cases: Clicks at the center and all four corners.
2. Variable: DPR. Hypothesis to check: The same screen position selects the same particle. Did the actual results agree with the hypothesis? Explain the evidence in terms of Matching scales.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Transforming Pointer Coordinates experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Detecting DPR Changes](../10/README.md) · [Next: Coalescing Input](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

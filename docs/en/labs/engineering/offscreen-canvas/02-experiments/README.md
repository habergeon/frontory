# OffscreenCanvas · 14 Resize and Input Protocol

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Synchronizing Size and Input · Editable example · Storage ID: `offscreen-canvas-02`

## Goals and learning outcomes

- Learning outcome: explain the role of Unit contract. Input cases: Selecting the center during rapid resize.
- Deliverable: Records of size seq, selected ID, and sharpness. Explain the rationale for handling Preserving order, linking it to the code.

## Prerequisites

Prepare the experiment results for Capture and Cancel from Unit 13, “Pointer Capture and Cancellation”.

## Key concepts and explanations

### Unit contract

Size, DPR, and pointer input must use the same coordinate basis. The Worker does not infer DOM layout.

### Preserving order

Record the latest resize seq together with input timing. An old size must not overwrite the latest selection.

## Practice setup

The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-14.js in a separate practice project, extend the existing offscreen-canvas-02 with integrated ResizeObserver·seq·local input handling. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Selecting the center during rapid resize. Baseline: 1. Run under the baseline conditions, then record observations and errors in notes/day-14.md.
3. Variable: DPR; changed value: 2. Run again through the same input path. Deliverable to save: Records of size seq, selected ID, and sharpness. Hypothesis to check: Sharpness and the selection position are preserved. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                        |
| -------- | -------- | ------ | --------------------------------------------------- |
| DPR      | 1        | 2      | Sharpness and the selection position are preserved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Records of size seq, selected ID, and sharpness. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Unit contract and Preserving order. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Unit contract affect in this exercise? Input cases: Selecting the center during rapid resize.
2. Variable: DPR. Hypothesis to check: Sharpness and the selection position are preserved. Did the actual results agree with the hypothesis? Explain the evidence in terms of Preserving order.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../src/labs/offscreen-canvas-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Pointer Capture and Cancellation](../units/13/README.md) · [Next: Updating Scene State](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

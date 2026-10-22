# OffscreenCanvas · 01 Transferring Canvas Control

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Control and the First Render · Editable example · Storage ID: `offscreen-canvas-01`

## Goals and learning outcomes

- Learning outcome: explain the role of Ownership. Input cases: Supported and forced-unsupported paths.
- Deliverable: A table of the selected mode, first frame, and error guidance. Explain the rationale for handling Fallback path, linking it to the code.

## Prerequisites

Understand Canvas 2D·Web Workers, and be able to read the inputs and outputs of the existing starting examples.

## Key concepts and explanations

### Ownership

transferControlToOffscreen transfers control of the display Canvas. Do not create a rendering context on the same Canvas before transferring it.

### Fallback path

API support and successful initialization are different. On failure, recover with main-thread rendering on a new Canvas.

## Practice setup

The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-1.js in a separate practice project, check feature support, transfer the OffscreenCanvas to a Worker, and implement a main-thread fallback. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Supported and forced-unsupported paths. Baseline: Supported. Run under the baseline conditions, then record observations and errors in notes/day-1.md.
3. Variable: Support flag; changed value: Force unsupported. Run again through the same input path. Deliverable to save: A table of the selected mode, first frame, and error guidance. Hypothesis to check: Main-thread rendering or clear guidance appears instead of a blank screen. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Support flag | Supported | Force unsupported | Main-thread rendering or clear guidance appears instead of a blank screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of the selected mode, first frame, and error guidance. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Ownership and Fallback path. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Ownership affect in this exercise? Input cases: Supported and forced-unsupported paths.
2. Variable: Support flag. Hypothesis to check: Main-thread rendering or clear guidance appears instead of a blank screen. Did the actual results agree with the hypothesis? Explain the evidence in terms of Fallback path.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../src/labs/offscreen-canvas-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Renderer Contract](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

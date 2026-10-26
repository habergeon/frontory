# OffscreenCanvas · 08 Resize Messages

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Synchronizing Size and Input · Editable example · Storage ID: `offscreen-canvas-step-08`

## Goals and learning outcomes

- Learning outcome: explain the role of Measurement. Input cases: Changes to width and height.
- Deliverable: A table of backing-store sizes and shape styles. Explain the rationale for handling Cost of changes, linking it to the code.

## Prerequisites

Prepare the experiment results for Equivalence and Validation scope from Unit 7, “Basic Rendering Validation”.

## Key concepts and explanations

### Measurement

A Worker cannot read DOM dimensions. A ResizeObserver on the main thread sends the observed values.

### Cost of changes

Changing Canvas dimensions may reset its state. Reapply the transform and styles after setting the dimensions.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-8.js in a separate practice project, send cssWidth·cssHeight·dpr from ResizeObserver and reset the Worker renderer accordingly. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Changes to width and height. Baseline: 400×240. Run under the baseline conditions, then record observations and errors in notes/day-8.md.
3. Variable: Size; changed value: 240×400. Run again through the same input path. Deliverable to save: A table of backing-store sizes and shape styles. Hypothesis to check: Styles and coordinate rules are preserved after the aspect ratio changes. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change  | Expected change / hypothesis                                              |
| -------- | -------- | ------- | ------------------------------------------------------------------------- |
| Size     | 400×240  | 240×400 | Styles and coordinate rules are preserved after the aspect ratio changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of backing-store sizes and shape styles. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Measurement and Cost of changes. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Measurement affect in this exercise? Input cases: Changes to width and height.
2. Variable: Size. Hypothesis to check: Styles and coordinate rules are preserved after the aspect ratio changes. Did the actual results agree with the hypothesis? Explain the evidence in terms of Cost of changes.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Resize Messages experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Basic Rendering Validation](../07/README.md) · [Next: Resize Sequence Numbers](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

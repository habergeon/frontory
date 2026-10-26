# OffscreenCanvas · 06 Frame Timing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Control and the First Render · Editable example · Storage ID: `offscreen-canvas-step-06`

## Goals and learning outcomes

- Learning outcome: explain the role of Delta. Input cases: Normal frames and input with a long gap.
- Deliverable: A table of positions at the same elapsed time. Explain the rationale for handling Long gaps, linking it to the code.

## Prerequisites

Prepare the experiment results for CSS size and DPR from Unit 5, “Coordinate Units”.

## Key concepts and explanations

### Delta

Moving by frame number alone makes speed depend on the refresh rate. Integrate position using elapsed time.

### Long gaps

A large delta on return can cause a jump. Define a policy to clamp it or reset the simulation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-6.js in a separate practice project, check Worker requestAnimationFrame support and implement delta-based movement. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Normal frames and input with a long gap. Baseline: None. Run under the baseline conditions, then record observations and errors in notes/day-6.md.
3. Variable: Delta limit; changed value: Apply an upper bound. Run again through the same input path. Deliverable to save: A table of positions at the same elapsed time. Hypothesis to check: Abrupt movement after a long gap is reduced. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable    | Baseline | Change               | Expected change / hypothesis                 |
| ----------- | -------- | -------------------- | -------------------------------------------- |
| Delta limit | None     | Apply an upper bound | Abrupt movement after a long gap is reduced. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of positions at the same elapsed time. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Delta and Long gaps. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Delta affect in this exercise? Input cases: Normal frames and input with a long gap.
2. Variable: Delta limit. Hypothesis to check: Abrupt movement after a long gap is reduced. Did the actual results agree with the hypothesis? Explain the evidence in terms of Long gaps.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Frame Timing experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Coordinate Units](../05/README.md) · [Next: Basic Rendering Validation](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

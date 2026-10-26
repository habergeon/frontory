# OffscreenCanvas · 07 Basic Rendering Validation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Control and the First Render · Editable example · Storage ID: `offscreen-canvas-step-07`

## Goals and learning outcomes

- Learning outcome: explain the role of Equivalence. Input cases: The same seed and 10 particles.
- Deliverable: Coordinate arrays and a record of the still image. Explain the rationale for handling Validation scope, linking it to the code.

## Prerequisites

Prepare the experiment results for Delta and Long gaps from Unit 6, “Frame Timing”.

## Key concepts and explanations

### Equivalence

Compare the same initial state to isolate differences in execution context. Fix the seed for random initial values.

### Validation scope

Pixel comparisons are affected by environmental differences. Also validate state such as coordinates and colors.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-7.js in a separate practice project, share the seed and draw function to render a static scene in both modes. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: The same seed and 10 particles. Baseline: 7. Run under the baseline conditions, then record observations and errors in notes/day-7.md.
3. Variable: seed; changed value: 11. Run again through the same input path. Deliverable to save: Coordinate arrays and a record of the still image. Hypothesis to check: Matching seeds produce matching layouts, while different seeds produce different layouts. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                              |
| -------- | -------- | ------ | ----------------------------------------------------------------------------------------- |
| seed     | 7        | 11     | Matching seeds produce matching layouts, while different seeds produce different layouts. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Coordinate arrays and a record of the still image. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Equivalence and Validation scope. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Equivalence affect in this exercise? Input cases: The same seed and 10 particles.
2. Variable: seed. Hypothesis to check: Matching seeds produce matching layouts, while different seeds produce different layouts. Did the actual results agree with the hypothesis? Explain the evidence in terms of Validation scope.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Basic Rendering Validation experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Frame Timing](../06/README.md) · [Next: Resize Messages](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# OffscreenCanvas · 03 Initialization Handshake

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Control and the First Render · Editable example · Storage ID: `offscreen-canvas-step-03`

## Goals and learning outcomes

- Learning outcome: explain the role of Ready. Input cases: A color change immediately after initialization.
- Deliverable: Message order and the first applied color. Explain the rationale for handling Pending input, linking it to the code.

## Prerequisites

Prepare the experiment results for Pure state and Ownership boundaries from Unit 2, “Renderer Contract”.

## Key concepts and explanations

### Ready

Input sent immediately after transferring the Canvas may arrive before initialization finishes. A ready response signals readiness.

### Pending input

Hold input until ready, or retain only its latest value. An indefinite wait needs an error path.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-3.js in a separate practice project, implement init·ready·error messages and retain the latest input received before readiness. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: A color change immediately after initialization. Baseline: After ready. Run under the baseline conditions, then record observations and errors in notes/day-3.md.
3. Variable: Input timing; changed value: Before ready. Run again through the same input path. Deliverable to save: Message order and the first applied color. Hypothesis to check: The latest input is applied once initialization is ready. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input timing | After ready | Before ready | The latest input is applied once initialization is ready. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Message order and the first applied color. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Ready and Pending input. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Ready affect in this exercise? Input cases: A color change immediately after initialization.
2. Variable: Input timing. Hypothesis to check: The latest input is applied once initialization is ready. Did the actual results agree with the hypothesis? Explain the evidence in terms of Pending input.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Initialization Handshake experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Renderer Contract](../02/README.md) · [Next: Context Creation Failure](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

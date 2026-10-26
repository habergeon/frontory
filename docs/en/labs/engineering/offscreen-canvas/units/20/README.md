# OffscreenCanvas · 20 Restarting with a New Canvas

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Rendering Lifecycle and Recovery · Editable example · Storage ID: `offscreen-canvas-step-20`

## Goals and learning outcomes

- Learning outcome: explain the role of Retransfer limits. Input cases: 5 start·stop cycles.
- Deliverable: Canvas·Worker counts and first frame for each cycle. Explain the rationale for handling Restart state, linking it to the code.

## Prerequisites

Prepare the experiment results for Dispose and Acknowledgment and termination from Unit 19, “Cleanup Protocol”.

## Key concepts and explanations

### Retransfer limits

Trying to transfer an already transferred HTML Canvas again may fail. Begin the lifecycle with a new DOM element.

### Restart state

A new renderer must receive scene data again. Attach pointer and size listeners to the new element as well.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-20.js in a separate practice project, create a new canvas after stop and resend the init state. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 5 start·stop cycles. Baseline: Reuse the existing Canvas. Run under the baseline conditions, then record observations and errors in notes/day-20.md.
3. Variable: Restart; changed value: New Canvas. Run again through the same input path. Deliverable to save: Canvas·Worker counts and first frame for each cycle. Hypothesis to check: Rendering restarts without duplicate-transfer errors. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline                  | Change     | Expected change / hypothesis                          |
| -------- | ------------------------- | ---------- | ----------------------------------------------------- |
| Restart  | Reuse the existing Canvas | New Canvas | Rendering restarts without duplicate-transfer errors. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Canvas·Worker counts and first frame for each cycle. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Retransfer limits and Restart state. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Retransfer limits affect in this exercise? Input cases: 5 start·stop cycles.
2. Variable: Restart. Hypothesis to check: Rendering restarts without duplicate-transfer errors. Did the actual results agree with the hypothesis? Explain the evidence in terms of Restart state.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Restarting with a New Canvas experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Cleanup Protocol](../19/README.md) · [Next: Recovering from Worker Failure](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

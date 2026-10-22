# OffscreenCanvas · 21 Recovering from Worker Failure

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Rendering Lifecycle and Recovery · Editable example · Storage ID: `offscreen-canvas-step-21`

## Goals and learning outcomes

- Learning outcome: explain the role of Distinguishing errors. Input cases: Errors during initialization and rendering.
- Deliverable: A table of error guidance, selected mode, and scene preservation. Explain the rationale for handling Fallback, linking it to the code.

## Prerequisites

Prepare the experiment results for Retransfer limits and Restart state from Unit 20, “Restarting with a New Canvas”.

## Key concepts and explanations

### Distinguishing errors

Rendering computation errors and Worker loading errors have different causes. The main thread is responsible for restoring state.

### Fallback

After an error, you can switch to a main-thread renderer on a new Canvas. This does not reclaim the already transferred context.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-21.js in a separate practice project, reinitialize the fallback from worker.onerror and error messages. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Errors during initialization and rendering. Baseline: Initialization. Run under the baseline conditions, then record observations and errors in notes/day-21.md.
3. Variable: Failure timing; changed value: During rendering. Run again through the same input path. Deliverable to save: A table of error guidance, selected mode, and scene preservation. Hypothesis to check: Both paths restore guidance and interaction. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Failure timing | Initialization | During rendering | Both paths restore guidance and interaction. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of error guidance, selected mode, and scene preservation. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Distinguishing errors and Fallback. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Distinguishing errors affect in this exercise? Input cases: Errors during initialization and rendering.
2. Variable: Failure timing. Hypothesis to check: Both paths restore guidance and interaction. Did the actual results agree with the hypothesis? Explain the evidence in terms of Fallback.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Recovering from Worker Failure experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Restarting with a New Canvas](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

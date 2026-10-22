# OffscreenCanvas · 04 Context Creation Failure

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Control and the First Render · Editable example · Storage ID: `offscreen-canvas-step-04`

## Goals and learning outcomes

- Learning outcome: explain the role of Context. Input cases: Forced context failure.
- Deliverable: Failure guidance and rendering results from the replacement Canvas. Explain the rationale for handling Replacement Canvas, linking it to the code.

## Prerequisites

Prepare the experiment results for Ready and Pending input from Unit 3, “Initialization Handshake”.

## Key concepts and explanations

### Context

getContext may fail to create the requested context type. Do not treat null as a working renderer.

### Replacement Canvas

Do not transfer an already transferred HTML Canvas again as it is. Replace it with a new DOM Canvas for the fallback.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-4.js in a separate practice project, check the Worker's getContext result and send failures to the main thread. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Forced context failure. Baseline: Normal. Run under the baseline conditions, then record observations and errors in notes/day-4.md.
3. Variable: Initialization; changed value: Inject failure. Run again through the same input path. Deliverable to save: Failure guidance and rendering results from the replacement Canvas. Hypothesis to check: Main-thread rendering recovers on a new Canvas. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Initialization | Normal | Inject failure | Main-thread rendering recovers on a new Canvas. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Failure guidance and rendering results from the replacement Canvas. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Context and Replacement Canvas. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Context affect in this exercise? Input cases: Forced context failure.
2. Variable: Initialization. Hypothesis to check: Main-thread rendering recovers on a new Canvas. Did the actual results agree with the hypothesis? Explain the evidence in terms of Replacement Canvas.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Context Creation Failure experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Initialization Handshake](../03/README.md) · [Next: Coordinate Units](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

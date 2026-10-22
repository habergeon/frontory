# OffscreenCanvas · 16 Batching Particle Data

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Rendering Lifecycle and Recovery · Editable example · Storage ID: `offscreen-canvas-step-16`

## Goals and learning outcomes

- Learning outcome: explain the role of TypedArray. Input cases: 100 particles.
- Deliverable: byteLength and the range of particle coordinates. Explain the rationale for handling Ownership, linking it to the code.

## Prerequisites

Prepare the experiment results for Patches and Versions from Unit 15, “Updating Scene State”.

## Key concepts and explanations

### TypedArray

Particle attributes can be stored in contiguous arrays. Define the stride and offset for each attribute clearly.

### Ownership

Do not reuse a transferred array on the main thread. Receive summaries needed by the UI in separate messages.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-16.js in a separate practice project, transfer Float32Array positions and draw the particles in the Worker. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 100 particles. Baseline: Copy. Run under the baseline conditions, then record observations and errors in notes/day-16.md.
3. Variable: Transmission; changed value: transfer. Run again through the same input path. Deliverable to save: byteLength and the range of particle coordinates. Hypothesis to check: The main-thread buffer is detached after transfer. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Transmission | Copy | transfer | The main-thread buffer is detached after transfer. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: byteLength and the range of particle coordinates. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: TypedArray and Ownership. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does TypedArray affect in this exercise? Input cases: 100 particles.
2. Variable: Transmission. Hypothesis to check: The main-thread buffer is detached after transfer. Did the actual results agree with the hypothesis? Explain the evidence in terms of Ownership.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Batching Particle Data experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Updating Scene State](../15/README.md) · [Next: Pausing and Resuming](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

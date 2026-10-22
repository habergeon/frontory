# OffscreenCanvas · 02 Renderer Contract

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Control and the First Render · Editable example · Storage ID: `offscreen-canvas-step-02`

## Goals and learning outcomes

- Learning outcome: explain the role of Pure state. Input cases: The same three circles.
- Deliverable: A table of coordinates and colors for both adapters. Explain the rationale for handling Ownership boundaries, linking it to the code.

## Prerequisites

Prepare the experiment results for Ownership and Fallback path from Unit 1, “Transferring Canvas Control”.

## Key concepts and explanations

### Pure state

The renderer draws from the state it receives rather than from the DOM. The same draw function can run in different execution contexts.

### Ownership boundaries

The main thread manages the DOM and input. The Worker manages the Canvas and scene state.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-2.js in a separate practice project, separate draw(ctx,state) from the main·worker adapters. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: The same three circles. Baseline: Main thread. Run under the baseline conditions, then record observations and errors in notes/day-2.md.
3. Variable: Execution context; changed value: Worker. Run again through the same input path. Deliverable to save: A table of coordinates and colors for both adapters. Hypothesis to check: The same state produces the same shapes. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Execution context | Main thread | Worker | The same state produces the same shapes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of coordinates and colors for both adapters. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Pure state and Ownership boundaries. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Pure state affect in this exercise? Input cases: The same three circles.
2. Variable: Execution context. Hypothesis to check: The same state produces the same shapes. Did the actual results agree with the hypothesis? Explain the evidence in terms of Ownership boundaries.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Renderer Contract experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Transferring Canvas Control](../../01-foundations/README.md) · [Next: Initialization Handshake](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

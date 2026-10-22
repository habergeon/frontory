# OffscreenCanvas · 12 Coalescing Input

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Synchronizing Size and Input · Editable example · Storage ID: `offscreen-canvas-step-12`

## Goals and learning outcomes

- Learning outcome: explain the role of Latest value. Input cases: Rapid movement and clicks.
- Deliverable: Message counts and a record of down/up pairs. Explain the rationale for handling Event semantics, linking it to the code.

## Prerequisites

Prepare the experiment results for Local coordinates and Matching scales from Unit 11, “Transforming Pointer Coordinates”.

## Key concepts and explanations

### Latest value

Some scenes do not need every pointer event. You can send only the latest position once per frame.

### Event semantics

Do not discard boundary events such as down·up. Distinguish continuous move events from discrete events.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-12.js in a separate practice project, coalesce move in rAF and forward down/up immediately. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Rapid movement and clicks. Baseline: Every move. Run under the baseline conditions, then record observations and errors in notes/day-12.md.
3. Variable: Transmission; changed value: Last move per frame. Run again through the same input path. Deliverable to save: Message counts and a record of down/up pairs. Hypothesis to check: Click boundaries are preserved even as the number of move messages decreases. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Transmission | Every move | Last move per frame | Click boundaries are preserved even as the number of move messages decreases. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Message counts and a record of down/up pairs. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Latest value and Event semantics. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Latest value affect in this exercise? Input cases: Rapid movement and clicks.
2. Variable: Transmission. Hypothesis to check: Click boundaries are preserved even as the number of move messages decreases. Did the actual results agree with the hypothesis? Explain the evidence in terms of Event semantics.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Coalescing Input experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Transforming Pointer Coordinates](../11/README.md) · [Next: Pointer Capture and Cancellation](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

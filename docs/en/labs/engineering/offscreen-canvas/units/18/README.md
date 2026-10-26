# OffscreenCanvas · 18 Page Visibility Policy

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Rendering Lifecycle and Recovery · Editable example · Storage ID: `offscreen-canvas-step-18`

## Goals and learning outcomes

- Learning outcome: explain the role of Visibility. Input cases: Hide the tab and return.
- Deliverable: Computation count while hidden and state on return. Explain the rationale for handling Synchronization, linking it to the code.

## Prerequisites

Prepare the experiment results for Pause and Time baseline from Unit 17, “Pausing and Resuming”.

## Key concepts and explanations

### Visibility

A Worker can receive the document visibility policy from the main thread. Continuing to compute an invisible scene still has a cost.

### Synchronization

Choose whether to preserve state or catch up with elapsed time on return. Document the policy according to the simulation's purpose.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-18.js in a separate practice project, translate visibilitychange into pause/resume. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Hide the tab and return. Baseline: Keep computing. Run under the baseline conditions, then record observations and errors in notes/day-18.md.
3. Variable: Policy; changed value: pause while hidden. Run again through the same input path. Deliverable to save: Computation count while hidden and state on return. Hypothesis to check: Computation stops while hidden and continues according to the return policy. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline       | Change             | Expected change / hypothesis                                                 |
| -------- | -------------- | ------------------ | ---------------------------------------------------------------------------- |
| Policy   | Keep computing | pause while hidden | Computation stops while hidden and continues according to the return policy. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Computation count while hidden and state on return. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Visibility and Synchronization. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Visibility affect in this exercise? Input cases: Hide the tab and return.
2. Variable: Policy. Hypothesis to check: Computation stops while hidden and continues according to the return policy. Did the actual results agree with the hypothesis? Explain the evidence in terms of Synchronization.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

Visibility changes send pause messages and reset the time baseline. Hidden state suppresses drawing; schedule cancellation and computation-count measurement are not implemented.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Pausing and Resuming](../17/README.md) · [Next: Cleanup Protocol](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

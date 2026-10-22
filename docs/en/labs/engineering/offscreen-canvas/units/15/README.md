# OffscreenCanvas · 15 Updating Scene State

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Rendering Lifecycle and Recovery · Editable example · Storage ID: `offscreen-canvas-step-15`

## Goals and learning outcomes

- Learning outcome: explain the role of Patches. Input cases: Valid and stale patches.
- Deliverable: Final scene values for each version. Explain the rationale for handling Versions, linking it to the code.

## Prerequisites

Prepare the experiment results for Unit contract and Preserving order from Unit 14, “Resize and Input Protocol”.

## Key concepts and explanations

### Patches

Sending the entire state each time increases data volume. You can define a patch contract that sends only changed fields.

### Versions

A patch needs a baseline state to apply to. Provide a full-state resynchronization path when versions disagree.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-15.js in a separate practice project, implement color·speed patches and stateVersion checks. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: Valid and stale patches. Baseline: Current. Run under the baseline conditions, then record observations and errors in notes/day-15.md.
3. Variable: Patch version; changed value: Stale version. Run again through the same input path. Deliverable to save: Final scene values for each version. Hypothesis to check: Stale patches are rejected and the current state is retained. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Patch version | Current | Stale version | Stale patches are rejected and the current state is retained. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Final scene values for each version. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Patches and Versions. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Patches affect in this exercise? Input cases: Valid and stale patches.
2. Variable: Patch version. Hypothesis to check: Stale patches are rejected and the current state is retained. Did the actual results agree with the hypothesis? Explain the evidence in terms of Versions.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Updating Scene State experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Resize and Input Protocol](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

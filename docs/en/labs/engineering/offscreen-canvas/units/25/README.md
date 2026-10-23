# OffscreenCanvas · 25 Resolution and Workload

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Responsiveness Comparison Project · Editable example · Storage ID: `offscreen-canvas-step-25`

## Goals and learning outcomes

- Learning outcome: explain the role of Pixel cost. Input cases: The same scene at two DPR values.
- Deliverable: A table of pixel counts and frame-time distributions. Explain the rationale for handling Measurement, linking it to the code.

## Prerequisites

Prepare the experiment results for Visible updates and Separating measurements from Unit 24, “Request and Display Latency”.

## Key concepts and explanations

### Pixel cost

Increasing DPR increases the backing-store pixel count quadratically. This has an effect separate from particle count.

### Measurement

Moving rendering to a Worker does not eliminate GPU cost. Use the same resolution in both modes.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-25.js in a separate practice project, keep particle count fixed and collect frame duration for each DPR. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: The same scene at two DPR values. Baseline: 1. Run under the baseline conditions, then record observations and errors in notes/day-25.md.
3. Variable: DPR; changed value: 2. Run again through the same input path. Deliverable to save: A table of pixel counts and frame-time distributions. Hypothesis to check: The pixel count quadruples and the cost may change. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| DPR | 1 | 2 | The pixel count quadruples and the cost may change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of pixel counts and frame-time distributions. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Pixel cost and Measurement. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Pixel cost affect in this exercise? Input cases: The same scene at two DPR values.
2. Variable: DPR. Hypothesis to check: The pixel count quadruples and the cost may change. Did the actual results agree with the hypothesis? Explain the evidence in terms of Measurement.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

The button changes DPR and particle count 40/800 together. A fixed-count resolution comparison is a separate assignment; these results do not isolate the two factors.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Request and Display Latency](../24/README.md) · [Next: Main-Thread Contention Experiment](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

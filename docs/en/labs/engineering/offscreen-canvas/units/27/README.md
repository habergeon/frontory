# OffscreenCanvas · 27 Summarizing Experiment Results

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Responsiveness Comparison Project · Editable example · Storage ID: `offscreen-canvas-step-27`

## Goals and learning outcomes

- Learning outcome: explain the role of Distributions. Input cases: 3 repeated runs.
- Deliverable: A comparison table including conditions and raw values. Explain the rationale for handling Limitations, linking it to the code.

## Prerequisites

Prepare the experiment results for Competing work and Fair comparison from Unit 26, “Main-Thread Contention Experiment”.

## Key concepts and explanations

### Distributions

An average alone does not reveal brief stalls. Summarize the median together with long frames.

### Limitations

Device, browser, and power state affect results. Do not extend conclusions to environments you have not measured.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-27.js in a separate practice project, collect result JSON and build a comparison table by mode·particle count·DPR. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 3 repeated runs. Baseline: Main thread first. Run under the baseline conditions, then record observations and errors in notes/day-27.md.
3. Variable: Run order; changed value: Worker first. Run again through the same input path. Deliverable to save: A comparison table including conditions and raw values. Hypothesis to check: Warm-up or ordering effects can be identified. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Run order | Main thread first | Worker first | Warm-up or ordering effects can be identified. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A comparison table including conditions and raw values. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Distributions and Limitations. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Distributions affect in this exercise? Input cases: 3 repeated runs.
2. Variable: Run order. Hypothesis to check: Warm-up or ordering effects can be identified. Did the actual results agree with the hypothesis? Explain the evidence in terms of Limitations.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Summarizing Experiment Results experiment with cleanup of the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Main-Thread Contention Experiment](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

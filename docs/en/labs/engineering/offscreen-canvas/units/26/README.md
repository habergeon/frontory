# OffscreenCanvas · 26 Main-Thread Contention Experiment

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Responsiveness Comparison Project · Editable example · Storage ID: `offscreen-canvas-step-26`

## Goals and learning outcomes

- Learning outcome: explain the role of Competing work. Input cases: The same scene and a click counter.
- Deliverable: Input latency and frame-time distributions by mode. Explain the rationale for handling Fair comparison, linking it to the code.

## Prerequisites

Prepare the experiment results for Pixel cost and Measurement from Unit 25, “Resolution and Workload”.

## Key concepts and explanations

### Competing work

Long tasks on the main thread can delay input and rendering. Worker rendering and UI input are separate metrics.

### Fair comparison

Use the same competing work and seed. Workers also share CPU and GPU resources.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-26.js in a separate practice project, enable a bounded main-thread computation load and compare both rendering modes. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: The same scene and a click counter. Baseline: None. Run under the baseline conditions, then record observations and errors in notes/day-26.md.
3. Variable: Main-thread load; changed value: Add bounded computation. Run again through the same input path. Deliverable to save: Input latency and frame-time distributions by mode. Hypothesis to check: Changes in rendering and UI responsiveness may differ. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable         | Baseline | Change                  | Expected change / hypothesis                           |
| ---------------- | -------- | ----------------------- | ------------------------------------------------------ |
| Main-thread load | None     | Add bounded computation | Changes in rendering and UI responsiveness may differ. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Input latency and frame-time distributions by mode. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Competing work and Fair comparison. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Competing work affect in this exercise? Input cases: The same scene and a click counter.
2. Variable: Main-thread load. Hypothesis to check: Changes in rendering and UI responsiveness may differ. Did the actual results agree with the hypothesis? Explain the evidence in terms of Fair comparison.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

An interactive Main-Thread Contention Experiment with cleanup of the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Resolution and Workload](../25/README.md) · [Next: Summarizing Experiment Results](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

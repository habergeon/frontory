# OffscreenCanvas · 28 Evaluating Rendering Separation

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Responsiveness Comparison Project · Editable example · Storage ID: `offscreen-canvas-03`

## Goals and learning outcomes

- Learning outcome: explain the role of Effects of separation. Input cases: resize·input·stop·rerun·unsupported.
- Deliverable: An input-latency·frame·cleanup·fallback report. Explain the rationale for handling Completion criteria, linking it to the code.

## Prerequisites

Prepare the experiment results for Distributions and Limitations from Unit 27, “Summarizing Experiment Results”.

## Key concepts and explanations

### Effects of separation

A Worker moves rendering work off the main thread. It does not eliminate the GPU work itself.

### Completion criteria

Stopping and rerunning are functionality alongside responsiveness. Record results for error and unsupported paths too.

## Practice setup

The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-28.js in a separate practice project, use the existing offscreen-canvas-03 as a reference to complete a particle scene in both modes and an evaluation report. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: resize·input·stop·rerun·unsupported. Baseline: Main thread. Run under the baseline conditions, then record observations and errors in notes/day-28.md.
3. Variable: Rendering mode; changed value: Worker. Run again through the same input path. Deliverable to save: An input-latency·frame·cleanup·fallback report. Hypothesis to check: Choose based on evidence of benefits and costs for the same scene. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Rendering mode | Main thread | Worker | Choose based on evidence of benefits and costs for the same scene. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: An input-latency·frame·cleanup·fallback report. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Effects of separation and Completion criteria. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Effects of separation affect in this exercise? Input cases: resize·input·stop·rerun·unsupported.
2. Variable: Rendering mode. Hypothesis to check: Choose based on evidence of benefits and costs for the same scene. Did the actual results agree with the hypothesis? Explain the evidence in terms of Completion criteria.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../src/labs/offscreen-canvas-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Summarizing Experiment Results](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

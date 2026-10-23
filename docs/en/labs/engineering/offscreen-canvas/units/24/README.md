# OffscreenCanvas · 24 Request and Display Latency

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Responsiveness Comparison Project · Editable example · Storage ID: `offscreen-canvas-step-24`

## Goals and learning outcomes

- Learning outcome: explain the role of Visible updates. Input cases: 20 color-change requests.
- Deliverable: Round-trip, processing, and observed latency records. Explain the rationale for handling Separating measurements, linking it to the code.

## Prerequisites

Prepare the experiment results for Loss and Recovery data from Unit 23, “Canvas Context Loss”.

## Key concepts and explanations

### Visible updates

Message arrival and an update appearing on screen do not happen at the same time. A processing ack alone does not establish total display latency.

### Separating measurements

Record main-thread round-trip time separately from Worker processing duration. Describe how actual display updates are observed and the method's limits.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing offscreen-canvas-01·02·03 are starting examples for supported browsers. Implement the new units in main-thread and Worker files in a separate local HTTP project. Check API and context support, and provide a main-thread fallback on a new Canvas if transfer fails. Preserve CSP and isolation, and record performance measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-24.js in a separate practice project, include input IDs in rendered-frame results and log observations of visible updates. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 20 color-change requests. Baseline: Every event. Run under the baseline conditions, then record observations and errors in notes/day-24.md.
3. Variable: Transmission frequency; changed value: Per frame. Run again through the same input path. Deliverable to save: Round-trip, processing, and observed latency records. Hypothesis to check: The tradeoff between input latency and message count becomes visible. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Transmission frequency | Every event | Per frame | The tradeoff between input latency and message count becomes visible. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Round-trip, processing, and observed latency records. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Visible updates and Separating measurements. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Visible updates affect in this exercise? Input cases: 20 color-change requests.
2. Variable: Transmission frequency. Hypothesis to check: The tradeoff between input latency and message count becomes visible. Did the actual results agree with the hypothesis? Explain the evidence in terms of Separating measurements.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/offscreen-canvas-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

The measurement runs from main-thread request submission to handling the painted acknowledgment. It does not separately measure compositing, visible-display latency, or Worker processing time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Canvas Context Loss](../23/README.md) · [Next: Resolution and Workload](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

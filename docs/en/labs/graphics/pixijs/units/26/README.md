# PixiJS · 26 Profiling and Quality Budgets

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Ownership, Large-Scale Rendering, and Measurement · Editable example · Storage ID: `pixijs-step-26`

## Goals and learning outcomes

- Record sample counts, environment, and settings.
- Do not call frame intervals GPU time.

## Prerequisites

Prerequisite concepts: State Changes, Preserving Behavior. Prepare the output files and observation records from Unit 25.

## Key concepts and explanations

### Timing Metrics

ticker.elapsedMS can be used to observe frame intervals. It is neither GPU execution time nor the time spent only on CPU work.

### Controlling Variables

Changing resolution, filters, and object counts together makes causes hard to identify. Change one variable and record quality loss as well.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-26.js and index.html in the external practice project. Add start and stop measurement buttons to a Sprite list generated with a fixed seed.
2. After warmup, save the same number of elapsedMS samples and record the median, 95th percentile, and screen images.
3. Save the output with the input condition 1, then run again with 2. Expected: More buffer pixels may increase filter or fill workload. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-26-notes.md.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                            |
| ---------- | -------- | ------ | ------------------------------------------------------- |
| resolution | 1        | 2      | More buffer pixels may increase filter or fill workload |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record sample counts, environment, and settings.
- [ ] Do not call frame intervals GPU time.

## Self-check

1. Can a VSync-limited value reveal small improvements?
2. How do you distinguish CPU-loop bottlenecks from filter bottlenecks?

## Official references

- [PixiJS 8 ticker](https://pixijs.com/8.x/guides/components/ticker)
- [PixiJS 8 perf](https://pixijs.com/8.x/guides/concepts/performance-tips)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-26/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Forming a Batching Hypothesis](../25/README.md) · [Next: Completing the 2D Scene Editor](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

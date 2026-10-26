# PixiJS · 25 Forming a Batching Hypothesis

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Ownership, Large-Scale Rendering, and Measurement · Editable example · Storage ID: `pixijs-step-25`

## Goals and learning outcomes

- Compare while preserving the visual result.
- Do not infer draw call counts from frame intervals.

## Prerequisites

Prerequisite concepts: Visibility and Computation, Visibility Bounds. Prepare the output files and observation records from Unit 24.

## Key concepts and explanations

### State Changes

Textures, blending, and shape types affect rendering batches. Alternating between two textures does not necessarily double the calls.

### Preserving Behavior

Sorting optimizations can change translucent overlaps. Reorder only objects whose visual order can be preserved.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-25.js and index.html in the external practice project. Arrange non-overlapping Sprites and Graphics in alternating order and grouped by type.
2. Keep counts and positions unchanged, recording profiles and frame intervals; report call counts only if a tool can verify them directly.
3. Save the output with the input condition Alternate Sprites and Graphics, then run again with Group by type. Expected: State transition costs may decrease, but actual measurement is required. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-25-notes.md.

## Variables to observe

| Variable      | Baseline                       | Change        | Expected change / hypothesis                                            |
| ------------- | ------------------------------ | ------------- | ----------------------------------------------------------------------- |
| Drawing order | Alternate Sprites and Graphics | Group by type | State transition costs may decrease, but actual measurement is required |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Compare while preserving the visual result.
- [ ] Do not infer draw call counts from frame intervals.

## Self-check

1. Can multiple textures be included in one batch?
2. What breaks when sorting changes translucent overlaps?

## Official references

- [PixiJS 8 perf](https://pixijs.com/8.x/guides/concepts/performance-tips)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-25/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Offscreen Handling and Fewer Updates](../24/README.md) · [Next: Profiling and Quality Budgets](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

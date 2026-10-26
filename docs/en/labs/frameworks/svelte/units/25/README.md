# Svelte · 25 Observing Compilation Output and Performance

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Verification and Framework Comparison · External example · preview instructions · Storage ID: `svelte-step-25`

## Goals and learning outcomes

- There is a record of 10 inputs at each of two data sizes.
- Record build mode, device, and browser.

## Prerequisites

Unit 25 continues with the work and experiment records from Unit 24.

## Key concepts and explanations

### Compilation Output

Source length differs from what the browser executes. Inspect build output to see which code and dependencies it includes.

### Fair Measurement

Compare with the same data, input, and build mode. Do not treat React Profiler numbers as the same metric as Svelte’s total render time.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Build the external project and record dist asset sizes and configuration in notes/build.md.
2. With 100 and 1000 cards, measure the same 10 filter inputs.
3. Distinguish scripting and layout sections in the browser performance recording.

## Variables to observe

| Variable   | Baseline  | Change     | Expected change / hypothesis                                   |
| ---------- | --------- | ---------- | -------------------------------------------------------------- |
| Card Count | 100 cards | 1000 cards | Measure changes in update cost without assuming linear growth. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There is a record of 10 inputs at each of two data sizes.
- [ ] Record build mode, device, and browser.

## Self-check

1. Does a compiled framework have 0 runtime cost?
2. Can bundle size alone explain input latency?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-25/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Checking Lifetimes During Transitions](../24/README.md) · [Next: Regression Scenarios for the Same Contract](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

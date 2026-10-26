# Svelte · 26 Regression Scenarios for the Same Contract

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Verification and Framework Comparison · External example · preview instructions · Storage ID: `svelte-step-26`

## Goals and learning outcomes

- Expected outputs for the 4 core flows are explicit.
- Cards from the previous test do not remain on a second run.

## Prerequisites

Unit 26 continues with the work and experiment records from Unit 25.

## Key concepts and explanations

### Behavior Contract

Define adding, toggling, filtering, and draft preservation as inputs and outputs. Comparison is meaningful when all three frameworks meet the same contract.

### Test Independence

Each run must start from the same initial data. Clean up leftover storage values and timers to remove the effects of previous runs.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tests/workspace.spec.js, prepare 3 cards with fixed ids.
2. Check adding, toggling, the incomplete filter, and returning to A/B drafts.
3. Also check for 1 event and 1 loop after hiding and showing the Canvas again.

## Variables to observe

| Variable      | Baseline  | Change                | Expected change / hypothesis                                             |
| ------------- | --------- | --------------------- | ------------------------------------------------------------------------ |
| Initial State | Fresh run | Includes saved drafts | Only the initial expectations change; the editing contract is preserved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Expected outputs for the 4 core flows are explicit.
- [ ] Cards from the previous test do not remain on a second run.

## Self-check

1. What becomes difficult if a test depends on component variable names?
2. Can testing the store adapter establish that compiled components have also been verified?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-26/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Observing Compilation Output and Performance](../25/README.md) · [Next: Preparing a Three-Framework Comparison](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

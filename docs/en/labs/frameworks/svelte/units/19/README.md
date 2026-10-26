# Svelte · 19 Await Blocks and State Guidance

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Stores and Workspace State · External example · preview instructions · Storage ID: `svelte-step-19`

## Goals and learning outcomes

- While pending, 1 loading message appears.
- The error message disappears after a successful retry.

## Prerequisites

Unit 19 continues with the work and experiment records from Unit 18.

## Key concepts and explanations

### Promise Presentation

{#await} separates pending, successful, and failed Promise screens. Treat an empty array as one kind of successful result.

### User Recovery

Failure guidance needs a retry or another input path. Also define whether to retain or clear previous results as part of the screen contract.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Results.svelte, write pending·then·catch blocks.
2. Create an input that selects delayed success, an empty array, or failure in fakeSearch.
3. Connect retry after failure and record all three output states.

## Variables to observe

| Variable | Baseline         | Change  | Expected change / hypothesis                           |
| -------- | ---------------- | ------- | ------------------------------------------------------ |
| Response | Successful array | Failure | An error and retry button appear in place of the list. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] While pending, 1 loading message appears.
- [ ] The error message disappears after a successful retry.

## Self-check

1. Does an await block alone solve all request cancellation problems?
2. Should you send an empty array to catch?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-19/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Requests and Stale Results](../18/README.md) · [Next: Saving and Restoring Drafts](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

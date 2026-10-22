# Svelte · 05 Conditional Blocks and Empty States

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compilation and Runes Basics · External example · preview instructions · Storage ID: `svelte-step-05`

## Goals and learning outcomes

- When there are 0 results, there is 1 empty-state message.
- Resetting restores 3 cards.

## Prerequisites

Unit 5 continues with the work and experiment records from Unit 4.

## Key concepts and explanations

### Conditional Creation

{#if} creates or removes child components according to a condition. Unlike hiding with CSS, it affects local state and resource lifetimes.

### Empty State

Having no results is a separate screen state. Explain the cause and provide an action to reset filters so users can recover.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/CardList.svelte, write {#if items.length} and an empty-state message.
2. Show a reset button when the search has no results.
3. Clear the filter and check that the original cards reappear.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Search Results | 3 results | 0 results | The empty-state message and reset button appear. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] When there are 0 results, there is 1 empty-state message.
- [ ] Resetting restores 3 cards.

## Self-check

1. Are empty results and a failed data request the same state?
2. Does the local state of a child hidden with {#if} remain?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-05/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Calculating Filters with $derived](../04/README.md) · [Next: Keyed Each and Card Identity](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

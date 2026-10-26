# Svelte · 04 Calculating Filters with $derived

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compilation and Runes Basics · External example · preview instructions · Storage ID: `svelte-step-04`

## Goals and learning outcomes

- The filter result count equals the number of matching titles.
- The original id order stays unchanged after sorting.

## Prerequisites

Unit 4 continues with the work and experiment records from Unit 3.

## Key concepts and explanations

### Dependency Tracking

$derived depends on the reactive values read during its calculation. Keep side effects such as saving or requests out of the expression.

### Multistep Calculations

$derived.by expresses calculations that need multiple statements. Return a result without changing the original array.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add query and onlyOpen to src/App.svelte.
2. In $derived.by, filter and then sort a copied array.
3. Combine search and completion toggles, and compare the original order with the result order.

## Variables to observe

| Variable     | Baseline     | Change               | Expected change / hypothesis                                           |
| ------------ | ------------ | -------------------- | ---------------------------------------------------------------------- |
| Search Query | Empty string | Part of a card title | Only matching cards appear, and the original array order is preserved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The filter result count equals the number of matching titles.
- [ ] The original id order stays unchanged after sorting.

## Self-check

1. What changes if you do not copy before sort?
2. Why is copying a derived value with $effect unnecessary?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-04/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Update Paths in $state Objects](../03/README.md) · [Next: Conditional Blocks and Empty States](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Svelte · 06 Keyed Each and Card Identity

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compilation and Runes Basics · External example · preview instructions · Storage ID: `svelte-step-06`

## Goals and learning outcomes

- After reversing the order, A remains with its original card id.
- Local input from a deleted card does not move to another card.

## Prerequisites

Unit 6 continues with the work and experiment records from Unit 5.

## Key concepts and explanations

### Keyed Iteration

{#each items as item (item.id)} connects data ids to components. It can track the same item even when the order changes.

### Local Input

Input state inside a row must stay connected to its data. An unstable key can attach input to another card after sorting.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add a local note input to src/CardRow.svelte.
2. In CardList.svelte, write an each block that uses id as its key.
3. Enter A in the first card, reverse the order, and record the id that retains A.

## Variables to observe

| Variable | Baseline    | Change  | Expected change / hypothesis                     |
| -------- | ----------- | ------- | ------------------------------------------------ |
| key      | Array index | item.id | The note stays with the same card after sorting. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After reversing the order, A remains with its original card id.
- [ ] Local input from a deleted card does not move to another card.

## Self-check

1. What contract breaks if you provide duplicate ids?
2. What happens during editing if you use the title as the key?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-06/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Conditional Blocks and Empty States](../05/README.md) · [Next: Form Bindings and Validation](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

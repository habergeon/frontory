# Svelte · 08 $props and Change Callbacks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Effects · External example · preview instructions · Storage ID: `svelte-step-08`

## Goals and learning outcomes

- Only done for the clicked id changes.
- One click produces 1 parent change log.

## Prerequisites

Unit 8 continues with the work and experiment records from Unit 7.

## Key concepts and explanations

### Props Contract

Read inputs provided by the parent with $props. Communicate intent through a callback rather than arbitrarily changing values the child does not own.

### Callback Input

A function prop can explicitly pass the change target and new value. Define domain inputs as the contract rather than passing the entire DOM event object.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Card.svelte, receive id·title·done·ontoggle through $props.
2. Connect the button click to ontoggle(id).
3. Have the parent perform the toggle and check that only the clicked id changes after sorting.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Callback Argument | Index | id | Only the intended card changes even after reordering. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Only done for the clicked id changes.
- [ ] One click produces 1 parent change log.

## Self-check

1. Why does directly modifying the inside of a prop object cause an ownership warning?
2. How do you choose between a callback and a global store?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-08/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Form Bindings and Validation](../07/README.md) · [Next: $bindable and the Editor Contract](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Svelte · 15 writable and the Subscription Contract

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Stores and Workspace State · External example · preview instructions · Storage ID: `svelte-step-15`

## Goals and learning outcomes

- Both consumers read the latest id.
- The corresponding log stops after manually unsubscribing.

## Prerequisites

Unit 15 continues with the work and experiment records from Unit 14.

## Key concepts and explanations

### store

writable delivers values through its subscribe·set·update contract. Independently of runes, it can connect to external subscribers or existing code.

### Automatic Subscription

The $store syntax in a component handles subscription lifetime. If you subscribe directly in an ordinary JS adapter, you must call the unsubscribe function yourself.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Declare a writable selected id in src/stores.js.
2. Display $selection in Selection.svelte and add a separate JS subscription log.
3. After removing the component, also unsubscribe the JS subscription and compare handling counts.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Subscription Method | Direct subscribe | Component $store | The location responsible for cleanup changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both consumers read the latest id.
- [ ] The corresponding log stops after manually unsubscribing.

## Self-check

1. Is either store or $state always better?
2. Why does the DOM adapter in the built-in preview return unsubscribe?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount and tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-15/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Events and Resource Cleanup](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

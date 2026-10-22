# Svelte · 13 onMount and Initial Resources

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Effects · External example · preview instructions · Storage ID: `svelte-step-13`

## Goals and learning outcomes

- While visible, 1 pointer input is handled 1 time.
- There are no pointer handling logs while hidden.

## Prerequisites

Unit 13 continues with the work and experiment records from Unit 12.

## Key concepts and explanations

### Mount Timing

onMount runs after the component is connected to the DOM. Do not use it as a place to create DOM resources during server rendering.

### Synchronous Return

A function returned synchronously by onMount runs as cleanup on removal. An async callback returns a Promise, so do not mistake it for the same cleanup contract.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/PointerCanvas.svelte, register a pointer listener with onMount.
2. Return cleanup that calls removeEventListener with the same function reference.
3. Toggle visibility 5 times and count how many times one pointer input is handled.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Mount Count | 1 time | 5 times | Repeated mounting does not increase the number of calls per pointer input. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] While visible, 1 pointer input is handled 1 time.
- [ ] There are no pointer handling logs while hidden.

## Self-check

1. Why does returning cleanup from async onMount behave differently?
2. Between onMount and $effect, which value changes require a rerun?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount and tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-13/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: $effect Dependencies and Cleanup](../12/README.md) · [Next: Events and Resource Cleanup](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

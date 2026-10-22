# Svelte · 12 $effect Dependencies and Cleanup

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Effects · External example · preview instructions · Storage ID: `svelte-step-12`

## Goals and learning outcomes

- There is 1 active timer after changing period.
- Ticks stop after the component is removed.

## Prerequisites

Unit 12 continues with the work and experiment records from Unit 11.

## Key concepts and explanations

### External Synchronization

Use $effect to synchronize state with Canvas or external subscriptions. Calculate derived text with $derived to reduce unnecessary writes.

### Synchronous Tracking

Reactive values read synchronously by an Effect become dependencies. A returned cleanup function releases previous work before reruns and on teardown.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Clock.svelte, create an $effect that reads period and a setInterval.
2. Return a function that calls clearInterval from the Effect.
3. Change period through 100→500→100 and record the active timer count and tick interval.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| period | 100ms | 500ms | After cleaning up the old timer, only one slower timer remains. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There is 1 active timer after changing period.
- [ ] Ticks stop after the component is removed.

## Self-check

1. Are values read after await automatic dependencies too?
2. What loop can occur if an Effect keeps writing state that it also reads?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-12/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: DOM References and tick](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

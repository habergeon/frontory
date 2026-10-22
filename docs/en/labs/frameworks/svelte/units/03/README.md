# Svelte · 03 Update Paths in $state Objects

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compilation and Runes Basics · External example · preview instructions · Storage ID: `svelte-step-03`

## Goals and learning outcomes

- The card and derived done always agree.
- Record how an ordinary copied value stays at its initial state.

## Prerequisites

Unit 3 continues with the work and experiment records from Unit 2.

## Key concepts and explanations

### Deep Reactivity

Creating ordinary arrays and objects with $state tracks changes inside them. Do not assume that all external objects or classes are handled in the same way.

### Keeping the Connection

Copying a reactive object property into an ordinary variable can change its connection to later updates. Read needed values from the original or declare them as derived values.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/App.svelte, create a button that changes items[0].done directly.
2. Display an ordinary variable holding the initial copied done alongside $derived(items[0].done).
3. Toggle three times and record changes in both values.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Reading Method | Initial ordinary variable | $derived | The derived value updates with each toggle. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The card and derived done always agree.
- [ ] Record how an ordinary copied value stays at its initial state.

## Self-check

1. How does deep Proxy tracking differ from replacing the object itself?
2. Are class instance properties automatically reactive too?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-03/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Markup and Event Attributes](../02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

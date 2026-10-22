# Svelte · 10 Changing Row Presentation with Snippets

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Effects · External example · preview instructions · Storage ID: `svelte-step-10`

## Goals and learning outcomes

- The card id order is the same in both presentations.
- Only the detailed presentation adds a completion description.

## Prerequisites

Unit 10 continues with the work and experiment records from Unit 9.

## Key concepts and explanations

### snippet

A snippet defines a reusable markup fragment. It receives data through parameters and is displayed with {@render}.

### Composition Boundary

Separating list calculations from row presentation lets you show the same data in different forms. Keep presentation fragments from changing the original data.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/CardList.svelte, create a structure that accepts a row snippet prop.
2. Define compact and detailed snippets in the parent.
3. Apply both snippets to the same filter results, and check that ids and counts agree.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Row Presentation | compact | detailed | The card count and order stay the same; only the displayed information changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The card id order is the same in both presentations.
- [ ] Only the detailed presentation adds a completion description.

## Self-check

1. How do the values returned by a snippet and an ordinary function differ?
2. Why pass responsibility for row presentation to the parent?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-10/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: $bindable and the Editor Contract](../09/README.md) · [Next: DOM References and tick](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

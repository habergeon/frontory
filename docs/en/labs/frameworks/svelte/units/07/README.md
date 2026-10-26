# Svelte · 07 Form Bindings and Validation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compilation and Runes Basics · External example · preview instructions · Storage ID: `svelte-step-07`

## Goals and learning outcomes

- The card count stays unchanged after submitting whitespace.
- Submitting with Enter adds 1 card with the same title.

## Prerequisites

Unit 7 continues with the work and experiment records from Unit 6.

## Key concepts and explanations

### bind:value

bind:value connects input to state. Check the actual values and types of numeric and empty inputs to define validation rules.

### Submission Path

Form submission handles keyboard and button input through the same path. Keep invalid input so the user can correct it.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/AddCard.svelte, write label·bind:value·onsubmit.
2. Call preventDefault in submit and reject whitespace-only titles.
3. Try an empty title, a Korean title, and submission with Enter separately, and record the card count.

## Variables to observe

| Variable | Baseline   | Change  | Expected change / hypothesis            |
| -------- | ---------- | ------- | --------------------------------------- |
| Title    | Whitespace | 새 카드 | Reject whitespace and add 새 카드 once. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The card count stays unchanged after submitting whitespace.
- [ ] Submitting with Enter adds 1 card with the same title.

## Self-check

1. Where do you call preventDefault with Svelte 5 event attributes?
2. Why keep the input when validation fails?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-07/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Keyed Each and Card Identity](../06/README.md) · [Next: $props and Change Callbacks](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

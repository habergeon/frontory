# Svelte · 09 $bindable and the Editor Contract

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Effects · External example · preview instructions · Storage ID: `svelte-step-09`

## Goals and learning outcomes

- The textarea and parent output strings agree.
- The draft remains after removing and showing the editor again.

## Prerequisites

Unit 9 continues with the work and experiment records from Unit 8.

## Key concepts and explanations

### Two-Way Connection

$bindable explicitly marks a prop the parent can bind. Making every prop two-way obscures update paths.

### Editing Data

Per-unit drafts must be retainable beyond the editor lifetime. Have the parent own the string and the editor communicate changes.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/NoteEditor.svelte, declare value = $bindable('').
2. Connect textarea bind:value with bind:value={draft} in the parent.
3. Create an output panel reading the same draft, and check results after input, removal, and showing it again.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Value Passing | Ordinary prop | bindable binding | Editor input is reflected in the parent draft. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The textarea and parent output strings agree.
- [ ] The draft remains after removing and showing the editor again.

## Self-check

1. Which props should allow a two-way connection?
2. How do you define defaults and the contract when the parent passes undefined?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-09/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: $props and Change Callbacks](../08/README.md) · [Next: Changing Row Presentation with Snippets](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Svelte · 21 Key Blocks and Draft Preservation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Stores and Workspace State · External example · preview instructions · Storage ID: `svelte-step-21`

## Goals and learning outcomes

- A and B drafts do not get mixed.
- The edit count returns to its initial value after a key change.

## Prerequisites

Unit 21 continues with the work and experiment records from Unit 20.

## Key concepts and explanations

### Recreation

{#key unitId} recreates its block when the value changes. Use it when you intend to reset local state.

### Preservation Location

Keep per-unit drafts outside the key block so they survive switching. Define a separate reset policy for cursor or temporary panel state.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/App.svelte, create draftsById and wrap Editor in {#key unitId}.
2. Store strings in the parent and display the editor’s local edit count.
3. Switch A→B→A and compare drafts and edit counts.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| key | Fixed value | unitId | The draft remains, but the local edit count resets. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] A and B drafts do not get mixed.
- [ ] The edit count returns to its initial value after a key change.

## Self-check

1. What repeats if you change the key every frame?
2. Is a key block suitable when you need to preserve all state?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-21/App.svelte)
- [Editor.svelte](../../../../../../../src/labs/svelte-step-21/Editor.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Saving and Restoring Drafts](../20/README.md) · [Next: Separating Canvas Loops from Reactivity](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

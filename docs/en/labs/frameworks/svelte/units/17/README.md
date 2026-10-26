# Svelte · 17 Connecting Workspaces with Context

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Stores and Workspace State · External example · preview instructions · Storage ID: `svelte-step-17`

## Goals and learning outcomes

- The latest string appears consistently within each tree.
- Drafts in the other tree do not change.

## Prerequisites

Unit 17 continues with the work and experiment records from Unit 16.

## Key concepts and explanations

### Context

setContext and getContext pass dependencies within a component tree. Unlike a single global store, they can provide a separate scope for each tree.

### Reactive Objects

When you pass a reactive object through Context, consumers read that object. Decide how to preserve the shared contract instead of replacing the entire reference.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Workspace.svelte, use setContext with a Symbol key to provide the notes object and update function.
2. Read them with getContext in a deeply nested NoteEditor.svelte.
3. Edit the same id in two nested Workspaces and check isolation.

## Variables to observe

| Variable | Baseline          | Change             | Expected change / hypothesis                                 |
| -------- | ----------------- | ------------------ | ------------------------------------------------------------ |
| Provider | 1 shared provider | 2 nested providers | The inner editor reads the draft from the nearest workspace. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The latest string appears consistently within each tree.
- [ ] Drafts in the other tree do not change.

## Self-check

1. Why is retrieving Context outside initialization a problem?
2. How do you avoid string key collisions?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-17/App.svelte)
- [Consumer.svelte](../../../../../../../src/labs/svelte-step-17/Consumer.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shared Runes Modules](../16/README.md) · [Next: Requests and Stale Results](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

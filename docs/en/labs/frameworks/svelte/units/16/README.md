# Svelte · 16 Shared Runes Modules

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Stores and Workspace State · External example · preview instructions · Storage ID: `svelte-step-16`

## Goals and learning outcomes

- The A drafts in two Workspaces differ.
- Resetting one Workspace does not erase values in the other.

## Prerequisites

Unit 16 continues with the work and experiment records from Unit 15.

## Key concepts and explanations

### Module Files

You can separate logic using runes into .svelte.js or .svelte.ts. Distinguish their compilation requirements from ordinary .js.

### Instance Scope

A factory creating a state object can isolate state per call. Creating only one at module scope shares it among all consumers.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/createNotes.svelte.js, write a factory that creates a $state object and an update function.
2. Have two Workspace.svelte instances each call the factory.
3. Enter different strings for the same unit A and record whether they are shared.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Creation Location | 1 time at module scope | A call per Workspace | Drafts in the two workspaces are independent. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The A drafts in two Workspaces differ.
- [ ] Resetting one Workspace does not erase values in the other.

## Self-check

1. What restrictions must you check when reassigning and exporting a reactive value?
2. Why can module-level user state be dangerous in SSR?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-16/App.svelte)
- [workspace.svelte.js](../../../../../../../src/labs/svelte-step-16/workspace.svelte.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: writable and the Subscription Contract](../15/README.md) · [Next: Connecting Workspaces with Context](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

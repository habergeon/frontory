# Svelte · 20 Saving and Restoring Drafts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Stores and Workspace State · External example · preview instructions · Storage ID: `svelte-step-20`

## Goals and learning outcomes

- Valid A·B drafts are restored separately.
- The entered string remains on screen after a write failure.

## Prerequisites

Unit 20 continues with the work and experiment records from Unit 19.

## Key concepts and explanations

### Storage Format

Store a version and per-unit strings in JSON. When passing a Proxy outside, consider an explicit data boundary such as $state.snapshot.

### Preserving Input on Failure

A save failure must not become an editing failure. Retain the in-memory draft and separate the failure message from the retry path.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/persistence.js, implement version/string validation and reads/writes.
2. Restore during App.svelte initialization and display save status after changes.
3. Inject valid JSON, truncated JSON, and a write failure, and check draft and error output.

## Variables to observe

| Variable      | Baseline   | Change         | Expected change / hypothesis                                    |
| ------------- | ---------- | -------------- | --------------------------------------------------------------- |
| Storage Input | Valid JSON | Truncated JSON | After the error message, editing continues with an empty draft. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Valid A·B drafts are restored separately.
- [ ] The entered string remains on screen after a write failure.

## Self-check

1. Does a snapshot stay connected to the reactive object?
2. What do you lose if you save empty values before the initial restoration?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-20/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Await Blocks and State Guidance](../19/README.md) · [Next: Key Blocks and Draft Preservation](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

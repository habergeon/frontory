# Svelte · 11 DOM References and tick

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Effects · External example · preview instructions · Storage ID: `svelte-step-11`

## Goals and learning outcomes

- The active element is textarea after opening.
- There are no errors from accessing a hidden element.

## Prerequisites

Unit 11 continues with the work and experiment records from Unit 10.

## Key concepts and explanations

### DOM Connection

bind:this provides a reference to the created DOM element. Since the element may be removed, check when you use it and whether it exists.

### Waiting for Updates

tick continues execution after pending state changes have been applied to the DOM. It does not wait for external requests to finish.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/EditorPanel.svelte, connect a conditional textarea and bind:this.
2. In the open function, set visible=true, then call await tick() and focus.
3. Repeat opening and closing 5 times, and record the active element and any errors.

## Variables to observe

| Variable     | Baseline                              | Change     | Expected change / hypothesis                  |
| ------------ | ------------------------------------- | ---------- | --------------------------------------------- |
| focus Timing | Immediately after changing visibility | After tick | The created textarea receives focus reliably. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The active element is textarea after opening.
- [ ] There are no errors from accessing a hidden element.

## Self-check

1. What might you measure if you read DOM dimensions before tick?
2. Can you handle bind:this in the same way as screen state?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount and tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-11/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Changing Row Presentation with Snippets](../10/README.md) · [Next: $effect Dependencies and Cleanup](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

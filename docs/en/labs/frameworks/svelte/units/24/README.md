# Svelte · 24 Checking Lifetimes During Transitions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Verification and Framework Comparison · External example · preview instructions · Storage ID: `svelte-step-24`

## Goals and learning outcomes

- The A draft remains at both duration values.
- There are 0 active timers after the final hide.

## Prerequisites

Unit 24 continues with the work and experiment records from Unit 23.

## Key concepts and explanations

### Transitions

A transition applies visual changes when an element appears or disappears. Distinguish the time it visually disappears from the time data changes.

### Motion Preference

Respecting reduced-motion preferences lets users access essential functions without motion. Do not use the end of a transition as a condition for saving to be complete.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add a fade transition to src/EditorPanel.svelte.
2. Set duration to 0 under reduced-motion conditions.
3. Quickly repeat showing and hiding, and record DOM/resource cleanup timing and note preservation.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                     |
| -------- | -------- | ------ | -------------------------------------------------------------------------------- |
| duration | 300ms    | 0ms    | Functionality and drafts stay the same; only the visual transition time changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The A draft remains at both duration values.
- [ ] There are 0 active timers after the final hide.

## Self-check

1. Can an element remain during an exit transition?
2. Can you assume that cleanup logs and visual disappearance happen at the same time?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount and tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-24/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Style Scope and Accessibility](../23/README.md) · [Next: Observing Compilation Output and Performance](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Svelte · 14 Events and Resource Cleanup

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Component Contracts and Effects · External example · preview instructions · Storage ID: `svelte-02`

## Goals and learning outcomes

- After showing it again, one circle is drawn at the pointer position.
- Timer and listener handling stop after hiding.

## Prerequisites

Unit 14 continues with the work and experiment records from Unit 13.

## Key concepts and explanations

### Pointer Coordinates

Client coordinates are screen coordinates, which differ from Canvas buffer coordinates. Apply the getBoundingClientRect ratio to convert them to drawing positions.

### Resource Group

Clean up listeners, timers, and subscriptions created by the component together. Check that input handling and frames do not duplicate after showing it again.

## Practice setup

Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner. The existing svelte-02 preview is a starting point. Implement the expanded work described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Copy App.svelte and PointerCanvas.svelte from the existing src/labs/svelte-02 into src of the external project.
2. Check Canvas pointer coordinate conversion and timer/listener cleanup in onMount.
3. Show it 5 times, change the period from 100→500, and record active resource counts.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Show Count | 1 time | 5 times | Maintain 1 timer while visible and 0 while hidden. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After showing it again, one circle is drawn at the pointer position.
- [ ] Timer and listener handling stop after hiding.

## Self-check

1. How does unsubscribe in the built-in store adapter correspond to component cleanup?
2. What ratio does coordinate calculation need when you reduce only the CSS size?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount and tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## Linked example and execution scope

[Example source](../../../../../../src/labs/svelte-02/example.js) · [Runtime environments and limits](../../../../examples.md)

The preview uses an actual Svelte writable store and a DOM adapter. It does not include the Svelte component compiler. Run the .svelte files in the same example folder in a separate Svelte project to compare component lifecycles.

- [App.svelte](../../../../../../src/labs/svelte-02/App.svelte)
- [PointerCanvas.svelte](../../../../../../src/labs/svelte-02/PointerCanvas.svelte)
- [README.md (Korean original)](../../../../../../src/labs/svelte-02/README.md) · [English reading](../../../../../../src/labs/svelte-02/README.en.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: onMount and Initial Resources](../units/13/README.md) · [Next: writable and the Subscription Contract](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

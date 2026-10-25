# Svelte · 01 Compilation and Reactivity

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Compilation and Runes Basics · Editable example · Storage ID: `svelte-01`

## Goals and learning outcomes

- The list and total both change after a toggle.
- The record distinguishes the built-in adapter from execution of compiled .svelte components.

## Prerequisites

JavaScript objects·arrays·modules, HTML·CSS, running npm projects.

## Key concepts and explanations

### Compilation

Svelte compiles templates and reactive declarations in .svelte source. The built-in adapter connecting stores to the DOM is not a compiled component.

### runes

$state declares changing values, and $derived expresses values that can be calculated. Avoiding a separately stored completed count reduces inconsistencies between the list and its total.

## Practice setup

Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner. The existing svelte-01 preview is a starting point. Implement the expanded work described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/App.svelte of an external Svelte Vite project, declare 3 cards with $state.
2. Use $derived to calculate the incomplete filter results and completed count, and connect the buttons.
3. In notes/day01.md, distinguish the writable subscription in the built-in svelte-01 from the update path in an actual component.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Completion State | 0 completed | 1 completed | The total becomes 1, and the incomplete list contains 2 cards. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The list and total both change after a toggle.
- [ ] The record distinguishes the built-in adapter from execution of compiled .svelte components.

## Self-check

1. Is a rune an ordinary runtime function?
2. What would you misunderstand by assuming that a component function runs every time as in React?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## Linked example and execution scope

[Example source](../../../../../../src/labs/svelte-01/example.js) · [Runtime environments and limits](../../../../examples.md)

The preview uses an actual Svelte writable store and a DOM adapter. It does not include the Svelte component compiler.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Markup and Event Attributes](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

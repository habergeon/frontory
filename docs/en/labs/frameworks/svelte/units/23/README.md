# Svelte · 23 Style Scope and Accessibility

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Verification and Framework Comparison · External example · preview instructions · Storage ID: `svelte-step-23`

## Goals and learning outcomes

- Change completion state without a mouse.
- The focus position is visually distinguishable.

## Prerequisites

Unit 23 continues with the work and experiment records from Unit 22.

## Key concepts and explanations

### Style Scope

Svelte component styles are scoped to their markup. When using global rules, check their effects on other components.

### Keyboard Contract

Represent clickable items with native buttons. Read compiler accessibility warnings alongside actual keyboard checks.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Card.svelte, replace the clickable div with button and connect aria-pressed.
2. Add focus styling to the component CSS.
3. Use Tab·Enter·Space to select cards and toggle completion, and review warning output.

## Variables to observe

| Variable            | Baseline      | Change | Expected change / hypothesis                         |
| ------------------- | ------------- | ------ | ---------------------------------------------------- |
| Interactive Element | Clickable div | button | Native keyboard interaction and focus are available. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Change completion state without a mouse.
- [ ] The focus position is visually distinguishable.

## Self-check

1. What do you check before adding a comment that suppresses a warning?
2. Who might miss information if selection is expressed only through color?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-23/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Separating Canvas Loops from Reactivity](../22/README.md) · [Next: Checking Lifetimes During Transitions](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

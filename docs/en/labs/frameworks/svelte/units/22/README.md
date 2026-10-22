# Svelte · 22 Separating Canvas Loops from Reactivity

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Verification and Framework Comparison · External example · preview instructions · Storage ID: `svelte-step-22`

## Goals and learning outcomes

- The circle stops at speed 0.
- Changing speed does not recreate the Canvas.

## Prerequisites

Unit 22 continues with the work and experiment records from Unit 21.

## Key concepts and explanations

### Frame State

Coordinates and angles are values a render loop changes frequently. Keep them in local variables if they do not need to appear in the UI every frame.

### Time Calculation

Calculate movement by multiplying delta and speed. Capping large delta values reduces abrupt motion on returning to a tab, but changes the meaning of elapsed time.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Keep angle local in src/CanvasScene.svelte and pass only speed as a $state input.
2. Calculate delta from the RAF timestamp to move the circle.
3. Observe speed 0·1·2 and returning to the tab, then make a table of frame values and UI values.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| speed | 1 | 2 | Rotation over the same time becomes approximately twice as large. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The circle stops at speed 0.
- [ ] Changing speed does not recreate the Canvas.

## Self-check

1. When is it necessary to make the angle $state?
2. How do you explain time omitted by the delta cap?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount and tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-22/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Key Blocks and Draft Preservation](../21/README.md) · [Next: Style Scope and Accessibility](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

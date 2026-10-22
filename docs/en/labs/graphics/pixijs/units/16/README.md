# PixiJS · 16 Scene Transitions and State Preservation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Scene Composition, and Effects · Editable example · Storage ID: `pixijs-step-16`

## Goals and learning outcomes

- Preserve data positions when returning to a screen.
- Remove events and ticker callbacks from the screen you leave.

## Prerequisites

Prerequisite concepts: Meaning Beyond Pixels, Shared Commands. Prepare the output files and observation records from Unit 15.

## Key concepts and explanations

### Scene Boundaries

Grouping each screen in a Container makes transition boundaries clear. Separating data and display objects lets you restore user state even after recreating resources.

### Invalidating Asynchronous Work

Loading for a screen may finish after you leave it. Check a generation token to avoid attaching stale results.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-16.js and index.html in the external practice project. Build menu and editor screens with separate Containers and a data model.
2. Switch screens quickly, check requestId, and apply loading results only to the current screen.
3. Save the output with the input condition Current request first, then run again with Previous request finishes later. Expected: An older result does not add a Sprite to the new screen. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-16-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Completion order | Current request first | Previous request finishes later | An older result does not add a Sprite to the new screen |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Preserve data positions when returning to a screen.
- [ ] Remove events and ticker callbacks from the screen you leave.

## Self-check

1. Does removing a Container also mean its resources are released?
2. Is it safe to destroy an already cached resource because its result is stale?

## Official references

- [PixiJS 8 container](https://pixijs.com/8.x/guides/components/scene-objects/container)
- [PixiJS 8 assets](https://pixijs.com/8.x/guides/components/assets)
- [PixiJS 8 gc](https://pixijs.com/8.x/guides/concepts/garbage-collection)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Timers reproduce the completion order of asynchronous scenes. You can observe generation tokens without actual server loading.

- [example.js](../../../../../../../src/labs/pixijs-step-16/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Keyboard Input and Accessibility](../15/README.md) · [Next: Animation Frame Sequences](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

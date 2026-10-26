# PixiJS · 13 Dragging and Global Pointers

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ticker, Assets, and Pointer Input · Editable example · Storage ID: `pixijs-step-13`

## Goals and learning outcomes

- Keep dragging speed correct in a scaled group.
- End dragging even when the pointer is released outside the object.

## Prerequisites

Prerequisite concepts: Event Modes, Hit Areas. Prepare the output files and observation records from Unit 12.

## Key concepts and explanations

### Parent Coordinates

A Sprite's position uses its parent's local coordinates. Convert the global pointer with the parent's toLocal so movement remains correct in a scaled group.

### End Events

The pointer can be released outside the object. Handle pointerupoutside and cancellation paths so dragging does not remain active.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-13.js and index.html in the external practice project. Save the selected id and local offset on pointerdown.
2. Calculate position with the parent's toLocal in globalpointermove, and clear state on pointerup, pointerupoutside, and pointercancel.
3. Save the output with the input condition 1, then run again with 2. Expected: With correct conversion, the grabbed point stays under the pointer. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-13-notes.md.

## Variables to observe

| Variable     | Baseline | Change | Expected change / hypothesis                                       |
| ------------ | -------- | ------ | ------------------------------------------------------------------ |
| Parent scale | 1        | 2      | With correct conversion, the grabbed point stays under the pointer |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep dragging speed correct in a scaled group.
- [ ] End dragging even when the pointer is released outside the object.

## Self-check

1. How do v8 pointermove and globalpointermove differ in scope?
2. Which id should you track among multiple pointers?

## Official references

- [PixiJS 8 events](https://pixijs.com/8.x/guides/components/events)
- [PixiJS 8 container](https://pixijs.com/8.x/guides/components/scene-objects/container)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-13/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Event Modes and Hit Areas](../12/README.md) · [Next: Assets and Events](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

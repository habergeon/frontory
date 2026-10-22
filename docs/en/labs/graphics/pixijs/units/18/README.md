# PixiJS · 18 Masks and Scroll Regions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Scene Composition, and Effects · Editable example · Storage ID: `pixijs-step-18`

## Goals and learning outcomes

- Keep graphics within the mask.
- Define a clear selection policy for invisible cards.

## Prerequisites

Prerequisite concepts: Frame Order, Time-Based Indices. Prepare the output files and observation records from Unit 17.

## Key concepts and explanations

### Restricting Display

A mask restricts where an object is visible. It can show only part of the content without deleting data or child positions.

### Input Policy

Check input handling for hidden content too. Selecting offscreen objects can confuse users.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-18.js and index.html in the external practice project. Create a card-list Container with a Graphics rectangle as its mask.
2. Change the content y with a scroll input and inspect selection logs for hidden cards.
3. Save the output with the input condition 0, then run again with Halfway through the list. Expected: A different section of the same card data appears inside the mask. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-18-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Scroll position | 0 | Halfway through the list | A different section of the same card data appears inside the mask |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep graphics within the mask.
- [ ] Define a clear selection policy for invisible cards.

## Self-check

1. What coordinate relationship should the mask and content have?
2. Does the mask shape need to appear as an ordinary graphic?

## Official references

- [PixiJS 8 graphics](https://pixijs.com/8.x/guides/components/scene-objects/graphics)
- [PixiJS 8 container](https://pixijs.com/8.x/guides/components/scene-objects/container)
- [PixiJS 8 events](https://pixijs.com/8.x/guides/components/events)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-18/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Animation Frame Sequences](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

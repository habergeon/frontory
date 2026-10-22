# PixiJS · 20 Blend Modes and Order

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Scene Composition, and Effects · Editable example · Storage ID: `pixijs-step-20`

## Goals and learning outcomes

- Identify transparent objects whose order must be preserved.
- Explain blending results for different backgrounds.

## Prerequisites

Prerequisite concepts: Filter Passes, Group Effects. Prepare the output files and observation records from Unit 19.

## Key concepts and explanations

### Compositing Order

The result of translucent graphics depends on front-to-back order. Reordering them arbitrarily for batching can change the meaning of the image.

### Blending Rules

blendMode determines how colors combine with the background. add and multiply produce different brightness effects.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-20.js and index.html in the external practice project. Build a comparison showing normal,add,multiply on overlapping Sprites.
2. Change the background color and child order, and capture the overlapping regions.
3. Save the output with the input condition normal, then run again with add. Expected: Overlapping regions may become brighter. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-20-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| blendMode | normal | add | Overlapping regions may become brighter |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Identify transparent objects whose order must be preserved.
- [ ] Explain blending results for different backgrounds.

## Self-check

1. Why does add look different on black and white backgrounds?
2. Under what conditions can you reorder objects for batching?

## Official references

- [PixiJS 8 filters](https://pixijs.com/8.x/guides/components/filters)
- [PixiJS 8 container](https://pixijs.com/8.x/guides/components/scene-objects/container)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-20/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Filters and Their Scope](../19/README.md) · [Next: Caching Static UI](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# PixiJS · 21 Caching Static UI

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Scene Composition, and Effects · Editable example · Storage ID: `pixijs-step-21`

## Goals and learning outcomes

- Reproduce a stale cache.
- Separate dynamic text and static decoration appropriately.

## Prerequisites

Prerequisite concepts: Compositing Order, Blending Rules. Prepare the output files and observation records from Unit 20.

## Key concepts and explanations

### Texture Caching

cacheAsTexture turns a container's graphics into a reusable texture. It can help with static decoration but needs additional memory.

### Explicit Updates

When child content changes, refresh the cache with updateCacheTexture. Do not assume that enabling caching automatically reflects every change.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-21.js and index.html in the external practice project. Apply cacheAsTexture() to a Container with a complex card background.
2. Edit a label, compare before and after refreshing, and connect updateCacheTexture to the change event.
3. Save the output with the input condition No refresh call, then run again with Call when content changes. Expected: New content appears instead of the stale label. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-21-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Cache refresh | No refresh call | Call when content changes | New content appears instead of the stale label |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Reproduce a stale cache.
- [ ] Separate dynamic text and static decoration appropriately.

## Self-check

1. What benefit remains if the cache is refreshed every frame?
2. What determines the sharpness of an enlarged cache?

## Official references

- [PixiJS 8 cache](https://pixijs.com/8.x/guides/components/scene-objects/container/cache-as-texture)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-21/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Blend Modes and Order](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# PixiJS · 14 Assets and Events

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Ticker, Assets, and Pointer Input · Editable example · Storage ID: `pixijs-02`

## Goals and learning outcomes

- Keep the UI available through failure and reruns.
- Keep sibling Sprites sharing the texture intact after removing the selected object.

## Prerequisites

Prerequisite concepts: Parent Coordinates, End Events. Prepare the output files and observation records from Unit 13.

## Key concepts and explanations

### Errors and the Existing Scene

A failed new atlas load does not have to clear the current scene. Replacing it after validated new resources are ready makes recovery easier.

### Shared Texture Lifetimes

Removing a Sprite differs from releasing a TextureSource. Do not destroy a source that other Sprites are using.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all the extended requirements. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-14.js and index.html in the external practice project. Read the existing pixijs-02 local atlas example and build its failure, retry, and selected-item deletion UI in the external project.
2. Remove only the selected Sprite with destroy({texture:false,textureSource:false}) and check that sibling Sprites still display correctly.
3. Save the output with the input condition Valid atlas, then run again with Invalid atlas with no frames. Expected: Existing Sprites remain, and error and retry controls appear. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-14-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Loading input | Valid atlas | Invalid atlas with no frames | Existing Sprites remain, and error and retry controls appear |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep the UI available through failure and reruns.
- [ ] Keep sibling Sprites sharing the texture intact after removing the selected object.

## Self-check

1. Who owns the source: the Sprite or the atlas?
2. How do you handle an older load that finishes after a newer request?

## Official references

- [PixiJS 8 assets](https://pixijs.com/8.x/guides/components/assets)
- [PixiJS 8 events](https://pixijs.com/8.x/guides/components/events)
- [PixiJS 8 gc](https://pixijs.com/8.x/guides/concepts/garbage-collection)

## Linked example and execution scope

[Example source](../../../../../../src/labs/pixijs-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Uses a generated atlas and simulated loading failures. It does not request an external Assets server.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Dragging and Global Pointers](../units/13/README.md) · [Next: Keyboard Input and Accessibility](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

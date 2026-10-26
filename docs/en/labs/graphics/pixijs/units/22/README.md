# PixiJS · 22 Releasing Textures and Owning Caches

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Ownership, Large-Scale Rendering, and Measurement · Editable example · Storage ID: `pixijs-step-22`

## Goals and learning outcomes

- Do not destroy textures used by another scene.
- Distinguish directly created TextureSources from Assets resources.

## Prerequisites

Prerequisite concepts: Texture Caching, Explicit Updates. Prepare the output files and observation records from Unit 21.

## Key concepts and explanations

### Resource Layers

Sprite, Texture, and TextureSource are different objects. Removing a frame Texture can leave the shared source in use elsewhere.

### Assets Ownership

Resources managed by Assets can be cleaned up with unload after use ends. First check that users in other scenes have also finished.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-22.js and index.html in the external practice project. Create two Containers using a shared atlas and keep a ledger of user counts.
2. Clean up only Sprites when one screen ends, and call Assets.unload after the last user ends.
3. Save the output with the input condition 2 screens, then run again with 0 screens. Expected: Release the shared atlas only when its last user finishes. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-22-notes.md.

## Variables to observe

| Variable   | Baseline  | Change    | Expected change / hypothesis                              |
| ---------- | --------- | --------- | --------------------------------------------------------- |
| User count | 2 screens | 0 screens | Release the shared atlas only when its last user finishes |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Do not destroy textures used by another scene.
- [ ] Distinguish directly created TextureSources from Assets resources.

## Self-check

1. How does Texture.destroy(true) affect sibling frames?
2. Why is explicit ownership needed even with automatic GC?

## Official references

- [PixiJS 8 gc](https://pixijs.com/8.x/guides/concepts/garbage-collection)
- [PixiJS 8 assets](https://pixijs.com/8.x/guides/components/assets)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Experiments with the reference lifetimes of directly owned frame Textures and TextureSources. See day 10 for the Assets.unload example.

- [example.js](../../../../../../../src/labs/pixijs-step-22/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Caching Static UI](../21/README.md) · [Next: Large Particle Sets and Feature Boundaries](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

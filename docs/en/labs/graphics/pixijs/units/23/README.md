# PixiJS · 23 Large Particle Sets and Feature Boundaries

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Ownership, Large-Scale Rendering, and Measurement · Editable example · Storage ID: `pixijs-step-23`

## Goals and learning outcomes

- Record feature differences between Sprite and Particle.
- Record the installed version and documentation version for experimental APIs.

## Prerequisites

Prerequisite concepts: Resource Layers, Assets Ownership. Prepare the output files and observation records from Unit 22.

## Key concepts and explanations

### Lightweight Particles

v8 ParticleContainer is a separate lightweight path containing Particles. Do not expect the same children, events, and filter features as ordinary Sprites.

### Dynamic Properties

dynamicProperties can specify only the properties that change. Static property or list changes may require update.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-23.js and index.html in the external practice project. Check the Particle API for the installed 8.x version, then create particles sharing one texture with ParticleContainer and addParticle.
2. Make only position dynamic, move particles, and compare a static color change before and after container.update().
3. Save the output with the input condition Static, then run again with Dynamic. Expected: The update path and upload scope differ when rotation changes every frame. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-23-notes.md.

## Variables to observe

| Variable         | Baseline | Change  | Expected change / hypothesis                                              |
| ---------------- | -------- | ------- | ------------------------------------------------------------------------- |
| rotation setting | Static   | Dynamic | The update path and upload scope differ when rotation changes every frame |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record feature differences between Sprite and Particle.
- [ ] Record the installed version and documentation version for experimental APIs.

## Self-check

1. Which method replaces addChild?
2. How would you design interaction if each particle needed clicks?

## Official references

- [PixiJS 8 particles](https://pixijs.com/8.x/guides/components/scene-objects/particle-container)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-23/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Releasing Textures and Owning Caches](../22/README.md) · [Next: Offscreen Handling and Fewer Updates](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

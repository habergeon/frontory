# PixiJS · 24 Offscreen Handling and Fewer Updates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Ownership, Large-Scale Rendering, and Measurement · Editable example · Storage ID: `pixijs-step-24`

## Goals and learning outcomes

- Show objects at the correct position when they return onscreen.
- Record display and simulation policies separately.

## Prerequisites

Prerequisite concepts: Lightweight Particles, Dynamic Properties. Prepare the output files and observation records from Unit 23.

## Key concepts and explanations

### Visibility and Computation

An application's update loop can continue updating objects outside the screen. Skipping display and skipping simulation are separate policies.

### Visibility Bounds

Calculating bounds also costs time. In a simple scene, culling checks may cost more than they save, so comparison is needed.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-24.js and index.html in the external practice project. Compare screen boundaries with Sprite bounds to classify objects for display.
2. Keep movement data and compare hiding only the display with stopping updates too.
3. Save the output with the input condition 10%, then run again with 90%. Expected: Skipping display may have a larger effect, but the cost of checks must also be measured. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-24-notes.md.

## Variables to observe

| Variable             | Baseline | Change | Expected change / hypothesis                                                            |
| -------------------- | -------- | ------ | --------------------------------------------------------------------------------------- |
| Offscreen proportion | 10%      | 90%    | Skipping display may have a larger effect, but the cost of checks must also be measured |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Show objects at the correct position when they return onscreen.
- [ ] Record display and simulation policies separately.

## Self-check

1. Is visible=false the same as stopping the application's update?
2. How can you avoid missing fast-moving objects in boundary checks?

## Official references

- [PixiJS 8 perf](https://pixijs.com/8.x/guides/concepts/performance-tips)
- [PixiJS 8 container](https://pixijs.com/8.x/guides/components/scene-objects/container)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-24/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Large Particle Sets and Feature Boundaries](../23/README.md) · [Next: Forming a Batching Hypothesis](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

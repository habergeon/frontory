# PixiJS · 11 Atlases and Frames

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ticker, Assets, and Pointer Input · Editable example · Storage ID: `pixijs-step-11`

## Goals and learning outcomes

- Match frame names to the images on screen.
- Find frames that extend beyond the source dimensions.

## Prerequisites

Prerequisite concepts: Cached Resources, Error States. Prepare the output files and observation records from Unit 10.

## Key concepts and explanations

### Shared Sources

Multiple Textures in an atlas can refer to parts of the same TextureSource. Frame count and GPU source count are different concepts.

### Frame Rectangles

frame is a region in the source image. Incorrect bounds can show another image or an empty region.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-11.js and index.html in the external practice project. Load a local atlas PNG and JSON with Assets.load and print the frame names.
2. Create Sprites from two frames and compare references to check whether they share one source.
3. Save the output with the input condition First region, then run again with Second region. Expected: Only the displayed region changes while the source remains shared. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-11-notes.md.

## Variables to observe

| Variable | Baseline     | Change        | Expected change / hypothesis                                      |
| -------- | ------------ | ------------- | ----------------------------------------------------------------- |
| Frame    | First region | Second region | Only the displayed region changes while the source remains shared |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Match frame names to the images on screen.
- [ ] Find frames that extend beyond the source dimensions.

## Self-check

1. Does an atlas always guarantee one draw call?
2. Why is the original size information of a trimmed frame needed?

## Official references

- [PixiJS 8 assets](https://pixijs.com/8.x/guides/components/assets)
- [PixiJS 8 sprite](https://pixijs.com/8.x/guides/components/scene-objects/sprite)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-11/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Asynchronous Asset Loading](../10/README.md) · [Next: Event Modes and Hit Areas](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# PixiJS · 02 Sprites and Anchors

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Application, Coordinates, and Display Objects · Editable example · Storage ID: `pixijs-step-02`

## Goals and learning outcomes

- Distinguish anchors from positions.
- Move Sprites sharing a texture independently.

## Prerequisites

Prerequisite concepts: Asynchronous Initialization, Parent Containers. Prepare the output files and observation records from Unit 1.

## Key concepts and explanations

### Texture Representation

A Sprite is a display object combining a Texture and a transform. Multiple Sprites can use the same Texture.

### Anchors

anchor is a normalized reference point relative to the texture size. Do not confuse it with pivot, which uses local pixels.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-02.js and index.html in the external practice project. Load a local image with Assets.load and create three Sprites.
2. Set anchor to 0,0.5,1, rotate at the same position, and mark the reference point.
3. Save the output with the input condition 0,0, then run again with 0.5,0.5. Expected: position points to the center of the image instead of its upper-left corner. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-02-notes.md.

## Variables to observe

| Variable | Baseline | Change  | Expected change / hypothesis                                                |
| -------- | -------- | ------- | --------------------------------------------------------------------------- |
| anchor   | 0,0      | 0.5,0.5 | position points to the center of the image instead of its upper-left corner |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish anchors from positions.
- [ ] Move Sprites sharing a texture independently.

## Self-check

1. Does changing anchor also change the position value?
2. How do pivot and anchor differ when the size changes?

## Official references

- [PixiJS 8 sprite](https://pixijs.com/8.x/guides/components/scene-objects/sprite)
- [PixiJS 8 assets](https://pixijs.com/8.x/guides/components/assets)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-02/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Application and Scene Graph](../../01-foundations/README.md) · [Next: Containers and Local Coordinates](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

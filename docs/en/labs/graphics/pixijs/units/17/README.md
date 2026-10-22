# PixiJS · 17 Animation Frame Sequences

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Scene Composition, and Effects · Editable example · Storage ID: `pixijs-step-17`

## Goals and learning outcomes

- Specify frame order explicitly.
- Resume at the same frame after pausing.

## Prerequisites

Prerequisite concepts: Scene Boundaries, Invalidating Asynchronous Work. Prepare the output files and observation records from Unit 16.

## Key concepts and explanations

### Frame Order

Sorting atlas frame names does not guarantee playback order. Manage the order with an explicit array.

### Time-Based Indices

Accumulated time and fps can determine the frame index. Incrementing it by rendered frame count makes playback speed depend on the environment.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-17.js and index.html in the external practice project. Create an atlas frame array and accumulated seconds, and replace Sprite.texture using floor(time*fps).
2. Add play, pause, and loop inputs, and implement a mode that stops at the last frame.
3. Save the output with the input condition 6, then run again with 12. Expected: The same frame array cycles twice as fast. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-17-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| fps | 6 | 12 | The same frame array cycles twice as fast |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Specify frame order explicitly.
- [ ] Resume at the same frame after pausing.

## Self-check

1. Where does number 10 appear when filenames are sorted as strings?
2. What policy is needed when a long dt skips multiple frames?

## Official references

- [PixiJS 8 ticker](https://pixijs.com/8.x/guides/components/ticker)
- [PixiJS 8 sprite](https://pixijs.com/8.x/guides/components/scene-objects/sprite)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-17/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scene Transitions and State Preservation](../16/README.md) · [Next: Masks and Scroll Regions](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

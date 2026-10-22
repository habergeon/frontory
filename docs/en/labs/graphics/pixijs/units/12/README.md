# PixiJS · 12 Event Modes and Hit Areas

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ticker, Assets, and Pointer Input · Editable example · Storage ID: `pixijs-step-12`

## Goals and learning outcomes

- Distinguish noninteractive decoration from buttons.
- Show the hit area as a debug overlay.

## Prerequisites

Prerequisite concepts: Shared Sources, Frame Rectangles. Prepare the output files and observation records from Unit 11.

## Key concepts and explanations

### Event Modes

eventMode determines how an object handles interaction. Use static for clickable static objects to make the intent clear.

### Hit Areas

hitArea can define an input region different from the visual bounds. Even a small icon can have a sufficiently large selection area.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-12.js and index.html in the external practice project. Connect eventMode='static' and pointertap to a Sprite.
2. Add a Rectangle hitArea and compare selection logs for clicks outside and inside the boundary.
3. Save the output with the input condition Image size, then run again with Expand 10px in each direction. Expected: The selection region grows without changing the visible size. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-12-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| hitArea | Image size | Expand 10px in each direction | The selection region grows without changing the visible size |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish noninteractive decoration from buttons.
- [ ] Show the hit area as a debug overlay.

## Self-check

1. When should static and dynamic be used differently?
2. Does the parent's eventMode affect traversal of its children?

## Official references

- [PixiJS 8 events](https://pixijs.com/8.x/guides/components/events)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-12/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Atlases and Frames](../11/README.md) · [Next: Dragging and Global Pointers](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# PixiJS · 07 Responsive Screens and Resolution

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Application, Coordinates, and Display Objects · Editable example · Storage ID: `pixijs-step-07`

## Goals and learning outcomes

- Keep the Sprite centered after resizing.
- Display logical size and buffer size separately.

## Prerequisites

Prerequisite concepts: Child Order, zIndex Sorting. Prepare the output files and observation records from Unit 6.

## Key concepts and explanations

### Logical Size

app.screen represents the renderer's logical screen size. resolution controls the pixel density of the buffer.

### CSS Density

autoDensity helps align resolution and CSS size. After setting a high resolution, check that input coordinates still use the same logical space.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-07.js and index.html in the external practice project. Set resizeTo:container,autoDensity:true and resolution in app.init.
2. Change the container width and print app.screen, the canvas buffer size, and the Sprite's center position.
3. Save the output with the input condition 1, then run again with 2. Expected: The logical size stays the same and the buffer has four times as many pixels. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-07-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| resolution | 1 | 2 | The logical size stays the same and the buffer has four times as many pixels |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep the Sprite centered after resizing.
- [ ] Display logical size and buffer size separately.

## Self-check

1. Are resolution and devicePixelRatio always the same?
2. What mismatch can occur if you force a separate CSS size?

## Official references

- [PixiJS 8 app](https://pixijs.com/8.x/guides/components/application)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-07/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Layers and Drawing Order](../06/README.md) · [Next: Ticker and Time Units](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

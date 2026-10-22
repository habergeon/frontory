# PixiJS · 05 Text and Style Updates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Application, Coordinates, and Display Objects · Editable example · Storage ID: `pixijs-step-05`

## Goals and learning outcomes

- Skip repeated assignments of the same value.
- Keep long text within the specified area.

## Prerequisites

Prerequisite concepts: Style After Geometry, Object Transforms. Prepare the output files and observation records from Unit 4.

## Key concepts and explanations

### Creating Text

v8 Text can be configured with an options object containing text and style. Font and size affect text measurement and visual quality.

### Update Costs

Changing a string may also update the text rendering resources. Avoid assigning the same content again every frame.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-05.js and index.html in the external practice project. Create a scoreboard with new Text({text:'점수 0',style:{fontSize:24,fill:...}}).
2. Update text only when the score changes and compare line wrapping for a long Korean string.
3. Save the output with the input condition Every frame, then run again with When the value changes. Expected: Unnecessary text update requests decrease. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-05-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Update frequency | Every frame | When the value changes | Unnecessary text update requests decrease |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Skip repeated assignments of the same value.
- [ ] Keep long text within the specified area.

## Self-check

1. Why can enlarged text look blurry?
2. When would you consider BitmapText?

## Official references

- [PixiJS 8 text](https://pixijs.com/8.x/guides/components/scene-objects/text)
- [PixiJS 8 perf](https://pixijs.com/8.x/guides/concepts/performance-tips)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-05/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Graphics 8 Shape API](../04/README.md) · [Next: Layers and Drawing Order](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

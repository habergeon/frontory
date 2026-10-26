# SVG · 09 Gradient Coordinates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Styles, Effects, and DOM Input · Editable example · Storage ID: `svg-step-09`

## Goals and learning outcomes

- Compare the results of the two coordinate systems.
- Adjust coordinate values when changing units.

## Prerequisites

Prerequisite concepts: Cascade, Inherited color. Prepare the result files and observation records from Unit 8.

## Key concepts and explanations

### Bounding box units

objectBoundingBox uses the shape's bounding box as its reference. The same definition may look different depending on the shape's proportions.

### User space

userSpaceOnUse defines a gradient in user coordinates. It can create a continuous color band across several shapes.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-09.js and index.html in an external practice project. Create linearGradient in defs and apply it to rectangles of different widths.
2. Switch gradientUnits and adjust the start and end coordinates together.
3. Save the output under the input condition objectBoundingBox, then run again with userSpaceOnUse. Compare the hypothesis, "Color bands that stretched per shape align to common coordinates," against the display and logs, and record the actual result and the causes of any differences in day-09-notes.md.

## Variables to observe

| Variable      | Baseline          | Change         | Expected change / hypothesis                                     |
| ------------- | ----------------- | -------------- | ---------------------------------------------------------------- |
| gradientUnits | objectBoundingBox | userSpaceOnUse | Color bands that stretched per shape align to common coordinates |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Compare the results of the two coordinate systems.
- [ ] Adjust coordinate values when changing units.

## Self-check

1. What problem does the bounding box of a shape with width 0 have?
2. Which units would you use to connect one lighting effect across several shapes?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-09/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Styles and Themes](../08/README.md) · [Next: Clips and Masks](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# SVG · 02 Basic Shapes and Attributes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Vector Paths and Coordinates · Editable example · Storage ID: `svg-step-02`

## Goals and learning outcomes

- Change stroke and fill independently.
- Check clipping of thick strokes.

## Prerequisites

Prerequisite concepts: User coordinates, Preserving proportions. Prepare the result files and observation records from Unit 1.

## Key concepts and explanations

### Geometry attributes

The x,y,width,height of rect determine the shape's position and size. Distinguish their roles from CSS layout properties.

### Fill and stroke

fill paints the interior and stroke draws the outline. Setting fill to none can still leave the stroke visible.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-02.js and index.html in an external practice project. Arrange rect,circle,ellipse with different fill and stroke values.
2. Change radius and stroke-width through an input form, and display the actual attribute values in output.
3. Save the output under the input condition 1, then run again with 12. Compare the hypothesis, "The outline becomes thicker on both sides of the shape boundary," against the display and logs, and record the actual result and the causes of any differences in day-02-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| stroke-width | 1 | 12 | The outline becomes thicker on both sides of the shape boundary |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Change stroke and fill independently.
- [ ] Check clipping of thick strokes.

## Self-check

1. Why is stroke also drawn outside the shape?
2. Do a transparent fill and none behave the same for input?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-02/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: viewBox and Vectors](../../01-foundations/README.md) · [Next: Path Commands and Closing Paths](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

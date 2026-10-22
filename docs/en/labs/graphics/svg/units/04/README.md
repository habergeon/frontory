# SVG · 04 Adjusting Bézier Curves

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Vector Paths and Coordinates · Editable example · Storage ID: `svg-step-04`

## Goals and learning outcomes

- Distinguish guide points from the actual curve.
- Explain how moving a control point affects the tangent.

## Prerequisites

Prerequisite concepts: Absolute and relative coordinates, Closing a path. Prepare the result files and observation records from Unit 3.

## Key concepts and explanations

### Control points

Q is a quadratic curve with one control point. The curve usually does not pass through the control point itself.

### Tangents

The two control points of C affect the tangent directions at the start and end. Aligning directions at a join can reduce kinks in the curve.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-04.js and index.html in an external practice project. Create Q and C paths and mark their control points with small circle elements and guide lines.
2. Change the control point y with a slider and update the path's d attribute.
3. Save the output under the input condition 20, then run again with 120. Compare the hypothesis, "The curve's bend direction and height change," against the display and logs, and record the actual result and the causes of any differences in day-04-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Control point y | 20 | 120 | The curve's bend direction and height change |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish guide points from the actual curve.
- [ ] Explain how moving a control point affects the tangent.

## Self-check

1. Why does the curve not pass through the control point?
2. Which points should you align to join two curves smoothly?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-04/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Path Commands and Closing Paths](../03/README.md) · [Next: Arcs and Donut Segments](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

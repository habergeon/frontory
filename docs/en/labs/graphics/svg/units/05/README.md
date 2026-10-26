# SVG · 05 Arcs and Donut Segments

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Vector Paths and Coordinates · Editable example · Storage ID: `svg-step-05`

## Goals and learning outcomes

- Draw proportions greater than half correctly.
- Handle the boundary cases of 0 and 100.

## Prerequisites

Prerequisite concepts: Control points, Tangents. Prepare the result files and observation records from Unit 4.

## Key concepts and explanations

### Arc flags

The A command selects an elliptical arc using radii and two flags. The same endpoints can have a large arc or a small arc.

### Angle data

Convert a proportion to an angle, then calculate coordinates on the circle. A full circle needs a separate path construction because its start and end coincide.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-05.js and index.html in an external practice project. Calculate two points on a circle with sin and cos, and create a progress arc with the A command.
2. Handle 0%,50%,99%,100% inputs separately and display the large arc flag.
3. Save the output under the input condition 25%, then run again with 75%. Compare the hypothesis, "You need to change large-arc-flag to select the longer arc," against the display and logs, and record the actual result and the causes of any differences in day-05-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                               |
| -------- | -------- | ------ | ---------------------------------------------------------- |
| Progress | 25%      | 75%    | You need to change large-arc-flag to select the longer arc |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Draw proportions greater than half correctly.
- [ ] Handle the boundary cases of 0 and 100.

## Self-check

1. What does sweep-flag change?
2. Why is one arc with the same start and end insufficient?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-05/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Adjusting Bézier Curves](../04/README.md) · [Next: Groups and Transform Order](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# SVG · 03 Path Commands and Closing Paths

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Vector Paths and Coordinates · Editable example · Storage ID: `svg-step-03`

## Goals and learning outcomes

- Create the same arrow with both command styles.
- Distinguish closed paths from open paths.

## Prerequisites

Prerequisite concepts: Geometry attributes, Fill and stroke. Prepare the result files and observation records from Unit 2.

## Key concepts and explanations

### Absolute and relative coordinates

Uppercase path commands use absolute coordinates. Lowercase commands move relative to the current point.

### Closing a path

Z connects back to the starting point and closes the path. The line join can differ from manually placing the last point at the start.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-03.js and index.html in an external practice project. Write an arrow path with M,L,H,V,Z and overlay circles at its vertices.
2. Rewrite the same shape with relative commands and move the starting point.
3. Save the output under the input condition 20,20, then run again with 80,20. Compare the hypothesis, "The shape made with relative commands moves while preserving its overall form," against the display and logs, and record the actual result and the causes of any differences in day-03-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Starting point | 20,20 | 80,20 | The shape made with relative commands moves while preserving its overall form |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Create the same arrow with both command styles.
- [ ] Distinguish closed paths from open paths.

## Self-check

1. When is the current point updated in relative commands?
2. What happens to fill and stroke respectively if you omit Z?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-03/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Basic Shapes and Attributes](../02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

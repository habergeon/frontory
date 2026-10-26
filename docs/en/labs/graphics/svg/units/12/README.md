# SVG · 12 Text and Data Labels

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Styles, Effects, and DOM Input · Editable example · Storage ID: `svg-step-12`

## Goals and learning outcomes

- Labels are associated with their data points.
- The same data is available in a readable table.

## Prerequisites

Prerequisite concepts: Filter graph, Filter boundaries. Prepare the result files and observation records from Unit 11.

## Key concepts and explanations

### Text placement

text-anchor sets alignment relative to the x coordinate. It lets you align labels with data points even when string widths differ.

### Alternative information

Text in a graphic may not explain all of a complex dataset. Adding a table or description lets people explore the information in another way.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-12.js and index.html in an external practice project. Display node names and values using text and tspan.
2. Enter long names, adjust overlapping label positions, and output the same data as an HTML table.
3. Save the output under the input condition Short name, then run again with Long Korean name. Compare the hypothesis, "Fixed spacing causes overlap and requires a layout policy," against the display and logs, and record the actual result and the causes of any differences in day-12-notes.md.

## Variables to observe

| Variable     | Baseline   | Change           | Expected change / hypothesis                              |
| ------------ | ---------- | ---------------- | --------------------------------------------------------- |
| Label length | Short name | Long Korean name | Fixed spacing causes overlap and requires a layout policy |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Labels are associated with their data points.
- [ ] The same data is available in a readable table.

## Self-check

1. Are text-anchor and CSS text-align the same?
2. How can you resolve overlap besides reducing the font size?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)
- [MDN SVG title Accessible Name](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-12/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Filter Regions and Cost](../11/README.md) · [Next: Screen Coordinates to SVG](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

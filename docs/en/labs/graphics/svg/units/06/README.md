# SVG · 06 Groups and Transform Order

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Vector Paths and Coordinates · Editable example · Storage ID: `svg-step-06`

## Goals and learning outcomes

- Internal layout remains intact when moving the group.
- Visually mark the rotation center.

## Prerequisites

Prerequisite concepts: Arc flags, Angle data. Prepare the result files and observation records from Unit 5.

## Key concepts and explanations

### Group transforms

A g transform applies to its children together. You can place icons in multiple positions while preserving their internal coordinates.

### Matrix order

Translation and rotation are sensitive to order. Specifying the rotation center reduces unintended orbiting.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-06.js and index.html in an external practice project. Create a needle and center point inside g, and rotate them with transform.
2. Compare nested translation and rotation groups with a version using a single transform.
3. Save the output under the input condition 0,0, then run again with 100,100. Compare the hypothesis, "The reference point around which the needle rotates changes," against the display and logs, and record the actual result and the causes of any differences in day-06-notes.md.

## Variables to observe

| Variable        | Baseline | Change  | Expected change / hypothesis                                |
| --------------- | -------- | ------- | ----------------------------------------------------------- |
| Rotation center | 0,0      | 100,100 | The reference point around which the needle rotates changes |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Internal layout remains intact when moving the group.
- [ ] Visually mark the rotation center.

## Self-check

1. How are parent and child transforms combined?
2. How can you verify the order of a transform string?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-06/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Arcs and Donut Segments](../05/README.md) · [Next: Symbols and Reuse](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

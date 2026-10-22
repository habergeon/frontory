# SVG · 01 viewBox and Vectors

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Vector Paths and Coordinates · Editable example · Storage ID: `svg-01`

## Goals and learning outcomes

- Distinguish internal coordinates from screen size.
- Explain differences in position and thickness when resizing.

## Prerequisites

You should be able to work with JavaScript functions and arrays, DOM events, and coordinates.

## Key concepts and explanations

### User coordinates

viewBox defines the internal coordinate range. Changing the screen size does not change the shape data itself.

### Preserving proportions

preserveAspectRatio determines how the internal rectangle fits the viewport. meet and slice produce different padding or clipping.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all the extended requirements. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-01.js and index.html in an external practice project. Create a 300×150 badge in inline svg using rect,circle,path.
2. Change viewBox and preserveAspectRatio with a select, and display the screen size and internal coordinates.
3. Save the output under the input condition 0 0 300 150, then run again with 0 0 600 300. Compare the hypothesis, "Shapes at the same coordinates appear smaller on screen," against the display and logs, and record the actual result and the causes of any differences in day-01-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| viewBox | 0 0 300 150 | 0 0 600 300 | Shapes at the same coordinates appear smaller on screen |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish internal coordinates from screen size.
- [ ] Explain differences in position and thickness when resizing.

## Self-check

1. Does changing viewBox also change the path data?
2. Which can clip a shape, meet or slice?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../src/labs/svg-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Basic Shapes and Attributes](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

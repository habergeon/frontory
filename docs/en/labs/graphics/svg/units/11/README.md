# SVG · 11 Filter Regions and Cost

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Styles, Effects, and DOM Input · Editable example · Storage ID: `svg-step-11`

## Goals and learning outcomes

- Resolve clipped shadows by setting the region.
- Record blur extent and visual quality.

## Prerequisites

Prerequisite concepts: Clipping, Mask intensity. Prepare the result files and observation records from Unit 10.

## Key concepts and explanations

### Filter graph

Filter primitives receive an input image and pass it on as output. Connecting the wrong input processes a previous effect instead of the original.

### Filter boundaries

Blur spreads beyond the shape. A narrow filter region may clip the edges.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-11.js and index.html in an external practice project. Connect feGaussianBlur and feOffset in a filter to create a shadow.
2. Adjust stdDeviation and filter x,y,width,height, and save the results before and after clipping.
3. Save the output under the input condition 2, then run again with 12. Compare the hypothesis, "The shadow spreads and may be clipped outside the existing filter region," against the display and logs, and record the actual result and the causes of any differences in day-11-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| stdDeviation | 2 | 12 | The shadow spreads and may be clipped outside the existing filter region |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Resolve clipped shadows by setting the region.
- [ ] Record blur extent and visual quality.

## Self-check

1. How does SourceGraphic differ from a previous result?
2. Why does a large filter region affect cost?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-11/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Clips and Masks](../10/README.md) · [Next: Text and Data Labels](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

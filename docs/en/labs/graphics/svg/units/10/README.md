# SVG · 10 Clips and Masks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Styles, Effects, and DOM Input · Editable example · Storage ID: `svg-step-10`

## Goals and learning outcomes

- Explain clip and mask results side by side.
- Check clipping outside the mask region.

## Prerequisites

Prerequisite concepts: Bounding box units, User space. Prepare the result files and observation records from Unit 9.

## Key concepts and explanations

### Clipping

clipPath restricts the visible geometric region. It suits cutting at a boundary.

### Mask intensity

mask controls visibility with alpha or luminance. It produces different results from simple clipping when creating soft boundaries.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-10.js and index.html in an external practice project. Clip an image with a circular clipPath to create an avatar.
2. Put a gradient in a separate mask so the same image gradually fades out.
3. Save the output under the input condition Solid white, then run again with White-to-black gradient. Compare the hypothesis, "Visibility gradually decreases with a luminance mask," against the display and logs, and record the actual result and the causes of any differences in day-10-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Mask | Solid white | White-to-black gradient | Visibility gradually decreases with a luminance mask |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Explain clip and mask results side by side.
- [ ] Check clipping outside the mask region.

## Self-check

1. How does changing mask-type change the meaning of black?
2. Does making clipPath translucent turn it into a soft mask?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-10/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Gradient Coordinates](../09/README.md) · [Next: Filter Regions and Cost](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

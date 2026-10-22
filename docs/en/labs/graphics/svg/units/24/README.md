# SVG · 24 Visible Regions and Level of Detail

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Export and Large-Scale Comparisons · Editable example · Storage ID: `svg-step-24`

## Goals and learning outcomes

- Hidden labels return after zooming in.
- Selected data remains after visibility optimization.

## Prerequisites

Prerequisite concepts: DOM size, Measurement interval. Prepare the result files and observation records from Unit 23.

## Key concepts and explanations

### Visible region

Omitting invisible nodes can reduce the work set. A policy is needed to avoid losing semantic information about selected nodes too.

### Level of detail

You can reduce labels or decoration according to zoom level. Reducing presentation differs from deleting the data itself.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-24.js and index.html in an external practice project. Calculate visible nodes from the current viewBox and node bounds.
2. Hide labels when zoomed out, but keep the HTML list and selection description.
3. Save the output under the input condition 1, then run again with 0.2. Compare the hypothesis, "Reducing labels may ease overlap and reduce DOM work," against the display and logs, and record the actual result and the causes of any differences in day-24-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Scale | 1 | 0.2 | Reducing labels may ease overlap and reduce DOM work |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Hidden labels return after zooming in.
- [ ] Selected data remains after visibility optimization.

## Self-check

1. What should happen if an off-screen node has keyboard focus?
2. How do you determine bounds for shapes with filters or thick strokes?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)
- [MDN SVG title Accessible Name](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-24/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Large Datasets and Update Cost](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

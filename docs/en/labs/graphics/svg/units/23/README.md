# SVG · 23 Large Datasets and Update Cost

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Export and Large-Scale Comparisons · Editable example · Storage ID: `svg-step-23`

## Goals and learning outcomes

- Separate data generation time from DOM update time.
- Record the environment and sample conditions.

## Prerequisites

Prerequisite concepts: Serialization, Standalone resources. Prepare the result files and observation records from Unit 22.

## Key concepts and explanations

### DOM size

Each SVG node is subject to style, event, and layout work. Include labels and filters in comparison conditions as well as point count.

### Measurement interval

A synchronous interval measured with performance.now alone cannot tell you when the display is complete. Also inspect style and rendering work in the profile.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-23.js and index.html in an external practice project. Generate 100,1000,5000 points with a fixed seed.
2. Record generation and attribute update times separately from the next frame interval, and keep filters disabled.
3. Save the output under the input condition 100, then run again with 5000. Compare the hypothesis, "DOM creation and style update workloads may increase," against the display and logs, and record the actual result and the causes of any differences in day-23-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Point count | 100 | 5000 | DOM creation and style update workloads may increase |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Separate data generation time from DOM update time.
- [ ] Record the environment and sample conditions.

## Self-check

1. Which cost changes when you reduce event listener count?
2. Why should data generation time be excluded?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-23/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Exporting SVG Files](../22/README.md) · [Next: Visible Regions and Level of Detail](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

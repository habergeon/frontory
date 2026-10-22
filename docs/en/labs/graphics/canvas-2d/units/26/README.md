# Canvas 2D · 26 Frame Measurement and Bottlenecks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Particles, and Performance Verification · Editable example · Storage ID: `canvas-2d-step-26`

## Goals and learning outcomes

- Record measurement conditions and sample counts.
- Do not treat CPU measurements as GPU time.

## Prerequisites

Prerequisite concepts: Object Reuse, Separating Measurements. Prepare the result files and observation records from Unit 25.

## Key concepts and explanations

### Time Distribution

Averages alone miss occasional long frames. Considering the median and frequency of long frames together makes stuttering easier to explain.

### Measuring Sections

JavaScript time measured with performance.now does not represent total GPU time. Separate update and draw call sections and compare them with browser profiles.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-26.js and index.html in the external practice project. Collect frame intervals and update and draw call times in arrays.
2. After warming up, save samples of the same length and calculate the median and 95th percentile.
3. Save the output with the input condition 500, then run again with 2000. Expected: You can distinguish whether the update or drawing section increases. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-26-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Particle Count | 500 | 2000 | You can distinguish whether the update or drawing section increases |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record measurement conditions and sample counts.
- [ ] Do not treat CPU measurements as GPU time.

## Self-check

1. Why might you exclude the first frame?
2. When do percentiles and averages give different impressions?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-26/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Particle Reuse and Allocation](../25/README.md) · [Next: Integrated Editor and Regression Checks](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

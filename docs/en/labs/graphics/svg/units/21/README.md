# SVG · 21 Animation and Reduced Motion

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility and Data Maps · Editable example · Storage ID: `svg-step-21`

## Goals and learning outcomes

- Information remains even with animation disabled.
- Clean up previous frame requests when transitions overlap.

## Prerequisites

Prerequisite concepts: Derived paths, Layer order. Prepare the result files and observation records from Unit 20.

## Key concepts and explanations

### Interpolation

Calculating between start and end values using a time ratio can smooth movement. Using frame count makes speed depend on refresh rate.

### Motion preference

prefers-reduced-motion signals a preference for less unnecessary movement. State changes must also be communicated without animation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-21.js and index.html in an external practice project. Interpolate the node transform using requestAnimationFrame time.
2. Detect reduced motion with matchMedia and add a path that applies the final state immediately.
3. Save the output under the input condition Normal, then run again with reduced-motion. Compare the hypothesis, "The final layout and selection state appear without intermediate movement," against the display and logs, and record the actual result and the causes of any differences in day-21-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Motion setting | Normal | reduced-motion | The final layout and selection state appear without intermediate movement |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Information remains even with animation disabled.
- [ ] Clean up previous frame requests when transitions overlap.

## Self-check

1. What should the starting value be if a new target arrives mid-transition?
2. Which should be reduced, flashing or movement?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-21/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Connectors and Graph Layout](../20/README.md) · [Next: Exporting SVG Files](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

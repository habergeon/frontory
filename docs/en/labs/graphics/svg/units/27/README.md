# SVG · 27 Reproducible Comparison Experiments

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Export and Large-Scale Comparisons · Editable example · Storage ID: `svg-step-27`

## Goals and learning outcomes

- Provide a comparison table with matching features and input conditions.
- State the measurement scope and what you could not verify.

## Prerequisites

Prerequisite concepts: State consistency, Recoverability. Prepare the result files and observation records from Unit 26.

## Key concepts and explanations

### Comparison contract

Point count, size, color, and input features must match to interpret renderer differences. If only one renderer has labels or filters, record this as a separate condition.

### Recording distributions

The distribution of multiple samples is more useful than a single timing value. Separate initial creation and continuous zooming into different scenarios.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-27.js and index.html in an external practice project. Replay initial creation and zoom/selection scenarios in an automated sequence with the same data.
2. Collect browser profiles and frame intervals, and tabulate medians, long frames, and DOM counts.
3. Save the output under the input condition 1000 points, then run again with 5000 points. Compare the hypothesis, "Costs may grow differently for each renderer," against the display and logs, and record the actual result and the causes of any differences in day-27-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Scene size | 1000 points | 5000 points | Costs may grow differently for each renderer |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Provide a comparison table with matching features and input conditions.
- [ ] State the measurement scope and what you could not verify.

## Self-check

1. Does faster initial creation mean faster interaction too?
2. Why must you fix the position used for selection tests?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)
- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-27/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Integrating the Map Editor](../26/README.md) · [Next: Comparing with Canvas](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

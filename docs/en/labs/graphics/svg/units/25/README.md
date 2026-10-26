# SVG · 25 Canvas Comparison Renderer

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Export and Large-Scale Comparisons · Editable example · Storage ID: `svg-step-25`

## Goals and learning outcomes

- Point coordinates and selected ids match on both displays.
- Share an accessible HTML list between both renderers.

## Prerequisites

Prerequisite concepts: Visible region, Level of detail. Prepare the result files and observation records from Unit 24.

## Key concepts and explanations

### Shared data

Renderers must use the same data and coordinate transforms for a fair comparison. Different random distributions also change performance and selection conditions.

### Implementing selection

SVG provides DOM targets, whereas Canvas needs separate hit testing. Match functionality to compare implementation costs.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-25.js and index.html in an external practice project. Draw the same point array with SVG circle and Canvas arc respectively.
2. Pass the same zoom and selection state to both renderers, and implement distance-based hit testing for Canvas.
3. Save the output under the input condition SVG, then run again with Canvas 2D. Compare the hypothesis, "Responsibility for implementing selection and the DOM count differ," against the display and logs, and record the actual result and the causes of any differences in day-25-notes.md.

## Variables to observe

| Variable | Baseline | Change    | Expected change / hypothesis                                       |
| -------- | -------- | --------- | ------------------------------------------------------------------ |
| Renderer | SVG      | Canvas 2D | Responsibility for implementing selection and the DOM count differ |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Point coordinates and selected ids match on both displays.
- [ ] Share an accessible HTML list between both renderers.

## Self-check

1. What do you miss if you compare drawing alone?
2. In which coordinates do you define the selection tolerance radius for Canvas?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)
- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-25/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Visible Regions and Level of Detail](../24/README.md) · [Next: Integrating the Map Editor](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

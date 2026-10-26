# SVG · 16 Pointer Event Regions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility and Data Maps · Editable example · Storage ID: `svg-step-16`

## Goals and learning outcomes

- Select a connector near its stroke as well.
- Handle label clicks with the correct group id too.

## Prerequisites

Prerequisite concepts: Linking names, Distinguishing decoration. Prepare the result files and observation records from Unit 15.

## Key concepts and explanations

### Paint and input

pointer-events determines which regions receive events. Thin visible strokes may also have narrow selection regions that are difficult to operate.

### Bubbling

Child events propagate to the parent. For group-level selection, distinguish target from currentTarget.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-16.js and index.html in an external practice project. Add a thick transparent hit path over a thin connector.
2. Receive events on the parent g and log the ids of target and currentTarget.
3. Save the output under the input condition 2px, then run again with 16px. Compare the hypothesis, "The operable region widens while the visible stroke stays the same," against the display and logs, and record the actual result and the causes of any differences in day-16-notes.md.

## Variables to observe

| Variable        | Baseline | Change | Expected change / hypothesis                                       |
| --------------- | -------- | ------ | ------------------------------------------------------------------ |
| Selection width | 2px      | 16px   | The operable region widens while the visible stroke stays the same |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Select a connector near its stroke as well.
- [ ] Handle label clicks with the correct group id too.

## Self-check

1. Which pointer-events setting does a transparent stroke need?
2. What becomes difficult if you overuse stopPropagation?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-16/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Accessible Names and Descriptions](../15/README.md) · [Next: Dragging and Capture](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

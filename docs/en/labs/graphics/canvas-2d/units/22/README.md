# Canvas 2D · 22 Accessible Canvas Controls

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Particles, and Performance Verification · Editable example · Storage ID: `canvas-2d-step-22`

## Goals and learning outcomes

- Selection, movement, and deletion are possible using only the keyboard.
- Convey selection state through text as well as color.

## Prerequisites

Prerequisite concepts: Observation Target, Resolution Budget. Prepare the result files and observation records from Unit 21.

## Key concepts and explanations

### Alternative Representation

Canvas pixels contain no shape semantics. Provide an HTML list and descriptions so selection targets and state can be read.

### Shared Commands

When pointer and keyboard inputs call the same command functions, their results match. Update text state as well as visually highlighting selection.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-22.js and index.html in the external practice project. Add an HTML button list for shapes and an output for selection state.
2. Connect button clicks and arrow-key movement to selectItem and moveItem.
3. Save the output with the input condition pointer, then run again with keyboard only. Expected: The same id is selected, and the same movement commands are applied. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-22-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input Method | pointer | keyboard only | The same id is selected, and the same movement commands are applied |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Selection, movement, and deletion are possible using only the keyboard.
- [ ] Convey selection state through text as well as color.

## Self-check

1. Does an aria-label on canvas alone describe individual shapes?
2. How frequently should repeated position announcements be delivered?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-22/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: High Resolution and Responsive Layout](../21/README.md) · [Next: Exporting and Source Data](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

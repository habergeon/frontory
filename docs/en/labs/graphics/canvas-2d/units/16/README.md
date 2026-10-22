# Canvas 2D · 16 Undo and History

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Editing and Compositing · Editable example · Storage ID: `canvas-2d-step-16`

## Goals and learning outcomes

- Movement and deletion are each undone in a single step.
- Later changes do not alter earlier snapshots.

## Prerequisites

Prerequisite concepts: Source Data, Pure Drawing. Prepare the result files and observation records from Unit 15.

## Key concepts and explanations

### Snapshots

Undo restores an earlier data state. Saving only references can let later changes affect past states too.

### Command Boundaries

Recording every move during a drag makes undo require too many steps. You can group the start and end as one user action.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-16.js and index.html in the external practice project. Save the scene before changes in history with structuredClone, and connect an undo button.
2. Record only when dragging ends; perform deletion and movement in succession, then restore them in reverse order.
3. Save the output with the input condition every pointermove, then run again with pointerup. Expected: One drag is reverted with one undo. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-16-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Recording Time | every pointermove | pointerup | One drag is reverted with one undo |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Movement and deletion are each undone in a single step.
- [ ] Later changes do not alter earlier snapshots.

## Self-check

1. What happens to redo when you perform a new action after undo?
2. Should large image data be copied too?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-16/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scene Data and Redrawing](../15/README.md) · [Next: Making an Eraser with Compositing](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# PixiJS · 15 Keyboard Input and Accessibility

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Scene Composition, and Effects · Editable example · Storage ID: `pixijs-step-15`

## Goals and learning outcomes

- Support selection, movement, and deletion without a mouse.
- Provide the selected name and errors as text.

## Prerequisites

Prerequisite concepts: Errors and the Existing Scene, Shared Texture Lifetimes. Prepare the output files and observation records from Unit 14.

## Key concepts and explanations

### Meaning Beyond Pixels

A rendered Sprite does not automatically become an HTML button. Connect names and controls through an accessibility extension or separate DOM controls.

### Shared Commands

Keyboard and pointer behavior stays consistent when both call the same selectItem. A text selection status is needed in addition to visual tint.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-15.js and index.html in the external practice project. Connect Sprite ids and names to a list of HTML buttons.
2. Connect Tab·Enter selection and arrow-key movement to shared command functions, updating the visual highlight and description.
3. Save the output with the input condition Pointer, then run again with Keyboard. Expected: The same Sprite can be selected and its position changed. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-15-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input | Pointer | Keyboard | The same Sprite can be selected and its position changed |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Support selection, movement, and deletion without a mouse.
- [ ] Provide the selected name and errors as text.

## Self-check

1. Does giving the canvas one name also describe individual objects?
2. How would you reduce the focus sequence for hundreds of objects?

## Official references

- [PixiJS 8 a11y](https://pixijs.com/8.x/guides/components/accessibility)
- [PixiJS 8 events](https://pixijs.com/8.x/guides/components/events)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-15/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Assets and Events](../../02-experiments/README.md) · [Next: Scene Transitions and State Preservation](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

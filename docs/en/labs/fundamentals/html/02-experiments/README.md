# HTML · 14 Forms and the Keyboard

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Tables and Form Inputs · Editable example · Storage ID: `html-02`

## Goals and learning outcomes

- Save a valid title using only Tab and Enter.
- Check the failing field’s name and description in the accessibility tree.

## Prerequisites

The work and experiment records from Unit 13, “Grouped Inputs and Selection Semantics”.

## Key concepts and explanations

### Input Names

label provides an input’s name. A placeholder disappears after input and cannot replace a label.

### Constraints and Descriptions

required and length constraints perform basic validation. Associate error descriptions with the relevant input to explain the cause.

## Practice setup

Frontory’s existing preview is a limited starting example, not a completed version of the whole assignment. Implement additional files and features yourself in a separate local project. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In keyboard-form.html, prepare an empty value, a short title, and a valid title.
2. Add required·minlength·aria-describedby to the note-title input and save form, and write error guidance.
3. Run with an empty value, a short title, and a valid title. Results to check: Save a valid title using only Tab and Enter. Check the failing field’s name and description in the accessibility tree. Record expected and actual results separately.

## Variables to observe

| Variable     | Baseline     | Change      | Expected change / hypothesis                                                                                                                           |
| ------------ | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Title Length | 5 characters | 1 character | Pre-run hypothesis: The minlength constraint will block submission. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Save a valid title using only Tab and Enter.
- [ ] Check the failing field’s name and description in the accessibility tree.

## Self-check

1. Can you identify the input after typing if only a placeholder remains?
2. Where should focus be when an error occurs?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)

## Linked example and execution scope

[Example source](../../../../../../src/labs/html-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Grouped Inputs and Selection Semantics](../units/13/README.md) · [Next: The Difference Between disabled and readonly](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

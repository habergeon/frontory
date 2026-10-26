# JavaScript · 21 FormData and Domain Validation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and data boundaries · Editable example · Storage ID: `javascript-step-21`

## Goals and learning outcomes

- A whitespace-only title is not added to the list.
- Record 2 pairs of collected entries for checked and unchecked states.

## Prerequisites

The work and experiment records from Unit 20, “URL Filters and Back Navigation”

## Key concepts and explanations

### Collecting Form Values

FormData collects values from successful controls with a name. Unchecked items and disabled inputs may be omitted.

### Product Rules

Native constraints differ from the product's input rules. A whitespace-only title needs separate normalization and validation.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In form.js, prepare a whitespace-only title, an unchecked checkbox, and a disabled field.
2. Read FormData on submit, validate the title and minutes, then add the note.
3. Run with a whitespace-only title, an unchecked checkbox, and a disabled field. Results to check: A whitespace-only title is not added to the list. Record 2 pairs of collected entries for checked and unchecked states. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change    | Expected change / hypothesis                                                                                                                                          |
| -------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Checkbox | Checked  | Unchecked | Hypothesis before running: The corresponding key will be absent from FormData. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] A whitespace-only title is not added to the list.
- [ ] Record 2 pairs of collected entries for checked and unchecked states.

## Self-check

1. What is omitted when name is missing?
2. Does client-side validation replace server-side validation?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: URL Filters and Back Navigation](../20/README.md) · [Next: Exporting JSON with Blob](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

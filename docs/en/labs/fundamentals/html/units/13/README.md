# HTML · 13 Grouped Inputs and Selection Semantics

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tables and Form Inputs · Editable example · Storage ID: `html-step-13`

## Goals and learning outcomes

- Only one radio input can be selected in the appropriate group.
- Check the two submitted values when two checkbox inputs are selected.

## Prerequisites

The work and experiment records from Unit 12, “Input Types and Autocomplete”.

## Key concepts and explanations

### Group Names

fieldset and legend convey the name of a group of related inputs. Put questions that individual labels cannot adequately express at the group level.

### Selection Rules

Radio inputs with the same name allow one selection within a group. Checkbox inputs express multiple independent selections.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In choices.html, prepare 3 difficulty levels and 3 topics.
2. Separate difficulty radio inputs and topic-of-interest checkbox inputs into fieldset elements.
3. Run with 3 difficulty levels and 3 topics. Results to check: Only one radio input can be selected in the appropriate group. Check the two submitted values when two checkbox inputs are selected. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| radio name | All use level | A different name for each | Pre-run hypothesis: Multiple radio inputs will be selected at the same time. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Only one radio input can be selected in the appropriate group.
- [ ] Check the two submitted values when two checkbox inputs are selected.

## Self-check

1. How do legend and label divide information?
2. How do you read multiple values with the same name?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable input with actual browser execution results. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Input Types and Autocomplete](../12/README.md) · [Next: Forms and the Keyboard](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

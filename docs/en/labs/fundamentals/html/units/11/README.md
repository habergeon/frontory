# HTML · 11 The Form Submission Contract

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tables and Form Inputs · Editable example · Storage ID: `html-step-11`

## Goals and learning outcomes

- The q value appears in the URL after a search.
- The auxiliary button does not submit the form unintentionally.

## Prerequisites

The work and experiment records from Unit 10, “Quotations and Machine-readable Dates”.

## Key concepts and explanations

### Form Ownership

form groups inputs and submission actions. A button without a type may become a submit button inside a form.

### Submission Names

name becomes a key in the submitted data. id is used for associations such as labels and does not replace name.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In form-basics.html, prepare a q input and search/reset actions.
2. Build a GET search form with a labeled, named input and submit·button buttons.
3. Run with a q input and search/reset actions. Results to check: The q value appears in the URL after a search. The auxiliary button does not submit the form unintentionally. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Button type | button | submit | Pre-run hypothesis: Clicking will submit the form. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The q value appears in the URL after a search.
- [ ] The auxiliary button does not submit the form unintentionally.

## Self-check

1. Is an input with only id submitted?
2. How do the purposes of GET and POST differ?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

Submitting navigates inside the iframe. The inspect button displays FormData from the current source before submission. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Quotations and Machine-readable Dates](../10/README.md) · [Next: Input Types and Autocomplete](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

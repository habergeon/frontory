# HTML · 12 Input Types and Autocomplete

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tables and Form Inputs · Editable example · Storage ID: `html-step-12`

## Goals and learning outcomes

- Each of the three fields has the corresponding label association and name.
- Compare the validity of valid and invalid email addresses.

## Prerequisites

The work and experiment records from Unit 11, “The Form Submission Contract”.

## Key concepts and explanations

### Input Semantics

type affects native UI and validation rules. Do not make a phone number a number input merely because it looks numeric.

### Autocomplete

autocomplete tokens convey an input’s purpose. They should reduce typing effort while matching the field’s actual meaning.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In input-types.html, prepare inputs for email, phone number, and study minutes.
2. Create email·tel·number inputs with appropriate autocomplete·inputmode attributes.
3. Run with inputs for email, phone number, and study minutes. Results to check: Each of the three fields has the corresponding label association and name. Compare the validity of valid and invalid email addresses. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Email type | text | email | Pre-run hypothesis: An invalid email format will produce a constraint error. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Each of the three fields has the corresponding label association and name.
- [ ] Compare the validity of valid and invalid email addresses.

## Self-check

1. Does inputmode perform input validation?
2. Is the leading 0 of a phone number preserved?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable input with actual browser execution results. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: The Form Submission Contract](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

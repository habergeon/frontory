# HTML · 10 Quotations and Machine-readable Dates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tables and Form Inputs · Editable example · Storage ID: `html-step-10`

## Goals and learning outcomes

- Distinguish the quotation’s extent from the source link.
- The displayed date and datetime refer to the same date.

## Prerequisites

The work and experiment records from Unit 9, “Table Row and Column Relationships”.

## Key concepts and explanations

### Marking Quotations

blockquote and q indicate the extent of a quotation. Use the cite element for a work’s title, and do not confuse it with naming a person.

### Representing Dates

The datetime attribute of time provides a machine-readable value. The visible local format can differ from the standard value.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In quotes.html, prepare 1 quotation and the date 2026-10-21.
2. Add a short quotation and source link, and display the learning date with time.
3. Run with 1 quotation and the date 2026-10-21. Results to check: Distinguish the quotation’s extent from the source link. The displayed date and datetime refer to the same date. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| datetime | Valid date | Natural-language sentence | Pre-run hypothesis: The value will become unsuitable for machine reading. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish the quotation’s extent from the source link.
- [ ] The displayed date and datetime refer to the same date.

## Self-check

1. Do the cite attribute and cite element serve the same role?
2. Can you put a natural-language date directly in datetime?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Change datetime to a natural-language value, then compare the inspection result with an HTML validator. The quotation is an example sentence. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Table Row and Column Relationships](../09/README.md) · [Next: The Form Submission Contract](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

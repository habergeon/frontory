# HTML · 09 Table Row and Column Relationships

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tables and Form Inputs · Editable example · Storage ID: `html-step-09`

## Goals and learning outcomes

- Check which headers each value in the 3 rows belongs to.
- State the table’s purpose and units in caption.

## Prerequisites

The work and experiment records from Unit 8, “figure and Combined Descriptions”.

## Key concepts and explanations

### Data Tables

Use table for data with row and column relationships. Using it for page layout disrupts reading relationships.

### Header Associations

th and scope express the direction of a cell’s headers. Complex tables may require additional associations such as headers and id.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In table.html, prepare 3 experiment rows and 2 columns for time and memory.
2. Build an experiment results table using caption·thead·tbody and row/column th elements.
3. Run with 3 experiment rows and 2 columns for time and memory. Results to check: Check which headers each value in the 3 rows belongs to. State the table’s purpose and units in caption. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Header Element | td | th scope | Pre-run hypothesis: The relationship between cells and headers will be conveyed more clearly. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check which headers each value in the 3 rows belongs to.
- [ ] State the table’s purpose and units in caption.

## Self-check

1. Does this data actually require a table?
2. Which associations should you check as merged cells become more numerous?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable input with actual browser execution results. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: figure and Combined Descriptions](../08/README.md) · [Next: Quotations and Machine-readable Dates](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

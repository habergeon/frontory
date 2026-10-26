# HTML · 24 Accessible Names and Descriptions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility Review and Card Integration · Editable example · Storage ID: `html-step-24`

## Goals and learning outcomes

- Record the names and descriptions of the three controls in a table.
- After correction, the text save button’s visible wording matches its accessible name.

## Prerequisites

The work and experiment records from Unit 23, “Script Loading and Document Parsing”.

## Key concepts and explanations

### Name Computation

An accessible name identifies a control. A mismatch between a visible label and aria-label can confuse users.

### Description Associations

aria-describedby associates additional descriptions. Do not use it to replace a name.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In names.html, prepare a button with visible save text, a × delete button named for its purpose, and an input with a label and description.
2. Check names and descriptions for three types of controls—a text button, an icon button, and an input—in the accessibility panel.
3. Record the text save button’s accessible name, add a different aria-label, and record the mismatch. Remove aria-label or match it to the visible text, then inspect again. Preserve the × delete button’s purpose name and the input’s name and description.

## Variables to observe

| Variable         | Baseline         | Change               | Expected change / hypothesis                                                                                                                                 |
| ---------------- | ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Naming Attribute | Use visible text | Different aria-label | Pre-run hypothesis: The accessible name may differ from the visible text. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the names and descriptions of the three controls in a table.
- [ ] After correction, the text save button’s visible wording matches its accessible name.

## Self-check

1. Is aria-label always necessary?
2. What burden can an overly long description place on users?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Change aria-label to differ from the visible text, and inspect the actual computed name in the browser accessibility panel. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Script Loading and Document Parsing](../23/README.md) · [Next: Reading Order and Skip Links](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

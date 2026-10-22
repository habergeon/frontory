# HTML · 22 template and Repeated Content

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility Review and Card Integration · Editable example · Storage ID: `html-step-22`

## Goals and learning outcomes

- 3 cards are displayed with no duplicate ids.
- Clicking each label focuses the input in the corresponding card.

## Prerequisites

The work and experiment records from Unit 21, “iframe and Embedded Content Boundaries”.

## Key concepts and explanations

### Inert Templates

Content inside template is not displayed immediately. You can clone its content and insert it into the document.

### Duplicate Identifiers

Leaving the same id on cloned nodes makes associations ambiguous. Update label and description ids together as well.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In template.html, prepare 3 cards and an input label for each card.
2. Create a learning-card template, clone it 3 times with minimal JS, and update ids and association attributes.
3. Run with 3 cards and an input label for each card. Results to check: 3 cards are displayed with no duplicate ids. Clicking each label focuses the input in the corresponding card. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Cloned id | Keep the same id | Unique suffix | Pre-run hypothesis: Each label will refer to its own input. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] 3 cards are displayed with no duplicate ids.
- [ ] Clicking each label focuses the input in the corresponding card.

## Self-check

1. Is template content initially in the accessibility tree?
2. Which reference attributes also need updating when cloning?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Helper code clones the template 3 times and associates for/id with unique suffixes. Try changing the template content in the source. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: iframe and Embedded Content Boundaries](../21/README.md) · [Next: Script Loading and Document Parsing](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# HTML · 02 Document Skeleton and Character Encoding

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Document Meaning and Content · Editable example · Storage ID: `html-step-02`

## Goals and learning outcomes

- Check that document.compatMode is CSS1Compat.
- Check the Korean body text and tab title, and record the encoding value.

## Prerequisites

The work and experiment records from Unit 1, “Meaning and Document Structure”.

## Key concepts and explanations

### Document Mode

DOCTYPE tells the browser to interpret the document in standards mode. Omitting it may trigger quirks mode.

### Characters and Language

charset specifies how characters are interpreted, while lang identifies the document language. These attributes address different issues.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In document.html, prepare a Korean title and an English quotation.
2. Write DOCTYPE·html lang·head·body and a UTF-8 declaration, and display the title and Korean text.
3. Run with a Korean title and an English quotation. Results to check: Check that document.compatMode is CSS1Compat. Check the Korean body text and tab title, and record the encoding value. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| lang | ko | en | Pre-run hypothesis: Assistive technology may interpret the language differently. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check that document.compatMode is CSS1Compat.
- [ ] Check the Korean body text and tab title, and record the encoding value.

## Self-check

1. How do lang and charset differ?
2. Is DOCTYPE a regular HTML element?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

Change lang to en and check the accessibility language. The HTML string is already Unicode, so test actual HTTP charset misencoding with a separate file. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Meaning and Document Structure](../../01-foundations/README.md) · [Next: Metadata and Document Titles](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

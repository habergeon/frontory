# HTML · 03 Metadata and Document Titles

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Document Meaning and Content · Editable example · Storage ID: `html-step-03`

## Goals and learning outcomes

- The tab titles of the two pages are distinguishable.
- Record the screen width before and after applying the settings in mobile emulation.

## Prerequisites

The work and experiment records from Unit 2, “Document Skeleton and Character Encoding”.

## Key concepts and explanations

### Tab Title

title identifies the document in tabs and browsing history. It need not match the visible h1, but their purposes should be related.

### Viewport

The viewport meta tag affects mobile layout viewport settings. Settings that prevent zooming can interfere with reading.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In head.html, prepare two files: a list page and a detail page.
2. Write a unique title and description, and set width=device-width·initial-scale=1.
3. Run with two files: a list page and a detail page. Results to check: The tab titles of the two pages are distinguishable. Record the screen width before and after applying the settings in mobile emulation. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| viewport | No declaration | Basic mobile declaration | Pre-run hypothesis: The layout width on a narrow screen will be closer to the intended width. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The tab titles of the two pages are distinguishable.
- [ ] Record the screen width before and after applying the settings in mobile emulation.

## Self-check

1. Is description always used in search results?
2. Who is affected by settings that prevent zooming?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

Inspect the document title and meta. Check mobile viewport effects on a standalone page and an actual mobile device. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Document Skeleton and Character Encoding](../02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

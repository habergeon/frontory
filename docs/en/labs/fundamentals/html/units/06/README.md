# HTML · 06 Link Paths and In-page Navigation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Document Meaning and Content · Editable example · Storage ID: `html-step-06`

## Goals and learning outcomes

- The three table-of-contents links navigate to different headings.
- Distinguish successful and failing paths in the Network panel.

## Prerequisites

The work and experiment records from Unit 5, “Lists and Term Descriptions”.

## Key concepts and explanations

### Path Resolution

A relative URL is resolved against the current document’s base URL. Moving a folder can change the destination of the same string.

### Fragments

A link pointing to an id navigates to a location within the document. Duplicate ids make the destination ambiguous.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In links/index.html, prepare a detail page in a subfolder and 3 sections.
2. Create a detail-page link and #section links in the table of contents, and describe each destination in its link text.
3. Run with a detail page in a subfolder and 3 sections. Results to check: The three table-of-contents links navigate to different headings. Distinguish successful and failing paths in the Network panel. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Relative Path | ./detail.html | ../detail.html | Pre-run hypothesis: The request location will move to the parent folder. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The three table-of-contents links navigate to different headings.
- [ ] Distinguish successful and failing paths in the Network panel.

## Self-check

1. What problems arise if the link text only says “here”?
2. How can you find duplicate ids?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

The inspection results in this preview show the original href attributes from the current DOM. The base element in head is not copied into Shadow DOM. Check absolute URL resolution with base in a separate HTTP document. Actual documents at example.test are not provided. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, and the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Lists and Term Descriptions](../05/README.md) · [Next: Images and Alternative Text](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

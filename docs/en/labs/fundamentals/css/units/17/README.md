# CSS · 17 Typography and Line Length

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State, positioning, and accessibility · Editable example · Storage ID: `css-step-17`

## Goals and learning outcomes

- Record the computed line heights for both settings and the total body text height.
- Text lines and controls do not overlap at 200% zoom.

## Prerequisites

The work and experiment records from Unit 16, “Logical Properties and Writing Direction”

## Key concepts and explanations

### Line Height

A unitless line-height is computed in proportion to font size. It makes it easier to retain the ratio even when a child's font size differs.

### Reading Width

Line length is determined by the combination of font size and container width. Long body text may need a different maximum width from card titles.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with long Korean text and long English words, and connect type.css.
2. Apply max-width and unitless line-height to body text, and compare headings, body text, and supporting text.
3. Run with long Korean text and long English words. Results to check: Record the computed line heights for both settings and the total body text height. Text lines and controls do not overlap at 200% zoom. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| line-height | 1.2 | 1.7 | Hypothesis before running: The space between lines of body text will increase. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the computed line heights for both settings and the total body text height.
- [ ] Text lines and controls do not overlap at 200% zoom.

## Self-check

1. What problems arise when inheriting a line-height in px?
2. Should Korean and English use the same line-breaking policy?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Logical Properties and Writing Direction](../16/README.md) · [Next: Color and Contrast](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

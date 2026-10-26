# CSS · 18 Color and Contrast

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State, positioning, and accessibility · Editable example · Storage ID: `css-step-18`

## Goals and learning outcomes

- Verify a contrast target of at least 4.5:1 for normal body text.
- Indicators distinguish errors and selection without relying on color.

## Prerequisites

The work and experiment records from Unit 17, “Typography and Line Length”

## Key concepts and explanations

### Contrast Relationships

Text color must be evaluated together with its background color. The same color can be difficult to read on a different background.

### Communicating State

Color alone may not convey enough information about errors or selection. Also provide indicators such as text, icons, or borders.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with light and dark backgrounds, and connect colors.css.
2. Choose colors for default, selected, and error cards, and check text contrast in developer tools.
3. Run with light and dark backgrounds. Results to check: Verify a contrast target of at least 4.5:1 for normal body text. Indicators distinguish errors and selection without relying on color. Record expected and actual results separately.

## Variables to observe

| Variable   | Baseline | Change    | Expected change / hypothesis                                                                                                                                       |
| ---------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Background | White    | Dark gray | Hypothesis before running: The contrast of the same text color will change. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Verify a contrast target of at least 4.5:1 for normal body text.
- [ ] Indicators distinguish errors and selection without relying on color.

## Self-check

1. Against which background should a translucent color be measured?
2. Are the criteria for large text and normal body text the same?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

Inspect actual text contrast in developer tools. Check marks and error text are provided in addition to color. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Typography and Line Length](../17/README.md) · [Next: Focus and Input States](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

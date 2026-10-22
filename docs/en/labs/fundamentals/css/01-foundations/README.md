# CSS · 01 Cascade and Layout

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Cascade and size calculations · Editable example · Storage ID: `css-01`

## Goals and learning outcomes

- Explain the causes of overflow in both layout methods using computed values.
- Card titles and controls are not clipped at 360px.

## Prerequisites

HTML structure

## Key concepts and explanations

### Declaration Selection

The cascade selects declarations using rules such as origin, importance, layers, and specificity. Use computed values in developer tools to check why a declaration actually applies.

### Layout Models

Grid handles relationships between rows and columns, while Flex handles item placement along one axis. An item's minimum size can cause long text to overflow.

## Practice setup

Frontory's existing preview is a limited starter example, not a complete solution to the assignment. Implement additional files and features yourself in a separate local project. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with cards with long titles and 360px·1000px containers, and connect layout.css.
2. Arrange the same 6 cards using Grid and Flex, and check the results before and after min-width:0 and the winning declarations.
3. Run with cards with long titles and 360px·1000px containers. Results to check: Explain the causes of overflow in both layout methods using computed values. Card titles and controls are not clipped at 360px. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Minimum Width | auto | 0 | Hypothesis before running: Items may shrink and reduce horizontal overflow. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Explain the causes of overflow in both layout methods using computed values.
- [ ] Card titles and controls are not clipped at 360px.

## Self-check

1. Can min-width constrain layout more than width?
2. Why was the winning declaration selected?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../src/labs/css-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Selectors and Specificity](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

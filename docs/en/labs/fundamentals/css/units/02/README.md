# CSS · 02 Selectors and Specificity

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Cascade and size calculations · Editable example · Storage ID: `css-step-02`

## Goals and learning outcomes

- Record the number of matches for each selector.
- Explain why one of two conflicting declarations wins using specificity.

## Prerequisites

The work and experiment records from Unit 1, “Cascade and Layout”

## Key concepts and explanations

### Selector Scope

Selectors find the elements to style. Descendant and child combinators select different scopes.

### Specificity

Under the same cascade conditions, specificity contributes to declaration selection. Repeated use of !important can make later adjustments difficult.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 2 nested buttons and 1 outside button, and connect selectors.css.
2. Apply descendant, child, and class selectors to buttons inside and outside a card, and compare their matches.
3. Run with 2 nested buttons and 1 outside button. Results to check: Record the number of matches for each selector. Explain why one of two conflicting declarations wins using specificity. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Combinator | Whitespace | Direct-child symbol | Hypothesis before running: Some nested buttons will no longer be selected. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the number of matches for each selector.
- [ ] Explain why one of two conflicting declarations wins using specificity.

## Self-check

1. Is an id selector needed here?
2. Under what cascade conditions can a declaration lose despite higher specificity?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Cascade and Layout](../../01-foundations/README.md) · [Next: Inheritance and Resetting](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

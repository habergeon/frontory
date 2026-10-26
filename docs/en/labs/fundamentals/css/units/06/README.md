# CSS · 06 Normal Flow and Margin Collapsing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Cascade and size calculations · Editable example · Storage ID: `css-step-06`

## Goals and learning outcomes

- Measure the spacing between siblings and the position of the parent boundary separately.
- Explain a case where margins are not added together.

## Prerequisites

The work and experiment records from Unit 5, “Units and Fluid Font Sizes”

## Key concepts and explanations

### Normal Flow

Block elements stack in document flow. Following elements move according to content height even without positioning.

### Margin Collapsing

The vertical margins of some blocks can collapse. Whether they collapse also changes with the layout context.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 2 paragraphs and a parent with a background, and connect flow.css.
2. Set consecutive paragraph margins to 20px and 30px, and compare the parent before and after applying flow-root.
3. Run with 2 paragraphs and a parent with a background. Results to check: Measure the spacing between siblings and the position of the parent boundary separately. Explain a case where margins are not added together. Record expected and actual results separately.

## Variables to observe

| Variable       | Baseline | Change    | Expected change / hypothesis                                                                                                                                                 |
| -------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parent Display | block    | flow-root | Hypothesis before running: Margin collapsing between the parent and child may change. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Measure the spacing between siblings and the position of the parent boundary separately.
- [ ] Explain a case where margins are not added together.

## Self-check

1. Do sibling and parent-child margin collapsing have the same conditions?
2. How do the margins of an empty element appear?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

Setting flow-root on the parent prevents parent/child margin collapsing, but collapsing between sibling paragraphs remains unchanged. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Units and Fluid Font Sizes](../05/README.md) · [Next: Size Constraints and overflow](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

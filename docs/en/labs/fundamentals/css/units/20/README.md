# CSS · 20 Positioning and Containing Blocks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State, positioning, and accessibility · Editable example · Storage ID: `css-step-20`

## Goals and learning outcomes

- Record the badge's reference element and computed position.
- Compare sticky behavior during document scrolling and parent scrolling.

## Prerequisites

The work and experiment records from Unit 19, “Focus and Input States”

## Key concepts and explanations

### Positioning Reference

absolute positions an element relative to its containing block. The nearest positioned ancestor is a common reference, but other properties can also affect it.

### Fixed and Sticky Positioning

fixed and sticky behave differently during scrolling. Threshold positions and the scrolling context are important for sticky.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with a long document and a parent with a constrained height, and connect position.css.
2. Create a card badge and a sticky table of contents, and change the parent's position and overflow.
3. Run with a long document and a parent with a constrained height. Results to check: Record the badge's reference element and computed position. Compare sticky behavior during document scrolling and parent scrolling. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Parent overflow | visible | auto | Hypothesis before running: The scrolling area that sticky responds to may change. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the badge's reference element and computed position.
- [ ] Compare sticky behavior during document scrolling and parent scrolling.

## Self-check

1. What happens to sticky without top?
2. Can the reference for fixed also change?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Focus and Input States](../19/README.md) · [Next: Stacking Contexts and Overlap](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

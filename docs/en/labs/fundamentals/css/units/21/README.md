# CSS · 21 Stacking Contexts and Overlap

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State, positioning, and accessibility · Editable example · Storage ID: `css-step-21`

## Goals and learning outcomes

- Diagram the overlap order, including ancestor contexts.
- The final badge appears above the intended card.

## Prerequisites

The work and experiment records from Unit 20, “Positioning and Containing Blocks”

## Key concepts and explanations

### Stacking Contexts

z-index is interpreted within the ordering of the same context. Even a large child value cannot freely escape the parent's context.

### Creating Contexts

Properties such as transform or opacity can create a new context. Check ancestors first when investigating unintended overlap.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 2 cards and a badge with z-index 999, and connect stacking.css.
2. Create overlapping cards and a badge, and compare the effect of z-index with and without a transform on the parent.
3. Run with 2 cards and a badge with z-index 999. Results to check: Diagram the overlap order, including ancestor contexts. The final badge appears above the intended card. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Parent transform | none | translateZ(0) | Hypothesis before running: The badge may be confined to a separate stacking context. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Diagram the overlap order, including ancestor contexts.
- [ ] The final badge appears above the intended card.

## Self-check

1. Why can z-index 9999 fail to solve this?
2. What boundary can isolation create?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Positioning and Containing Blocks](../20/README.md) · [Next: Transitions and Intermediate States](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

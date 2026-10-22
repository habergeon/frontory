# CSS · 10 Grid Tracks and Gaps

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Flex, Grid, and responsive layout · Editable example · Storage ID: `css-step-10`

## Goals and learning outcomes

- Compare the sum of column widths and gaps with the container width.
- Identify and fix overflowing elements at a narrow width.

## Prerequisites

The work and experiment records from Unit 9, “Flex Growth and Shrinkage”

## Key concepts and explanations

### Track Definitions

grid-template-columns sets column sizes and counts. fr distributes space after fixed sizes and gaps are deducted.

### Minimum Constraints

Content minimum sizes can affect even 1fr. minmax(0,1fr) lets you explicitly allow tracks to shrink.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 6 cards including long titles, and connect grid-tracks.css.
2. In a 3-column card layout, compare 1fr and minmax(0,1fr), and change gap.
3. Run with 6 cards including long titles. Results to check: Compare the sum of column widths and gaps with the container width. Identify and fix overflowing elements at a narrow width. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Track | 1fr | minmax(0,1fr) | Hypothesis before running: Long content may be less likely to push columns wider. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Compare the sum of column widths and gaps with the container width.
- [ ] Identify and fix overflowing elements at a narrow width.

## Self-check

1. Is fr simply a percentage of the total width?
2. Which constraint does a minimum value of 0 in minmax remove?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Flex Growth and Shrinkage](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

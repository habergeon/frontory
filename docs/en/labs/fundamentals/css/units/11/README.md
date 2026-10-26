# CSS · 11 Automatic Repetition and Card Counts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Flex, Grid, and responsive layout · Editable example · Storage ID: `css-step-11`

## Goals and learning outcomes

- Record column counts and card widths for each card count.
- There is no horizontal scrolling even in a 320px container.

## Prerequisites

The work and experiment records from Unit 10, “Grid Tracks and Gaps”

## Key concepts and explanations

### Automatic Columns

auto-fit and auto-fill calculate how many tracks fit. They differ in how they collapse empty tracks, so the difference appears with fewer cards.

### Minimum Card Width

Use minmax to set the minimum and maximum card size range. If the minimum width exceeds the viewport, you need an overflow strategy.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 2 and 8 cards in a 1000px container, and connect auto-grid.css.
2. Build a card list with repeat and minmax, and compare auto-fit·auto-fill.
3. Run with 2 and 8 cards in a 1000px container. Results to check: Record column counts and card widths for each card count. There is no horizontal scrolling even in a 320px container. Record expected and actual results separately.

## Variables to observe

| Variable   | Baseline  | Change   | Expected change / hypothesis                                                                                                                                                   |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Repetition | auto-fill | auto-fit | Hypothesis before running: A small number of cards may use more of the remaining space. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record column counts and card widths for each card count.
- [ ] There is no horizontal scrolling even in a 320px container.

## Self-check

1. What UI benefits from keeping empty tracks?
2. On which screens does a fixed minimum card width break the layout?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Grid Tracks and Gaps](../10/README.md) · [Next: Layout Areas and Source Order](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# CSS · 07 Size Constraints and overflow

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Cascade and size calculations · Editable example · Storage ID: `css-step-07`

## Goals and learning outcomes

- The full URL can be inspected, and the page has no horizontal overflow.
- Record the difference between clipping and internal scrolling in two screenshots.

## Prerequisites

The work and experiment records from Unit 6, “Normal Flow and Margin Collapsing”

## Key concepts and explanations

### Minimum Sizes

min-content and max-content express content-based sizes. Long words can create a larger minimum width than expected.

### Overflow Policy

overflow determines whether overflowing content is visible, clipped, or scrollable. Applying only hidden can remove essential content.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with an 80-character URL and a 280px card, and connect overflow.css.
2. Combine overflow-wrap and min-width on a card with a long URL, and create a separate scroll area.
3. Run with an 80-character URL and a 280px card. Results to check: The full URL can be inspected, and the page has no horizontal overflow. Record the difference between clipping and internal scrolling in two screenshots. Record expected and actual results separately.

## Variables to observe

| Variable      | Baseline | Change   | Expected change / hypothesis                                                                                                                                 |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Line Breaking | normal   | anywhere | Hypothesis before running: The long string will wrap inside the card. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The full URL can be inspected, and the page has no horizontal overflow.
- [ ] Record the difference between clipping and internal scrolling in two screenshots.

## Self-check

1. If you use only ellipsis, where can the full value be inspected?
2. Did you find the cause before hiding overflow?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Normal Flow and Margin Collapsing](../06/README.md) · [Next: Flex Axes and Alignment](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

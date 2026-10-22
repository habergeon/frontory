# CSS · 12 Layout Areas and Source Order

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Flex, Grid, and responsive layout · Editable example · Storage ID: `css-step-12`

## Goals and learning outcomes

- Compare visual order and Tab order on both screens.
- The final layout preserves the logical order of the main content.

## Prerequisites

The work and experiment records from Unit 11, “Automatic Repetition and Card Counts”

## Key concepts and explanations

### Explicit Placement

Use grid-area to assign visual areas. Changing visual order does not change DOM reading order.

### Consistent Order

Also check the order used by keyboard navigation and assistive technology. Avoid reversing the logical flow with order or area placement.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with navigation, main, and supporting areas with 6 links, and connect grid-areas.css.
2. Place header·nav·main·aside into areas, and write a single-column layout for narrow screens.
3. Run with navigation, main, and supporting areas with 6 links. Results to check: Compare visual order and Tab order on both screens. The final layout preserves the logical order of the main content. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Placement | aside after main content | aside visually before main content | Hypothesis before running: Keyboard order and visual order may diverge. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Compare visual order and Tab order on both screens.
- [ ] The final layout preserves the logical order of the main content.

## Self-check

1. Does CSS placement change the order of the accessibility tree?
2. Which information should appear first on mobile?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Automatic Repetition and Card Counts](../11/README.md) · [Next: Media Queries and Breakpoints](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

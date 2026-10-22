# CSS · 13 Media Queries and Breakpoints

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Flex, Grid, and responsive layout · Editable example · Storage ID: `css-step-13`

## Goals and learning outcomes

- Record computed styles and column counts before and after the breakpoint.
- Controls do not overlap at the four test widths.

## Prerequisites

The work and experiment records from Unit 12, “Layout Areas and Source Order”

## Key concepts and explanations

### Conditional Rules

Media queries apply declarations based on environmental conditions such as the viewport. Find breakpoints where content breaks, rather than by device names.

### Continuous Ranges

Check immediately before and after each breakpoint too. A layout can jump at the boundary even if it works at the chosen representative widths.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 1px before and after the breakpoint and 360px·1200px widths, and connect media.css.
2. Find the width where cards and navigation collide, and write a rule that switches from one column to three columns.
3. Run with 1px before and after the breakpoint and 360px·1200px widths. Results to check: Record computed styles and column counts before and after the breakpoint. Controls do not overlap at the four test widths. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Viewport | 699px | 700px | Hypothesis before running: Whether the configured media condition applies will change. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record computed styles and column counts before and after the breakpoint.
- [ ] Controls do not overlap at the four test widths.

## Self-check

1. What content-based evidence determined the breakpoint?
2. How does zooming change the CSS viewport width?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Layout Areas and Source Order](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

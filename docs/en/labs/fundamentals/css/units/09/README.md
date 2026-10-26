# CSS · 09 Flex Growth and Shrinkage

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Flex, Grid, and responsive layout · Editable example · Storage ID: `css-step-09`

## Goals and learning outcomes

- Record the 3 actual panel widths at each container width.
- Distinguish the effect of min-width:0 from shrink.

## Prerequisites

The work and experiment records from Unit 8, “Flex Axes and Alignment”

## Key concepts and explanations

### Space Distribution

flex-grow determines the ratio for distributing remaining space. Actual widths also reflect basis and minimum sizes.

### Shrink Factors

flex-shrink contributes to shrinking items when space is insufficient. The automatic minimum size of long content can prevent shrinking.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 900px and 420px containers, and connect flex-size.css.
2. Set the three panels' basis to 200px, and adjust grow·shrink and min-width.
3. Run with 900px and 420px containers. Results to check: Record the 3 actual panel widths at each container width. Distinguish the effect of min-width:0 from shrink. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                                                                                                  |
| -------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shrink   | 1        | 0      | Hypothesis before running: Overflow may occur in the narrow container. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the 3 actual panel widths at each container width.
- [ ] Distinguish the effect of min-width:0 from shrink.

## Self-check

1. Does grow 2 always mean twice the width?
2. What should you check when both basis and width are set?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Flex Axes and Alignment](../08/README.md) · [Next: Grid Tracks and Gaps](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

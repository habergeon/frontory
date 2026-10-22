# CSS · 08 Flex Axes and Alignment

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Flex, Grid, and responsive layout · Editable example · Storage ID: `css-step-08`

## Goals and learning outcomes

- Sketch the main and cross axes for both directions.
- Measure positions for start, center, and end alignment.

## Prerequisites

The work and experiment records from Unit 7, “Size Constraints and overflow”

## Key concepts and explanations

### Main and Cross Axes

flex-direction determines the main axis. justify-content and align-items handle different axes.

### Available Space

Alignment results depend on the remaining space. Some alignment differences may not be visible when items use all the space.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 3 buttons of different sizes and a height of 200px, and connect flex-axis.css.
2. Switch the toolbar between row and column, and mark the axes of the two alignment properties.
3. Run with 3 buttons of different sizes and a height of 200px. Results to check: Sketch the main and cross axes for both directions. Measure positions for start, center, and end alignment. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Direction | row | column | Hypothesis before running: The axis to which alignment applies will change. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Sketch the main and cross axes for both directions.
- [ ] Measure positions for start, center, and end alignment.

## Self-check

1. Does text direction also affect the starting point?
2. What does space-between look like with no remaining space?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Size Constraints and overflow](../07/README.md) · [Next: Flex Growth and Shrinkage](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

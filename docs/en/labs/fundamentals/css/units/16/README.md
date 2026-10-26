# CSS · 16 Logical Properties and Writing Direction

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State, positioning, and accessibility · Editable example · Storage ID: `css-step-16`

## Goals and learning outcomes

- Record the start boundary and spacing in both directions.
- Text and controls do not overlap or get clipped.

## Prerequisites

The work and experiment records from Unit 15, “Container Queries and Reuse”

## Key concepts and explanations

### Logical Directions

The inline and block axes follow the document's writing direction. They are not always the same as physical directions such as left and right.

### Adapting to Direction

Express relationships with margin-inline and padding-block. Also inspect whether icons and alignment behave naturally in RTL.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with LTR and RTL card lists, and connect logical.css.
2. Change card margins and borders to logical properties, and toggle dir.
3. Run with LTR and RTL card lists. Results to check: Record the start boundary and spacing in both directions. Text and controls do not overlap or get clipped. Record expected and actual results separately.

## Variables to observe

| Variable  | Baseline | Change | Expected change / hypothesis                                                                                                                                                                     |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Direction | ltr      | rtl    | Hypothesis before running: The margin and border on the inline start side will move to the opposite side. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the start boundary and spacing in both directions.
- [ ] Text and controls do not overlap or get clipped.

## Self-check

1. Which parts should keep physical properties?
2. What happens to the axes if you also change writing-mode?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Container Queries and Reuse](../15/README.md) · [Next: Typography and Line Length](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

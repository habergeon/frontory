# CSS · 05 Units and Fluid Font Sizes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Cascade and size calculations · Editable example · Storage ID: `css-step-05`

## Goals and learning outcomes

- The title size stays within the specified range on both screens.
- Record computed font sizes and spacing before and after changing the root size.

## Prerequisites

The work and experiment records from Unit 4, “Box Model and Measured Dimensions”

## Key concepts and explanations

### Relative Units

rem is based on the root font size. For em, check the relationship between the property using it and the element's font size.

### Range Limits

clamp sets minimum, preferred, and maximum sizes. Set a minimum so text does not become too small by following viewport width alone.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 360px·1200px screens and a 16px root font size, and connect units.css.
2. Use clamp for the title and rem for spacing, then change the root size and viewport.
3. Run with 360px·1200px screens and a 16px root font size. Results to check: The title size stays within the specified range on both screens. Record computed font sizes and spacing before and after changing the root size. Record expected and actual results separately.

## Variables to observe

| Variable  | Baseline | Change | Expected change / hypothesis                                                                                                                            |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Root Size | 16px     | 20px   | Hypothesis before running: rem-based text and spacing will grow. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The title size stays within the specified range on both screens.
- [ ] Record computed font sizes and spacing before and after changing the root size.

## Self-check

1. What problems can using only vw cause when zooming or on small screens?
2. How does nesting em change sizes?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: The box model and measured dimensions](../04/README.md) · [Next: Normal Flow and Margin Collapsing](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

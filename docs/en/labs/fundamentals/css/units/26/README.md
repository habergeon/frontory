# CSS · 26 Observing Layout and Paint

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion, tokens, and rendering verification · Editable example · Storage ID: `css-step-26`

## Goals and learning outcomes

- Distinguish Layout·Paint intervals in both recordings.
- Keep 2 recordings under identical conditions and document the limits of the observations.

## Prerequisites

The work and experiment records from Unit 25, “Custom Properties and Themes”

## Key concepts and explanations

### Rendering Stages

Property changes can affect style, layout, paint, and compositing differently. Check the actual path for the browser and element conditions.

### Comparing Measurements

Compare using the same element count and duration. Do not assume that transform is always free of cost.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 50 cards, a duration of 500ms, and the same browser, and connect render-cost.css.
2. Implement the same card movement using width changes and transform changes, and collect a performance recording for each.
3. Run with 50 cards, a duration of 500ms, and the same browser. Results to check: Distinguish Layout·Paint intervals in both recordings. Keep 2 recordings under identical conditions and document the limits of the observations. Record expected and actual results separately.

## Variables to observe

| Variable         | Baseline | Change    | Expected change / hypothesis                                                                                                                |
| ---------------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed Property | width    | transform | Hypothesis before running: Layout work may decrease. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish Layout·Paint intervals in both recordings.
- [ ] Keep 2 recordings under identical conditions and document the limits of the observations.

## Self-check

1. How do you verify that only compositing occurs?
2. What happens to memory costs as the number of layers grows?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

Record both conditions separately in DevTools Performance to measure actual Layout/Paint/Composite costs. The preview does not infer costs automatically. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Custom Properties and Themes](../25/README.md) · [Next: contain and Offscreen Content](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

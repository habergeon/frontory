# CSS · 27 contain and Offscreen Content

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion, tokens, and rendering verification · Editable example · Storage ID: `css-step-27`

## Goals and learning outcomes

- Compare the initial recording with height changes during scrolling.
- Reach offscreen cards using search and keyboard navigation.

## Prerequisites

The work and experiment records from Unit 26, “Observing Layout and Paint”

## Key concepts and explanations

### Containment Boundaries

contain restricts an element's relationships in computation, layout, and painting. Incorrect use can change overflowing content or size calculations.

### Skipping Rendering

content-visibility:auto can reduce rendering work for offscreen content. Also check estimated sizes and accessibility behavior.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 200 cards with different heights, and connect containment.css.
2. Apply content-visibility and contain-intrinsic-size to a long card list, and compare scrolling.
3. Run with 200 cards with different heights. Results to check: Compare the initial recording with height changes during scrolling. Reach offscreen cards using search and keyboard navigation. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Rendering Policy | Default | content-visibility:auto | Hypothesis before running: Initial rendering work may decrease, but the scroll size may change. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Compare the initial recording with height changes during scrolling.
- [ ] Reach offscreen cards using search and keyboard navigation.

## Self-check

1. What changes if the estimated height is wrong?
2. Does contain clip any content?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Change content-visibility to visible and record initial rendering and scrolling. Also check whether search and Tab reach the cards near the end. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Observing Layout and Paint](../26/README.md) · [Next: Tokens and Rendering Observations](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

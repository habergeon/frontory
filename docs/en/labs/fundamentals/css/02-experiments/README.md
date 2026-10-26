# CSS · 14 Responsive Layout and Motion

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Flex, Grid, and responsive layout · Editable example · Storage ID: `css-02`

## Goals and learning outcomes

- The focused target is preserved after switching to a narrow layout.
- Under reduce, unnecessary movement disappears and states remain distinguishable.

## Prerequisites

The work and experiment records from Unit 13, “Media Queries and Breakpoints”

## Key concepts and explanations

### User Preferences

prefers-reduced-motion detects a preference for reduced motion. Information about state changes must remain even when unnecessary movement is reduced.

### Display and Interaction

Preserve the current focus during layout changes. Removing or hiding elements can move the keyboard position unexpectedly.

## Practice setup

Frontory's existing preview is a limited starter example, not a complete solution to the assignment. Implement additional files and features yourself in a separate local project. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 360px·1200px widths and both motion preference states, and connect responsive-motion.css.
2. Switch 3 columns to a single column at narrow widths, and remove transform from card transitions under reduced-motion conditions.
3. Run with 360px·1200px widths and both motion preference states. Results to check: The focused target is preserved after switching to a narrow layout. Under reduce, unnecessary movement disappears and states remain distinguishable. Record expected and actual results separately.

## Variables to observe

| Variable          | Baseline      | Change | Expected change / hypothesis                                                                                                                                                                     |
| ----------------- | ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Motion Preference | no-preference | reduce | Hypothesis before running: The selected state will remain visible even when movement effects are reduced. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The focused target is preserved after switching to a narrow layout.
- [ ] Under reduce, unnecessary movement disappears and states remain distinguishable.

## Self-check

1. Does a completion signal remain after the animation is removed?
2. What additional keyboard behavior contract is needed if this is changed to tabs?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

## Linked example and execution scope

[Example source](../../../../../../src/labs/css-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Media Queries and Breakpoints](../units/13/README.md) · [Next: Container Queries and Reuse](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

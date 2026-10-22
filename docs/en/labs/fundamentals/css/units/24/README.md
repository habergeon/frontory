# CSS · 24 Organizing Rules with Cascade Layers

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion, tokens, and rendering verification · Editable example · Storage ID: `css-step-24`

## Goals and learning outcomes

- Check the winning layer for normal declarations in computed styles.
- Record important cases separately to distinguish them from normal rules.

## Prerequisites

The work and experiment records from Unit 23, “Keyframes and Playback Control”

## Key concepts and explanations

### Layer Order

@layer specifies the priority order of style groups. Check the priority order of layered and unlayered rules even at the same importance.

### Ease of Change

Separating base, component, and utility rules makes conflicts easier to trace. !important also changes how layer priority works.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 3 declarations of the same property and an unlayered declaration, and connect layers.css.
2. Declare base·components·utilities layers, and create conflicting colors on the same button to compare them.
3. Run with 3 declarations of the same property and an unlayered declaration. Results to check: Check the winning layer for normal declarations in computed styles. Record important cases separately to distinguish them from normal rules. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Declaration Location | components | utilities | Hypothesis before running: The winning rule will change according to the declared layer order. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check the winning layer for normal declarations in computed styles.
- [ ] Record important cases separately to distinguish them from normal rules.

## Self-check

1. When is specificity compared within a layer?
2. Why is an unlayered declaration stronger than expected?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN Cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Add an unlayered background declaration or add !important to each layer, and compare computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Keyframes and Playback Control](../23/README.md) · [Next: Custom Properties and Themes](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

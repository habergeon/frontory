# CSS · 25 Custom Properties and Themes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion, tokens, and rendering verification · Editable example · Storage ID: `css-step-25`

## Goals and learning outcomes

- Record the color and spacing token connections for the three elements.
- Check body text contrast and focus indicators in both themes.

## Prerequisites

The work and experiment records from Unit 24, “Organizing Rules with Cascade Layers”

## Key concepts and explanations

### Sharing Values

CSS custom properties participate in the cascade and inheritance. Values with the same name are resolved differently depending on where they are declared.

### Fallback Values

The fallback in var is used when the referenced variable is missing or invalid. A value that does not match the final property's grammar can cause a problem at computed-value time.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with a card, an input, a button, and two themes, and connect tokens.css.
2. Define color, spacing, and radius tokens on :root, and override them for a dark theme with data-theme.
3. Run with a card, an input, a button, and two themes. Results to check: Record the color and spacing token connections for the three elements. Check body text contrast and focus indicators in both themes. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Theme | light | dark | Hypothesis before running: Elements using shared tokens will change together. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the color and spacing token connections for the three elements.
- [ ] Check body text contrast and focus indicators in both themes.

## Self-check

1. Are custom properties global constants?
2. What happens when a token value does not match a property's grammar?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Organizing Rules with Cascade Layers](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

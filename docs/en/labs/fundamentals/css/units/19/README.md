# CSS · 19 Focus and Input States

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State, positioning, and accessibility · Editable example · Storage ID: `css-step-19`

## Goals and learning outcomes

- Focus is visible and unclipped on every control.
- Record the 3 checked·disabled·invalid states.

## Prerequisites

The work and experiment records from Unit 18, “Color and Contrast”

## Key concepts and explanations

### Focus Indicators

:focus-visible adjusts focus indication based on factors such as the input method. Removing outline without a replacement indicator makes it hard to locate focus.

### State Selectors

disabled·checked·invalid represent different states. Check that error indications are not excessive before input begins.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with keyboard navigation, checkbox toggling, and invalid input, and connect states.css.
2. Write focus-visible and state styles for buttons, links, and inputs, and navigate with Tab.
3. Run with keyboard navigation, checkbox toggling, and invalid input. Results to check: Focus is visible and unclipped on every control. Record the 3 checked·disabled·invalid states. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| outline | None | 2px solid line with offset | Hypothesis before running: The keyboard position will be easier to identify. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Focus is visible and unclipped on every control.
- [ ] Record the 3 checked·disabled·invalid states.

## Self-check

1. Can you recognize the state without hover?
2. Does the parent's overflow clip the outline?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Color and Contrast](../18/README.md) · [Next: Positioning and Containing Blocks](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

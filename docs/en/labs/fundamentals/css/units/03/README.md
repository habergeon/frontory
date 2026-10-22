# CSS · 03 Inheritance and Resetting

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Cascade and size calculations · Editable example · Storage ID: `css-step-03`

## Goals and learning outcomes

- Record 6 computed values for color and border.
- Confirm that unset behaves differently for inherited and non-inherited properties.

## Prerequisites

The work and experiment records from Unit 2, “Selectors and Specificity”

## Key concepts and explanations

### Inherited Properties

Properties such as text color can be inherited from a parent. Properties such as margin are generally not inherited automatically.

### Reset Keywords

inherit·initial·unset follow different reset rules. The result of unset depends on whether the property is inherited.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 1 parent and 3 children, and connect inheritance.css.
2. Set color and border on the parent, and apply the three reset keywords to the children in turn.
3. Run with 1 parent and 3 children. Results to check: Record 6 computed values for color and border. Confirm that unset behaves differently for inherited and non-inherited properties. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Reset | initial | inherit | Hypothesis before running: The parent's computed value will be used. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record 6 computed values for color and border.
- [ ] Confirm that unset behaves differently for inherited and non-inherited properties.

## Self-check

1. Are initial values the same as browser default styles?
2. What problems arise if every property is inherited?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

Change initial, inherit, and unset in turn and check the computed color·border. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Selectors and Specificity](../02/README.md) · [Next: The box model and measured dimensions](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

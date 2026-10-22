# CSS · 15 Container Queries and Reuse

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State, positioning, and accessibility · Editable example · Storage ID: `css-step-15`

## Goals and learning outcomes

- The two cards show different layouts in the same viewport.
- Identify the query container in developer tools.

## Prerequisites

The work and experiment records from Unit 14, “Responsive Layout and Motion”

## Key concepts and explanations

### Container-Based Conditions

Size queries use the size of a specified ancestor container. Cards can differ according to the area they occupy even at the same viewport size.

### Containment Scope

container-type establishes containment rules related to size queries. Check the relationship between the element receiving it and its children.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with a 300px sidebar and an 800px main area, and connect container.css.
2. Set container-type:inline-size on the wrapper, and use @container to switch the card between horizontal and vertical layouts.
3. Run with a 300px sidebar and an 800px main area. Results to check: The two cards show different layouts in the same viewport. Identify the query container in developer tools. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Parent Width | 300px | 800px | Hypothesis before running: The same card will switch to a horizontal layout. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The two cards show different layouts in the same viewport.
- [ ] Identify the query container in developer tools.

## Self-check

1. Can a card be the target of its own size query?
2. Which conditions should media queries and container queries each handle?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Responsive Layout and Motion](../../02-experiments/README.md) · [Next: Logical Properties and Writing Direction](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

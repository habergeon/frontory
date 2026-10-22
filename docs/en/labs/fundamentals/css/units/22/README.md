# CSS · 22 Transitions and Intermediate States

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion, tokens, and rendering verification · Editable example · Storage ID: `css-step-22`

## Goals and learning outcomes

- The final selected state is correct after rapid clicks.
- Record intermediate states for both durations and the reduce alternative.

## Prerequisites

The work and experiment records from Unit 21, “Stacking Contexts and Overlap”

## Key concepts and explanations

### Transition Properties

transition displays intermediate states as values change. Specifying the needed properties instead of all reduces unintended transitions.

### Handling Interruptions

A user can reverse an action during a transition. Checking only the end state can miss jumps during rapid input.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 5 consecutive clicks and two durations, and connect transition.css.
2. Transition only transform and opacity on the selected card, and operate the button repeatedly and rapidly.
3. Run with 5 consecutive clicks and two durations. Results to check: The final selected state is correct after rapid clicks. Record intermediate states for both durations and the reduce alternative. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| duration | 150ms | 800ms | Hypothesis before running: The portion that reverses during an intermediate state will be easier to see. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The final selected state is correct after rapid clicks.
- [ ] Record intermediate states for both durations and the reduce alternative.

## Self-check

1. Which properties can transition:all change?
2. Is it safe for functionality to depend on a transition completion event?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Stacking Contexts and Overlap](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

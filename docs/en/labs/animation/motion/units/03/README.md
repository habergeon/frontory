# Motion · 03 Configuring Transition

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State and Transition · Editable example · Storage ID: `motion-step-03`

## Goals and learning outcomes

- Learning outcome: Explain the role of Tween. Input case: Selecting a button once.
- Deliverable: A table of observations during and at the end of both property transitions. Connect your rationale for handling Per-property settings to the code.

## Prerequisites

Prepare the results of the Initial and First appearance exercises from Unit 2, “Initial and Animate”.

## Key concepts and explanations

### Tween

A duration-based transition follows a defined time curve. ease changes the speed during the transition.

### Per-property settings

Each property can have a different transition. Separating the intent for opacity and position makes the code easier to read.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-3.tsx of a separate exercise project, set different transition settings for x and opacity. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Selecting a button once. Baseline: 0.2 seconds. Run under the baseline condition, then record observations and errors in notes/day-3.md.
3. Variable to change: opacity duration; new value: 0.6 seconds. Run again with the same input path. Deliverable to save: A table of observations during and at the end of both property transitions. Hypothesis to test: Position and opacity finish at different times. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable         | Baseline    | Change      | Expected change / hypothesis                    |
| ---------------- | ----------- | ----------- | ----------------------------------------------- |
| opacity duration | 0.2 seconds | 0.6 seconds | Position and opacity finish at different times. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of observations during and at the end of both property transitions. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Tween and Per-property settings. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Tween affect in this exercise? Input case: Selecting a button once.
2. Variable to change: opacity duration. Hypothesis to test: Position and opacity finish at different times. Did the actual results agree with the hypothesis? Explain your evidence in terms of Per-property settings.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Configuring Transition experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Initial and Animate](../02/README.md) · [Next: Physical Spring Parameters](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

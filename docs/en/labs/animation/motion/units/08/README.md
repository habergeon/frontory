# Motion · 08 Measuring Layout

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Layout and Presence · Editable example · Storage ID: `motion-step-08`

## Goals and learning outcomes

- Learning outcome: Explain the role of Layout. Input case: Toggling between 1 and 3 columns.
- Deliverable: A record of final layout and text observations during the transition. Connect your rationale for handling Transform interpolation to the code.

## Prerequisites

Prepare the results of the Orchestration and Stagger exercises from Unit 7, “Child Entrance Order”.

## Key concepts and explanations

### Layout

layout animates the difference between the previous and next layouts. React and CSS determine the final document layout.

### Transform interpolation

Distinguish visual movement from actual layout. Size changes can distort child content.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-8.tsx of a separate exercise project, add layout to motion cards and change the number of Grid columns. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Toggling between 1 and 3 columns. Baseline: 3 columns. Run under the baseline condition, then record observations and errors in notes/day-8.md.
3. Variable to change: Column count; new value: 1 column. Run again with the same input path. Deliverable to save: A record of final layout and text observations during the transition. Hypothesis to test: The layout changes and cards interpolate to their new positions. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable     | Baseline  | Change   | Expected change / hypothesis                                     |
| ------------ | --------- | -------- | ---------------------------------------------------------------- |
| Column count | 3 columns | 1 column | The layout changes and cards interpolate to their new positions. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A record of final layout and text observations during the transition. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Layout and Transform interpolation. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Layout affect in this exercise? Input case: Toggling between 1 and 3 columns.
2. Variable to change: Column count. Hypothesis to test: The layout changes and cards interpolate to their new positions. Did the actual results agree with the hypothesis? Explain your evidence in terms of Transform interpolation.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Measuring Layout experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Child Entrance Order](../07/README.md) · [Next: Stable Keys](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

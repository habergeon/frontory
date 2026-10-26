# Motion · 11 Presence Modes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Layout and Presence · Editable example · Storage ID: `motion-step-11`

## Goals and learning outcomes

- Learning outcome: Explain the role of Concurrent transitions. Input case: Selection A→B.
- Deliverable: A log of entrance and exit order. Connect your rationale for handling Sequential transitions to the code.

## Prerequisites

Prepare the results of the Presence and Boundary placement exercises from Unit 10, “AnimatePresence Basics”.

## Key concepts and explanations

### Concurrent transitions

sync mode allows entrance and exit together. The two views can overlap.

### Sequential transitions

wait coordinates the transition order for one child. Do not use it as a general sorting solution for multiple list items.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-11.tsx of a separate exercise project, compare mode sync and wait when switching a single detail card. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Selection A→B. Baseline: sync. Run under the baseline condition, then record observations and errors in notes/day-11.md.
3. Variable to change: mode; new value: wait. Run again with the same input path. Deliverable to save: A log of entrance and exit order. Hypothesis to test: B's entrance moves to after A's exit. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis          |
| -------- | -------- | ------ | ------------------------------------- |
| mode     | sync     | wait   | B's entrance moves to after A's exit. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A log of entrance and exit order. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Concurrent transitions and Sequential transitions. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Concurrent transitions affect in this exercise? Input case: Selection A→B.
2. Variable to change: mode. Hypothesis to test: B's entrance moves to after A's exit. Did the actual results agree with the hypothesis? Explain your evidence in terms of Sequential transitions.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Presence Modes experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: AnimatePresence Basics](../10/README.md) · [Next: Sharing LayoutId](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

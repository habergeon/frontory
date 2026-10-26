# Motion · 06 Variants

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State and Transition · Editable example · Storage ID: `motion-step-06`

## Goals and learning outcomes

- Learning outcome: Explain the role of Named states. Input case: Changing the selection between two cards.
- Deliverable: A table of parent and child target states. Connect your rationale for handling Propagation to the code.

## Prerequisites

Prepare the results of the Keyframes and Times exercises from Unit 5, “Keyframes”.

## Key concepts and explanations

### Named states

variants groups visual states by name. A name can be selected from domain state.

### Propagation

A parent variant can propagate to children. Giving a child its own animate changes this relationship.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-6.tsx of a separate exercise project, define idle and selected variants for a card and its icon. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Changing the selection between two cards. Baseline: Inherited from the parent. Run under the baseline condition, then record observations and errors in notes/day-6.md.
3. Variable to change: Child control; new value: Independent animate. Run again with the same input path. Deliverable to save: A table of parent and child target states. Hypothesis to test: The path through which state propagates to the child changes. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable      | Baseline                  | Change              | Expected change / hypothesis                                  |
| ------------- | ------------------------- | ------------------- | ------------------------------------------------------------- |
| Child control | Inherited from the parent | Independent animate | The path through which state propagates to the child changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of parent and child target states. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Named states and Propagation. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Named states affect in this exercise? Input case: Changing the selection between two cards.
2. Variable to change: Child control. Hypothesis to test: The path through which state propagates to the child changes. Did the actual results agree with the hypothesis? Explain your evidence in terms of Propagation.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Variants experiment with resource cleanup.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Keyframes](../05/README.md) · [Next: Child Entrance Order](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

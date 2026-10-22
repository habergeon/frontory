# Motion · 19 Reordering with Buttons

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Gestures and Equivalent Interaction · Editable example · Storage ID: `motion-step-19`

## Goals and learning outcomes

- Learning outcome: Explain the role of Explicit order. Input case: Moving the middle card up by one position.
- Deliverable: The ID array for each input method. Connect your rationale for handling Equivalent alternatives to the code.

## Prerequisites

Prepare the results of the Momentum and Elastic exercises from Unit 18, “Inertia and Elasticity”.

## Key concepts and explanations

### Explicit order

The data array defines the order. Drag results must update the same array.

### Equivalent alternatives

Up and Down buttons enable reordering without a pointer. Announce the result of the change in text.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-19.tsx of a separate exercise project, add Up and Down buttons and order status information to cards. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Moving the middle card up by one position. Baseline: drag. Run under the baseline condition, then record observations and errors in notes/day-19.md.
3. Variable to change: Interaction; new value: Up button. Run again with the same input path. Deliverable to save: The ID array for each input method. Hypothesis to test: Both methods produce the same order array. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Interaction | drag | Up button | Both methods produce the same order array. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: The ID array for each input method. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Explicit order and Equivalent alternatives. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Explicit order affect in this exercise? Input case: Moving the middle card up by one position.
2. Variable to change: Interaction. Hypothesis to test: Both methods produce the same order array. Did the actual results agree with the hypothesis? Explain your evidence in terms of Equivalent alternatives.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Reordering with Buttons experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Inertia and Elasticity](../18/README.md) · [Next: MotionValue](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

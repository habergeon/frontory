# Motion · 20 MotionValue

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Gestures and Equivalent Interaction · Editable example · Storage ID: `motion-step-20`

## Goals and learning outcomes

- Learning outcome: Explain the role of Separate values. Input case: 1 drag.
- Deliverable: The number of value changes and React renders. Connect your rationale for handling Subscriptions to the code.

## Prerequisites

Prepare the results of the Explicit order and Equivalent alternatives exercises from Unit 19, “Reordering with Buttons”.

## Key concepts and explanations

### Separate values

A MotionValue can update without a React render on every frame. Its role differs from persistent UI data.

### Subscriptions

Clean up value-change subscriptions according to their lifetime. Copying every frame to state reduces the benefit.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-20.tsx of a separate exercise project, track x with useMotionValue and useMotionValueEvent and count renders. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: 1 drag. Baseline: setState on every change. Run under the baseline condition, then record observations and errors in notes/day-20.md.
3. Variable to change: Storage method; new value: MotionValue. Run again with the same input path. Deliverable to save: The number of value changes and React renders. Hypothesis to test: Value changes and render counts become separate. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable       | Baseline                 | Change      | Expected change / hypothesis                     |
| -------------- | ------------------------ | ----------- | ------------------------------------------------ |
| Storage method | setState on every change | MotionValue | Value changes and render counts become separate. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: The number of value changes and React renders. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Separate values and Subscriptions. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Separate values affect in this exercise? Input case: 1 drag.
2. Variable to change: Storage method. Hypothesis to test: Value changes and render counts become separate. Did the actual results agree with the hypothesis? Explain your evidence in terms of Subscriptions.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive MotionValue experiment with resource cleanup.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reordering with Buttons](../19/README.md) · [Next: Connecting Transform and Spring](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

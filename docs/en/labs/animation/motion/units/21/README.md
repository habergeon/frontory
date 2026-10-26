# Motion · 21 Connecting Transform and Spring

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Gestures and Equivalent Interaction · Editable example · Storage ID: `motion-step-21`

## Goals and learning outcomes

- Learning outcome: Explain the role of Derived values. Input case: x=-100·0·100.
- Deliverable: A table of original, derived, and following values. Connect your rationale for handling Following values to the code.

## Prerequisites

Prepare the results of the Separate values and Subscriptions exercises from Unit 20, “MotionValue”.

## Key concepts and explanations

### Derived values

useTransform maps an input range to another output range. Output beyond the range depends on clamp.

### Following values

useSpring smoothly follows value changes. Distinguish the original value from the lagging value.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-21.tsx of a separate exercise project, map x to opacity and use useSpring to make an indicator follow it. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: x=-100·0·100. Baseline: true. Run under the baseline condition, then record observations and errors in notes/day-21.md.
3. Variable to change: clamp; new value: false. Run again with the same input path. Deliverable to save: A table of original, derived, and following values. Hypothesis to test: The output policy for out-of-range inputs changes. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                       |
| -------- | -------- | ------ | -------------------------------------------------- |
| clamp    | true     | false  | The output policy for out-of-range inputs changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of original, derived, and following values. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Derived values and Following values. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Derived values affect in this exercise? Input case: x=-100·0·100.
2. Variable to change: clamp. Hypothesis to test: The output policy for out-of-range inputs changes. Did the actual results agree with the hypothesis? Explain your evidence in terms of Following values.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Connecting Transform and Spring experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: MotionValue](../20/README.md) · [Next: Scroll-Linked Animation](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

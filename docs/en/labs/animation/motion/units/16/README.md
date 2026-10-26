# Motion · 16 Tap Feedback

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Gestures and Equivalent Interaction · Editable example · Storage ID: `motion-step-16`

## Goals and learning outcomes

- Learning outcome: Explain the role of Pressed state. Input case: Click, Enter, and Space.
- Deliverable: The increment count for each input. Connect your rationale for handling Functional events to the code.

## Prerequisites

Prepare the results of the Pointer state and Focus exercises from Unit 15, “Hover and Focus”.

## Key concepts and explanations

### Pressed state

whileTap describes how a control looks while pressed. It does not mean an action is complete.

### Functional events

Use the button's click contract for the actual action. The function must work even without a scale effect.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-16.tsx of a separate exercise project, add whileTap to motion.button and display the click count. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Click, Enter, and Space. Baseline: 0.92. Run under the baseline condition, then record observations and errors in notes/day-16.md.
3. Variable to change: scale; new value: 1. Run again with the same input path. Deliverable to save: The increment count for each input. Hypothesis to test: Each input activates the action once, even without a visual effect. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                        |
| -------- | -------- | ------ | ------------------------------------------------------------------- |
| scale    | 0.92     | 1      | Each input activates the action once, even without a visual effect. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: The increment count for each input. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Pressed state and Functional events. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Pressed state affect in this exercise? Input case: Click, Enter, and Space.
2. Variable to change: scale. Hypothesis to test: Each input activates the action once, even without a visual effect. Did the actual results agree with the hypothesis? Explain your evidence in terms of Functional events.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Tap Feedback experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Hover and Focus](../15/README.md) · [Next: Drag Coordinates and Bounds](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

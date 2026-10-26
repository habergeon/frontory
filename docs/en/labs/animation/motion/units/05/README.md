# Motion · 05 Keyframes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State and Transition · Editable example · Storage ID: `motion-step-05`

## Goals and learning outcomes

- Learning outcome: Explain the role of Keyframes. Input case: Positions 0→100→60.
- Deliverable: A table of positions at each specified time. Connect your rationale for handling Times to the code.

## Prerequisites

Prepare the results of the Stiffness and Damping exercises from Unit 4, “Physical Spring Parameters”.

## Key concepts and explanations

### Keyframes

An array defines intermediate targets. Its trajectory differs from a transition with only a start and an end.

### Times

times sets the normalized time for each target. Array lengths and order must match.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-5.tsx of a separate exercise project, configure an x array in animate and transition.times. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Positions 0→100→60. Baseline: 0.5. Run under the baseline condition, then record observations and errors in notes/day-5.md.
3. Variable to change: Intermediate time; new value: 0.2. Run again with the same input path. Deliverable to save: A table of positions at each specified time. Hypothesis to test: The intermediate target is reached earlier. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable          | Baseline | Change | Expected change / hypothesis                |
| ----------------- | -------- | ------ | ------------------------------------------- |
| Intermediate time | 0.5      | 0.2    | The intermediate target is reached earlier. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of positions at each specified time. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Keyframes and Times. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Keyframes affect in this exercise? Input case: Positions 0→100→60.
2. Variable to change: Intermediate time. Hypothesis to test: The intermediate target is reached earlier. Did the actual results agree with the hypothesis? Explain your evidence in terms of Times.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Keyframes experiment with resource cleanup.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Physical Spring Parameters](../04/README.md) · [Next: Variants](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

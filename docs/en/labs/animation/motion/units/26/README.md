# Motion · 26 Observing Renders and Performance

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating a Motion System · Editable example · Storage ID: `motion-step-26`

## Goals and learning outcomes

- Learning outcome: Explain the role of Render cost. Input case: 20 and 100 cards.
- Deliverable: A record of render counts and frame distributions. Connect your rationale for handling Measurement to the code.

## Prerequisites

Prepare the results of the Detecting preferences and Preserving content exercises from Unit 25, “Reduced Motion Policy”.

## Key concepts and explanations

### Render cost

React renders and animation frames are different work. Observe the two metrics separately.

### Measurement

Increasing the card count can change layout cost. Do not automatically conclude that something is faster.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-26.tsx of a separate exercise project, record reordering with Profiler and Performance. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: 20 and 100 cards. Baseline: 20 cards. Run under the baseline condition, then record observations and errors in notes/day-26.md.
3. Variable to change: Card count; new value: 100 cards. Run again with the same input path. Deliverable to save: A record of render counts and frame distributions. Hypothesis to test: Measured costs and bottlenecks may change. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable   | Baseline | Change    | Expected change / hypothesis               |
| ---------- | -------- | --------- | ------------------------------------------ |
| Card count | 20 cards | 100 cards | Measured costs and bottlenecks may change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A record of render counts and frame distributions. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Render cost and Measurement. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Render cost affect in this exercise? Input case: 20 and 100 cards.
2. Variable to change: Card count. Hypothesis to test: Measured costs and bottlenecks may change. Did the actual results agree with the hypothesis? Explain your evidence in terms of Measurement.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Observing Renders and Performance experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reduced Motion Policy](../25/README.md) · [Next: Remounting and State Restoration](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

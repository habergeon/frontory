# Motion · 07 Child Entrance Order

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State and Transition · Editable example · Storage ID: `motion-step-07`

## Goals and learning outcomes

- Learning outcome: Explain the role of Orchestration. Input case: Lists of 4 and 12 cards.
- Deliverable: The appearance times of the first and last cards. Connect your rationale for handling Stagger to the code.

## Prerequisites

Prepare the results of the Named states and Propagation exercises from Unit 6, “Variants”.

## Key concepts and explanations

### Orchestration

You can set the transition order for parents and children. Preserve the content reading order first.

### Stagger

stagger spreads out child start times. A large delay in a long list makes the last item appear late.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-7.tsx of a separate exercise project, use the modern Motion stagger function and delayChildren to orchestrate card entrances. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Lists of 4 and 12 cards. Baseline: 0.05 seconds. Run under the baseline condition, then record observations and errors in notes/day-7.md.
3. Variable to change: Interval; new value: 0.2 seconds. Run again with the same input path. Deliverable to save: The appearance times of the first and last cards. Hypothesis to test: The last card waits longer. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Interval | 0.05 seconds | 0.2 seconds | The last card waits longer. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: The appearance times of the first and last cards. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Orchestration and Stagger. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Orchestration affect in this exercise? Input case: Lists of 4 and 12 cards.
2. Variable to change: Interval. Hypothesis to test: The last card waits longer. Did the actual results agree with the hypothesis? Explain your evidence in terms of Stagger.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Child Entrance Order experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Variants](../06/README.md) · [Next: Measuring Layout](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Motion · 25 Reduced Motion Policy

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating a Motion System · Editable example · Storage ID: `motion-step-25`

## Goals and learning outcomes

- Learning outcome: Explain the role of Detecting preferences. Input case: Selection, sorting, and deletion.
- Deliverable: A table of final data and content in default and reduced modes. Connect your rationale for handling Preserving content to the code.

## Prerequisites

Prepare the results of the Scope and Asynchronous order exercises from Unit 24, “UseAnimate Cleanup”.

## Key concepts and explanations

### Detecting preferences

useReducedMotion reads the user's preference. MotionConfig also supports a reducedMotion policy.

### Preserving content

Selection and order must remain even when movement is reduced. Adjust opacity changes too if they make content unreadable.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-25.tsx of a separate exercise project, skip the x transition based on useReducedMotion and apply the same target state. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Selection, sorting, and deletion. Baseline: Default. Run under the baseline condition, then record observations and errors in notes/day-25.md.
3. Variable to change: Preference; new value: reduce. Run again with the same input path. Deliverable to save: A table of final data and content in default and reduced modes. Hypothesis to test: Functional results and readable content stay the same. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                           |
| ---------- | -------- | ------ | ------------------------------------------------------ |
| Preference | Default  | reduce | Functional results and readable content stay the same. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of final data and content in default and reduced modes. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Detecting preferences and Preserving content. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Detecting preferences affect in this exercise? Input case: Selection, sorting, and deletion.
2. Variable to change: Preference. Hypothesis to test: Functional results and readable content stay the same. Did the actual results agree with the hypothesis? Explain your evidence in terms of Preserving content.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Reduced Motion Policy experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: UseAnimate Cleanup](../24/README.md) · [Next: Observing Renders and Performance](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

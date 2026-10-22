# Motion · 02 Initial and Animate

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State and Transition · Editable example · Storage ID: `motion-step-02`

## Goals and learning outcomes

- Learning outcome: Explain the role of Initial. Input case: First mount and state changes.
- Deliverable: A table of styles on first appearance and after transitions. Connect your rationale for handling First appearance to the code.

## Prerequisites

Prepare the results of the Target state and API boundary exercises from Unit 1, “State-Based Animation”.

## Key concepts and explanations

### Initial

initial is the starting state when an element first appears. It is not always the same as the current selected state.

### First appearance

Use initial=false to skip the initial motion. Distinguish remounting from a normal render.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-2.tsx of a separate exercise project, create versions with motion.div initial and animate, and a version with initial=false. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: First mount and state changes. Baseline: Explicit starting values. Run under the baseline condition, then record observations and errors in notes/day-2.md.
3. Variable to change: initial; new value: false. Run again with the same input path. Deliverable to save: A table of styles on first appearance and after transitions. Hypothesis to test: The initial entrance is skipped, while subsequent state transitions remain. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| initial | Explicit starting values | false | The initial entrance is skipped, while subsequent state transitions remain. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of styles on first appearance and after transitions. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Initial and First appearance. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Initial affect in this exercise? Input case: First mount and state changes.
2. Variable to change: initial. Hypothesis to test: The initial entrance is skipped, while subsequent state transitions remain. Did the actual results agree with the hypothesis? Explain your evidence in terms of First appearance.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Initial and Animate experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: State-Based Animation](../../01-foundations/README.md) · [Next: Configuring Transition](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

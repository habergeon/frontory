# Motion · 24 UseAnimate Cleanup

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating a Motion System · Editable example · Storage ID: `motion-step-24`

## Goals and learning outcomes

- Learning outcome: Explain the role of Scope. Input case: Running and removing midway.
- Deliverable: Completion logs and a record of work after removal. Connect your rationale for handling Asynchronous order to the code.

## Prerequisites

Prepare the results of the InView and Once exercises from Unit 23, “In-View Animation”.

## Key concepts and explanations

### Scope

useAnimate controls elements inside its scope. Ownership is clearer than with global selectors.

### Asynchronous order

Use await to sequence motion. Also check whether subsequent work remains valid after unmount.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-24.tsx of a separate exercise project, use useAnimate to sequence a heading followed by cards, and unmount midway. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Running and removing midway. Baseline: After completion. Run under the baseline condition, then record observations and errors in notes/day-24.md.
3. Variable to change: Removal time; new value: During the first action. Run again with the same input path. Deliverable to save: Completion logs and a record of work after removal. Hypothesis to test: No UI updates remain after removal. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable     | Baseline         | Change                  | Expected change / hypothesis        |
| ------------ | ---------------- | ----------------------- | ----------------------------------- |
| Removal time | After completion | During the first action | No UI updates remain after removal. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Completion logs and a record of work after removal. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Scope and Asynchronous order. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Scope affect in this exercise? Input case: Running and removing midway.
2. Variable to change: Removal time. Hypothesis to test: No UI updates remain after removal. Did the actual results agree with the hypothesis? Explain your evidence in terms of Asynchronous order.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive UseAnimate Cleanup experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: In-View Animation](../23/README.md) · [Next: Reduced Motion Policy](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Motion · 27 Remounting and State Restoration

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating a Motion System · Editable example · Storage ID: `motion-step-27`

## Goals and learning outcomes

- Learning outcome: Explain the role of Lifetime. Input case: Hiding and showing after reordering.
- Deliverable: A table of order, subscriptions, and focus restoration. Connect your rationale for handling Restoration to the code.

## Prerequisites

Prepare the results of the Render cost and Measurement exercises from Unit 26, “Observing Renders and Performance”.

## Key concepts and explanations

### Lifetime

Removing a component ends the lifetime of its subscriptions and motion. Decide separately where data is stored.

### Restoration

Decide whether the previous order should remain when the component reappears. Do not overuse key changes as an arbitrary reset mechanism.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-27.tsx of a separate exercise project, connect a board visibility toggle to order state above the board and remount 5 times. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Hiding and showing after reordering. Baseline: Inside the card. Run under the baseline condition, then record observations and errors in notes/day-27.md.
3. Variable to change: State location; new value: Above the board. Run again with the same input path. Deliverable to save: A table of order, subscriptions, and focus restoration. Hypothesis to test: The order is preserved after the board reappears. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| State location | Inside the card | Above the board | The order is preserved after the board reappears. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of order, subscriptions, and focus restoration. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Lifetime and Restoration. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Lifetime affect in this exercise? Input case: Hiding and showing after reordering.
2. Variable to change: State location. Hypothesis to test: The order is preserved after the board reappears. Did the actual results agree with the hypothesis? Explain your evidence in terms of Restoration.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Remounting and State Restoration experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Observing Renders and Performance](../26/README.md) · [Next: Gestures and Accessibility](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

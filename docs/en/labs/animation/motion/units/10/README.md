# Motion · 10 AnimatePresence Basics

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Layout and Presence · Editable example · Storage ID: `motion-step-10`

## Goals and learning outcomes

- Learning outcome: Explain the role of Presence. Input case: Showing and deleting a card.
- Deliverable: The times of the deletion request and DOM removal. Connect your rationale for handling Boundary placement to the code.

## Prerequisites

Prepare the results of the Identity and Local state exercises from Unit 9, “Stable Keys”.

## Key concepts and explanations

### Presence

Conditional removal and the moment an element disappears from the screen are different. AnimatePresence keeps the element present during exit.

### Boundary placement

If Presence itself is removed at the same time, it is difficult to manage child exit. Place the boundary outside the removal condition.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-10.tsx of a separate exercise project, conditionally render a motion card with a key inside AnimatePresence. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Showing and deleting a card. Baseline: 0 seconds. Run under the baseline condition, then record observations and errors in notes/day-10.md.
3. Variable to change: exit duration; new value: 0.5 seconds. Run again with the same input path. Deliverable to save: The times of the deletion request and DOM removal. Hypothesis to test: The DOM remains briefly after removal from the data. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| exit duration | 0 seconds | 0.5 seconds | The DOM remains briefly after removal from the data. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: The times of the deletion request and DOM removal. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Presence and Boundary placement. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Presence affect in this exercise? Input case: Showing and deleting a card.
2. Variable to change: exit duration. Hypothesis to test: The DOM remains briefly after removal from the data. Did the actual results agree with the hypothesis? Explain your evidence in terms of Boundary placement.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive AnimatePresence Basics experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Stable Keys](../09/README.md) · [Next: Presence Modes](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

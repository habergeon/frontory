# Motion · 17 Drag Coordinates and Bounds

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Gestures and Equivalent Interaction · Editable example · Storage ID: `motion-step-17`

## Goals and learning outcomes

- Learning outcome: Explain the role of Drag. Input case: Moving beyond the left and right bounds.
- Deliverable: A table of final x values and container widths. Connect your rationale for handling Constraints to the code.

## Prerequisites

Prepare the results of the Pressed state and Functional events exercises from Unit 16, “Tap Feedback”.

## Key concepts and explanations

### Drag

drag connects pointer movement to coordinate changes. Restricting movement to the x axis is distinct from movement along y.

### Constraints

Bounds define the draggable range. A ref-based range is useful in a responsive container.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-17.tsx of a separate exercise project, set drag=x and a dragConstraints ref. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Moving beyond the left and right bounds. Baseline: 500px. Run under the baseline condition, then record observations and errors in notes/day-17.md.
3. Variable to change: Container width; new value: 280px. Run again with the same input path. Deliverable to save: A table of final x values and container widths. Hypothesis to test: The card stays within the new bounds. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Container width | 500px | 280px | The card stays within the new bounds. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of final x values and container widths. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Drag and Constraints. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Drag affect in this exercise? Input case: Moving beyond the left and right bounds.
2. Variable to change: Container width. Hypothesis to test: The card stays within the new bounds. Did the actual results agree with the hypothesis? Explain your evidence in terms of Constraints.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Drag Coordinates and Bounds experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Tap Feedback](../16/README.md) · [Next: Inertia and Elasticity](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

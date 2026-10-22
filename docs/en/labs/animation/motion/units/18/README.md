# Motion · 18 Inertia and Elasticity

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Gestures and Equivalent Interaction · Editable example · Storage ID: `motion-step-18`

## Goals and learning outcomes

- Learning outcome: Explain the role of Momentum. Input case: Short drags in the same direction.
- Deliverable: A table of positions at pointer release and after settling. Connect your rationale for handling Elastic to the code.

## Prerequisites

Prepare the results of the Drag and Constraints exercises from Unit 17, “Drag Coordinates and Bounds”.

## Key concepts and explanations

### Momentum

Inertia can continue after a drag ends. The drop completion time differs from the time movement stops.

### Elastic

elastic controls how far an element can be pulled beyond its bounds. Do not confuse this allowance with data coordinates.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-18.tsx of a separate exercise project, combine dragMomentum and dragElastic and record the end coordinates. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Short drags in the same direction. Baseline: true. Run under the baseline condition, then record observations and errors in notes/day-18.md.
3. Variable to change: momentum; new value: false. Run again with the same input path. Deliverable to save: A table of positions at pointer release and after settling. Hypothesis to test: Additional movement after release decreases. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| momentum | true | false | Additional movement after release decreases. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of positions at pointer release and after settling. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Momentum and Elastic. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Momentum affect in this exercise? Input case: Short drags in the same direction.
2. Variable to change: momentum. Hypothesis to test: Additional movement after release decreases. Did the actual results agree with the hypothesis? Explain your evidence in terms of Elastic.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Inertia and Elasticity experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Drag Coordinates and Bounds](../17/README.md) · [Next: Reordering with Buttons](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

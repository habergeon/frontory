# Motion · 01 State-Based Animation

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: State and Transition · Editable example · Storage ID: `motion-01`

## Goals and learning outcomes

- Learning outcome: Explain the role of Target state. Input case: Selecting and deselecting a card.
- Deliverable: A table of state values and final opacity and x values. Connect your rationale for handling API boundary to the code.

## Prerequisites

Understand React state and CSS transform, and be able to read the inputs and outputs of the existing starter example.

## Key concepts and explanations

### Target state

UI state determines the target values. There is no need to store intermediate frames in React state.

### API boundary

The existing preview uses the Motion JS animate API. The React exercises use motion/react in a separate project.

## Practice setup

The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-1.tsx of a separate exercise project, install motion in a React project and connect motion.div animate to the selected state. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Selecting and deselecting a card. Baseline: 0.3 seconds. Run under the baseline condition, then record observations and errors in notes/day-1.md.
3. Variable to change: duration; new value: 0.8 seconds. Run again with the same input path. Deliverable to save: A table of state values and final opacity and x values. Hypothesis to test: The final state stays the same, while only the intermediate transition takes longer. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline    | Change      | Expected change / hypothesis                                                         |
| -------- | ----------- | ----------- | ------------------------------------------------------------------------------------ |
| duration | 0.3 seconds | 0.8 seconds | The final state stays the same, while only the intermediate transition takes longer. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of state values and final opacity and x values. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Target state and API boundary. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Target state affect in this exercise? Input case: Selecting and deselecting a card.
2. Variable to change: duration. Hypothesis to test: The final state stays the same, while only the intermediate transition takes longer. Did the actual results agree with the hypothesis? Explain your evidence in terms of API boundary.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../src/labs/motion-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Initial and Animate](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

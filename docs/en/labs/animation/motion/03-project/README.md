# Motion · 28 Gestures and Accessibility

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Validating a Motion System · Editable example · Storage ID: `motion-03`

## Goals and learning outcomes

- Learning outcome: Explain the role of Equivalent functionality. Input case: Reordering without a pointer, consecutive deletions, and reduce.
- Deliverable: A validation report of ID arrays, focus, and content for each input. Connect your rationale for handling Comprehensive validation to the code.

## Prerequisites

Prepare the results of the Lifetime and Restoration exercises from Unit 27, “Remounting and State Restoration”.

## Key concepts and explanations

### Equivalent functionality

drag and hover must not be the only means of interaction. Provide the same result through buttons and the keyboard.

### Comprehensive validation

Reduced motion simplifies movement. Final data, focus, and announcements must remain.

## Practice setup

The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-28.tsx of a separate exercise project, complete a React card board, referring to the intent of the existing motion-03 JS example. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Reordering without a pointer, consecutive deletions, and reduce. Baseline: drag. Run under the baseline condition, then record observations and errors in notes/day-28.md.
3. Variable to change: Interaction method; new value: Keyboard buttons. Run again with the same input path. Deliverable to save: A validation report of ID arrays, focus, and content for each input. Hypothesis to test: The same completed state can be verified. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable           | Baseline | Change           | Expected change / hypothesis              |
| ------------------ | -------- | ---------------- | ----------------------------------------- |
| Interaction method | drag     | Keyboard buttons | The same completed state can be verified. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A validation report of ID arrays, focus, and content for each input. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Equivalent functionality and Comprehensive validation. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Equivalent functionality affect in this exercise? Input case: Reordering without a pointer, consecutive deletions, and reduce.
2. Variable to change: Interaction method. Hypothesis to test: The same completed state can be verified. Did the actual results agree with the hypothesis? Explain your evidence in terms of Comprehensive validation.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../src/labs/motion-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Remounting and State Restoration](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

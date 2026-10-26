# Motion · 15 Hover and Focus

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Gestures and Equivalent Interaction · Editable example · Storage ID: `motion-step-15`

## Goals and learning outcomes

- Learning outcome: Explain the role of Pointer state. Input case: Mouse entry and Tab.
- Deliverable: A table of emphasis and selection indicators for both inputs. Connect your rationale for handling Focus to the code.

## Prerequisites

Prepare the results of the Sorting and removal and Identity exercises from Unit 14, “Layout and Exit”.

## Key concepts and explanations

### Pointer state

whileHover provides pointer feedback. Touch and keyboard inputs may not have the same event.

### Focus

whileFocus and focus-visible styles make the keyboard path visible. Do not communicate selected state through visual effects alone.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-15.tsx of a separate exercise project, add whileHover, whileFocus, and explicit selection text to card buttons. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Mouse entry and Tab. Baseline: Pointer. Run under the baseline condition, then record observations and errors in notes/day-15.md.
3. Variable to change: Input; new value: Keyboard. Run again with the same input path. Deliverable to save: A table of emphasis and selection indicators for both inputs. Hypothesis to test: The keyboard also makes the interaction target identifiable. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change   | Expected change / hypothesis                                 |
| -------- | -------- | -------- | ------------------------------------------------------------ |
| Input    | Pointer  | Keyboard | The keyboard also makes the interaction target identifiable. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of emphasis and selection indicators for both inputs. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Pointer state and Focus. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Pointer state affect in this exercise? Input case: Mouse entry and Tab.
2. Variable to change: Input. Hypothesis to test: The keyboard also makes the interaction target identifiable. Did the actual results agree with the hypothesis? Explain your evidence in terms of Focus.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Hover and Focus experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Layout and Exit](../../02-experiments/README.md) · [Next: Tap Feedback](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

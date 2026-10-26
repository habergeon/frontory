# Motion · 09 Stable Keys

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Layout and Presence · Editable example · Storage ID: `motion-step-09`

## Goals and learning outcomes

- Learning outcome: Explain the role of Identity. Input case: Different notes on each card.
- Deliverable: An ID-to-note mapping table before and after sorting. Connect your rationale for handling Local state to the code.

## Prerequisites

Prepare the results of the Layout and Transform interpolation exercises from Unit 8, “Measuring Layout”.

## Key concepts and explanations

### Identity

A React key represents an item's identity. An array index can refer to a different item after reordering.

### Local state

An input value must stay with its card. Data associations need separate validation even when the animation looks natural.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-9.tsx of a separate exercise project, add input fields to ID key and index key lists, then sort them. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Different notes on each card. Baseline: index. Run under the baseline condition, then record observations and errors in notes/day-9.md.
3. Variable to change: key; new value: item.id. Run again with the same input path. Deliverable to save: An ID-to-note mapping table before and after sorting. Hypothesis to test: Notes stay with the correct cards. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change  | Expected change / hypothesis       |
| -------- | -------- | ------- | ---------------------------------- |
| key      | index    | item.id | Notes stay with the correct cards. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: An ID-to-note mapping table before and after sorting. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Identity and Local state. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Identity affect in this exercise? Input case: Different notes on each card.
2. Variable to change: key. Hypothesis to test: Notes stay with the correct cards. Did the actual results agree with the hypothesis? Explain your evidence in terms of Local state.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Stable Keys experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Measuring Layout](../08/README.md) · [Next: AnimatePresence Basics](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

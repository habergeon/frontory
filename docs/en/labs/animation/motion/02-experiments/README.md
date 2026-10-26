# Motion · 14 Layout and Exit

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Layout and Presence · Editable example · Storage ID: `motion-02`

## Goals and learning outcomes

- Learning outcome: Explain the role of Sorting and removal. Input case: 5 cards with different notes.
- Deliverable: An ID, note, and DOM table after sorting and consecutive deletions. Connect your rationale for handling Identity to the code.

## Prerequisites

Prepare the results of the DOM lifetime and Focus restoration exercises from Unit 13, “Focus During Deletion”.

## Key concepts and explanations

### Sorting and removal

layout handles changes in position. exit handles the lifetime of elements being removed.

### Identity

A stable key preserves card state. Rapid consecutive deletions cause exits and sorting at the same time.

## Practice setup

The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-14.tsx of a separate exercise project, create a sortable, deletable list with layout, AnimatePresence, and an ID key in a separate React app. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: 5 cards with different notes. Baseline: index. Run under the baseline condition, then record observations and errors in notes/day-14.md.
3. Variable to change: key; new value: item.id. Run again with the same input path. Deliverable to save: An ID, note, and DOM table after sorting and consecutive deletions. Hypothesis to test: The state of remaining cards does not get mixed up. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change  | Expected change / hypothesis                        |
| -------- | -------- | ------- | --------------------------------------------------- |
| key      | index    | item.id | The state of remaining cards does not get mixed up. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: An ID, note, and DOM table after sorting and consecutive deletions. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Sorting and removal and Identity. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Sorting and removal affect in this exercise? Input case: 5 cards with different notes.
2. Variable to change: key. Hypothesis to test: The state of remaining cards does not get mixed up. Did the actual results agree with the hypothesis? Explain your evidence in terms of Identity.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../src/labs/motion-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Focus During Deletion](../units/13/README.md) · [Next: Hover and Focus](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Motion · 13 Focus During Deletion

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Layout and Presence · Editable example · Storage ID: `motion-step-13`

## Goals and learning outcomes

- Learning outcome: Explain the role of DOM lifetime. Input case: Deleting the first, middle, and last cards.
- Deliverable: A record of activeElement for each deletion position. Connect your rationale for handling Focus restoration to the code.

## Prerequisites

Prepare the results of the Visual connection and Separating regions exercises from Unit 12, “Sharing LayoutId”.

## Key concepts and explanations

### DOM lifetime

An element undergoing exit can remain on screen. Decide whether a card removed from the data should still allow interaction.

### Focus restoration

Move focus from the deleted button to the next valid location. Waiting only for the animation to finish leaves a gap in interaction.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-13.tsx of a separate exercise project, add a ref to each delete button and move focus to the next card or the add button. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Deleting the first, middle, and last cards. Baseline: Middle. Run under the baseline condition, then record observations and errors in notes/day-13.md.
3. Variable to change: Deletion position; new value: Last. Run again with the same input path. Deliverable to save: A record of activeElement for each deletion position. Hypothesis to test: Focus moves to a remaining valid control. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Deletion position | Middle | Last | Focus moves to a remaining valid control. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A record of activeElement for each deletion position. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: DOM lifetime and Focus restoration. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does DOM lifetime affect in this exercise? Input case: Deleting the first, middle, and last cards.
2. Variable to change: Deletion position. Hypothesis to test: Focus moves to a remaining valid control. Did the actual results agree with the hypothesis? Explain your evidence in terms of Focus restoration.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Focus During Deletion experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Sharing LayoutId](../12/README.md) · [Next: Layout and Exit](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# Motion · 22 Scroll-Linked Animation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating a Motion System · Editable example · Storage ID: `motion-step-22`

## Goals and learning outcomes

- Learning outcome: Explain the role of UseScroll. Input case: Scrolling to the top, middle, and bottom.
- Deliverable: Progress values and indicator lengths. Connect your rationale for handling Offset to the code.

## Prerequisites

Prepare the results of the Derived values and Following values exercises from Unit 21, “Connecting Transform and Spring”.

## Key concepts and explanations

### UseScroll

useScroll provides scroll progress as a MotionValue. Distinguish viewport-based and target-based measurements.

### Offset

offset defines the intersections for the measured interval. Check that long content can be read through to the end.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-22.tsx of a separate exercise project, build a reading progress indicator with a useScroll target and useTransform. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Scrolling to the top, middle, and bottom. Baseline: start end·end start. Run under the baseline condition, then record observations and errors in notes/day-22.md.
3. Variable to change: offset; new value: start start·end end. Run again with the same input path. Deliverable to save: Progress values and indicator lengths. Hypothesis to test: The start and end of the progress interval change. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline            | Change              | Expected change / hypothesis                       |
| -------- | ------------------- | ------------------- | -------------------------------------------------- |
| offset   | start end·end start | start start·end end | The start and end of the progress interval change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: Progress values and indicator lengths. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: UseScroll and Offset. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does UseScroll affect in this exercise? Input case: Scrolling to the top, middle, and bottom.
2. Variable to change: offset. Hypothesis to test: The start and end of the progress interval change. Did the actual results agree with the hypothesis? Explain your evidence in terms of Offset.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Scroll-Linked Animation experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Connecting Transform and Spring](../21/README.md) · [Next: In-View Animation](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

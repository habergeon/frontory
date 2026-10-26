# Motion · 23 In-View Animation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validating a Motion System · Editable example · Storage ID: `motion-step-23`

## Goals and learning outcomes

- Learning outcome: Explain the role of InView. Input case: Scrolling into and out of view 3 times.
- Deliverable: The execution count for each repetition. Connect your rationale for handling Once to the code.

## Prerequisites

Prepare the results of the UseScroll and Offset exercises from Unit 22, “Scroll-Linked Animation”.

## Key concepts and explanations

### InView

In-view detection concerns the conditions under which an element is visible. It does not mean the same thing as whether it is rendered.

### Once

once limits execution to the first entrance. Match it to the intent of content shown repeatedly.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-23.tsx of a separate exercise project, configure whileInView and viewport.once. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: Scrolling into and out of view 3 times. Baseline: false. Run under the baseline condition, then record observations and errors in notes/day-23.md.
3. Variable to change: once; new value: true. Run again with the same input path. Deliverable to save: The execution count for each repetition. Hypothesis to test: Repeated motion is skipped from the second entrance onward. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                |
| -------- | -------- | ------ | ----------------------------------------------------------- |
| once     | false    | true   | Repeated motion is skipped from the second entrance onward. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: The execution count for each repetition. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: InView and Once. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does InView affect in this exercise? Input case: Scrolling into and out of view 3 times.
2. Variable to change: once. Hypothesis to test: Repeated motion is skipped from the second entrance onward. Did the actual results agree with the hypothesis? Explain your evidence in terms of Once.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive In-View Animation experiment with cleanup of the resources used.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scroll-Linked Animation](../22/README.md) · [Next: UseAnimate Cleanup](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

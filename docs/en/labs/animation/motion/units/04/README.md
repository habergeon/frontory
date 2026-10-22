# Motion · 04 Physical Spring Parameters

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: State and Transition · Editable example · Storage ID: `motion-step-04`

## Goals and learning outcomes

- Learning outcome: Explain the role of Stiffness. Input case: x=0 and x=160.
- Deliverable: A record of overshoot and settling observations. Connect your rationale for handling Damping to the code.

## Prerequisites

Prepare the results of the Tween and Per-property settings exercises from Unit 3, “Configuring Transition”.

## Key concepts and explanations

### Stiffness

stiffness relates to the force that returns an element to its target. Increasing it changes the response.

### Damping

damping suppresses oscillation. Do not conflate duration-based spring settings with physical settings.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-4.tsx of a separate exercise project, specify stiffness and damping with type:spring and switch the target. Use the existing Unit 1·14·28 examples only as starting points.
2. Input condition: x=0 and x=160. Baseline: 10. Run under the baseline condition, then record observations and errors in notes/day-4.md.
3. Variable to change: damping; new value: 30. Run again with the same input path. Deliverable to save: A record of overshoot and settling observations. Hypothesis to test: Oscillation tends to decrease. Compare it with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| damping | 10 | 30 | Oscillation tends to decrease. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A record of overshoot and settling observations. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Your explanation of the differences between the two conditions connects both concepts: Stiffness and Damping. For unexpected items, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Stiffness affect in this exercise? Input case: x=0 and x=160.
2. Variable to change: damping. Hypothesis to test: Oscillation tends to decrease. Did the actual results agree with the hypothesis? Explain your evidence in terms of Damping.

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Physical Spring Parameters experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Configuring Transition](../03/README.md) · [Next: Keyframes](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

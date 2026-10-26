# GSAP · 18 Keyboard Step Navigation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Input and accessibility · Editable example · Storage ID: `gsap-step-18`

## Goals and learning outcomes

- Learning outcome: explain the role of Equivalent Operation. Input case: mouse and keyboard navigation.
- Deliverable: a table of the current step and activeElement. Explain the rationale for handling Focus, connecting it to the code.

## Prerequisites

Prepare the exercise results on Input Frequency and QuickTo from Unit 17, “Pointer and QuickTo”.

## Key concepts and explanations

### Equivalent Operation

A native button supports Enter and Space. The same step must be reachable without a pointer.

### Focus

Screen movement and focus movement are separate. Do not leave focus in a hidden step.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-18.js of a separate practice project, use previous and next buttons to update the timeline label and current heading. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: mouse and keyboard navigation. Baseline: mouse. Run under baseline conditions, then record observations and errors in notes/day-18.md.
3. Variable: Input; changed value: keyboard. Run again using the same input path. Deliverable to save: a table of the current step and activeElement. Hypothesis to check: The same step is reached, and focus is preserved. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change   | Expected change / hypothesis                      |
| -------- | -------- | -------- | ------------------------------------------------- |
| Input    | mouse    | keyboard | The same step is reached, and focus is preserved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of the current step and activeElement. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Equivalent Operation, Focus. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Equivalent Operation affect in this exercise? Input case: mouse and keyboard navigation.
2. Variable: Input. Hypothesis to check: The same step is reached, and focus is preserved. Did the actual results match the hypothesis? Explain the evidence in terms of Focus.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Keyboard Step Navigation. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Pointer and QuickTo](../17/README.md) · [Next: Reduced-Motion Alternatives](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

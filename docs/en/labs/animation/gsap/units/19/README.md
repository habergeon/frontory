# GSAP · 19 Reduced-Motion Alternatives

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Input and accessibility · Editable example · Storage ID: `gsap-step-19`

## Goals and learning outcomes

- Learning outcome: explain the role of User Preference. Input case: three step transitions.
- Deliverable: a table of step content and button operation. Explain the rationale for handling Immediate State, connecting it to the code.

## Prerequisites

Prepare the exercise results on Equivalent Operation and Focus from Unit 18, “Keyboard Step Navigation”.

## Key concepts and explanations

### User Preference

Reduced motion signals that large movements should be reduced. It does not mean removing the information itself.

### Immediate State

Apply the final state even when motion is skipped. Functionality placed only in a completion callback may be missed.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-19.js of a separate practice project, apply final styles with gsap.set in the reduced-motion branch. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: three step transitions. Baseline: 180px. Run under baseline conditions, then record observations and errors in notes/day-19.md.
3. Variable: Movement Distance; changed value: 0px. Run again using the same input path. Deliverable to save: a table of step content and button operation. Hypothesis to check: Content and completion state are preserved. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable          | Baseline | Change | Expected change / hypothesis                |
| ----------------- | -------- | ------ | ------------------------------------------- |
| Movement Distance | 180px    | 0px    | Content and completion state are preserved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of step content and button operation. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: User Preference, Immediate State. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does User Preference affect in this exercise? Input case: three step transitions.
2. Variable: Movement Distance. Hypothesis to check: Content and completion state are preserved. Did the actual results match the hypothesis? Explain the evidence in terms of Immediate State.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Reduced-Motion Alternatives. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Keyboard Step Navigation](../18/README.md) · [Next: Completion Callbacks and Interruption](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

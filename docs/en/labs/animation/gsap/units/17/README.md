# GSAP · 17 Pointer and QuickTo

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Input and accessibility · Editable example · Storage ID: `gsap-step-17`

## Goals and learning outcomes

- Learning outcome: explain the role of Input Frequency. Input case: input at the center and corners.
- Deliverable: a table of target and final coordinates. Explain the rationale for handling QuickTo, connecting it to the code.

## Prerequisites

Prepare the exercise results on Contention and Overwrite from Unit 16, “Repeated Input and Overwrite”.

## Key concepts and explanations

### Input Frequency

pointermove occurs frequently. Examine the cost of creating a new tween on every event.

### QuickTo

quickTo handles repeated target changes. First convert coordinates to be relative to the container.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-17.js of a separate practice project, use getBoundingClientRect and gsap.quickTo to implement pointer following. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: input at the center and corners. Baseline: 0.2 seconds. Run under baseline conditions, then record observations and errors in notes/day-17.md.
3. Variable: duration; changed value: 0.8 seconds. Run again using the same input path. Deliverable to save: a table of target and final coordinates. Hypothesis to check: Only tracking lag increases; the final target stays the same. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| duration | 0.2 seconds | 0.8 seconds | Only tracking lag increases; the final target stays the same. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of target and final coordinates. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Input Frequency, QuickTo. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Input Frequency affect in this exercise? Input case: input at the center and corners.
2. Variable: duration. Hypothesis to check: Only tracking lag increases; the final target stays the same. Did the actual results match the hypothesis? Explain the evidence in terms of QuickTo.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Pointer and QuickTo. It supports direct interaction and cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Repeated Input and Overwrite](../16/README.md) · [Next: Keyboard Step Navigation](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

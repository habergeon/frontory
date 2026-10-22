# GSAP · 16 Repeated Input and Overwrite

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Input and accessibility · Editable example · Storage ID: `gsap-step-16`

## Goals and learning outcomes

- Learning outcome: explain the role of Contention. Input case: 10 alternating clicks.
- Deliverable: the latest target and final x value. Explain the rationale for handling Overwrite, connecting it to the code.

## Prerequisites

Prepare the exercise results on Responsive Motion and Distance Units from Unit 15, “MatchMedia Branches”.

## Key concepts and explanations

### Contention

Targets conflict when multiple tweens write the same property. Decide first whether the latest input takes priority.

### Overwrite

overwrite:auto clears conflicting properties. There is no need to stop motion on independent properties too.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-16.js of a separate practice project, apply overwrite:auto to the x tweens for the left and right buttons. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 10 alternating clicks. Baseline: 800ms. Run under baseline conditions, then record observations and errors in notes/day-16.md.
3. Variable: Input Interval; changed value: 80ms. Run again using the same input path. Deliverable to save: the latest target and final x value. Hypothesis to check: The final target is reached even with rapid input. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input Interval | 800ms | 80ms | The final target is reached even with rapid input. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: the latest target and final x value. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Contention, Overwrite. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Contention affect in this exercise? Input case: 10 alternating clicks.
2. Variable: Input Interval. Hypothesis to check: The final target is reached even with rapid input. Did the actual results match the hypothesis? Explain the evidence in terms of Overwrite.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Repeated Input and Overwrite. It supports direct interaction and cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: MatchMedia Branches](../15/README.md) · [Next: Pointer and QuickTo](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

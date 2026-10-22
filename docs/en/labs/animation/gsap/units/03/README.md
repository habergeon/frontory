# GSAP · 03 The Time Curve of Ease

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tweens and the time model · Editable example · Storage ID: `gsap-step-03`

## Goals and learning outcomes

- Learning outcome: explain the role of Normalized Time. Input case: 0·0.25·0.5·0.75·1.
- Deliverable: a table of positions at each progress value. Explain the rationale for handling Speed Distribution, connecting it to the code.

## Prerequisites

Prepare the exercise results on from and to and Initial Rendering from Unit 2, “Starting and Target Values”.

## Key concepts and explanations

### Normalized Time

Progress expresses time from 0 to 1. ease changes the position at the same time.

### Speed Distribution

duration is the total length. ease distributes speed within it.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-3.js of a separate practice project, use gsap.parseEase to compare the outputs at five progress values with card positions. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 0·0.25·0.5·0.75·1. Baseline: none. Run under baseline conditions, then record observations and errors in notes/day-3.md.
3. Variable: ease; changed value: power2.inOut. Run again using the same input path. Deliverable to save: a table of positions at each progress value. Hypothesis to check: Movement is faster in the middle than at either end. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| ease | none | power2.inOut | Movement is faster in the middle than at either end. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of positions at each progress value. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Normalized Time, Speed Distribution. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Normalized Time affect in this exercise? Input case: 0·0.25·0.5·0.75·1.
2. Variable: ease. Hypothesis to check: Movement is faster in the middle than at either end. Did the actual results match the hypothesis? Explain the evidence in terms of Speed Distribution.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on The Time Curve of Ease. It supports direct interaction and cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Starting and target values](../02/README.md) · [Next: Transform and Layout](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

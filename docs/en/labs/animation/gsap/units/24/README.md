# GSAP · 24 Measuring Frame Cost

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion system verification · Editable example · Storage ID: `gsap-step-24`

## Goals and learning outcomes

- Learning outcome: explain the role of Long Frames. Input case: 20 cards and 200 cards.
- Deliverable: frame distribution and input response records. Explain the rationale for handling Recording Conditions, connecting it to the code.

## Prerequisites

Prepare the exercise results on Object Values and Ticker from Unit 23, “Interpolating Canvas Objects”.

## Key concepts and explanations

### Long Frames

Average time can hide momentary stutters. Examine frame distribution and input latency together.

### Recording Conditions

The device and target count affect results. Do not claim a performance improvement without actual measurements.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-24.js of a separate practice project, save Performance recordings of the same timeline for each target count. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 20 cards and 200 cards. Baseline: 20 cards. Run under baseline conditions, then record observations and errors in notes/day-24.md.
3. Variable: Target Count; changed value: 200 cards. Run again using the same input path. Deliverable to save: frame distribution and input response records. Hypothesis to check: Long frames may increase. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable     | Baseline | Change    | Expected change / hypothesis |
| ------------ | -------- | --------- | ---------------------------- |
| Target Count | 20 cards | 200 cards | Long frames may increase.    |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: frame distribution and input response records. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Long Frames, Recording Conditions. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Long Frames affect in this exercise? Input case: 20 cards and 200 cards.
2. Variable: Target Count. Hypothesis to check: Long frames may increase. Did the actual results match the hypothesis? Explain the evidence in terms of Recording Conditions.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Measuring Frame Cost. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Interpolating Canvas Objects](../23/README.md) · [Next: Hiding and Returning](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# GSAP · 25 Hiding and Returning

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion system verification · Editable example · Storage ID: `gsap-step-25`

## Goals and learning outcomes

- Learning outcome: explain the role of Background. Input case: returning after hiding the tab.
- Deliverable: progress logs before and after returning. Explain the rationale for handling Resume Policy, connecting it to the code.

## Prerequisites

Prepare the exercise results on Long Frames and Recording Conditions from Unit 24, “Measuring Frame Cost”.

## Key concepts and explanations

### Background

Frames may be limited in a hidden document. A timing policy is needed on return.

### Resume Policy

Resuming playback and moving to the final state are different choices. Do not confuse them with data completion state.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-25.js of a separate practice project, connect pause and the return policy to visibilitychange. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: returning after hiding the tab. Baseline: resume playback. Run under baseline conditions, then record observations and errors in notes/day-25.md.
3. Variable: Policy; changed value: final state. Run again using the same input path. Deliverable to save: progress logs before and after returning. Hypothesis to check: Step data is preserved even if progress differs. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline        | Change      | Expected change / hypothesis                     |
| -------- | --------------- | ----------- | ------------------------------------------------ |
| Policy   | resume playback | final state | Step data is preserved even if progress differs. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: progress logs before and after returning. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Background, Resume Policy. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Background affect in this exercise? Input case: returning after hiding the tab.
2. Variable: Policy. Hypothesis to check: Step data is preserved even if progress differs. Did the actual results match the hypothesis? Explain the evidence in terms of Resume Policy.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Hiding and Returning. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Measuring Frame Cost](../24/README.md) · [Next: Motion Tokens](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

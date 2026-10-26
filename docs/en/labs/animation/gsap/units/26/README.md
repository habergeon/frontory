# GSAP · 26 Motion Tokens

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion system verification · Editable example · Storage ID: `gsap-step-26`

## Goals and learning outcomes

- Learning outcome: explain the role of Meaning. Input case: the same button input across three steps.
- Deliverable: a table of token uses and settings. Explain the rationale for handling Impact of Changes, connecting it to the code.

## Prerequisites

Prepare the exercise results on Background and Resume Policy from Unit 25, “Hiding and Returning”.

## Key concepts and explanations

### Meaning

Give shared names to time and distance. There is no need to make every effect identical.

### Impact of Changes

Token changes propagate to their uses. Separate emphasis actions from brief feedback.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-26.js of a separate practice project, create a motionTokens object and apply short·emphasis. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the same button input across three steps. Baseline: 0.2 seconds. Run under baseline conditions, then record observations and errors in notes/day-26.md.
3. Variable: short Duration; changed value: 0.4 seconds. Run again using the same input path. Deliverable to save: a table of token uses and settings. Hypothesis to check: Only actions using short become longer. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable       | Baseline    | Change      | Expected change / hypothesis            |
| -------------- | ----------- | ----------- | --------------------------------------- |
| short Duration | 0.2 seconds | 0.4 seconds | Only actions using short become longer. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of token uses and settings. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Meaning, Impact of Changes. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Meaning affect in this exercise? Input case: the same button input across three steps.
2. Variable: short Duration. Hypothesis to check: Only actions using short become longer. Did the actual results match the hypothesis? Explain the evidence in terms of Impact of Changes.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Motion Tokens. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Hiding and Returning](../25/README.md) · [Next: Cleanup on Failure Paths](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

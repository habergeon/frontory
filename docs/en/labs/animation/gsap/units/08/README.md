# GSAP · 08 Context and Restoration

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scrolling and lifecycle · Editable example · Storage ID: `gsap-step-08`

## Goals and learning outcomes

- Learning outcome: explain the role of Context. Input case: a card with an existing inline transform.
- Deliverable: a style table before and after mounting. Explain the rationale for handling Revert, connecting it to the code.

## Prerequisites

Prepare the exercise results on Progress and Synchronization from Unit 7, “Playback Controls”.

## Key concepts and explanations

### Context

context groups the animations it creates. A container can limit the scope of selectors.

### Revert

revert restores previous styles. kill alone does not guarantee the same restoration.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-8.js of a separate practice project, create gsap.context in mount and connect revert to dispose. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a card with an existing inline transform. Baseline: kill. Run under baseline conditions, then record observations and errors in notes/day-8.md.
3. Variable: Cleanup Method; changed value: revert. Run again using the same input path. Deliverable to save: a style table before and after mounting. Hypothesis to check: The previous inline styles are restored. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Cleanup Method | kill | revert | The previous inline styles are restored. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a style table before and after mounting. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Context, Revert. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Context affect in this exercise? Input case: a card with an existing inline transform.
2. Variable: Cleanup Method. Hypothesis to check: The previous inline styles are restored. Did the actual results match the hypothesis? Explain the evidence in terms of Revert.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Context and Restoration. It supports direct interaction and cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Playback Controls](../07/README.md) · [Next: Connecting Native Scroll](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

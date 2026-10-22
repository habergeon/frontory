# GSAP · 27 Cleanup on Failure Paths

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion system verification · Editable example · Storage ID: `gsap-step-27`

## Goals and learning outcomes

- Learning outcome: explain the role of Resource Inventory. Input case: normal execution·exceptions·duplicate dispose.
- Deliverable: remaining registration counts for each path. Explain the rationale for handling Repeated Disposal, connecting it to the code.

## Prerequisites

Prepare the exercise results on Meaning and Impact of Changes from Unit 26, “Motion Tokens”.

## Key concepts and explanations

### Resource Inventory

Events·ticker·timeline each need cleanup. Initialization failure may also leave some resources behind.

### Repeated Disposal

dispose must be safe to call twice. Compare creation and cleanup counts.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-27.js of a separate practice project, inject an exception midway through mount and release registered resources in dispose. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: normal execution·exceptions·duplicate dispose. Baseline: normal. Run under baseline conditions, then record observations and errors in notes/day-27.md.
3. Variable: Initialization; changed value: exception midway. Run again using the same input path. Deliverable to save: remaining registration counts for each path. Hypothesis to check: No repeating work remains after failure. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Initialization | normal | exception midway | No repeating work remains after failure. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: remaining registration counts for each path. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Resource Inventory, Repeated Disposal. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Resource Inventory affect in this exercise? Input case: normal execution·exceptions·duplicate dispose.
2. Variable: Initialization. Hypothesis to check: No repeating work remains after failure. Did the actual results match the hypothesis? Explain the evidence in terms of Repeated Disposal.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Cleanup on Failure Paths. It supports direct interaction and cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Motion Tokens](../26/README.md) · [Next: Motion Design and Verification](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# GSAP · 20 Completion Callbacks and Interruption

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Input and accessibility · Editable example · Storage ID: `gsap-step-20`

## Goals and learning outcomes

- Learning outcome: explain the role of Meaning of Completion. Input case: selecting C during A→B.
- Deliverable: a log of callback IDs and the final step. Explain the rationale for handling Request Generation, connecting it to the code.

## Prerequisites

Prepare the exercise results on User Preference and Immediate State from Unit 19, “Reduced-Motion Alternatives”.

## Key concepts and explanations

### Meaning of Completion

onComplete signals completion of that motion. An interrupted action differs from successful completion.

### Request Generation

Reject stale callbacks using a transition ID. Distinguish visual state from domain state.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-20.js of a separate practice project, store a transition ID and check in onComplete whether it is the latest ID. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: selecting C during A→B. Baseline: none. Run under baseline conditions, then record observations and errors in notes/day-20.md.
3. Variable: Interruption; changed value: select C midway. Run again using the same input path. Deliverable to save: a log of callback IDs and the final step. Hypothesis to check: The B callback does not overwrite the C state. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Interruption | none | select C midway | The B callback does not overwrite the C state. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a log of callback IDs and the final step. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Meaning of Completion, Request Generation. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Meaning of Completion affect in this exercise? Input case: selecting C during A→B.
2. Variable: Interruption. Hypothesis to check: The B callback does not overwrite the C state. Did the actual results match the hypothesis? Explain the evidence in terms of Request Generation.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Completion Callbacks and Interruption. It supports direct interaction and cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reduced-Motion Alternatives](../19/README.md) · [Next: Nested Timelines](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

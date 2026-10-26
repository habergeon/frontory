# GSAP · 13 Refresh and Measurement Timing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scrolling and lifecycle · Editable example · Storage ID: `gsap-step-13`

## Goals and learning outcomes

- Learning outcome: explain the role of Layout Changes. Input case: an image that loads late.
- Deliverable: a table of boundary errors before and after loading. Explain the rationale for handling Refresh, connecting it to the code.

## Prerequisites

Prepare the exercise results on Pin and Focus from Unit 12, “Pin and Document Flow”.

## Key concepts and explanations

### Layout Changes

Images that load late change document positions. Boundaries become misaligned if only the initial measurements continue to be used.

### Refresh

refresh recalculates boundaries. There is no reason to call it on every scroll event.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-13.js of a separate practice project, call ScrollTrigger.refresh after the image load event. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: an image that loads late. Baseline: none. Run under baseline conditions, then record observations and errors in notes/day-13.md.
3. Variable: refresh; changed value: call after load. Run again using the same input path. Deliverable to save: a table of boundary errors before and after loading. Hypothesis to check: The difference between the actual position and the boundary decreases. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change          | Expected change / hypothesis                                           |
| -------- | -------- | --------------- | ---------------------------------------------------------------------- |
| refresh  | none     | call after load | The difference between the actual position and the boundary decreases. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of boundary errors before and after loading. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Layout Changes, Refresh. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Layout Changes affect in this exercise? Input case: an image that loads late.
2. Variable: refresh. Hypothesis to check: The difference between the actual position and the boundary decreases. Did the actual results match the hypothesis? Explain the evidence in terms of Refresh.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Refresh and Measurement Timing. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Pin and Document Flow](../12/README.md) · [Next: Scroll and Lifecycle](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

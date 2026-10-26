# GSAP · 05 Stagger Order

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tweens and the time model · Editable example · Storage ID: `gsap-step-05`

## Goals and learning outcomes

- Learning outcome: explain the role of Start Interval. Input case: 5 ID cards.
- Deliverable: a table of the start order for each card. Explain the rationale for handling Order, connecting it to the code.

## Prerequisites

Prepare the exercise results on Transform and Measurement from Unit 4, “Transform and Layout”.

## Key concepts and explanations

### Start Interval

stagger delays the start for each target. The total length increases with the number of targets.

### Order

The from option determines the starting target. DOM reading order and visual order are separate.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-5.js of a separate practice project, set stagger.each and from on the cards and record start times. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 5 ID cards. Baseline: start. Run under baseline conditions, then record observations and errors in notes/day-5.md.
3. Variable: from; changed value: center. Run again using the same input path. Deliverable to save: a table of the start order for each card. Hypothesis to check: The center card starts first, followed by the cards on either side. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                        |
| -------- | -------- | ------ | ------------------------------------------------------------------- |
| from     | start    | center | The center card starts first, followed by the cards on either side. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of the start order for each card. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Start Interval, Order. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Start Interval affect in this exercise? Input case: 5 ID cards.
2. Variable: from. Hypothesis to check: The center card starts first, followed by the cards on either side. Did the actual results match the hypothesis? Explain the evidence in terms of Order.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Stagger Order. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Transform and Layout](../04/README.md) · [Next: Labels and Overlap](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

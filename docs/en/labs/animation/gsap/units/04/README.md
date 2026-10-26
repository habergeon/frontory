# GSAP · 04 Transform and Layout

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tweens and the time model · Editable example · Storage ID: `gsap-step-04`

## Goals and learning outcomes

- Learning outcome: explain the role of Transform. Input case: 10 adjacent cards.
- Deliverable: a record of neighboring positions and layout events. Explain the rationale for handling Measurement, connecting it to the code.

## Prerequisites

Prepare the exercise results on Normalized Time and Speed Distribution from Unit 3, “The Time Curve of Ease”.

## Key concepts and explanations

### Transform

Movement along x preserves document flow. Changing width may affect the layout of neighboring elements.

### Measurement

Cost cannot be determined by the property name alone. Compare layout occurrences in Performance recordings.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-4.js of a separate practice project, create x and width animations and save recordings from the performance panel. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 10 adjacent cards. Baseline: x. Run under baseline conditions, then record observations and errors in notes/day-4.md.
3. Variable: Property; changed value: width. Run again using the same input path. Deliverable to save: a record of neighboring positions and layout events. Hypothesis to check: Neighboring layout and layout recordings may differ. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                         |
| -------- | -------- | ------ | ---------------------------------------------------- |
| Property | x        | width  | Neighboring layout and layout recordings may differ. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a record of neighboring positions and layout events. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Transform, Measurement. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Transform affect in this exercise? Input case: 10 adjacent cards.
2. Variable: Property. Hypothesis to check: Neighboring layout and layout recordings may differ. Did the actual results match the hypothesis? Explain the evidence in terms of Measurement.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Transform and Layout. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: The Time Curve of Ease](../03/README.md) · [Next: Stagger Order](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

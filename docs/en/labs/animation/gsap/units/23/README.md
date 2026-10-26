# GSAP · 23 Interpolating Canvas Objects

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion system verification · Editable example · Storage ID: `gsap-step-23`

## Goals and learning outcomes

- Learning outcome: explain the role of Object Values. Input case: start·stop·dispose.
- Deliverable: draw call counts and final coordinates. Explain the rationale for handling Ticker, connecting it to the code.

## Prerequisites

Prepare the exercise results on Attr and ViewBox from Unit 22, “Controlling SVG Attributes”.

## Key concepts and explanations

### Object Values

GSAP also interpolates plain object values. Canvas must be redrawn when values change.

### Ticker

Registering with ticker creates repeating work. Remove the same function in dispose.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-23.js of a separate practice project, tween a point’s x and draw Canvas with gsap.ticker.add/remove. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: start·stop·dispose. Baseline: 1 time. Run under baseline conditions, then record observations and errors in notes/day-23.md.
3. Variable: Remounts; changed value: 5 times. Run again using the same input path. Deliverable to save: draw call counts and final coordinates. Hypothesis to check: Drawing stops after disposal, with no duplicate registrations. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change  | Expected change / hypothesis                                   |
| -------- | -------- | ------- | -------------------------------------------------------------- |
| Remounts | 1 time   | 5 times | Drawing stops after disposal, with no duplicate registrations. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: draw call counts and final coordinates. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Object Values, Ticker. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Object Values affect in this exercise? Input case: start·stop·dispose.
2. Variable: Remounts. Hypothesis to check: Drawing stops after disposal, with no duplicate registrations. Did the actual results match the hypothesis? Explain the evidence in terms of Ticker.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Interpolating Canvas Objects. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Controlling SVG Attributes](../22/README.md) · [Next: Measuring Frame Cost](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

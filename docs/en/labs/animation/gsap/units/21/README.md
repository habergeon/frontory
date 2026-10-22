# GSAP · 21 Nested Timelines

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Input and accessibility · Editable example · Storage ID: `gsap-step-21`

## Goals and learning outcomes

- Learning outcome: explain the role of Composition. Input case: 3 cards and 6 cards.
- Deliverable: child start times and the total length. Explain the rationale for handling Defaults, connecting it to the code.

## Prerequisites

Prepare the exercise results on Meaning of Completion and Request Generation from Unit 20, “Completion Callbacks and Interruption”.

## Key concepts and explanations

### Composition

A child timeline is responsible for a small action. The parent determines their relative order.

### Defaults

defaults reduces repeated settings. Override special actions at the relevant location.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-21.js of a separate practice project, add timeline functions for the heading, cards, and guidance to the parent. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 3 cards and 6 cards. Baseline: 3 cards. Run under baseline conditions, then record observations and errors in notes/day-21.md.
3. Variable: Card Count; changed value: 6 cards. Run again using the same input path. Deliverable to save: child start times and the total length. Hypothesis to check: Changes to a child’s length are reflected in the parent’s length. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Card Count | 3 cards | 6 cards | Changes to a child’s length are reflected in the parent’s length. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: child start times and the total length. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Composition, Defaults. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Composition affect in this exercise? Input case: 3 cards and 6 cards.
2. Variable: Card Count. Hypothesis to check: Changes to a child’s length are reflected in the parent’s length. Did the actual results match the hypothesis? Explain the evidence in terms of Defaults.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Nested Timelines. It supports direct interaction and cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Completion Callbacks and Interruption](../20/README.md) · [Next: Controlling SVG Attributes](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

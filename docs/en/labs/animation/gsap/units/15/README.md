# GSAP · 15 MatchMedia Branches

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Input and accessibility · Editable example · Storage ID: `gsap-step-15`

## Goals and learning outcomes

- Learning outcome: explain the role of Responsive Motion. Input case: widths of 375·1024px.
- Deliverable: final positions and cleanup counts for each width. Explain the rationale for handling Distance Units, connecting it to the code.

## Prerequisites

Prepare the exercise results on Scope of the Existing Example and Cleanup from Unit 14, “Scroll and Lifecycle”.

## Key concepts and explanations

### Responsive Motion

matchMedia configures motion for each condition. Clean up the previous configuration when conditions change.

### Distance Units

A fixed px distance may exceed a small screen. Function-based values must specify the reference size.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-15.js of a separate practice project, split movement distances at a 600px boundary and add a reduced-motion condition. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: widths of 375·1024px. Baseline: 1024px. Run under baseline conditions, then record observations and errors in notes/day-15.md.
3. Variable: Screen Width; changed value: 375px. Run again using the same input path. Deliverable to save: final positions and cleanup counts for each width. Hypothesis to check: The card stays inside the small container. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable     | Baseline | Change | Expected change / hypothesis               |
| ------------ | -------- | ------ | ------------------------------------------ |
| Screen Width | 1024px   | 375px  | The card stays inside the small container. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: final positions and cleanup counts for each width. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Responsive Motion, Distance Units. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Responsive Motion affect in this exercise? Input case: widths of 375·1024px.
2. Variable: Screen Width. Hypothesis to check: The card stays inside the small container. Did the actual results match the hypothesis? Explain the evidence in terms of Distance Units.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on MatchMedia Branches. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scroll and Lifecycle](../../02-experiments/README.md) · [Next: Repeated Input and Overwrite](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

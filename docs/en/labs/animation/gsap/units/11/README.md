# GSAP · 11 Scrub Following

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scrolling and lifecycle · Editable example · Storage ID: `gsap-step-11`

## Goals and learning outcomes

- Learning outcome: explain the role of Scrub. Input case: a short scroll followed by a stop.
- Deliverable: the times when input stops and motion stops. Explain the rationale for handling Readability, connecting it to the code.

## Prerequisites

Prepare the exercise results on Plugin and Boundaries from Unit 10, “Registering ScrollTrigger”.

## Key concepts and explanations

### Scrub

scrub connects scroll progress to motion. A numeric value allows time to catch up to the target.

### Readability

Content must remain readable while motion catches up. Do not make the presence of text depend on progress.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-11.js of a separate practice project, compare scrub true and 0.5 and record progress after stopping. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a short scroll followed by a stop. Baseline: true. Run under baseline conditions, then record observations and errors in notes/day-11.md.
3. Variable: scrub; changed value: 0.5. Run again using the same input path. Deliverable to save: the times when input stops and motion stops. Hypothesis to check: A catch-up interval occurs after scrolling stops. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| scrub | true | 0.5 | A catch-up interval occurs after scrolling stops. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: the times when input stops and motion stops. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Scrub, Readability. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Scrub affect in this exercise? Input case: a short scroll followed by a stop.
2. Variable: scrub. Hypothesis to check: A catch-up interval occurs after scrolling stops. Did the actual results match the hypothesis? Explain the evidence in terms of Readability.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Scrub Following. It supports direct interaction and cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Registering ScrollTrigger](../10/README.md) · [Next: Pin and Document Flow](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

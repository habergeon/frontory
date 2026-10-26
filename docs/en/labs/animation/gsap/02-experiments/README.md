# GSAP · 14 Scroll and Lifecycle

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Scrolling and lifecycle · Editable example · Storage ID: `gsap-02`

## Goals and learning outcomes

- Learning outcome: explain the role of Scope of the Existing Example. Input case: 5 remounts and resize.
- Deliverable: event counts and a record of all explanations being displayed. Explain the rationale for handling Cleanup, connecting it to the code.

## Prerequisites

Prepare the exercise results on Layout Changes and Refresh from Unit 13, “Refresh and Measurement Timing”.

## Key concepts and explanations

### Scope of the Existing Example

gsap-02 uses native scroll events and a timeline. Its preview does not run ScrollTrigger.

### Cleanup

Remove events and restore styles together. Provide static explanations for reduced motion.

## Practice setup

The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-14.js of a separate practice project, read the existing gsap-02 and implement resize·dispose·reduced-motion branches in a separate app. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 5 remounts and resize. Baseline: off. Run under baseline conditions, then record observations and errors in notes/day-14.md.
3. Variable: Reduced Motion; changed value: on. Run again using the same input path. Deliverable to save: event counts and a record of all explanations being displayed. Hypothesis to check: Explanations remain without motion, and events are not duplicated. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable       | Baseline | Change | Expected change / hypothesis                                       |
| -------------- | -------- | ------ | ------------------------------------------------------------------ |
| Reduced Motion | off      | on     | Explanations remain without motion, and events are not duplicated. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: event counts and a record of all explanations being displayed. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Scope of the Existing Example, Cleanup. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Scope of the Existing Example affect in this exercise? Input case: 5 remounts and resize.
2. Variable: Reduced Motion. Hypothesis to check: Explanations remain without motion, and events are not duplicated. Did the actual results match the hypothesis? Explain the evidence in terms of Cleanup.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../src/labs/gsap-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Connects basic scroll events to a GSAP timeline. It does not use the ScrollTrigger plugin.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Refresh and Measurement Timing](../units/13/README.md) · [Next: MatchMedia Branches](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

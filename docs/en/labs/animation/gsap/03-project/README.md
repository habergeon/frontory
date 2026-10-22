# GSAP · 28 Motion Design and Verification

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Motion system verification · Editable example · Storage ID: `gsap-03`

## Goals and learning outcomes

- Learning outcome: explain the role of Information Hierarchy. Input case: keyboard·10 rapid inputs·5 remounts.
- Deliverable: an input·accessibility·cleanup·frame verification report. Explain the rationale for handling Combined Verification, connecting it to the code.

## Prerequisites

Prepare the exercise results on Resource Inventory and Repeated Disposal from Unit 27, “Cleanup on Failure Paths”.

## Key concepts and explanations

### Information Hierarchy

Motion should indicate the current step and next action. Reduce it if it interferes with reading or input.

### Combined Verification

Keyboard and reduced-motion tests find different failures. Explain design choices with measurement and cleanup records.

## Practice setup

The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-28.js of a separate practice project, use the existing gsap-03 as a starting point to complete a learning-step motion system and report. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: keyboard·10 rapid inputs·5 remounts. Baseline: default distance. Run under baseline conditions, then record observations and errors in notes/day-28.md.
3. Variable: Motion; changed value: distance 0. Run again using the same input path. Deliverable to save: an input·accessibility·cleanup·frame verification report. Hypothesis to check: Functionality, content, and focus are preserved. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Motion | default distance | distance 0 | Functionality, content, and focus are preserved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: an input·accessibility·cleanup·frame verification report. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Information Hierarchy, Combined Verification. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Information Hierarchy affect in this exercise? Input case: keyboard·10 rapid inputs·5 remounts.
2. Variable: Motion. Hypothesis to check: Functionality, content, and focus are preserved. Did the actual results match the hypothesis? Explain the evidence in terms of Combined Verification.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../src/labs/gsap-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Cleanup on Failure Paths](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

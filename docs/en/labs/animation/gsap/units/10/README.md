# GSAP · 10 Registering ScrollTrigger

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scrolling and lifecycle · Editable example · Storage ID: `gsap-step-10`

## Goals and learning outcomes

- Learning outcome: explain the role of Plugin. Input case: two section elements.
- Deliverable: a table of start/end pixel values. Explain the rationale for handling Boundaries, connecting it to the code.

## Prerequisites

Prepare the exercise results on Progress and Manual Connection from Unit 9, “Connecting Native Scroll”.

## Key concepts and explanations

### Plugin

In a separate project, import the plugin and call registerPlugin. Distinguish this from the preview’s native scroll code.

### Boundaries

start and end define where an element meets the viewport. Use markers to check the calculated positions.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-10.js of a separate practice project, configure ScrollTrigger.create and markers in a separate app. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: two section elements. Baseline: top bottom. Run under baseline conditions, then record observations and errors in notes/day-10.md.
3. Variable: start; changed value: top center. Run again using the same input path. Deliverable to save: a table of start/end pixel values. Hypothesis to check: The start boundary changes to the center of the viewport. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline   | Change     | Expected change / hypothesis                              |
| -------- | ---------- | ---------- | --------------------------------------------------------- |
| start    | top bottom | top center | The start boundary changes to the center of the viewport. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of start/end pixel values. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Plugin, Boundaries. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Plugin affect in this exercise? Input case: two section elements.
2. Variable: start. Hypothesis to check: The start boundary changes to the center of the viewport. Did the actual results match the hypothesis? Explain the evidence in terms of Boundaries.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Registering ScrollTrigger. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Connecting Native Scroll](../09/README.md) · [Next: Scrub Following](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

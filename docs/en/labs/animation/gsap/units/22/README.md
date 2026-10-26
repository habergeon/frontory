# GSAP · 22 Controlling SVG Attributes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion system verification · Editable example · Storage ID: `gsap-step-22`

## Goals and learning outcomes

- Learning outcome: explain the role of Attr. Input case: viewBox 0 0 200 100.
- Deliverable: a table of endpoint attributes and displayed positions. Explain the rationale for handling ViewBox, connecting it to the code.

## Prerequisites

Prepare the exercise results on Composition and Defaults from Unit 21, “Nested Timelines”.

## Key concepts and explanations

### Attr

Numeric SVG attributes differ from CSS styles. Use attr to specify the target of a change.

### ViewBox

viewBox creates a user coordinate system. Display size and coordinate values are not identical.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-22.js of a separate practice project, tween the circle’s attr cx·r and opacity separately. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: viewBox 0 0 200 100. Baseline: 200px. Run under baseline conditions, then record observations and errors in notes/day-22.md.
3. Variable: Display Width; changed value: 400px. Run again using the same input path. Deliverable to save: a table of endpoint attributes and displayed positions. Hypothesis to check: Attributes stay the same, and only the displayed size changes. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable      | Baseline | Change | Expected change / hypothesis                                   |
| ------------- | -------- | ------ | -------------------------------------------------------------- |
| Display Width | 200px    | 400px  | Attributes stay the same, and only the displayed size changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of endpoint attributes and displayed positions. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Attr, ViewBox. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Attr affect in this exercise? Input case: viewBox 0 0 200 100.
2. Variable: Display Width. Hypothesis to check: Attributes stay the same, and only the displayed size changes. Did the actual results match the hypothesis? Explain the evidence in terms of ViewBox.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Controlling SVG Attributes. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Nested Timelines](../21/README.md) · [Next: Interpolating Canvas Objects](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

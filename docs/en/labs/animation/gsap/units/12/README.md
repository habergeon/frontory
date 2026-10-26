# GSAP · 12 Pin and Document Flow

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scrolling and lifecycle · Editable example · Storage ID: `gsap-step-12`

## Goals and learning outcomes

- Learning outcome: explain the role of Pin. Input case: scrolling and Tab.
- Deliverable: a table of subsequent section positions and obscured focus. Explain the rationale for handling Focus, connecting it to the code.

## Prerequisites

Prepare the exercise results on Scrub and Readability from Unit 11, “Scrub Following”.

## Key concepts and explanations

### Pin

pin fixes an element over a specified interval. The space for the pinned element relates to the layout of subsequent content.

### Focus

A pinned area may obscure focus. Test Tab navigation separately as well.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-12.js of a separate practice project, change pinSpacing and place three links in the pinned section. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: scrolling and Tab. Baseline: true. Run under baseline conditions, then record observations and errors in notes/day-12.md.
3. Variable: pinSpacing; changed value: false. Run again using the same input path. Deliverable to save: a table of subsequent section positions and obscured focus. Hypothesis to check: The likelihood of overlap with subsequent content changes. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                               |
| ---------- | -------- | ------ | ---------------------------------------------------------- |
| pinSpacing | true     | false  | The likelihood of overlap with subsequent content changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of subsequent section positions and obscured focus. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Pin, Focus. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Pin affect in this exercise? Input case: scrolling and Tab.
2. Variable: pinSpacing. Hypothesis to check: The likelihood of overlap with subsequent content changes. Did the actual results match the hypothesis? Explain the evidence in terms of Focus.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Pin and Document Flow. It supports direct interaction and cleans up the resources it uses.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scrub Following](../11/README.md) · [Next: Refresh and Measurement Timing](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

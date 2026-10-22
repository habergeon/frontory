# GSAP · 07 Playback Controls

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tweens and the time model · Editable example · Storage ID: `gsap-step-07`

## Goals and learning outcomes

- Learning outcome: explain the role of Progress. Input case: seeking to 0·50·100%.
- Deliverable: results from revisiting positions and the tween count. Explain the rationale for handling Synchronization, connecting it to the code.

## Prerequisites

Prepare the exercise results on Label and Relative Position from Unit 6, “Labels and Overlap”.

## Key concepts and explanations

### Progress

progress handles normalized positions. seek moves to a time or label.

### Synchronization

The slider and playhead update each other. There is no need to create a new tween on every onUpdate.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-7.js of a separate practice project, connect a range input to timeline.progress and display the value with onUpdate. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: seeking to 0·50·100%. Baseline: 1 time. Run under baseline conditions, then record observations and errors in notes/day-7.md.
3. Variable: Seek Count; changed value: 10 times. Run again using the same input path. Deliverable to save: results from revisiting positions and the tween count. Hypothesis to check: The same progress produces the same scene. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Seek Count | 1 time | 10 times | The same progress produces the same scene. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: results from revisiting positions and the tween count. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Progress, Synchronization. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Progress affect in this exercise? Input case: seeking to 0·50·100%.
2. Variable: Seek Count. Hypothesis to check: The same progress produces the same scene. Did the actual results match the hypothesis? Explain the evidence in terms of Synchronization.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment on Playback Controls. It supports direct interaction and cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Labels and Overlap](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

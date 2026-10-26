# GSAP · 01 Tween and Timeline

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Tweens and the time model · Editable example · Storage ID: `gsap-01`

## Goals and learning outcomes

- Learning outcome: explain the role of Tween. Input case: 3 cards and playback buttons.
- Deliverable: a position table at progress 0·0.5·1. Explain the rationale for handling Playhead, connecting it to the code.

## Prerequisites

Understand DOM·CSS transform and time, and be able to read the inputs and outputs of the existing starting example.

## Key concepts and explanations

### Tween

A tween interpolates between two values. A timeline groups the timing relationships of multiple changes.

### Playhead

The playback position determines the current scene. Revisit the same position to compare states.

## Practice setup

The existing gsap-01·02·03 are starting examples. Write new units in a separate local GSAP project. The gsap-02 preview uses native scroll events; install and register ScrollTrigger in an external project. Preserve CSP and iframe isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-1.js of a separate practice project, put three cards in gsap.timeline and connect play/pause/reverse buttons. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 3 cards and playback buttons. Baseline: 1 second. Run under baseline conditions, then record observations and errors in notes/day-1.md.
3. Variable: duration; changed value: 2 seconds. Run again using the same input path. Deliverable to save: a position table at progress 0·0.5·1. Hypothesis to check: The final position stays the same, and only the movement time increases. Compare with the actual results and record whether they agree and the causes of any differences.

## Variables to observe

| Variable | Baseline | Change    | Expected change / hypothesis                                             |
| -------- | -------- | --------- | ------------------------------------------------------------------------ |
| duration | 1 second | 2 seconds | The final position stays the same, and only the movement time increases. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a position table at progress 0·0.5·1. Include results for both baseline and changed conditions so that a total of 2 conditions can be compared, and record the inputs and execution environment together.
- [ ] Connect all of these concepts in the explanation of the difference between the two conditions: Tween, Playhead. For items that differ from expectations, give at least 1 cause or reason they remain unresolved.

## Self-check

1. Which processing stage does Tween affect in this exercise? Input case: 3 cards and playback buttons.
2. Variable: duration. Hypothesis to check: The final position stays the same, and only the movement time increases. Did the actual results match the hypothesis? Explain the evidence in terms of Playhead.

## Official references

- [GSAP Official Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Linked example and execution scope

[Example source](../../../../../../src/labs/gsap-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Starting and target values](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

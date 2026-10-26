# CSS · 23 Keyframes and Playback Control

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Motion, tokens, and rendering verification · Editable example · Storage ID: `css-step-23`

## Goals and learning outcomes

- The position is preserved when paused, and playback continues from there when resumed.
- Nonessential repetition stops under reduce.

## Prerequisites

The work and experiment records from Unit 22, “Transitions and Intermediate States”

## Key concepts and explanations

### Time Segments

@keyframes defines property values at different progress points. The full movement changes with iteration count and direction.

### Pausing

animation-play-state can pause playback. Under reduced-motion settings, also consider removing nonessential repetition entirely.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 1 iteration, infinite repetition, and pause/resume conditions, and connect keyframes.css.
2. Create a progress indicator with keyframes, and switch playback according to the pause button state.
3. Run with 1 iteration, infinite repetition, and pause/resume conditions. Results to check: The position is preserved when paused, and playback continues from there when resumed. Nonessential repetition stops under reduce. Record expected and actual results separately.

## Variables to observe

| Variable   | Baseline    | Change   | Expected change / hypothesis                                                                                                                                                   |
| ---------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Repetition | 1 iteration | infinite | Hypothesis before running: A stop control will be needed because playback will not end. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The position is preserved when paused, and playback continues from there when resumed.
- [ ] Nonessential repetition stops under reduce.

## Self-check

1. Does the progress indicator represent actual task progress?
2. Which values does fill-mode leave after playback ends?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

Render an actual CSS document and inspect DOM dimensions and computed styles. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Transitions and Intermediate States](../22/README.md) · [Next: Organizing Rules with Cascade Layers](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

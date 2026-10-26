# Three.js · 17 Clip Animation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-17`

## Goals and learning outcomes

- Keep the UI available for models without clips.
- Distinguish time in seconds from playback speed.

## Prerequisites

Prerequisite concepts: Control State, Static Scenes. Prepare the result files and observation notes from unit 16.

## Key concepts and explanations

### Mixer Time

AnimationMixer.update accepts delta in seconds. Passing milliseconds unchanged makes animation run too fast.

### Clips and Actions

AnimationClip holds keyframe data, while an action holds playback state. Multiple actions may affect the same model.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-17.js and index.html in the external exercise project. Display the clip list from a local glb containing animation in an HTML select.
2. Play it with mixer.clipAction, and connect timeScale and a stop button.
3. Save the output under the 1 input condition, then run again under the 0.5 condition. Expected: The same clip plays at half speed. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-17-notes.md.

## Variables to observe

| Variable  | Baseline | Change | Expected change / hypothesis       |
| --------- | -------- | ------ | ---------------------------------- |
| timeScale | 1        | 0.5    | The same clip plays at half speed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep the UI available for models without clips.
- [ ] Distinguish time in seconds from playback speed.

## Self-check

1. Can clip data and actions each be reused?
2. What needs cleanup besides stopAllAction when replacing a scene?

## Official references

- [Three.js AnimationMixer](https://threejs.org/docs/pages/AnimationMixer.html)
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs a procedurally created AnimationClip and AnimationMixer. Extend glTF clip-list loading in an external project with GLTFLoader.

- [example.js](../../../../../../../src/labs/threejs-step-17/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Orbit Controls and On-Demand Rendering](../16/README.md) · [Next: Transparency and Depth](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

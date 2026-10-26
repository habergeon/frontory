# Vue · 23 Separating Frame Values from UI Values

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Integration and Update Verification · Editable example · Storage ID: `vue-step-23`

## Goals and learning outcomes

- The circle stops moving at speed 0.
- Changing speed does not increase the Canvas creation count.

## Prerequisites

Unit 23 builds on the work and experiment records from Unit 22.

## Key concepts and explanations

### Update frequency

Frame coordinates change every frame, while UI settings change infrequently. Displaying everything through refs causes unnecessary screen updates.

### Time-based movement

Convert RAF timestamp differences into delta in seconds to calculate movement. Specify a policy for limiting large gaps after returning to a tab.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/CanvasPanel.vue, keep angle as a local variable and receive only speed as a prop.
2. Move with angle += delta * speed and record the delta cap.
3. Enter speed 0, 1, and 2, and check that stopping and speed changes apply without recreating the renderer.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                              |
| -------- | -------- | ------ | --------------------------------------------------------- |
| speed    | 1        | 2      | Rotation over the same duration is approximately doubled. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The circle stops moving at speed 0.
- [ ] Changing speed does not increase the Canvas creation count.

## Self-check

1. Does changing local angle automatically appear in the template?
2. How does limiting delta on tab return differ from real elapsed time?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Creating and Releasing Canvas Resources](../22/README.md) · [Next: Shallow Reactivity and External Objects](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

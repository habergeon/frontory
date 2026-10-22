# Vue · 26 Checking Behavior Regressions and Save Races

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Integration and Update Verification · Editable example · Storage ID: `vue-step-26`

## Goals and learning outcomes

- The A string does not enter B's saved value.
- All four add, toggle, search, and switch flows pass.

## Prerequisites

Unit 26 builds on the work and experiment records from Unit 25.

## Key concepts and explanations

### User flows

Check component contracts through inputs and observable outputs. Depending on internal ref names makes checks fragile when implementations change.

### Time control

Delayed saves must not overwrite another unit during rapid switching. Use save-completion conditions or controlled timers rather than fixed waits.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write add, toggle, search, and A/B draft-switching checks in tests/workspace.spec.js.
2. Reproduce entering A then switching to B with a 1000ms save delay.
3. Also check 0 active loops after Canvas removal and 1 after showing it again.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input interval | Longer than the save delay | Shorter than the save delay | The draft's unit id remains correct even with short intervals. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The A string does not enter B's saved value.
- [ ] All four add, toggle, search, and switch flows pass.

## Self-check

1. How do fake timers differ from actual browser RAF checks?
2. What changes if storage is not reset before a test?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Observing Vue Performance](../25/README.md) · [Next: Composition API Integration Review](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

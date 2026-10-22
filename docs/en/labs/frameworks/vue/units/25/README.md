# Vue · 25 Observing Vue Performance

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Integration and Update Verification · Editable example · Storage ID: `vue-step-25`

## Goals and learning outcomes

- There are records of 10 identical inputs for each approach.
- Exactly 1 selection indicator remains after optimization.

## Prerequisites

Unit 25 builds on the work and experiment records from Unit 24.

## Key concepts and explanations

### Update scope

Prop stability and computed dependencies affect update scope. Identify which components change before optimizing.

### Measurement conditions

Developer tool logs themselves add execution cost. Compare under the same data, input, and build conditions, and record measurement limitations.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Supply 1000 cards to src/CardList.vue and instrument update counts.
2. Create a comparison passing a per-row selected boolean instead of the full selected id.
3. Record update counts and times for 10 selections in notes/performance.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| props | selectedId passed to all rows | Per-row selected | Update scope may shrink to the rows whose selection changed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There are records of 10 identical inputs for each approach.
- [ ] Exactly 1 selection indicator remains after optimization.

## Self-check

1. Are fewer reactive dependencies always faster?
2. Why record whether measurements use development mode?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shallow Reactivity and External Objects](../24/README.md) · [Next: Checking Behavior Regressions and Save Races](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

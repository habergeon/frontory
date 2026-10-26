# Vue · 03 reactive and Preserving References

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Reactive Data and Templates · Editable example · Storage ID: `vue-step-03`

## Goals and learning outcomes

- The linked query matches the original input.
- Reproduce how ordinary destructuring retains the initial value.

## Prerequisites

Unit 3 builds on the work and experiment records from Unit 2.

## Key concepts and explanations

### reactive

reactive creates a Proxy that tracks object property access. Destructuring a reactive object into plain values can break the connection.

### Choosing ref

ref suits a single value, including replacement of an object. If you need to pass object properties separately, consider a connection mechanism such as toRefs.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create reactive({query:'',onlyOpen:false}) in src/Filters.vue.
2. Display the destructured query and the query obtained through toRefs separately.
3. Change the original query through the input and record the difference between the two displays.

## Variables to observe

| Variable            | Baseline               | Change | Expected change / hypothesis                                          |
| ------------------- | ---------------------- | ------ | --------------------------------------------------------------------- |
| Property extraction | Ordinary destructuring | toRefs | Only the display linked through toRefs follows changes to the source. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The linked query matches the original input.
- [ ] Reproduce how ordinary destructuring retains the initial value.

## Self-check

1. Which is more convenient, reactive or ref, when you must replace the entire object?
2. Are nested properties tracked in the same way?

## Official references

- [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: SFCs and Template Binding](../02/README.md) · [Next: Pure Computation with computed](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

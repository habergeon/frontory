# Vue · 14 Component Contracts and Watching

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Component Contracts and Watching · Editable example · Storage ID: `vue-02`

## Goals and learning outcomes

- Switching to B after entering A does not contaminate B's saved value.
- After 5 consecutive inputs, only the last value completes saving.

## Prerequisites

Unit 14 builds on the work and experiment records from Unit 13.

## Key concepts and explanations

### Drafts and saving

Parent ownership of per-unit drafts preserves strings when editors are replaced. Pending saves must be distinguished from completed saves.

### Identifying delayed work

Reading the current unit when a timer runs can overwrite another note. Capture the id and string at the start, and clean up the previous timer.

## Practice setup

Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler. The existing vue-02 preview is a starting point. Implement the extended deliverables described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Connect src/NoteEditor.vue with props/emits and create draftsById in the parent.
2. Capture id, text, and delay from the watch input for delayed saving, and call clearTimeout through onCleanup.
3. Switch to B immediately after entering A, then compare savedById and draftsById.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                                                       |
| ---------- | -------- | ------ | ---------------------------------------------------------------------------------- |
| Save delay | 100ms    | 1000ms | Switching cancels the previous scheduled save and does not overwrite another unit. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Switching to B after entering A does not contaminate B's saved value.
- [ ] After 5 consecutive inputs, only the last value completes saving.

## Self-check

1. Where should the canceled A draft remain?
2. What problem occurs if you read unit.value inside the timer?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/vue-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Watcher Cleanup and Out-of-Order Requests](../units/13/README.md) · [Next: Template Refs and nextTick](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

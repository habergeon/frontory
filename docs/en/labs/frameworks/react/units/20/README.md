# React · 20 Transitions and Deferred Results

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Preserving notes and measuring renders · Editable example · Storage ID: `react-step-20`

## Goals and learning outcomes

- The input retains the exact last string.
- Show that results are deferred, and ensure the final results match the latest input.

## Prerequisites

Unit 20 continues using the work and experiment records from Unit 19.

## Key concepts and explanations

### Urgent Input

The input string is a value users need to see immediately. It does not have to share the priority of expensive result updates.

### Deferred Values

useDeferredValue temporarily shows the previous value while preparing to render new results. Wrap the slow child in memo and keep its other props stable to skip child work during urgent input renders; this differs from debounce.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a filter for 5000 titles in src/LargeList.jsx and wrap it in memo. Keep references to list data and event props stable.
2. In the parent, defer query with useDeferredValue and pass deferredQuery to LargeList inside the memo boundary. This exercise does not assume React Compiler automatic memoization.
3. Under CPU throttling, compare with a control without memo. Record responsiveness over 10 inputs, list render logs, the deferred indicator, and final search results.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| List query | Immediate value | deferred value | Input appears immediately, while the list may keep previous results briefly. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The input retains the exact last string.
- [ ] Show that results are deferred, and ensure the final results match the latest input.

## Self-check

1. Does a deferred value reduce network requests?
2. What problems arise if the input state itself is put in a transition?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React useDeferredValue and the memo Boundary for Slow Children](https://react.dev/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Making Asynchronous State Explicit](../19/README.md) · [Next: Finding Bottlenecks with Profiler](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

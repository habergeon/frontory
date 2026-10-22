# TypeScript · 27 Plugin Ownership and Cleanup Contracts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Module Contracts and Plugins · Editable example · Storage ID: `typescript-step-27`

## Goals and learning outcomes

- The event handler runs 0 times after cleanup.
- The remounted button handles a click 1 time.

## Prerequisites

Work and experiment records from Unit 26, “Cases That Verify Compilation Failures”

## Key concepts and explanations

### Common Interfaces

Define implementation boundaries with mount and dispose contracts. Pass only the DOM and configuration needed in the context.

### Lifecycle

Event leaks can occur even with matching types. Check repeated mounting and duplicate disposal at runtime.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In plugin.ts, prepare conditions for 5 mounts and 2 consecutive dispose calls.
2. Define Plugin and Context, and write a resource cleanup list in one DOM implementation.
3. Run with 5 mounts and 2 consecutive dispose calls. Results to check: The event handler runs 0 times after cleanup. The remounted button handles a click 1 time. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Disposal Count | 1 call | 2 calls | Pre-run hypothesis: the second call will also cause no exception. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The event handler runs 0 times after cleanup.
- [ ] The remounted button handles a click 1 time.

## Self-check

1. Does an interface enforce resource cleanup?
2. May a plugin delete resources it does not own?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-27/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-27/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Cases That Verify Compilation Failures](../26/README.md) · [Next: Plugin Contracts](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

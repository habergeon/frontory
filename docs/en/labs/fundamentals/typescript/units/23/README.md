# TypeScript · 23 Async Functions and Error Types

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Module Contracts and Plugins · Editable example · Storage ID: `typescript-step-23`

## Goals and learning outcomes

- Use a valid Note without assertions.
- Neither exception form leaves an unhandled failure.

## Prerequisites

Work and experiment records from Unit 22, “DOM Types and null Checks”

## Key concepts and explanations

### Promise Contracts

An async function wraps its result in a Promise. External data still needs structural validation after await.

### catch Values

A thrown value is not guaranteed to be an Error. Narrow unknown by checking for Error to create a message.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In async.ts, prepare conditions for a valid response, an Error throw, and a string throw.
2. Create a loader returning Promise<Result<Note, string>> and handle Error and string throws.
3. Run with a valid response, an Error throw, and a string throw. Results to check: Use a valid Note without assertions. Neither exception form leaves an unhandled failure. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Thrown Value | Error | string | Pre-run hypothesis: both cases will be converted into safe messages. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Use a valid Note without assertions.
- [ ] Neither exception form leaves an unhandled failure.

## Self-check

1. Does a return type validate response JSON?
2. Why is reading message directly in catch risky?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-23/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-23/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: DOM Types and null Checks](../22/README.md) · [Next: Modules and type-only import](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

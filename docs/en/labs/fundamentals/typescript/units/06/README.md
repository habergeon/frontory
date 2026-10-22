# TypeScript · 06 Function Arguments and Return Contracts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Type Checking and Data Models · Editable example · Storage ID: `typescript-step-06`

## Goals and learning outcomes

- Results for valid and empty titles follow the same contract.
- An invalid callback argument type is rejected.

## Prerequisites

Work and experiment records from Unit 5, “Positional Meaning in Arrays and Tuples”

## Key concepts and explanations

### Function Types

Parameters and return types express a call contract. An explicit return type makes missing return paths easier to find.

### Callback Contracts

The caller determines which arguments a callback receives. Do not mark parameters optional merely for the implementer's convenience.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In functions.ts, prepare conditions for empty and valid titles and an index callback.
2. Define a note conversion function and a visitor callback, and return a result on every path.
3. Run with empty and valid titles and an index callback. Results to check: Results for valid and empty titles follow the same contract. An invalid callback argument type is rejected. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Return Paths | return on every path | omit one branch | Pre-run hypothesis: the return type or noImplicitReturns check will reveal the omission. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Results for valid and empty titles follow the same contract.
- [ ] An invalid callback argument type is rejected.

## Self-check

1. How does returning void differ from returning undefined?
2. Who is allowed to omit an optional parameter?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-06/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-06/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Positional Meaning in Arrays and Tuples](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# TypeScript · 03 Inference and Literal Types

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Type Checking and Data Models · Editable example · Storage ID: `typescript-step-03`

## Goals and learning outcomes

- Record the inferred types of the three declarations.
- A call with an invalid state string fails to compile.

## Prerequisites

Work and experiment records from Unit 2, “strict Settings and Executable Code”

## Key concepts and explanations

### Type Inference

Variable types are inferred from initial values. let and const may preserve literals differently because of reassignment.

### Preserving Literals

as const preserves narrow types for a value. It does not freeze runtime objects.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In literal.ts, prepare conditions for a function accepting only ready and three declaration styles.
2. Declare a state string with let·const·an as const object, and pass it as an argument.
3. Run with a function accepting only ready and three declaration styles. Results to check: Record the inferred types of the three declarations. A call with an invalid state string fails to compile. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Declaration | let mode | const mode | Pre-run hypothesis: the literal argument will be accepted. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the inferred types of the three declarations.
- [ ] A call with an invalid state string fails to compile.

## Self-check

1. Is as const the same as Object.freeze?
2. What information is lost when you declare a broad type?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-03/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-03/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: strict Settings and Executable Code](../02/README.md) · [Next: Object Contracts and Optional Fields](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

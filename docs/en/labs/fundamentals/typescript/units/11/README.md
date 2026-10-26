# TypeScript · 11 keyof and Property Lookup Functions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Unions and Generics · Editable example · Storage ID: `typescript-step-11`

## Goals and learning outcomes

- title is inferred as string and done as boolean.
- Record the compiler error for the missing key.

## Prerequisites

Work and experiment records from Unit 10, “readonly and the Scope of Mutation”

## Key concepts and explanations

### Key Unions

keyof obtains the keys of an object type as a type. It catches invalid names as type errors rather than leaving them as strings.

### Indexed Access

T[K] is the value type for the selected key. It preserves the relationship between the key and return value.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In property.ts, prepare conditions for title, done, and the nonexistent missing key.
2. Define getProperty with T and K extends keyof T, and read the title and completion fields.
3. Run with title, done, and the nonexistent missing key. Results to check: title is inferred as string and done as boolean. Record the compiler error for the missing key. Record expected and actual results separately.

## Variables to observe

| Variable   | Baseline | Change  | Expected change / hypothesis                                                                                                                           |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lookup Key | title    | missing | Pre-run hypothesis: a call with a nonexistent key will be rejected. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] title is inferred as string and done as boolean.
- [ ] Record the compiler error for the missing key.

## Self-check

1. What is lost if you use unknown as the return type?
2. Does keyof create a runtime list of keys?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-11/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-11/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: readonly and the Scope of Mutation](../10/README.md) · [Next: Generic Functions and Inference](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

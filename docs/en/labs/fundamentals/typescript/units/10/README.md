# TypeScript · 10 readonly and the Scope of Mutation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Unions and Generics · Editable example · Storage ID: `typescript-step-10`

## Goals and learning outcomes

- Record the diagnostic for direct assignment.
- After the update, the original completion value and length remain the same.

## Prerequisites

Work and experiment records from Unit 9, “Finding Missing Branches with never”

## Key concepts and explanations

### Read Only

readonly restricts assignment through that reference. It does not prevent mutation through other mutable references or runtime code.

### Copying Updates

Returning new arrays and objects lets you check that previous state is preserved. Define nested readonly behavior with separate types.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In readonly.ts, prepare conditions for two notes and a nested meta field.
2. Write a toggle function accepting a readonly Note array that returns new objects.
3. Run with two notes and a nested meta field. Results to check: Record the diagnostic for direct assignment. After the update, the original completion value and length remain the same. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline                       | Change              | Expected change / hypothesis                                                                                                                                              |
| -------- | ------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Update   | assign to an original property | return a new object | Pre-run hypothesis: the type contract will be respected and previous values preserved. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the diagnostic for direct assignment.
- [ ] After the update, the original completion value and length remain the same.

## Self-check

1. Does readonly guarantee deep immutability?
2. Can another alias mutate the same object?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-10/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-10/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Finding Missing Branches with never](../09/README.md) · [Next: keyof and Property Lookup Functions](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

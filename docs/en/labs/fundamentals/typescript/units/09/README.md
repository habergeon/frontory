# TypeScript · 09 Finding Missing Branches with never

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Unions and Generics · Editable example · Storage ID: `typescript-step-09`

## Goals and learning outcomes

- Record error locations when a new member is added.
- After handling cancelled, tsc reports 0 diagnostics.

## Prerequisites

Work and experiment records from Unit 8, “Modeling Async State with Discriminated Unions”

## Key concepts and explanations

### Exhaustiveness Checking

After all union members are handled, the remaining value is never. A missing member makes assignment to never an error.

### Propagating Changes

Adding a state affects consumers' switch statements. Use error locations to find uses that need changes.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In exhaustive.ts, prepare conditions for existing states and a new cancelled state.
2. Create assertNever and call it in the state switch default branch.
3. Run with existing states and a new cancelled state. Results to check: Record error locations when a new member is added. After handling cancelled, tsc reports 0 diagnostics. Record expected and actual results separately.

## Variables to observe

| Variable      | Baseline  | Change        | Expected change / hypothesis                                                                                                                          |
| ------------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Union Members | 3 members | add cancelled | Pre-run hypothesis: an unhandled switch will produce a diagnostic. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record error locations when a new member is added.
- [ ] After handling cancelled, tsc reports 0 diagnostics.

## Self-check

1. Does returning a string in default detect omissions?
2. Is never a runtime value?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-09/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-09/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Modeling Async State with Discriminated Unions](../08/README.md) · [Next: readonly and the Scope of Mutation](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

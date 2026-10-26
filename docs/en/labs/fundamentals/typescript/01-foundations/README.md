# TypeScript · 01 Types and Narrowing

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Type Checking and Data Models · Editable example · Storage ID: `typescript-01`

## Goals and learning outcomes

- Check the returned strings for all four states.
- Record the compiler diagnostic for invalid access and a correction.

## Prerequisites

JavaScript objects·functions·modules

## Key concepts and explanations

### Static Checking

Types check relationships in code before execution. They do not automatically inspect the actual contents of external JSON.

### Discriminated Unions

Branching on a shared tag with different values narrows objects to the fields you need. Accessing a state-specific field outside its branch causes an error.

## Practice setup

The existing Frontory preview is a limited starting example, not a complete implementation of the assignment. Implement additional files and features yourself in a separate local project. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In state.ts, prepare conditions for access to success data and the same access in idle.
2. Create an idle·loading·success·error union and return display strings with switch.
3. Run with access to success data and the same access in idle. Results to check: Check the returned strings for all four states. Record the compiler diagnostic for invalid access and a correction. Record expected and actual results separately.

## Variables to observe

| Variable        | Baseline       | Change             | Expected change / hypothesis                                                                                                                   |
| --------------- | -------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Access Location | success branch | outside the branch | Pre-run hypothesis: the compiler will reject unsafe access. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check the returned strings for all four states.
- [ ] Record the compiler diagnostic for invalid access and a correction.

## Self-check

1. Does passing type checking mean that input has been validated?
2. How does a union differ from an object with only optional fields?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/typescript-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: strict Settings and Executable Code](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

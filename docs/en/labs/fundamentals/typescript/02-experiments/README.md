# TypeScript · 14 Generics and Boundary Validation

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Unions and Generics · Editable example · Storage ID: `typescript-02`

## Goals and learning outcomes

- Record acceptance or rejection for all four inputs.
- Use Note fields on a valid return value without assertions.

## Prerequisites

Work and experiment records from Unit 13, “Constraints and Minimal Contracts”

## Key concepts and explanations

### Storage Relationships

Type parameters express the type relationship between saving and loading. Stored strings must be validated again when loaded.

### Structural Checks

Receive JSON.parse results as unknown and check them with a guard. Check null and fields inside arrays before trusting them.

## Practice setup

The existing Frontory preview is a limited starting example, not a complete implementation of the assignment. Implement additional files and features yourself in a separate local project. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In storage-boundary.ts, prepare conditions for a valid array, an empty array, null, and a numeric title.
2. Create save<T> and load<T> that accepts a validation function, then connect a Note array guard.
3. Run with a valid array, an empty array, null, and a numeric title. Results to check: Record acceptance or rejection for all four inputs. Use Note fields on a valid return value without assertions. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| JSON Field | string title | numeric title | Pre-run hypothesis: the restored result will be classified as an error. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record acceptance or rejection for all four inputs.
- [ ] Use Note fields on a valid return value without assertions.

## Self-check

1. Does generic T check JSON structure?
2. Is an empty array valid under the contract?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/typescript-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Constraints and Minimal Contracts](../units/13/README.md) · [Next: Type Guards and False Guarantees](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

# CSS · 28 Tokens and Rendering Observations

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Motion, tokens, and rendering verification · Editable example · Storage ID: `css-03`

## Goals and learning outcomes

- There are two performance recordings under identical conditions and observations for each stage.
- Document body text contrast and keyboard focus in both themes.

## Prerequisites

The work and experiment records from Unit 27, “contain and Offscreen Content”

## Key concepts and explanations

### Design Decisions

Color and spacing tokens apply the same decisions across multiple elements. Preserve text contrast and distinguishable states even when switching themes.

### Evidence-Based Adjustments

Judge performance improvements using actual layout and paint recordings. Do not directly compare results with different element counts and speeds.

## Practice setup

Frontory's existing preview is a limited starter example, not a complete solution to the assignment. Implement additional files and features yourself in a separate local project. In a separate folder, create the content in index.html and connect the practice CSS using link rel="stylesheet". Check the viewport, computed styles, and performance recordings in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.html, prepare content with 50 cards, a 500ms transition, and light/dark themes, and connect theme-report.css.
2. Complete two token-based themes, record width·transform transitions under the same conditions, and compare them in report.md.
3. Run with 50 cards, a 500ms transition, and light/dark themes. Results to check: There are two performance recordings under identical conditions and observations for each stage. Document body text contrast and keyboard focus in both themes. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Element Count | 50 elements | 200 elements | Hypothesis before running: Rendering work may increase, and differences between paths must be checked through measurement. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There are two performance recordings under identical conditions and observations for each stage.
- [ ] Document body text contrast and keyboard focus in both themes.

## Self-check

1. Which intervals support the optimization conclusion?
2. Did any adjustment sacrifice maintainability or accessibility?

## Official references

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Linked example and execution scope

[Example source](../../../../../../src/labs/css-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: contain and Offscreen Content](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

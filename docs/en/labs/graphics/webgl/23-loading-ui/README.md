# 23 · Loading UI and progress

Week 4 / original Day 23 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Display progress based on actual stages and available evidence.

## Prerequisites

19, 22, Promise and cancellation.

## Key concepts and explanations

Transfer, parsing, GPU preparation, and the first image are separate stages. Display byte-based progress only when transfer amounts are known; use an indeterminate loading state if the total size is unknown. A transfer at 100% may not mean everything is complete.

Design failure and retry handling, cancellation during transitions, or ignoring late responses. Do not mix success and failure states or display arbitrary numbers as real progress.

## Skills you will develop

- Display progress based on actual stages and available evidence.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Divide loading into idle/loading/ready/error and write the text for each state.
2. Distinguish the UI for transfers with a known file size from transfers with an unknown size.
3. Test retry after failure, switching during loading, and switching just before completion.


## Variables to observe

Whether total size information is available, network delay, response order, failure location.

## Completion criteria

- [ ] Can explain the basis for displayed numbers.
- [ ] Implemented or tested retry and cancellation/ignore flows.
- [ ] Can distinguish first-image readiness from transfer completion.

## Self-check questions

1. Is it appropriate to display 50% when the total size is unknown?
2. What state accurately describes parsing in progress?

## Official references

- [LoadingManager](https://threejs.org/docs/pages/LoadingManager.html)
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

## Experiment notes — fill these in yourself

### Goal
<!-- The question you want to answer in this experiment -->

### Key concepts
<!-- Explain in your own words -->

### Changed variables and predictions
<!-- Baseline → changed value / fixed conditions / prediction before running -->

### Actual results
<!-- Actual observations, screenshots, and measurements. Leave blank before running. -->

### What I learned
<!-- Differences between predictions and actual results, and why -->

### Remaining questions
<!-- What to check in the next experiment -->

[Previous: React+Three.js component design](../22-react-viewer/README.md) · [Next: Camera movement·rotation·zoom](../24-camera-controls/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/23-loading-ui/example.js) · Workspace unit ID: `23-loading-ui`

A simulated loader with controlled delays and progress. It does not measure actual network transfer amounts.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.

# Gaussian Splatting · 19 Reducing Gaussian Count

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visibility and Quality Experiments · Editable example · Storage ID: `gaussian-splatting-step-19`

## Goals and learning outcomes

- Create a reproducible subset.
- Evaluate the visual impact of reduction strategies.

## Prerequisites

Continue using the output and records from Unit 18. Before the Reducing Gaussian Count experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Subset selection

Reducing item count lowers storage and sorting work. Random removal may disproportionately damage thin structures or low-opacity regions.

### Reproducibility

Using different random values each time makes reduction strategies hard to compare. Save the seed and selected ids to use the same subset.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In subset.js, implement seeded selection and selection ordered by opacity.
2. From a synthetic fixture of 256 items, select 128 and save the id list.
3. Compare empty regions, sorting time, and file bytes at the same three viewpoints.

## Variables to observe

| Variable       | Baseline | Change | Expected change / hypothesis                             |
| -------------- | -------- | ------ | -------------------------------------------------------- |
| Retained count | 256      | 128    | Expect less sorting work but more holes in some regions. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Using the same seed twice produces identical id lists.
- [ ] Compare images at three viewpoints for both selection strategies.

## Self-check

1. Are low-opacity items always less important?
2. How does pruning during training differ from simply reducing a file?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance. The provided example keeps the first N entries using data.slice(0,count). Seed-based selection and opacity selection policies are separate assignments; screen-contribution pruning is not implemented.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Resolution and Pixel Workload](../18/README.md) · [Next: Color Space and Background](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

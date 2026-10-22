# Gaussian Splatting

[Frontory technology map](../../README.md)

Graphics · 4 stages · 28 units in the full series · 21 published in English

## Series goal

Understand 3D Gaussian data and the projection and compositing paths, and design a fault-tolerant viewer using small data with verified provenance.

## Prerequisites

Three.js cameras and projection, alpha blending

## Practice approach and scope

Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.

Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.

Only published English units are linked below. The full series has 28 units.

## Learning path

### Stage 1 · Foundations of Representation and Projection

- [01. 3DGS Representations and Data](01-foundations/README.md) — Editable example
- [02. Provenance and File Contracts](units/02/README.md) — Editable example
- [03. Coordinate Systems and Units](units/03/README.md) — Editable example
- [04. Quaternions and Anisotropy](units/04/README.md) — Editable example
- [05. Reading Shape from Covariance](units/05/README.md) — Editable example
- [06. Camera Projection and Screen Ellipses](units/06/README.md) — Editable example
- [07. Gaussian Kernels and Alpha](units/07/README.md) — Editable example

### Stage 2 · File Validation and Viewer Integration

- [08. Alpha Compositing and Order](units/08/README.md) — Editable example
- [09. Limits of Depth Sorting](units/09/README.md) — Editable example
- [10. Checking PLY Headers](units/10/README.md) — Editable example
- [11. Value Decoding and Validation](units/11/README.md) — Editable example
- [12. Spherical Harmonic Color](units/12/README.md) — Editable example
- [13. Loader States and Cancellation](units/13/README.md) — Editable example
- [14. Integrating Loading and Camera State](02-experiments/README.md) — Editable example

### Stage 3 · Visibility and Quality Experiments

- [15. Screen-Space Selection Approximation](units/15/README.md) — Editable example
- [16. Visibility Bounds and Conservative Culling](units/16/README.md) — Editable example
- [17. Sorting Update Intervals](units/17/README.md) — Editable example
- [18. Resolution and Pixel Workload](units/18/README.md) — Editable example
- [19. Reducing Gaussian Count](units/19/README.md) — Editable example
- [20. Color Space and Background](units/20/README.md) — Editable example
- [21. Defining Quality Evaluation Criteria](units/21/README.md) — Editable example

### Stage 4 · A Measurable GS Exhibition Viewer


## Capstone project and deliverables

A local GS viewer with a fixed camera path, loading states, a selection policy, and a quality comparison report

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

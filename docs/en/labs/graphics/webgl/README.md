# 4-week learning roadmap

Building on your React / TypeScript experience, study **Three.js → GLSL → Gaussian Splatting → an integrated React viewer and performance** in that order. The Day 1~28 topics are linked as small learning units. Days indicate learning order; they do not guarantee a fixed workload such as 2 hours a day or professional proficiency after a month. Check the completion criteria before moving to the next unit.

All **28 units currently provide documents and linked examples**. See [Runtime environments and limitations](../../../examples.md) for each example's implementation scope, including the GS units' educational CPU visualizations and simulated loading. Having an example does not mean you have completed the learning. Mark completion after experimenting yourself.

## Series goals and integrated deliverables

Explain the relationship between Scene·Camera·Renderer and compare coordinates, shaders, and GS representations in small experiments. In the final stage, build a viewer that separates UI state from the render loop, and verify input, resizing, cleanup, and failure paths. The goal is to record the baseline environment and changed conditions, test performance hypotheses, and document how to reproduce the experiment.

The four stages produce an interactive scene, a shader with adjustable variables, a GS viewer with documented limitations, and an integrated viewer with measurement records. Judge each deliverable against the unit's completion criteria. To study individual technologies in more depth, continue with the 28-unit paths for [Three.js](../threejs/README.md), [GLSL](../../shader/glsl/README.md), and [Gaussian Splatting](../gaussian-splatting/README.md).

## Learning order and correspondence to the original

| Week   | Original Day / learning unit                                               | Skills to develop                                                                                              | Runnable example        |
| ------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Week 1 | [01 · WebGL·GPU and the first image](01-scene/README.md)                   | Connect the roles of the CPU and GPU and the rendering pipeline to the code for your first scene.              | Provided                |
| Week 1 | [02 · Scene·Camera·Renderer](02-camera/README.md)                          | Distinguish the effects of camera position and field of view.                                                  | Linked example provided |
| Week 1 | [03 · Geometry·Material·Mesh](03-mesh/README.md)                           | Experiment with shape and surface appearance separately.                                                       | Linked example provided |
| Week 1 | [04 · Coordinate systems·Vector3·Matrix4](04-coordinates/README.md)        | Predict local/world coordinates and the order of transformations.                                              | Linked example provided |
| Week 1 | [05 · Light·Shadow·Texture](05-light/README.md)                            | Distinguish how light, shadows, and textures contribute to the image.                                          | Linked example provided |
| Week 1 | [06 · Raycaster·OrbitControls](06-interaction/README.md)                   | Turn a pointer position into a spatial ray and distinguish camera controls from selection.                     | Linked example provided |
| Week 1 | [07 · Interactive scene review](07-scene-review/README.md)                 | Integrate the camera, selection, resizing, and cleanup into one small scene.                                   | Linked example provided |
| Week 2 | [08 · Vertex·Fragment shader](08-shader-stages/README.md)                  | Distinguish the inputs and outputs of the two shader stages.                                                   | Linked example provided |
| Week 2 | [09 · GLSL syntax and color](09-glsl-color/README.md)                      | Create colors using GLSL types and vector operations, and fix compilation errors.                              | Linked example provided |
| Week 2 | [10 · Uniform·Attribute·Varying and time](10-shader-data/README.md)        | Explain the data paths between JavaScript and shaders, and create changes over time.                           | Linked example provided |
| Week 2 | [11 · UV and Texture Sampling](11-uv/README.md)                            | Distinguish surface UVs from screen coordinates and explain sampling.                                          | Linked example provided |
| Week 2 | [12 · Noise·Sin·Cos waves and distortion](12-waves/README.md)              | Explain the difference between periodic functions and noise, and experiment with waves one variable at a time. | Linked example provided |
| Week 2 | [13 · ShaderMaterial integration](13-shader-material/README.md)            | Connect custom shader inputs, lifetimes, and errors to a Three.js scene.                                       | Linked example provided |
| Week 2 | [14 · Interactive shader review](14-shader-review/README.md)               | Complete and explain a small effect that connects UI input to uniforms.                                        | Linked example provided |
| Week 3 | [15 · Comparing NeRF and 3DGS](15-nerf-gs/README.md)                       | Explain how the two approaches differ in input, representation, and rendering.                                 | Linked example provided |
| Week 3 | [16 · Gaussian position·size·rotation·opacity](16-gaussian/README.md)      | Connect Gaussian spatial parameters to diagrams and API names.                                                 | Linked example provided |
| Week 3 | [17 · Spherical Harmonics and view-dependent color](17-sh/README.md)       | Explain the difference between fixed RGB and direction-dependent color representations.                        | Linked example provided |
| Week 3 | [18 · Projection·Sorting·Alpha Blending](18-gs-projection/README.md)       | Explain screen footprints and order-dependent compositing.                                                     | Linked example provided |
| Week 3 | [19 · .ply·.splat loading](19-gs-loading/README.md)                        | Check input data specifications and implement successful and failed loading.                                   | Linked example provided |
| Week 3 | [20 · Three.js+GS camera and interaction](20-gs-interaction/README.md)     | Connect the meaning of GS coordinates, scale, and selection to scene controls.                                 | Linked example provided |
| Week 3 | [21 · GS viewer review and candidate comparison](21-gs-review/README.md)   | Summarize the scope of a small GS viewer and the reasons for choosing a library.                               | Linked example provided |
| Week 4 | [22 · React+Three.js component design](22-react-viewer/README.md)          | Separate UI state from per-frame scene state and create an exercise contract.                                  | Linked example provided |
| Week 4 | [23 · Loading UI and progress](23-loading-ui/README.md)                    | Display progress based on actual stages and available evidence.                                                | Linked example provided |
| Week 4 | [24 · Camera movement·rotation·zoom](24-camera-controls/README.md)         | Make control limits and reset behavior consistent.                                                             | Linked example provided |
| Week 4 | [25 · Markers and Raycasting](25-markers/README.md)                        | Define what selected coordinates mean and place markers.                                                       | Linked example provided |
| Week 4 | [26 · FPS·Draw Calls·memory analysis](26-performance/README.md)            | Record a performance baseline under reproducible conditions.                                                   | Linked example provided |
| Week 4 | [27 · Resolution·data optimization](27-optimization/README.md)             | Test a bottleneck hypothesis by comparing before and after changing just one variable.                         | Linked example provided |
| Week 4 | [28 · Documentation and optional deployment planning](28-review/README.md) | Summarize reproducible results and remaining questions, and review deployment conditions in a document.        | Linked example provided |

## How to proceed

1. Check the prerequisites and read the concept explanations.
2. First write down one variable to change in the exercise and your predicted result in your notes.
3. After running it, record the actual result and any differences. Do not write down numbers you have not measured.
4. Use the completion criteria and self-check questions to check whether you can explain the material.
5. Download your notes as Markdown and incorporate them into the corresponding exercise document yourself.

The workspace's unit selection and document view link to these 28 documents. The originals are in docs/labs; the workspace does not replace them with separate abridged versions.

[Workspace usage and storage](../../../learning-workspace.md) · [Performance records (Korean)](../../../../performance.md) · [Design (Korean)](../../../../design/learning-workspace.md) · [Implementation plan (Korean)](../../../../plans/learning-workspace.md)

## GS candidates and scope

The original candidates **GaussianSplats3D, huggingface/gsplat.js** remain in [comparison unit 21](21-gs-review/README.md). Spark is the first candidate to evaluate for learning how transforms and lifetimes connect to a Three.js scene. We do not conclude that it is faster without measurements, and it has not yet been installed. Before adoption, compare supported formats, SH, Three.js compatibility, licenses, and selection APIs.

A general PLY file is not always GS data. GS picking may differ from raycasting mesh triangles. renderer.info does not measure total GPU VRAM. Collecting large datasets, training models, and using company data are outside this scope. Deployment on Day 28 consists of **writing a plan document only**; do not deploy publicly or push.

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

## Original sources and official starting points

- [Vite](https://vite.dev/guide/)
- [Three.js installation](https://threejs.org/manual/pages/installation.html)
- [Spark](https://sparkjs.dev/docs/)

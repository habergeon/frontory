# Three.js

[Frontory technology map](../../README.md)

Graphics · 4 stages · 28 units in the full series · 28 published in English

## Series goal

Understand the scene graph, model loading, and GPU resource lifetimes, and build a measurable 3D inspector.

## Prerequisites

HTML, CSS, and JavaScript basics

## Practice approach and scope

Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.

Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.

Only published English units are linked below. The full series has 28 units.

## Learning path

### Stage 1 · Scene Coordinates, Cameras, and Geometry

- [01. Scene Graphs and Cameras](01-foundations/README.md) — Editable example
- [02. Renderer and Display Size](units/02/README.md) — Editable example
- [03. Perspective and Orthographic Projection](units/03/README.md) — Editable example
- [04. Rotation and Pivots](units/04/README.md) — Editable example
- [05. Buffer Geometry](units/05/README.md) — Editable example
- [06. Normals and Surface Orientation](units/06/README.md) — Editable example
- [07. Shared Geometry and Cloning](units/07/README.md) — Editable example

### Stage 2 · Lighting, Materials, and Model Selection

- [08. Light Types and Placement](units/08/README.md) — Editable example
- [09. Roughness and Metalness](units/09/README.md) — Editable example
- [10. Textures and UVs](units/10/README.md) — Editable example
- [11. Color Spaces and Output](units/11/README.md) — Editable example
- [12. Shadow Maps](units/12/README.md) — Editable example
- [13. Normalized Coordinates and Selection](units/13/README.md) — Editable example
- [14. Materials, Loading, and Selection](02-experiments/README.md) — Editable example

### Stage 3 · Animation, Instancing, and Render Passes

- [15. Model Size and Camera Fitting](units/15/README.md) — Editable example
- [16. Orbit Controls and On-Demand Rendering](units/16/README.md) — Editable example
- [17. Clip Animation](units/17/README.md) — Editable example
- [18. Transparency and Depth](units/18/README.md) — Editable example
- [19. Instancing Basics](units/19/README.md) — Editable example
- [20. Instance Selection and Updates](units/20/README.md) — Editable example
- [21. Offscreen Objects and Level of Detail](units/21/README.md) — Editable example

### Stage 4 · Resource Lifetimes, Accessibility, and Measurement

- [22. Render Targets and Minimap](units/22/README.md) — Editable example
- [23. Resource Ownership Ledger](units/23/README.md) — Editable example
- [24. Asynchronous Scene Replacement](units/24/README.md) — Editable example
- [25. HTML Controls and Accessibility](units/25/README.md) — Editable example
- [26. Render Statistics and Profiling](units/26/README.md) — Editable example
- [27. Integrating the Scene Inspector](units/27/README.md) — Editable example
- [28. Rendering Resources and Measurement](03-project/README.md) — Editable example

## Capstone project and deliverables

A 3D inspector with model selection, camera fitting, animation, minimap, and error recovery, plus a resource and performance report

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [Three.js Shadows](https://threejs.org/manual/pages/shadows.html)
- [Three.js Color Management](https://threejs.org/manual/pages/color-management.html)
- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [Three.js AnimationMixer](https://threejs.org/docs/pages/AnimationMixer.html)
- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)

## Three.js roadmap: all 28 units

Units 01–04 have passed verification of the required in-site exercises. Planned improvements for units 05–28 mean existing lessons remain available, while verification that their exercises can be completed inside the site is still pending. This status is separate from your learning progress.

### [01. Scene Graphs and Cameras](01-foundations/README.md) · Practice verified

ID: `threejs-01`

Topics: canvas · first scene · Scene, Camera, Renderer and Mesh · animation · local/world coordinates

Prerequisite units: None

Completion task: Build a first HTML scene and explain parent rotation and child coordinates

Required practice capabilities: Single HTML document, inline CSS and module JavaScript · Three.js and OrbitControls · formatting, console and saving

### [02. Renderer and Display Size](units/02/README.md) · Practice verified

ID: `threejs-step-02`

Topics: CSS size and drawing buffer · aspect ratio · DPR

Prerequisite units: [01](01-foundations/README.md)

Completion task: Keep shapes in proportion as the display size changes

Required practice capabilities: Single HTML document, inline CSS and module JavaScript · Three.js and OrbitControls · formatting, console and saving

### [03. Perspective and Orthographic Projection](units/03/README.md) · Practice verified

ID: `threejs-step-03`

Topics: camera distance · FOV · near/far · OrbitControls

Prerequisite units: [01](01-foundations/README.md) · [02](units/02/README.md)

Completion task: Distinguish projection differences and reasons an object disappears

Required practice capabilities: Single HTML document, inline CSS and module JavaScript · Three.js and OrbitControls · formatting, console and saving

### [04. Rotation and Pivots](units/04/README.md) · Practice verified

ID: `threejs-step-04`

Topics: coordinate spaces · rotation centers · parent and child transforms

Prerequisite units: [01](01-foundations/README.md) · [02](units/02/README.md) · [03](units/03/README.md)

Completion task: Build spin and orbit motions and predict position changes

Required practice capabilities: Single HTML document, inline CSS and module JavaScript · Three.js and OrbitControls · formatting, console and saving

### [05. Buffer Geometry](units/05/README.md) · Practice verified

ID: `threejs-step-05`

Topics: vertices · triangles · indices · attributes

Prerequisite units: [01](01-foundations/README.md) · [04](units/04/README.md)

Completion task: Explain vertex counts and indices in a custom triangle and fix out-of-range values

Required practice capabilities: Numeric array editing and error output

### [06. Normals and Surface Orientation](units/06/README.md) · Practice verified

ID: `threejs-step-06`

Topics: normals · face direction · flat and smooth shading

Prerequisite units: [05](units/05/README.md)

Completion task: Compare missing normals and edge handling

Required practice capabilities: Fixed lighting example and surface comparison · lighting details come in unit 08

### [07. Shared Geometry and Cloning](units/07/README.md) · Practice verified

ID: `threejs-step-07`

Topics: geometry/material sharing · clone

Prerequisite units: [05](units/05/README.md) · [06](units/06/README.md)

Completion task: Reproduce when changing one object affects another

Required practice capabilities: Object and resource reference output

### [08. Light Types and Placement](units/08/README.md) · Practice verified

ID: `threejs-step-08`

Topics: ambient, directional and point lights · position · target

Prerequisite units: [01](01-foundations/README.md) · [04](units/04/README.md) · [06](units/06/README.md)

Completion task: Change light positions and targets and explain material response

Required practice capabilities: HTML inputs for each light type

### [09. Roughness and Metalness](units/09/README.md) · Practice verified

ID: `threejs-step-09`

Topics: PBR basics · roughness · metalness

Prerequisite units: [07](units/07/README.md) · [08](units/08/README.md)

Completion task: Change each variable separately under the same lighting

Required practice capabilities: Comparison examples with fixed lighting and environment

### [10. Textures and UVs](units/10/README.md) · Practice verified

ID: `threejs-step-10`

Topics: UV · image and numeric textures · repeat and wrap · loading failures

Prerequisite units: [05](units/05/README.md) · [09](units/09/README.md)

Completion task: Distinguish UV from world coordinates and recover from invalid assets

Required practice capabilities: Sample images, local file selection, TextureLoader support and failure fixtures

### [11. Color Spaces and Output](units/11/README.md) · Practice verified

ID: `threejs-step-11`

Topics: color maps and data maps · input, working and output color spaces

Prerequisite units: [09](units/09/README.md) · [10](units/10/README.md)

Completion task: Explain how color images differ from normal and roughness data

Required practice capabilities: Comparison assets with documented sources and color spaces

### [12. Shadow Maps](units/12/README.md) · Practice verified

ID: `threejs-step-12`

Topics: casters and receivers · shadow camera · resolution and cost

Prerequisite units: [03](units/03/README.md) · [08](units/08/README.md)

Completion task: Distinguish clipped shadows from low resolution and adjust them

Required practice capabilities: Shadow camera display and settings inputs

### [13. Normalized Coordinates and Selection](units/13/README.md) · Practice verified

ID: `threejs-step-13`

Topics: canvas-relative NDC · Raycaster · intersection order

Prerequisite units: [02](units/02/README.md) · [03](units/03/README.md) · [04](units/04/README.md)

Completion task: Select the nearest object after margin and size changes

Required practice capabilities: Pointer position and intersection output

### [14. Materials, Loading, and Selection](02-experiments/README.md) · Improvements planned

ID: `threejs-02`

Topics: glTF loading states · model selection · shared material highlighting

Prerequisite units: [07](units/07/README.md) · [09](units/09/README.md) · [10](units/10/README.md) · [13](units/13/README.md)

Completion task: Keep the UI usable after failures and highlight only the selected object

Required practice capabilities: GLTFLoader, sample GLB, local files and error fixtures

### [15. Model Size and Camera Fitting](units/15/README.md) · Improvements planned

ID: `threejs-step-15`

Topics: Box3 · model center and size · FOV-based framing

Prerequisite units: [03](units/03/README.md) · [14](02-experiments/README.md)

Completion task: Frame a model far from the origin and handle empty models

Required practice capabilities: Fixtures with varied sizes, positions and empty models

### [16. Orbit Controls and On-Demand Rendering](units/16/README.md) · Improvements planned

ID: `threejs-step-16`

Topics: target · damping · rendering on input

Prerequisite units: [02](units/02/README.md) · [03](units/03/README.md) · [15](units/15/README.md)

Completion task: Reduce idle rendering while keeping controls responsive

Required practice capabilities: Frame count and input state observation

### [17. Clip Animation](units/17/README.md) · Improvements planned

ID: `threejs-step-17`

Topics: clips, actions and mixers · delta in seconds · playback speed

Prerequisite units: [01](01-foundations/README.md) · [14](02-experiments/README.md) · [16](units/16/README.md)

Completion task: Control clip playback and handle models without clips

Required practice capabilities: GLB files with and without animation and playback UI

### [18. Transparency and Depth](units/18/README.md) · Improvements planned

ID: `threejs-step-18`

Topics: opacity · transparent · depthWrite · sorting limits

Prerequisite units: [03](units/03/README.md) · [09](units/09/README.md)

Completion task: Explain intersecting surfaces and the limits of object sorting

Required practice capabilities: The same scene and viewpoint for comparison and notes

### [19. Instancing Basics](units/19/README.md) · Improvements planned

ID: `threejs-step-19`

Topics: InstancedMesh · matrices · needsUpdate · draw calls

Prerequisite units: [04](units/04/README.md) · [05](units/05/README.md) · [07](units/07/README.md)

Completion task: Compare individual meshes with instancing for the same layout

Required practice capabilities: Explanation and output of relevant renderer.info metrics

### [20. Instance Selection and Updates](units/20/README.md) · Improvements planned

ID: `threejs-step-20`

Topics: instanceId · color and position updates · bounds

Prerequisite units: [13](units/13/README.md) · [19](units/19/README.md)

Completion task: Move one instance and select it at its new position

Required practice capabilities: Instance ID, transform and bounds observation

### [21. Offscreen Objects and Level of Detail](units/21/README.md) · Improvements planned

ID: `threejs-step-21`

Topics: frustum culling · bounds · LOD

Prerequisite units: [03](units/03/README.md) · [05](units/05/README.md) · [20](units/20/README.md)

Completion task: Compare quality and cost by distance and fix incorrect culling

Required practice capabilities: Bounds, detail level and triangle count display

### [22. Render Targets and Minimap](units/22/README.md) · Improvements planned

ID: `threejs-step-22`

Topics: offscreen rendering · textures · target restoration

Prerequisite units: [02](units/02/README.md) · [03](units/03/README.md) · [10](units/10/README.md)

Completion task: Update the main view and minimap and restore rendering state

Required practice capabilities: Two-camera and render target practice

### [23. Resource Ownership Ledger](units/23/README.md) · Improvements planned

ID: `threejs-step-23`

Topics: remove and dispose · shared resource lifetimes

Prerequisite units: [07](units/07/README.md) · [10](units/10/README.md) · [14](02-experiments/README.md) · [22](units/22/README.md)

Completion task: Record resource owners and prevent duplicate disposal

Required practice capabilities: Creation and cleanup counts and ownership observation

### [24. Asynchronous Scene Replacement](units/24/README.md) · Improvements planned

ID: `threejs-step-24`

Topics: request and completion order · stale results · cleanup

Prerequisite units: [14](02-experiments/README.md) · [17](units/17/README.md) · [23](units/23/README.md)

Completion task: Prevent late models from replacing a newer scene and clean up resources

Required practice capabilities: Local asset delay, failure and out-of-order completion experiments

### [25. HTML Controls and Accessibility](units/25/README.md) · Improvements planned

ID: `threejs-step-25`

Topics: object lists · keyboard controls · text status announcements

Prerequisite units: [13](units/13/README.md) · [14](02-experiments/README.md) · [16](units/16/README.md)

Completion task: Select objects, control cameras and understand errors without a mouse

Required practice capabilities: Real HTML controls, keyboard support and status announcements · HTML accessibility basics required

### [26. Render Statistics and Profiling](units/26/README.md) · Improvements planned

ID: `threejs-step-26`

Topics: renderer.info scope · multiple passes · measurement conditions

Prerequisite units: [16](units/16/README.md) · [19](units/19/README.md) · [22](units/22/README.md) · [23](units/23/README.md)

Completion task: Compare whole-frame statistics and explain measurement limits

Required practice capabilities: In-site tables and logs · precise GPU timing is not required

### [27. Integrating the Scene Inspector](units/27/README.md) · Improvements planned

ID: `threejs-step-27`

Topics: loading, selection, cameras, animation, errors and minimap integration

Prerequisite units: [14](02-experiments/README.md) · [15](units/15/README.md) · [16](units/16/README.md) · [17](units/17/README.md) · [18](units/18/README.md) · [19](units/19/README.md) · [20](units/20/README.md) · [21](units/21/README.md) · [22](units/22/README.md) · [23](units/23/README.md) · [24](units/24/README.md) · [25](units/25/README.md) · [26](units/26/README.md)

Completion task: Build an inspector that remains usable after failures

Required practice capabilities: A starter project connecting earlier assets, controls and observation tools

### [28. Rendering Resources and Measurement](03-project/README.md) · Improvements planned

ID: `threejs-03`

Topics: bottleneck isolation · quality preservation · repeated creation and shutdown

Prerequisite units: [19](units/19/README.md) · [23](units/23/README.md) · [24](units/24/README.md) · [26](units/26/README.md) · [27](units/27/README.md)

Completion task: Write a performance, quality and resource cleanup report under identical conditions

Required practice capabilities: Repeated runs, statistics comparison, notes and backup

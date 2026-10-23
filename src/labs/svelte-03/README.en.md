# Compare identical requirements

The built-in examples use actual React, Vue, and Svelte stores, but the Svelte column uses a handwritten DOM adapter. Do not compare that column’s DOM code size with Svelte component code size.

Replace `src/App.svelte` in a Svelte 5 Vite project with the supplied file to run the actual component. On the same three cards, repeat: complete card 1 → enable the incomplete filter → disable the filter. Record whether completed counts and visible cards agree across the three implementations.

Record state declarations, derived values, events, and the presence of explicit subscription cleanup in the comparison table. Separate preferences from observations. This example does not measure relative performance.

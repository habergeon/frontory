import { defineConfig } from 'vite'

// Example authors may regenerate files while this explicit test page is running.
// Reload the page manually to take a fresh source snapshot between runs.
export default defineConfig({ server: { host: '127.0.0.1', port: 4185, strictPort: true, hmr: false } })

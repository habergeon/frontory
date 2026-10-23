import { defineConfig, mergeConfig } from 'vite'
import appConfig from '../../vite.config'

// Keep the real app routes/plugins; reload manually after generated source changes.
export default mergeConfig(appConfig, defineConfig({ server: { host: '127.0.0.1', port: 4185, strictPort: true, hmr: false } }))

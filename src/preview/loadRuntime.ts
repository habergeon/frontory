import type { HtmlPreviewModules, RuntimeProfile } from './types'

interface RuntimeCode {
  legacy?: string
  modules: HtmlPreviewModules
}

const imports = {
  legacy: () => import('./runtime.generated.js?raw'),
  core: () => import('./three-core.generated.js?raw'),
  controls: () => import('./three-controls.generated.js?raw'),
  gltf: () => import('./three-gltf.generated.js?raw'),
}

export function createRuntimeLoader(load = imports) {
  const cache = new Map<RuntimeProfile, Promise<RuntimeCode>>()
  return function loadRuntime(profile: RuntimeProfile): Promise<RuntimeCode> {
    if (profile === 'html') return Promise.resolve({ modules: {} })
    const cached = cache.get(profile)
    if (cached) return cached
    const pending: Promise<RuntimeCode> = (
      profile === 'legacy'
        ? load.legacy().then(({ default: legacy }) => ({ legacy, modules: {} }))
        : Promise.all([load.core(), load.controls(), load.gltf()]).then(
            ([core, controls, gltf]) => ({
              modules: {
                core: core.default,
                controls: controls.default,
                gltf: gltf.default,
              },
            }),
          )
    ).catch((error: unknown) => {
      cache.delete(profile)
      throw error
    })
    cache.set(profile, pending)
    return pending
  }
}

export const loadRuntime = createRuntimeLoader()

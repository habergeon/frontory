/** Raw sources are cached by their resolved file path, including locale suffixes. */
export function createSourceLoader(
  modules: Record<string, (() => Promise<string>) | string>,
) {
  const values = new Map<string, string>()
  const pending = new Map<string, Promise<void>>()
  const read = (path: string): string | undefined => {
    const module = modules[path]
    return typeof module === 'string' ? module : values.get(path)
  }
  const load = (path: string): Promise<void> => {
    if (read(path) !== undefined) return Promise.resolve()
    const existing = pending.get(path)
    if (existing) return existing
    const module = modules[path]
    if (typeof module !== 'function')
      return Promise.reject(Error('Unknown code path: ' + path))
    const request = Promise.resolve()
      .then(module)
      .then((source) => {
        values.set(path, source)
      })
      .finally(() => pending.delete(path))
    pending.set(path, request)
    return request
  }
  return { read, load, has: (path: string) => Object.hasOwn(modules, path) }
}

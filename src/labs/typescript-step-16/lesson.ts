type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }
function parse(raw: string): Result<unknown, string> {
  try {
    return { ok: true, value: JSON.parse(raw) }
  } catch {
    return { ok: false, error: 'syntax' }
  }
}
export {}

type Note = { readonly id: number; readonly done: boolean }
function toggle(notes: readonly Note[]): Note[] {
  return notes.map((n) => ({ ...n, done: !n.done }))
}
export {}

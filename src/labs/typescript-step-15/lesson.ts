type Note = { id: number; title: string }
function isNote(v: unknown): v is Note {
  return (
    typeof v === 'object' &&
    v !== null &&
    'id' in v &&
    typeof v.id === 'number' &&
    'title' in v &&
    typeof v.title === 'string'
  )
}
export {}

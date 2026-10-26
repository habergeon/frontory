interface Note {
  id: number
  title: string
  tag?: string
}
const good: Note = { id: 1, title: 'A' }
// @ts-expect-error misspelled required field
const bad: Note = { id: 1, titel: 'A' }
export {}

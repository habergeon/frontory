function title(note: { title: string }): string {
  return note.title.trim()
}
function visit(items: string[], callback: (value: string) => void): void {
  items.forEach(callback)
}
export {}

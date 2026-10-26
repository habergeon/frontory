function first<T>(items: T[]): T | undefined {
  return items[0]
}
function mapValues<T, U>(items: T[], fn: (v: T) => U): U[] {
  return items.map(fn)
}
export {}

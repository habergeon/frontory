function index<T extends { id: number }>(items: T[]): Map<number, T> {
  return new Map(items.map((item) => [item.id, item]))
}
// @ts-expect-error id required
index([{ title: 'A' }])
export {}

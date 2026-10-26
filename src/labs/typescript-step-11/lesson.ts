function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key]
}
const note = { title: 'A', done: false }
getProperty(note, 'title')
// @ts-expect-error missing key
getProperty(note, 'missing')
export {}

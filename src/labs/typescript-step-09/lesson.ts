type State = 'idle' | 'loading' | 'done'
function assertNever(x: never): never {
  throw new Error(String(x))
}
function label(s: State): string {
  switch (s) {
    case 'idle':
      return '대기'
    case 'loading':
      return '진행'
    case 'done':
      return '완료'
    default:
      return assertNever(s)
  }
}
export {}

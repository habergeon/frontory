type State = 'idle' | 'done'
const good: State = 'idle'
// @ts-expect-error unsupported state; becomes unused if State weakens to any
const bad: State = 'missing'
type Plugin = { mount: () => () => void }
// @ts-expect-error cleanup function is required
const plugin: Plugin = { mount: () => 42 }
export {}

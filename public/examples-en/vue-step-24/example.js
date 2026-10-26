// Shallow Reactivity and External Objects
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({ locale = 'ko', Vue, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Mutate nested x',
          display03: 'triggerRef',
          display04: 'Replace object',
        }
      : {
          display01: 'Experiment input',
          display02: 'Mutate nested x',
          display03: 'triggerRef',
          display04: 'Replace object',
        }
  const h = Vue.h
  const button = (label, onClick) =>
    h('button', { type: 'button', onClick, style: { margin: '4px' } }, label)
  const input = (value, change) =>
    h('input', {
      value,
      onInput: (event) => change(event.target.value),
      'aria-label': messages.display01,
    })
  const out = (value) => h('pre', JSON.stringify(value, null, 2))
  const fixture = [
    { id: 1, title: 'State', done: false },
    { id: 2, title: 'Effects', done: false },
    { id: 3, title: 'Canvas', done: false },
  ]
  const app = Vue.createApp({
    setup() {
      const message = Vue.ref('')
      const external = Vue.shallowRef({ position: { x: 0 } })
      const displayed = Vue.computed(() => external.value.position.x)
      return () => [
        button(messages.display02, () => external.value.position.x++),
        button(messages.display03, () => Vue.triggerRef(external)),
        button(
          messages.display04,
          () =>
            (external.value = {
              position: { x: external.value.position.x + 1 },
            }),
        ),
        out({ observed: displayed.value, proxy: Vue.isProxy(external.value) }),
      ]
    },
  })
  app.mount(container)
  return () => app.unmount()
}

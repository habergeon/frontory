// SFC와 템플릿 바인딩
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({ locale = 'ko', Vue, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Toggle disabled',
          display03: 'Action received',
          display04: 'Bound action',
        }
      : {
          display01: 'Experiment input',
          display02: 'Toggle disabled',
          display03: 'Action received',
          display04: 'Bound action',
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
      const disabled = Vue.ref(false)
      return () => [
        button(messages.display02, () => (disabled.value = !disabled.value)),
        h(
          'button',
          {
            disabled: disabled.value,
            onClick: () => (message.value = messages.display03),
          },
          messages.display04,
        ),
        out({ disabled: disabled.value, message: message.value }),
      ]
    },
  })
  app.mount(container)
  return () => app.unmount()
}

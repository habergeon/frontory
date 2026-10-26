// List Keys and Conditional Lifetimes
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({ locale = 'ko', Vue, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Visible ',
          display03: 'Policy ',
        }
      : {
          display01: 'Experiment input',
          display02: 'Visible ',
          display03: 'Policy ',
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
      const visible = Vue.ref(true),
        remove = Vue.ref(false)
      const Row = {
        setup() {
          const note = Vue.ref('')
          return () => input(note.value, (v) => (note.value = v))
        },
      }
      return () => [
        button(
          messages.display02 + visible.value,
          () => (visible.value = !visible.value),
        ),
        button(
          messages.display03 + (remove.value ? 'v-if' : 'v-show'),
          () => (remove.value = !remove.value),
        ),
        remove.value
          ? visible.value
            ? h(Row)
            : null
          : h('div', { style: { display: visible.value ? 'block' : 'none' } }, [
              h(Row),
            ]),
      ]
    },
  })
  app.mount(container)
  return () => app.unmount()
}

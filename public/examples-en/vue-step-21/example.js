// KeepAlive and Pausing
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({ locale = 'ko', Vue, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Visible ',
          display03: 'KeepAlive ',
        }
      : {
          display01: 'Experiment input',
          display02: 'Visible ',
          display03: 'KeepAlive ',
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
        cache = Vue.ref(true)
      const Pane = {
        setup() {
          const note = Vue.ref(''),
            ticks = Vue.ref(0)
          let timer
          const start = () => {
            clearInterval(timer)
            timer = setInterval(() => ticks.value++, 500)
          }
          const stop = () => clearInterval(timer)
          Vue.onMounted(start)
          Vue.onActivated(start)
          Vue.onDeactivated(stop)
          Vue.onUnmounted(stop)
          return () =>
            h('div', [
              input(note.value, (v) => (note.value = v)),
              out({ ticks: ticks.value }),
            ])
        },
      }
      return () => [
        button(
          messages.display02 + visible.value,
          () => (visible.value = !visible.value),
        ),
        button(
          messages.display03 + cache.value,
          () => (cache.value = !cache.value),
        ),
        cache.value
          ? h(Vue.KeepAlive, null, {
              default: () => (visible.value ? h(Pane) : null),
            })
          : visible.value
            ? h(Pane)
            : null,
      ]
    },
  })
  app.mount(container)
  return () => app.unmount()
}

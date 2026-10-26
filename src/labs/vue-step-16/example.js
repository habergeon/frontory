// Composable의 수명
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({ locale = 'ko', Vue, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Move pointer',
          display03: 'Second consumer',
        }
      : {
          display01: 'Experiment input',
          display02: 'Move pointer',
          display03: 'Second consumer',
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
      const second = Vue.ref(true),
        active = Vue.ref(0)
      function usePointer() {
        const point = Vue.ref(messages.display02)
        const handler = (e) => (point.value = e.clientX + ', ' + e.clientY)
        Vue.onMounted(() => {
          window.addEventListener('pointermove', handler)
          active.value++
        })
        Vue.onUnmounted(() => {
          window.removeEventListener('pointermove', handler)
          active.value--
        })
        return point
      }
      const Consumer = {
        setup() {
          const point = usePointer()
          return () => out(point.value)
        },
      }
      return () => [
        button(messages.display03, () => (second.value = !second.value)),
        out({ activeListeners: active.value }),
        h(Consumer),
        second.value ? h(Consumer) : null,
      ]
    },
  })
  app.mount(container)
  return () => app.unmount()
}

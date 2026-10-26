// Creating and Releasing Canvas Resources
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({ locale = 'ko', Vue, container }) {
  const messages =
    locale === 'en'
      ? { display01: 'Experiment input', display02: 'Toggle canvas' }
      : { display01: 'Experiment input', display02: 'Toggle canvas' }
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
      const shown = Vue.ref(true),
        active = Vue.ref(0)
      const Scene = {
        setup() {
          const canvas = Vue.ref(null)
          let frame
          Vue.onMounted(() => {
            active.value++
            const ctx = canvas.value.getContext('2d')
            const draw = (time) => {
              ctx.clearRect(0, 0, 300, 140)
              ctx.fillRect(140 + 70 * Math.sin(time / 1000), 50, 20, 20)
              frame = requestAnimationFrame(draw)
            }
            frame = requestAnimationFrame(draw)
          })
          Vue.onUnmounted(() => {
            cancelAnimationFrame(frame)
            active.value--
          })
          return () => h('canvas', { ref: canvas, width: 300, height: 140 })
        },
      }
      return () => [
        button(messages.display02, () => (shown.value = !shown.value)),
        out({ activeLoops: active.value }),
        shown.value ? h(Scene) : null,
      ]
    },
  })
  app.mount(container)
  return () => app.unmount()
}

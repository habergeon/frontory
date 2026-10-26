// Vue의 실제 ref/computed와 h 렌더 함수입니다. 템플릿 컴파일 없이 반응성을 관찰합니다.
export function mount({ locale = 'ko', Vue, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Vue ref + computed',
          display02: 'count: ',
          display03: ' / doubled: ',
          display04: 'Increment',
        }
      : {
          display01: 'Vue ref + computed',
          display02: 'count: ',
          display03: ' / doubled: ',
          display04: '증가',
        }
  const app = Vue.createApp({
    setup() {
      const count = Vue.ref(0)
      const doubled = Vue.computed(() => count.value * 2)
      return () =>
        Vue.h('section', [
          Vue.h('h1', messages.display01),
          Vue.h(
            'output',
            messages.display02 +
              count.value +
              messages.display03 +
              doubled.value,
          ),
          Vue.h('button', { onClick: () => count.value++ }, messages.display04),
        ])
    },
  })
  app.mount(container)
  return () => app.unmount()
}

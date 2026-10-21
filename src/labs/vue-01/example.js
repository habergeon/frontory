// Vue의 실제 ref/computed와 h 렌더 함수입니다. 템플릿 컴파일 없이 반응성을 관찰합니다.
export function mount({ Vue, container }) {
  const app = Vue.createApp({ setup() {
    const count = Vue.ref(0)
    const doubled = Vue.computed(() => count.value * 2)
    return () => Vue.h('section', [Vue.h('h1', 'Vue ref + computed'),
      Vue.h('output', 'count: ' + count.value + ' / doubled: ' + doubled.value),
      Vue.h('button', { onClick: () => count.value++ }, '증가')])
  } })
  app.mount(container)
  return () => app.unmount()
}

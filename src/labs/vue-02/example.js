export function mount({ Vue, container }) {
  const { h, ref, reactive, watch, createApp } = Vue
  const Editor = {
    props: ['modelValue'], emits: ['update:modelValue'],
    setup(props, { emit }) { return () => h('label', null, ['단위별 필기 ', h('textarea', { value: props.modelValue, onInput: event => emit('update:modelValue', event.target.value) })]) }
  }
  const app = createApp({ setup() {
    const unit = ref('A'), delay = ref(800), drafts = reactive({ A: '', B: '' }), saved = reactive({ A: '', B: '' }), status = ref('입력 대기')
    // 단위와 문자열을 스냅샷으로 잡아, 늦은 타이머가 새 단위에 쓰지 못하게 합니다.
    watch(() => [unit.value, drafts[unit.value], delay.value], ([id, text, ms], _, onCleanup) => {
      status.value = `${id} 저장 대기 (${ms}ms)`
      const timer = setTimeout(() => { saved[id] = text; status.value = `${id} 저장 완료` }, Number(ms))
      onCleanup(() => clearTimeout(timer)) // 재실행과 컴포넌트 해제에서 모두 정리
    })
    return () => h('section', null, [h('h2', null, 'props / emits / watch 정리'),
      h('p', null, '빠르게 A에 입력하고 B로 전환하세요. 초안은 부모가 보존하고 저장 타이머는 취소됩니다. 저장소는 이 실행의 메모리입니다.'),
      h('label', null, ['단위 ', h('select', { value: unit.value, onChange: e => { unit.value = e.target.value } }, ['A','B'].map(id => h('option', { value: id }, id)))]),
      h('label', null, ['저장 지연 ms ', h('input', { type: 'range', min: 100, max: 2000, step: 100, value: delay.value, onInput: e => { delay.value = Number(e.target.value) } })]),
      h(Editor, { modelValue: drafts[unit.value], 'onUpdate:modelValue': value => { drafts[unit.value] = value } }),
      h('p', { role: 'status' }, status.value), h('pre', null, JSON.stringify({ drafts, saved }, null, 2))])
  } })
  app.mount(container); return () => app.unmount()
}

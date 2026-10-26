export function mount({ locale = 'ko', Vue, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Per-unit notes ',
          display02: 'Waiting for input',
          display03: ' save pending (',
          display04: ' saved',
          display05: 'props / emits / watch cleanup',
          display06:
            'Quickly type in A and switch to B. The parent preserves drafts and cancels the save timer. Storage is limited to memory for this run.',
          display07: 'Unit ',
          display08: 'Save delay in ms ',
        }
      : {
          display01: '단위별 필기 ',
          display02: '입력 대기',
          display03: ' 저장 대기 (',
          display04: ' 저장 완료',
          display05: 'props / emits / watch 정리',
          display06:
            '빠르게 A에 입력하고 B로 전환하세요. 초안은 부모가 보존하고 저장 타이머는 취소됩니다. 저장소는 이 실행의 메모리입니다.',
          display07: '단위 ',
          display08: '저장 지연 ms ',
        }
  const { h, ref, reactive, watch, createApp } = Vue
  const Editor = {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      return () =>
        h('label', null, [
          messages.display01,
          h('textarea', {
            value: props.modelValue,
            onInput: (event) => emit('update:modelValue', event.target.value),
          }),
        ])
    },
  }
  const app = createApp({
    setup() {
      const unit = ref('A'),
        delay = ref(800),
        drafts = reactive({ A: '', B: '' }),
        saved = reactive({ A: '', B: '' }),
        status = ref(messages.display02)
      // Capture the unit and string as a snapshot so a delayed timer cannot write to the new unit.
      watch(
        () => [unit.value, drafts[unit.value], delay.value],
        ([id, text, ms], _, onCleanup) => {
          status.value = `${id}${messages.display03}${ms}ms)`
          const timer = setTimeout(() => {
            saved[id] = text
            status.value = `${id}${messages.display04}`
          }, Number(ms))
          onCleanup(() => clearTimeout(timer)) // Clean up on both reruns and component unmount
        },
      )
      return () =>
        h('section', null, [
          h('h2', null, messages.display05),
          h('p', null, messages.display06),
          h('label', null, [
            messages.display07,
            h(
              'select',
              {
                value: unit.value,
                onChange: (e) => {
                  unit.value = e.target.value
                },
              },
              ['A', 'B'].map((id) => h('option', { value: id }, id)),
            ),
          ]),
          h('label', null, [
            messages.display08,
            h('input', {
              type: 'range',
              min: 100,
              max: 2000,
              step: 100,
              value: delay.value,
              onInput: (e) => {
                delay.value = Number(e.target.value)
              },
            }),
          ]),
          h(Editor, {
            modelValue: drafts[unit.value],
            'onUpdate:modelValue': (value) => {
              drafts[unit.value] = value
            },
          }),
          h('p', { role: 'status' }, status.value),
          h('pre', null, JSON.stringify({ drafts, saved }, null, 2)),
        ])
    },
  })
  app.mount(container)
  return () => app.unmount()
}

export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'List render attempts: ',
          display02: ' times',
          display03: 'Learning unit ',
          display04: 'Preserved notes ',
          display05: 'Temporary editor state (reset when key changes) ',
          display06: 'ms (actual Profiler callback)',
          display07: 'Note ownership, key, and memo',
          display08:
            'Notes remain in the parent’s per-unit memory, and temporary input resets when the Editor key changes. A new run resets the notes.',
          display09: 'Unit ',
          display10: 'Apply React.memo to the list',
          display11: 'Item count ',
          display12:
            'Profiler may be inactive in this runtime. Record accurate timings in a development/profiling build.',
        }
      : {
          display01: '목록 렌더 시도 ',
          display02: '회',
          display03: '학습 단위 ',
          display04: '보존되는 필기 ',
          display05: '편집기 임시 상태 (key 변경으로 초기화) ',
          display06: 'ms (실제 Profiler 콜백)',
          display07: '필기 소유권, key, memo',
          display08:
            '필기는 부모의 단위별 메모리에 남고 임시 입력은 Editor key가 바뀌면 초기화됩니다. 새 실행에서는 초기화됩니다.',
          display09: '단위 ',
          display10: '목록에 React.memo 적용',
          display11: '항목 수 ',
          display12:
            '이 런타임에서 Profiler가 비활성일 수 있습니다. 정확한 시간은 개발/profiling 빌드에서 기록하세요.',
        }
  const h = React.createElement
  function CardList({ count }) {
    const renders = React.useRef(0)
    renders.current++ // 학습용 렌더 시도 계수, 시간 측정값이 아닙니다.
    return h(
      'div',
      null,
      h(
        'p',
        null,
        `${messages.display01}${renders.current}${messages.display02}`,
      ),
      h(
        'ul',
        null,
        Array.from({ length: count }, (_, i) =>
          h('li', { key: i }, `${messages.display03}${i + 1}`),
        ),
      ),
    )
  }
  const MemoCards = React.memo(CardList)
  function Editor({ text, onChange }) {
    const [scratch, setScratch] = React.useState('')
    return h(
      'div',
      null,
      h(
        'label',
        null,
        messages.display04,
        h('textarea', {
          value: text,
          onChange: (event) => onChange(event.target.value),
        }),
      ),
      h(
        'label',
        null,
        messages.display05,
        h('input', {
          value: scratch,
          onChange: (event) => setScratch(event.target.value),
        }),
      ),
    )
  }
  function App() {
    const [unit, setUnit] = React.useState('A'),
      [notes, setNotes] = React.useState({ A: '', B: '' })
    const [memo, setMemo] = React.useState(false),
      [count, setCount] = React.useState(30)
    const profile = React.useRef(null)
    const onRender = (id, phase, duration) => {
      // 개발/profiling 빌드에서만 콜백을 보장합니다. 결과를 state에 넣으면 추가 렌더가 생깁니다.
      if (profile.current)
        profile.current.textContent = `${id} ${phase}: ${duration.toFixed(2)}${messages.display06}`
    }
    return h(
      'section',
      null,
      h('h2', null, messages.display07),
      h('p', null, messages.display08),
      h(
        'label',
        null,
        messages.display09,
        h(
          'select',
          { value: unit, onChange: (e) => setUnit(e.target.value) },
          ['A', 'B'].map((id) => h('option', { key: id }, id)),
        ),
      ),
      h(Editor, {
        key: unit,
        text: notes[unit],
        onChange: (text) =>
          setNotes((previous) => ({ ...previous, [unit]: text })),
      }),
      h(
        'label',
        null,
        h('input', {
          type: 'checkbox',
          checked: memo,
          onChange: (e) => setMemo(e.target.checked),
        }),
        messages.display10,
      ),
      h(
        'label',
        null,
        messages.display11,
        h('input', {
          type: 'range',
          min: 10,
          max: 200,
          value: count,
          onChange: (e) => setCount(Number(e.target.value)),
        }),
      ),
      h('output', { ref: profile }, messages.display12),
      h(
        React.Profiler,
        { id: 'cards', onRender },
        h(memo ? MemoCards : CardList, { count }),
      ),
    )
  }
  const root = createRoot(container)
  root.render(h(App))
  return () => root.unmount()
}

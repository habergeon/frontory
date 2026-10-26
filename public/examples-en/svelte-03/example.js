// The three implementations use the same card data, completion toggle, and incomplete-only filter contract.
// The Svelte column uses writable stores and a DOM adapter; the compiled component is provided as App.svelte.
export function mount({
  locale = 'ko',
  React,
  createRoot,
  Vue,
  writable,
  container,
}) {
  const messages =
    locale === 'en'
      ? {
          display01:
            '<h2>Compare the same requirements</h2><p>Each column has independent state. Operate the completion buttons and filter in the same order. The Svelte column uses an actual store and a DOM adapter; App.svelte provides the component comparison source.</p>\n    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px"><section id="react"></section><section id="vue"></section><section id="svelte"></section></div>\n    <table><caption>Implementation boundaries to observe</caption><thead><tr><th>Tool</th><th>State / derived values</th><th>Cleanup</th></tr></thead><tbody><tr><td>React</td><td>useState / filter during render</td><td>root.unmount</td></tr><tr><td>Vue</td><td>ref / computed</td><td>app.unmount</td></tr><tr><td>Svelte preview</td><td>writable / filter in subscriber</td><td>unsubscribe + event cleanup</td></tr><tr><td>Svelte source</td><td>$state / $derived</td><td>Component lifetime</td></tr></tbody></table>',
          display02: 'React',
          display03: 'Incomplete only',
          display04: 'Completed ',
          display05: 'Vue',
          display06:
            '<h3>Svelte store adapter</h3><label><input type="checkbox">Incomplete only</label><p></p><div></div>',
        }
      : {
          display01:
            '<h2>같은 요구사항으로 비교하기</h2><p>각 열은 독립 상태입니다. 같은 순서로 완료 버튼과 필터를 조작하세요. Svelte 열은 실제 store와 DOM 어댑터이며 컴포넌트 비교용 원본은 App.svelte입니다.</p>\n    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px"><section id="react"></section><section id="vue"></section><section id="svelte"></section></div>\n    <table><caption>관찰할 구현 경계</caption><thead><tr><th>도구</th><th>상태 / 파생</th><th>정리</th></tr></thead><tbody><tr><td>React</td><td>useState / render 중 filter</td><td>root.unmount</td></tr><tr><td>Vue</td><td>ref / computed</td><td>app.unmount</td></tr><tr><td>Svelte 미리보기</td><td>writable / subscriber의 filter</td><td>unsubscribe + 이벤트 해제</td></tr><tr><td>Svelte 원본</td><td>$state / $derived</td><td>컴포넌트 수명</td></tr></tbody></table>',
          display02: 'React',
          display03: '미완료만',
          display04: '완료 ',
          display05: 'Vue',
          display06:
            '<h3>Svelte store 어댑터</h3><label><input type="checkbox">미완료만</label><p></p><div></div>',
        }
  container.innerHTML = messages.display01
  const initial = () => [
    { id: 1, title: '상태', done: false },
    { id: 2, title: '파생 값', done: true },
    { id: 3, title: '정리', done: false },
  ]
  const toggle = (items, id) =>
    items.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
  const h = React.createElement
  function Cards() {
    const [items, setItems] = React.useState(initial),
      [filter, setFilter] = React.useState(false)
    return h(
      'div',
      null,
      h('h3', null, messages.display02),
      h(
        'label',
        null,
        h('input', {
          type: 'checkbox',
          checked: filter,
          onChange: (e) => setFilter(e.target.checked),
        }),
        messages.display03,
      ),
      h(
        'p',
        null,
        `${messages.display04}${items.filter((item) => item.done).length}/3`,
      ),
      items
        .filter((item) => !filter || !item.done)
        .map((item) =>
          h(
            'button',
            {
              key: item.id,
              onClick: () => setItems((old) => toggle(old, item.id)),
              'aria-pressed': item.done,
            },
            item.title + (item.done ? ' ✓' : ' ○'),
          ),
        ),
    )
  }
  const root = createRoot(container.querySelector('#react'))
  root.render(h(Cards))
  const app = Vue.createApp({
    setup() {
      const items = Vue.ref(initial()),
        filter = Vue.ref(false),
        shown = Vue.computed(() =>
          items.value.filter((item) => !filter.value || !item.done),
        )
      return () =>
        Vue.h('div', null, [
          Vue.h('h3', null, messages.display05),
          Vue.h('label', null, [
            Vue.h('input', {
              type: 'checkbox',
              checked: filter.value,
              onChange: (e) => {
                filter.value = e.target.checked
              },
            }),
            messages.display03,
          ]),
          Vue.h(
            'p',
            null,
            `${messages.display04}${items.value.filter((item) => item.done).length}/3`,
          ),
          ...shown.value.map((item) =>
            Vue.h(
              'button',
              {
                key: item.id,
                'aria-pressed': item.done,
                onClick: () => {
                  items.value = toggle(items.value, item.id)
                },
              },
              item.title + (item.done ? ' ✓' : ' ○'),
            ),
          ),
        ])
    },
  })
  app.mount(container.querySelector('#vue'))
  const host = container.querySelector('#svelte'),
    events = new AbortController(),
    state = writable({ items: initial(), filter: false })
  host.innerHTML = messages.display06
  const unsubscribe = state.subscribe(({ items, filter }) => {
    host.querySelector('p').textContent =
      `${messages.display04}${items.filter((item) => item.done).length}/3`
    const list = host.querySelector('div')
    list.replaceChildren()
    items
      .filter((item) => !filter || !item.done)
      .forEach((item) => {
        const button = document.createElement('button')
        button.textContent = item.title + (item.done ? ' ✓' : ' ○')
        button.dataset.id = String(item.id)
        button.setAttribute('aria-pressed', String(item.done))
        list.append(button)
      })
  })
  host.addEventListener(
    'change',
    (event) =>
      state.update((old) => ({ ...old, filter: event.target.checked })),
    { signal: events.signal },
  )
  host.addEventListener(
    'click',
    (event) => {
      const button = event.target.closest('button')
      if (button)
        state.update((old) => ({
          ...old,
          items: toggle(old.items, Number(button.dataset.id)),
        }))
    },
    { signal: events.signal },
  )
  return () => {
    root.unmount()
    app.unmount()
    unsubscribe()
    events.abort()
    container.replaceChildren()
  }
}

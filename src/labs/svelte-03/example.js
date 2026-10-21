// 세 구현은 같은 카드 데이터/완료 토글/미완료 필터 계약을 사용합니다.
// Svelte 열만 writable + DOM 어댑터이며, 컴파일된 컴포넌트는 App.svelte로 제공합니다.
export function mount({ React, createRoot, Vue, writable, container }) {
  container.innerHTML = `<h2>같은 요구사항으로 비교하기</h2><p>각 열은 독립 상태입니다. 같은 순서로 완료 버튼과 필터를 조작하세요. Svelte 열은 실제 store와 DOM 어댑터이며 컴포넌트 비교용 원본은 App.svelte입니다.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px"><section id="react"></section><section id="vue"></section><section id="svelte"></section></div>
    <table><caption>관찰할 구현 경계</caption><thead><tr><th>도구</th><th>상태 / 파생</th><th>정리</th></tr></thead><tbody><tr><td>React</td><td>useState / render 중 filter</td><td>root.unmount</td></tr><tr><td>Vue</td><td>ref / computed</td><td>app.unmount</td></tr><tr><td>Svelte 미리보기</td><td>writable / subscriber의 filter</td><td>unsubscribe + 이벤트 해제</td></tr><tr><td>Svelte 원본</td><td>$state / $derived</td><td>컴포넌트 수명</td></tr></tbody></table>`
  const initial = () => [{ id: 1, title: '상태', done: false }, { id: 2, title: '파생 값', done: true }, { id: 3, title: '정리', done: false }]
  const toggle = (items, id) => items.map(item => item.id === id ? { ...item, done: !item.done } : item)
  const h = React.createElement
  function Cards() {
    const [items, setItems] = React.useState(initial), [filter, setFilter] = React.useState(false)
    return h('div', null, h('h3', null, 'React'), h('label', null, h('input', { type: 'checkbox', checked: filter, onChange: e => setFilter(e.target.checked) }), '미완료만'),
      h('p', null, `완료 ${items.filter(item => item.done).length}/3`), items.filter(item => !filter || !item.done).map(item => h('button', { key: item.id, onClick: () => setItems(old => toggle(old, item.id)), 'aria-pressed': item.done }, item.title + (item.done ? ' ✓' : ' ○'))))
  }
  const root = createRoot(container.querySelector('#react')); root.render(h(Cards))
  const app = Vue.createApp({ setup() {
    const items = Vue.ref(initial()), filter = Vue.ref(false), shown = Vue.computed(() => items.value.filter(item => !filter.value || !item.done))
    return () => Vue.h('div', null, [Vue.h('h3', null, 'Vue'), Vue.h('label', null, [Vue.h('input', { type: 'checkbox', checked: filter.value, onChange: e => { filter.value = e.target.checked } }), '미완료만']),
      Vue.h('p', null, `완료 ${items.value.filter(item => item.done).length}/3`), ...shown.value.map(item => Vue.h('button', { key: item.id, 'aria-pressed': item.done, onClick: () => { items.value = toggle(items.value, item.id) } }, item.title + (item.done ? ' ✓' : ' ○')))])
  } }); app.mount(container.querySelector('#vue'))
  const host = container.querySelector('#svelte'), events = new AbortController(), state = writable({ items: initial(), filter: false })
  host.innerHTML = '<h3>Svelte store 어댑터</h3><label><input type="checkbox">미완료만</label><p></p><div></div>'
  const unsubscribe = state.subscribe(({ items, filter }) => {
    host.querySelector('p').textContent = `완료 ${items.filter(item => item.done).length}/3`
    const list = host.querySelector('div'); list.replaceChildren()
    items.filter(item => !filter || !item.done).forEach(item => {
      const button = document.createElement('button'); button.textContent = item.title + (item.done ? ' ✓' : ' ○'); button.dataset.id = String(item.id); button.setAttribute('aria-pressed', String(item.done)); list.append(button)
    })
  })
  host.addEventListener('change', event => state.update(old => ({ ...old, filter: event.target.checked })), { signal: events.signal })
  host.addEventListener('click', event => { const button = event.target.closest('button'); if (button) state.update(old => ({ ...old, items: toggle(old.items, Number(button.dataset.id)) })) }, { signal: events.signal })
  return () => { root.unmount(); app.unmount(); unsubscribe(); events.abort(); container.replaceChildren() }
}

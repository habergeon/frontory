/** @typedef {{id: number, title: string}} Lesson */
/** @template T @param {T[]} values @returns {T | undefined} */
function first(values) { return values[0] }
/** @param {unknown} value @returns {value is Lesson} */
function isLesson(value) {
  return typeof value === 'object' && value !== null && 'id' in value && 'title' in value
    && typeof value.id === 'number' && Number.isFinite(value.id) && typeof value.title === 'string'
}
/** @param {unknown} value @returns {value is Lesson[]} */
function isLessonList(value) { return Array.isArray(value) && value.every(isLesson) }
export function mount({ container }) {
  container.innerHTML = `<h2>unknown → 가드 → 제네릭</h2><p>JSDoc의 @template은 JavaScript 편집기에서도 타입 관계를 표현합니다. 타입 단언은 런타임 검증을 대신하지 않습니다.</p>
    <label>JSON <textarea rows="5" cols="40">[{"id":1,"title":"타입 가드"}]</textarea></label><div><button data-case="valid">정상</button><button data-case="empty">빈 배열</button><button data-case="null">null</button><button data-case="bad">잘못된 필드</button><button id="check">검증</button></div><pre role="status"></pre>`
  const input = container.querySelector('textarea'), output = container.querySelector('pre'), events = new AbortController()
  const cases = { valid: '[{"id":1,"title":"타입 가드"}]', empty: '[]', null: 'null', bad: '[{"id":"1","title":null}]' }
  function check() {
    try {
      /** @type {unknown} */ const value = JSON.parse(input.value)
      if (!isLessonList(value)) { output.textContent = '거부: 유한한 number id와 string title을 가진 객체 배열이어야 합니다.'; return }
      const lesson = first(value) // Lesson | undefined: 제네릭이 입력 요소의 타입을 보존합니다.
      output.textContent = lesson ? `검증 통과: ${lesson.id} / ${lesson.title.toUpperCase()}` : '검증 통과: 빈 배열이므로 first는 undefined'
    } catch (error) { output.textContent = `JSON 구문 오류: ${error.message}` }
  }
  container.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return
    if (button.dataset.case) input.value = cases[button.dataset.case]
    check()
  }, { signal: events.signal })
  check(); return () => { events.abort(); container.replaceChildren() }
}

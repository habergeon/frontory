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
export function mount({ container ,locale='ko'}) {
const messages=locale==='en'?{"display001":"JSDoc @template expresses type relationships in the JavaScript editor too. Type assertions do not replace runtime validation.","display002":"Rejected: expected an array of objects with a finite number id and a string title.","display003":"Validation passed: the array is empty, so first is undefined","display004":"unknown → guard → generic","display005":"JSON syntax error: ","display006":"Validation passed: ","display007":"Invalid fields","display008":"Empty array","display009":"Valid","display010":"Validate"}:{"display001":"JSDoc의 @template은 JavaScript 편집기에서도 타입 관계를 표현합니다. 타입 단언은 런타임 검증을 대신하지 않습니다.","display002":"거부: 유한한 number id와 string title을 가진 객체 배열이어야 합니다.","display003":"검증 통과: 빈 배열이므로 first는 undefined","display004":"unknown → 가드 → 제네릭","display005":"JSON 구문 오류: ","display006":"검증 통과: ","display007":"잘못된 필드","display008":"빈 배열","display009":"정상","display010":"검증"};
  container.innerHTML = `<h2>${messages.display004}</h2><p>${messages.display001}</p>
    <label>JSON <textarea rows="5" cols="40">[{"id":1,"title":"타입 가드"}]</textarea></label><div><button data-case="valid">${messages.display009}</button><button data-case="empty">${messages.display008}</button><button data-case="null">null</button><button data-case="bad">${messages.display007}</button><button id="check">${messages.display010}</button></div><pre role="status"></pre>`
  const input = container.querySelector('textarea'), output = container.querySelector('pre'), events = new AbortController()
  const cases = { valid: '[{"id":1,"title":"타입 가드"}]', empty: '[]', null: 'null', bad: '[{"id":"1","title":null}]' }
  function check() {
    try {
      /** @type {unknown} */ const value = JSON.parse(input.value)
      if (!isLessonList(value)) { output.textContent = messages.display002; return }
      const lesson = first(value) // Lesson | undefined: the generic preserves the input element type.
      output.textContent = lesson ? `${messages.display006}${lesson.id} / ${lesson.title.toUpperCase()}` : messages.display003
    } catch (error) { output.textContent = `${messages.display005}${error.message}` }
  }
  container.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return
    if (button.dataset.case) input.value = cases[button.dataset.case]
    check()
  }, { signal: events.signal })
  check(); return () => { events.abort(); container.replaceChildren() }
}

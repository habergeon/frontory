// Svelte의 실제 writable store API를 관찰하는 기초 예제입니다.
// .svelte 컴포넌트 컴파일이나 $state rune 예제는 별도 단계에서 다룹니다.
export function mount({locale='ko', writable, container }) {
  const messages=locale==='en'?{"display01":"Increment Svelte store","display02":"Subscription result: "}:{"display01":"Svelte store 증가","display02":"구독 결과: "};
  const count = writable(0)
  const output = document.createElement('output')
  const button = document.createElement('button')
  button.textContent = messages.display01
  const unsubscribe = count.subscribe(value => { output.textContent = messages.display02 + value })
  const click = () => count.update(value => value + 1)
  button.addEventListener('click', click)
  container.append(output, button)
  return () => { unsubscribe(); button.removeEventListener('click', click); container.replaceChildren() }
}

// Svelte의 실제 writable store API를 관찰하는 기초 예제입니다.
// .svelte 컴포넌트 컴파일이나 $state rune 예제는 별도 단계에서 다룹니다.
export function mount({ writable, container }) {
  const count = writable(0)
  const output = document.createElement('output')
  const button = document.createElement('button')
  button.textContent = 'Svelte store 증가'
  const unsubscribe = count.subscribe(value => { output.textContent = '구독 결과: ' + value })
  const click = () => count.update(value => value + 1)
  button.addEventListener('click', click)
  container.append(output, button)
  return () => { unsubscribe(); button.removeEventListener('click', click); container.replaceChildren() }
}

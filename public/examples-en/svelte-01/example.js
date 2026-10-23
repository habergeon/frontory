// A basic example for observing the actual Svelte writable store API.
// .svelte component compilation and $state rune examples are covered in separate steps.
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

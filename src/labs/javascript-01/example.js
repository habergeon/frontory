// STEP을 바꿔 보고 const 객체의 내부 값이 변할 수 있는 이유를 설명하세요.
export function mount({ container ,locale='ko'}) {
const messages=locale==='en'?{"display01":"Increment state"}:{"display01":"상태 증가"};
  const STEP = 1
  const state = { count: 0 }
  const button = document.createElement('button')
  const output = document.createElement('pre')
  button.textContent = messages.display01
  const render = () => { output.textContent = JSON.stringify(state, null, 2) }
  const increment = () => { state.count += STEP; render() }
  button.addEventListener('click', increment)
  container.append(button, output)
  render()
  return () => { button.removeEventListener('click', increment); container.replaceChildren() }
}

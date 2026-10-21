// 실제 Motion animate API입니다. duration과 상태별 목표 값을 바꿔 보세요.
export function mount({ animate, container }) {
  const button = document.createElement('button')
  button.textContent = '목표 상태 전환'
  const box = document.createElement('div')
  box.style.cssText = 'width:70px;height:70px;background:#26836c;border-radius:12px;margin:40px'
  container.append(button, box)
  let active = false, animation
  const click = () => {
    active = !active
    animation?.stop()
    animation = animate(box, { x: active ? 130 : 0, rotate: active ? 90 : 0, borderRadius: active ? '50%' : '12px' }, { duration: 0.6 })
  }
  button.addEventListener('click', click)
  return () => { animation?.stop(); button.removeEventListener('click', click); container.replaceChildren() }
}
